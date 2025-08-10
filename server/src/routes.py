import asyncio
import os
from datetime import datetime

#from crypt import methods

import sqlalchemy
from flask import request, jsonify, send_from_directory, abort

from app import app, db
import yt_downloader, in_downloader
import logger
from models import DownloadInfo

from utils import clean_dir, get_parent_dir, get_dir_size

current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
output_dir = os.path.join(parent_dir, 'downloads')

#In MB
DOWNLOAD_DIR_LIMIT = 1

@app.route("/api/get_downloads", methods=["GET"])
def get_downloads():
    """
    Gets recent downloads for specific IP

    :return: Downloaded songs as json
    """

    log = logger.get_logger(level=10)
    client_ip = request.headers.get('X-Forwarded-For', request.remote_addr).split(',')[0]

    log.debug(f"Requested client IP: {client_ip}")

    downloads = DownloadInfo.query.filter(DownloadInfo.requester_ip == client_ip)
    result = [download.to_json() for download in downloads]

    return jsonify(result)

@app.route("/api/downloads/<int:id>", methods=['DELETE'])
def delete_download(id):
    """
    Deletes download entry

    :return:
    """

    log = logger.get_logger()

    client_ip = request.headers.get('X-Forwarded-For', request.remote_addr).split(',')[0]

    try:
        download_entry = DownloadInfo.query.get(id)

        if download_entry is None:
            return jsonify({"error":"Entry not found"}), 404

        if download_entry.requester_ip != client_ip:
            return jsonify({"error": "You are not allowed to delete this entry"}), 403
        
        db.session.delete(download_entry)
        db.session.commit()

        log.info(f"Entry with id {id} deleted by {request.remote_addr}")

        return jsonify({"msg":"Entry deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500
        
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


    if "instagram.com" in url:
        info = in_downloader.download_reel(url, format)
    else:
        info = asyncio.run(yt_downloader.download_video(url, format))

    log.debug(f"Download info: {info}")

    client_ip = request.headers.get('X-Forwarded-For', request.remote_addr).split(',')[0]

    try:
        download_info = DownloadInfo(
            yt_id=info.get('id'),
            requester_ip=client_ip,
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

    download_folder = os.path.join(get_parent_dir(), "downloads")

    file_path = f"{output_dir}/{info['title']}.{info['format']}"

    log.debug(f"Download file path: {file_path}")
    log.debug(f"{file_path}")

    if not os.path.exists(file_path):
        log.error(f"File not found: {file_path}")
        abort(404, description="Resource not found")

    file_name = f"{info['title']}.{info['format']}"

    log.info(f"File: {file_name}")

    if get_dir_size(download_folder) >= DOWNLOAD_DIR_LIMIT * 1024**3:
        log.info("Delete file")
        clean_dir(download_folder, file_name)

    return send_from_directory(output_dir, file_name , as_attachment=True, download_name=file_name)