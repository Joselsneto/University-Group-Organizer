import os
from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

from models.university import University
from models.subject import Subject
from models.group import Group


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/getalluniversities")
def get_all_universities():
    try:
        universities = University.query.all()
        return jsonify([e.serialize() for e in universities])
    except Exception as e:
	    return(str(e))


@app.route("/getuniversity/<initials_>")
def get_university_by_initials(initials_):
    try:
        university = University.query.filter_by(initials = initials_).first()
        return jsonify(university.serialize())
    except Exception as e:
	    return(str(e))


@app.route("/getallsubjects")
def get_all_subjects():
    try:
        subjects = Subject.query.all()
        return jsonify([e.serialize() for e in subjects])
    except Exception as e:
	    return(str(e))


@app.route("/getsubjects/<uni_id_>")
def get_subjects_by_university_id(uni_id_):
    try:
        subjects = Subject.query.filter_by(university_id = uni_id_)
        return jsonify([e.serialize() for e in subjects])
    except Exception as e:
	    return(str(e))


@app.route("/getsubject/<id_>")
def get_subject_by_id(id_):
    try:
        subject = Subject.query.filter_by(id = id_)
        return jsonify(subject.serialize())
    except Exception as e:
	    return(str(e))


@app.route("/adduniversity")
def add_university():
    name = request.args.get('name')
    initials = request.args.get('initials')
    try:
        new_university = University(
            name = name,
            initials = initials
        )
        db.session.add(new_university)
        db.session.commit()
        return "New University added."
    except Exception as e:
	    return(str(e))


@app.route("/addsubject")
def add_subject():
    name = request.args.get('name')
    initials = request.args.get('initials')
    professor = request.args.get('professor')
    university_id = request.args.get('university_id')
    try:
        new_subject = Subject(
            name = name,
            initials = initials,
            professor = professor,
            university_id = university_id
        )
        db.session.add(new_subject)
        db.session.commit()
        return "New Subject added."
    except Exception as e:
	    return(str(e))


if __name__ == '__main__':
    app.run()