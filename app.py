import os
from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
api = Api(app)

api.config.from_object(os.environ['APP_SETTINGS'])
api.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(api)

from models.university import University
from models.subject import Subject

@api.route("/")
def index():
    return render_template("index.html")

@api.route("/getalluniversities")
def get_all_universities():
    try:
        universities = University.query.all()
        return jsonify([e.serialize() for e in universities])
    except Exception as e:
	    return(str(e))


@api.route("/getallsubjects")
def get_all_subjects():
    try:
        subjects = Subject.query.all()
        return jsonify([e.serialize() for e in subjects])
    except Exception as e:
	    return(str(e))


if __name__ == '__main__':
    api.run()