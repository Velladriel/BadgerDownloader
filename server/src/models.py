from app import db
import datetime

class DownloadInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    yt_id = db.Column(db.String(11), nullable=False)
    requester_ip = db.Column(db.String(15), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    url = db.Column(db.String(100), nullable=False)
    thumbnail_url = db.Column(db.String(100), nullable=False)
    format = db.Column(db.String(10), nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    size = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())

    def to_json(self):
        return {
            "id": self.yt_id,
            "requester_ip": self.requester_ip,
            "title": self.title,
            "url": self.url,
            "thumbnail_url": self.thumbnail_url,
            "format": self.format,
            "duration": self.duration,
            "size": self.size,
            "datetime": self.created_at
        }
