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

@app.route("/getuniversity/<id_>")
def get_university_by_id(id_):
    try:
        university = University.query.filter_by(id=id_).first();
        return jsonify(university.serialize())
    except Exception as e:
        return(str(e))


@app.route("/searchuniversities/<value_>")
def search_universities(value_):
    try:
        search = "%{}%".format(value_)
        universities = University.query.filter(University.initials.ilike(search) | University.name.ilike(search)).all()
        return jsonify([e.serialize() for e in universities])
    except Exception as e:
	    return(str(e))

@app.route("/searchsubjects/<university_id_>/<value_>")
def search_subjects(university_id_ ,value_):
    try:
        search = "%{}%".format(value_)
        subjects = Subject.query.filter(Subject.initials.ilike(search) | Subject.name.ilike(search) | Subject.professor.ilike(search)).filter_by(university_id=university_id_).all()
        return jsonify([e.serialize() for e in subjects])
    except Exception as e:
        return(str(e))


@app.route("/getallsubjects")
def get_all_subjects():
    try:
        subjects = Subject.query.all()
        return jsonify([e.serialize() for e in subjects])
    except Exception as e:
	    return(str(e))


@app.route("/getsubjects/<university_id_>")
def get_subjects_by_university_id(university_id_):
    try:
        subjects = Subject.query.filter_by(university_id = university_id_)
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

@app.route("/getgroups/<subject_id_>")
def get_groups_by_subject_id(subject_id_):
    try:
        groups = Group.query.filter_by(subject_id = subject_id_)
        return jsonify([e.serialize() for e in groups])
    except Exception as e:
        return(str(e))


@app.route("/adduniversity", methods=['POST'])
def add_university():
    name = request.json.get('name')
    initials = request.json.get('initials')
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


@app.route("/addsubject", methods=['POST'])
def add_subject():
    name = request.json.get('name')
    initials = request.json.get('initials')
    professor = request.json.get('professor')
    university_id = request.json.get('university_id')
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

@app.route("/addgroup", methods=['POST'])
def add_group():
    subject_id = request.json.get('subject_id')
    link = request.json.get('link')
    try:
        new_group = Group(
            link = link,
            subject_id = subject_id
        )
        db.session.add(new_group)
        db.session.commit()
        return "New Group added."
    except Exception as e:
        return(str(e))


if __name__ == '__main__':
    app.run()