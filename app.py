import os
from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

from models import University
from models import Subject
from models import WhatsGroup

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


@app.route("/getallsubjects")
def get_all_subjects():
    try:
        subjects = Subject.query.all()
        return jsonify([e.serialize() for e in subjects])
    except Exception as e:
	    return(str(e))


@app.route("/getallgroups")
def get_all_groups():
    try:
        groups = WhatsGroup.query.all()
        return jsonify([e.serialize() for e in groups])
    except Exception as e:
	    return(str(e))


if __name__ == '__main__':
    app.run()