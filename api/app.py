from flask import Flask, request, Response
import json
import mysql.connector
from mysql.connector import errorcode
from passlib.hash import sha256_crypt
from sqlcredentials import *

app = Flask(__name__)

# registration api route
# return: JSON Registration results
@app.route('/api/register', methods = ['POST'])
def register():
    requestData = json.loads(request.data)
    currentDb = connectToDatabase()
    regResult = createUser(requestData, currentDb)
    closeConnection(currentDb)
    return regResult

# login api route
# return: JSON login user details
@app.route('/api/login', methods = ['POST'])
def login():
    currentDb = connectToDatabase()
    if (type(currentDb) is str):
        return currentDb
    requestData = json.loads(request.data)
    loginReturn = loginUser(requestData["email"], requestData["password"], currentDb)
    closeConnection(currentDb)
    return Response(json.dumps(loginReturn), mimetype='application/json')

# connectToDatabase(): Connects to the instatutor database
# requires: None
# effects: None
# returns: database (if successful)
#          string with error details (if error)
def connectToDatabase(): 
    try:
        db = mysql.connector.connect(
            host=instatutorHostName,
            user=instatutorUser,
            passwd=instatutorPassword,
            port=instatutorPort,
            database=instatutorDB
        )
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            return("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            return("Database does not exist")
        else:
            return(str(err))
    else:
        db.close()
    return db

# createUser(userDetails, database): creats a user and stores it in the Users 
#    table on the mySQL database
# requires: userDetails to be a python dictionary
#           userdetails must be from the registration data
#           database must be the return value of the connectToDatabase function
# effects: creates new entry in the users table on the database (if successful)
# returns: JSON userDetails Object (if successful)
#          string with error details (if error)
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

# loginUser(email, password, database): Attempts to login using email and 
#    password
# requires: email to be a string
#           password to be a string
#           database must be the return value of connectToDatabase function
# effects: None
# returns: User details dictionary (if successful)
#          string with error details (if error)
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

# closeConnection(database): Closes access to the database
# requires: database to be a valid database
# effects: closes the database
def closeConnection(database):
    database.close()

# runs the app
if __name__ == '__main__':
    app.run(debug=True)