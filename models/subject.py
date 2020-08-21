from app import db

class Subject(db.Model):
    _table_args__ = (db.UniqueConstraint('sigla', 'professor'),)
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    sigla = db.Column(db.String())
    professor = db.Column(db.String())
    link = db.Column(db.String())
    groups = db.relationship('WhatsGroup', backref='subject', lazy=True)
    university_id = db.Column(db.Integer, db.ForeignKey('university.id'), nullable=False)

    def serialize(self):
        return {
            'id': self.id, 
            'name': self.name,
            'sigla': self.sigla,
            'professor': self.professor,
            'link' : self.link,
            'university_id': self.university_id
        }