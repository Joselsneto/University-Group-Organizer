from app import db

class Subject(db.Model):
    _table_args__ = (db.UniqueConstraint('initials', 'professor'),)
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    initials = db.Column(db.String())
    professor = db.Column(db.String())
    university_id = db.Column(db.Integer, db.ForeignKey('university.id'), nullable=False)
    groups = db.relationship('Group', backref='subject', lazy=True)

    def serialize(self):
        return {
            'id': self.id, 
            'key': self.id,
            'name': self.name,
            'initials': self.initials,
            'professor': self.professor,
            'university_id': self.university_id
        }