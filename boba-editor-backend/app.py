# from flask import Flask, jsonify, request
# app = Flask(__name__)

# @app.route('/compile', methods=['POST'])
# def compile():
#   some_json = request.get_json()
#   return jsonify({'you sent': some_json}), 200

from flask import (Flask, render_template, jsonify, request)
# from boba.parser import Parser

app = Flask("__main__")

@app.route("/")
def my_index():
    return render_template("index.html", flask_token="Hello   world")

@app.route('/compile', methods=['POST'])
def compile():
  some_json = request.get_json()
  print(some_json["script"])
  f = open("template.py","w+")
  f.write(some_json["script"])
  return jsonify({'you sent': some_json}), 200

app.run(debug=True)