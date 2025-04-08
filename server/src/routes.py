import asyncio
import os
from flask import request, jsonify, send_from_directory, abort


from app import app, db
import yt_downloader
import logger
from models import DownloadInfo

current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
output_dir = os.path.join(parent_dir, 'downloads')


@app.route("/api/download", methods=['POST'])
def download():
    """
    Downloads file via yt_dlp and sends it to client

    :return: Downloaded file
    """
    log = logger.get_logger()

    data = request.json

    url = data.get('url')
    format = data.get('format')

    if not url:
        return jsonify({"error": "No url provided"}), 400


    info = asyncio.run(yt_downloader.download_video(url, format))
    log.debug(f"Download info: {info}")


    try:
        download_info = DownloadInfo(
            yt_id=info.get('id'),
            requester_ip=request.remote_addr,
            title=info.get('title'),
            url=info.get('url'),
            thumbnail_url=info.get('thumbnail'),
            format=info.get('format'),
            duration=info.get('duration'),
            size=info.get('file_size')
        )
    except AttributeError:
        if info[0]["error"]:
            abort(info[1], info[0]["error"])

    db.session.add(download_info)
    db.session.commit()

    file_path = f"{output_dir}/{info['title']}.{info['format']}"

    log.debug(f"Download file path: {file_path}")
    log.debug(f"{file_path}")

    if not os.path.exists(file_path):
        log.error(f"File not found: {file_path}")
        abort(404, description="Resource not found")

    file_name = f"{info['title']}.{info['format']}"

    return send_from_directory(output_dir, file_name , as_attachment=True, download_name=file_name)