from os import listdir
import os
from os.path import isfile, join, isdir


def get_file_size(file_path):
    return os.path.getsize(file_path)


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

def get_parent_dir(current_dir=os.path.dirname(os.path.abspath(__file__))):
    """
    :return: Parent dir
    """

    return os.path.abspath(os.path.join(current_dir, '..'))

def get_dir_size(directory):
    return sum(os.path.getsize(os.path.join(directory, f)) for f in os.listdir(directory)
               if os.path.isfile(os.path.join(directory, f)))


def get_file_ages(directory):

    files = {}

    for f in os.listdir(directory):
        st = os.stat(os.path.join(directory, f))
        files[f] = st.st_mtime

    return dict(sorted(files.items(), key=lambda item: item[1], reverse=True))


def clean_dir(directory, exception):
    """
    Deletes oldest file
    :param exception:  File that shouldnt be deleted
    :param directory: Download folder
    """
    files = get_file_ages(directory)

    file_names = list(files.keys())

    if file_names:

        if file_names[0] != exception:
            os.remove(os.path.join(directory, file_names[0]))






if __name__ == "__main__":
    clean_dir(os.path.join(get_parent_dir(), "downloads"))
