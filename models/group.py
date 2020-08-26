from app import db

class Group(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  link = db.Column(db.String())
  subject_id = db.Column(db.Integer, db.ForeignKey('subject.id'), nullable=False)

  def serialize(self):
    return {
        'id': self.id, 
        'link': self.link,
        'subject_id': self.subject_id
    }