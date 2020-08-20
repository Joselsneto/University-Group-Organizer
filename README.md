# University Group Organizer - [Website](https://university-whats-organizer.herokuapp.com/)

In this repository, we are developing a tool to get the WhatsApp groups for EAD classes more organized and easier to find.

## Technologies

We are using Python as the language with the following libraries:

- [Flask](https://pypi.org/project/Flask/)
- [Heroku](https://www.heroku.com/)
- [Postgresql](https://www.postgresql.org/)

To install all python libraries run at the root of the repo:

```shell
pip3 install -r requirements.txt
```

## Running the database

First you need to manually create database following the commands.

```bash
sudo -u postgres createuser --superuser name_of_user
sudo -u name_of_user createdb name_of_database
```

Then setup the system variables to load the connection string from there.

```bash
export DATABASE_URL="postgresql://user:password@localhost:5432/university_groups"
```

Run the migration to create the tables.

```bash
python3 manage.py db init
python3 manage.py db migrate 
python3 manage.py db upgrade 
```

### Running the application

Run the command.
```bash
python3 manage.py runserver
```
