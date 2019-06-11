from flask import Flask
import json
import pymysql
from passlib.hash import sha256_crypt
from sql-credentials import *
app = Flask(__name__)

#global variables
connection = ''
cursor = ''

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/api/register'):
def registerUser():
    connectToUserTable()
    checkIfUserExists = "SELECT * FROM `Users` WHERE `email`=" + request.data.email
    records = cursor.execute(checkIfUserExists)
    if (records == 0): 
        createUser(request.data.firstName, request.data.lastName, request.data.email, request.data.password, request.data.role, request.data.points)
        return True
    else:
        return False

def connectToUserTable(): 
    connection = pymysql.connect(host=instatutorHost, user=instatutorUser, password=instatutorPassword, db=instatutorUser)
    cursor = connection.cursor()

def createUser(firstName, lastName, email, password, role, points):
    sql = "INSERT INTO `Users` (`first-name`, `last-name`, `email`, `password`, `role`, `points`) VALUES (" + firstName + ", " + lastName + ", " + email + ", " + sha256_crypt.hash(password) + ", " + role + ", '0')"
    cursor.execute(sql)