# from flask import Flask, jsonify, request
# app = Flask(__name__)

# @app.route('/compile', methods=['POST'])
# def compile():
#   some_json = request.get_json()
#   return jsonify({'you sent': some_json}), 200

from flask import (Flask, render_template, jsonify, request)
from boba.parser import Parser
import os
import time
import shutil

app = Flask("__main__")

@app.route("/")
def my_index():
    return render_template("index.html", flask_token="Hello   world")

@app.route('/compile', methods=['POST'])
def compile():
  some_json = request.get_json()
  # print(some_json["script"])
  cur_time = str(time.time())
  os.mkdir(cur_time)
  fn = os.path.join(cur_time, "template.py")
  with open(fn,"w+") as f:
    f.write(some_json["script"])
  ps = Parser(fn, cur_time)
  ps.main()
  fn = os.path.join(cur_time, "multiverse", "summary.csv")
  with open(fn,"r") as f:
    res = f.read()
    print(res)
  shutil.rmtree(cur_time)
  return jsonify({'you sent': res}), 200

app.run(debug=True)
