# from flask import Flask, jsonify, request
# app = Flask(__name__)

# @app.route('/compile', methods=['POST'])
# def compile():
#   some_json = request.get_json()
#   return jsonify({'you sent': some_json}), 200

# @app.after_request
# def after_request(response):
#   response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5000')
#   response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
#   response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
#   response.headers.add('Access-Control-Allow-Credentials', 'true')
#   return response

# if __name__ == '__main__':
#   app.run()

from flask import (Flask, render_template)

app = Flask("__main__")

@app.route("/")
def my_index():
    return render_template("index.html", flask_token="Hello   world")

app.run(debug=True)