from os import listdir
import os
from os.path import isfile, join, isdir


def extract_relevant_info(info: dict):
    """
    :param info: YTDL process_info
    :return: returns the important info
    """


    thumbnail = info.get("thumbnail")
    webpage_url = info.get("webpage_url")

    if thumbnail is None:
        thumbnail = info["thumbnails"][0]["url"]

    if webpage_url is None:
        webpage_url = info["url"]

    relevant_info = {
        'id': info.get('id'),
        'title': info.get('title'),
        'url': webpage_url,
        'thumbnail': thumbnail,
        'duration': info.get('duration'),
        'format': info.get('format'),
        'file_size': info.get('file_size')
    }

    return relevant_info


def get_downloaded_files():
    """
    :return: List of downloaded files
    """


    download_folder = os.path.join(get_parent_dir(), "downloads")

    if isdir(download_folder):
        return [f for f in listdir(download_folder) if isfile(join(download_folder, f))]
    else:
        return None

def get_parent_dir():
    """
    :return: Parent dir
    """
    current_dir = os.path.dirname(os.path.abspath(__file__))
    return os.path.abspath(os.path.join(current_dir, '..'))
