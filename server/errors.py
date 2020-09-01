class EmptyFieldError(Exception):
  def __init__(self, field):
    self.field = field

  def __str__(self):
    return "The \"{}\" field cannot be empty".format(self.field)

class WrongTypeError(Exception):
  def __init__(self, field, correctType):
    self.field = field
    self.correctType = correctType

  def __str__(self):
    return "The \"{}\" field must be a \"{}\"".format(self.field, self.correctType)

class InvalidValueError(Exception):
  def __init__(self, field):
    self.field = field

  def __str__(self):
    return "The \"{}\" field has a invalid value".format(self.field)