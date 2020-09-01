from errors import EmptyFieldError, WrongTypeError, InvalidValueError

class Checker:
  def __init__(self, name="", initials="", professor="", university_id=-1, subject_id=-1, link=""):
    self.name = name
    self.initials = initials
    self.professor = professor
    self.university_id = university_id
    self.subject_id = subject_id
    self.link = link

  def verifyName(self):
    if(self.name == None or self.name == ""):
      raise EmptyFieldError("name")
    if(type(self.name) != str):
      raise WrongTypeError("name", "str")

  def verifyInitials(self):
    if(self.initials == None or self.initials == ""):
      raise EmptyFieldError("initials")
    if(type(self.initials) != str):
      raise WrongTypeError("initials", "str")

  def verifyProfessor(self):
    if(self.professor == None or self.professor == ""):
      raise EmptyFieldError("professor")
    if(type(self.professor) != str):
      raise WrongTypeError("professor", "str")

  def verifyUniversityId(self):
    if(self.university_id == None or self.university_id == -1):
      raise EmptyFieldError("university_id")
    if(type(self.university_id) != int):
      raise WrongTypeError("university_id", "int")

  def verifySubjectId(self):
    if(self.subject_id == None or self.subject_id == -1):
      raise EmptyFieldError("subject_id")
    if(type(self.subject_id) != int):
      raise WrongTypeError("subject_id", "int")
  
  def verifyLink(self):
    if(self.link == None or self.link == ""):
      raise EmptyFieldError("link")
    if(type(self.link) != str):
      raise WrongTypeError("link", "str")

  def checkUniversity(self):
    self.verifyName()
    self.verifyInitials()

  def checkSubject(self):
    self.verifyInitials()
    self.verifyName()
    self.verifyProfessor()
    self.verifyUniversityId()

  def checkGroup(self):
    self.verifySubjectId()
    self.verifyLink()
