from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import utils
import os
import logger

parent_dir = utils.get_parent_dir()
instance_dir = os.path.join(parent_dir, 'instance')
os.makedirs(instance_dir, exist_ok=True)
app = Flask(__name__)
CORS(app, expose_headers=["Content-Disposition"])

app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{os.path.join(instance_dir, 'database.db')}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

app.logger = logger.get_logger("Flask")

db = SQLAlchemy(app)

import routes

with app.app_context():
    db.create_all()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)





