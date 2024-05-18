from flask import Flask, request, jsonify, send_from_directory
import cx_Oracle

app = Flask(__name__, static_folder='static')

def select_by_name(name):
    try:
        conn = cx_Oracle.connect("hristo/hristo@XE")
        print("Connected to Oracle database successfully!")
    except cx_Oracle.Error as error:
        print("Error connecting to Oracle database:", error)
        return []

    cursor = conn.cursor()
    try:
        cursor.execute("SELECT ST, STATE_NAME FROM DEMO_STATES WHERE STATE_NAME = :name", {'name': name})
        rows = cursor.fetchall()
    except cx_Oracle.Error as error:
        print("Error executing query:", error)
        rows = []

    conn.close()
    return rows


@app.route('/search', methods=['POST'])
def search():
    name = request.form['name']
    states = select_by_name(name)
    return jsonify([{'ST': row[0], 'STATE_NAME': row[1]} for row in states])

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory(app.static_folder, path)

if __name__ == '__main__':
    print("Starting the State Search application...")
    try:
        app.run(debug=True)
    except Exception as e:
        print("Error starting the State Search application:", e)