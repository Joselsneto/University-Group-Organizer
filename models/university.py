from app import db

class University(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    sigla = db.Column(db.String())
    subjects = db.relationship('Subject', backref='university', lazy=True)

    def serialize(self):
        return {
            'id': self.id, 
            'name': self.name,
            'sigla': self.sigla
        }