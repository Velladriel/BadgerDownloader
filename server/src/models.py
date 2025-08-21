from sqlalchemy import func

from app import db
from datetime import timezone

class DownloadInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    yt_id = db.Column(db.String(11), nullable=False)
    session_id = db.Column(db.String(32), nullable=False)
    requester_ip = db.Column(db.String(15), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    url = db.Column(db.String(100), nullable=False)
    thumbnail_url = db.Column(db.String(100), nullable=False)
    format = db.Column(db.String(10), nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    size = db.Column(db.Integer, nullable=False)
    created_at = db.Column(
        db.DateTime(timezone=True),
        server_default=func.now()
    )

    def to_json(self):

        local = self.created_at.replace(tzinfo=timezone.utc).astimezone(timezone.utc)

        return {
            "id": self.id,
            "requester_ip": self.requester_ip,
            "session_id": self.session_id,
            "title": self.title,
            "url": self.url,
            "thumbnail_url": self.thumbnail_url,
            "format": self.format,
            "duration": self.duration,
            "size": self.size,
            "datetime": local.isoformat().replace("+00:00", "Z")




        }
