import cx_Oracle

def connect_to_db(username, password, database):
    try:
        connection = cx_Oracle.connect(username, password, database)
        print("Connected to the database successfully!")
        connection.close()
    except cx_Oracle.Error as error:
        print("Failed to connect to the database:", error)

if __name__ == "__main__":
    username = "hristo"
    password = "hristo"
    database = "XE"
    
    connect_to_db(username, password, database)
