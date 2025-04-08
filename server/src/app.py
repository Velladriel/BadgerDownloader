from email.policy import default

from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


import utils
import os
import logger

def dynamic_origin(origin):
    # You can add custom logic here to validate the origin.
    # For now, let's simply allow any origin.
    return origin

parent_dir = utils.get_parent_dir()
instance_dir = os.path.join(parent_dir, 'instance')
os.makedirs(instance_dir, exist_ok=True)
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": dynamic_origin}}, expose_headers=["Content-Disposition"])

app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{os.path.join(instance_dir, 'database.db')}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

app.logger = logger.get_logger("Flask")

db = SQLAlchemy(app)

grand_parent_dir = utils.get_parent_dir(parent_dir)
front_end_dir = os.path.join(grand_parent_dir, "client")
dist_dir = os.path.join(front_end_dir, "dist")

# Server static files from "dist" folder under the "frontend" directory
#@app.route("/", defaults={"filename": ""})
#@app.route("/<path:filename>")
#def index(filename):
#    if not filename:
#        filename = "index.html"
#    return send_from_directory(dist_dir, filename)

# api routes
import routes

with app.app_context():
    db.create_all()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)





