from flask import Flask
from flask import request
from flask import Response
import json
import mysql.connector
from passlib.hash import sha256_crypt
from sqlcredentials import *

app = Flask(__name__)

#global variables
connection = ''
cursor = ''

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/api/register', methods = ['POST'])
def register():
    requestData = json.loads(request.data)
    currentDb = connectToDatabase()
    regResult = createUser(requestData, currentDb)
    closeConnection(currentDb)
    return regResult

@app.route('/api/login', methods = ['POST'])
def login():
    currentDb = connectToDatabase()
    requestData = json.loads(request.data)
    loginReturn = loginUser(requestData["email"], requestData["password"], currentDb)
    closeConnection(currentDb)
    return Response(json.dumps(loginReturn), mimetype='application/json')

def connectToDatabase(): 
    db = mysql.connector.connect(
        host=instatutorHostName,
        user=instatutorUser,
        passwd=instatutorPassword,
        port=instatutorPort,
        database=instatutorDB
    )
    return db

def createUser(userDetails, database):
    firstName = userDetails["firstName"]
    lastName = userDetails["lastName"]
    email = userDetails["email"]
    password = sha256_crypt.hash(userDetails["password"])
    role = userDetails["role"]
    checkUser = "SELECT email FROM Users WHERE email='"+email+"'"
    sql = "INSERT INTO `Users` (`id`, `first-name`, `last-name`, `email`, `password`, `role`, `points`) VALUES  ('', %s, %s, %s, %s, %s, 0)"
    val = (firstName, lastName, email, password, role)
    mycursor = database.cursor(dictionary=True, buffered=True)
    mycursor.execute(checkUser)
    doesUserExist = mycursor.fetchone()
    if (doesUserExist == None):
        mycursor.execute(sql, val)
        database.commit()
        mycursor.close()
        return Response(json.dumps(userDetails), mimetype='application/json')
    else: 
        return "User already exists"   

def loginUser(email, password, database):
    mycursor = database.cursor(dictionary=True)
    mycursor.execute("SELECT * FROM Users WHERE email='" + email+ "'")
    myresult = mycursor.fetchone()
    if (myresult == None):
        return "Error-User not found"
    print(myresult)
    if (sha256_crypt.verify(password, myresult['password'])):
        return myresult
    else:
        return 'Error-Password incorrect'

def closeConnection(database):
    database.close()

if __name__ == '__main__':
    app.run(debug=True)