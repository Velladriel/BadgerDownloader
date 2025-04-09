import asyncio
import functools
import os.path
import yt_dlp
from yt_dlp.utils import sanitize_filename

import utils
import logger

output_dir = os.path.join(utils.get_parent_dir(), 'downloads')

log = logger.get_logger('yt_downloader')


def create_ydl_opts(output_path: str, format: str = None):
    """
    Creates ydl options for downloading.

    :param output_path: File location
    :param format: Video/Audio format
    :return:
    """

    ydl_opts = {'outtmpl': f"{output_path}/%(title)s.%(ext)s"}



    if format and format in ['mp3', 'm4a', 'opus', 'vorbis', 'wav']:
        ydl_opts["postprocessors"] = [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': format,
            'preferredquality': '192',
        }]
    elif format and format in ['mp4', 'flv', 'webm', 'ogg', 'mkv']:
        ydl_opts["format"] = format


    ydl_opts["logger"] = logger.get_logger('yt_downloader')
    ydl_opts["default_search"] = "ytsearch"

    log.debug(f"ydl options: {ydl_opts}")

    return ydl_opts


async def execute_download(search: str, ydl_opts: dict, output_path: str, format):
    """
    Executes yt download.
    :param search: Video search or URL
    :param ydl_opts: Options for download.
    :param output_path: File location
    :param format: Audio/Video format
    :return: extracted video info
    """

    log.info(f"Starting download of: {search}")

    ytdl = yt_dlp.YoutubeDL(ydl_opts)

    if not search.startswith("https://") and not search.lower().startswith("ytsearch:"):
        search = "ytsearch10:" + search

    loop = asyncio.get_event_loop()
    partial = functools.partial(ytdl.extract_info, search, download=False, process=False)

    data = await loop.run_in_executor(None, partial)

    if 'entries' not in data:
        process_info = data
    else:
        process_info = None
        for entry in data['entries']:
            if entry:
                process_info = entry
                break

        if process_info is None:
            log.exception('Couldn\'t find anything that matches `{}`'.format(search))
            return

    downloads = utils.get_downloaded_files()
    sanitized_title = sanitize_filename(f"{process_info['title']}")
    file_name = sanitized_title + "." + format

    if downloads and file_name in downloads:
        log.info(f"Already downloaded '{file_name}'")
    else:
        log.info(f"'{file_name}' is new")

        if 'webpage_url' in process_info:
            webpage_url = process_info['webpage_url']
        elif 'id' in process_info:
            webpage_url = f"https://www.youtube.com/watch?v={process_info['id']}"
        else:
            raise log.exception(f"Missing 'webpage_url' and 'id' in process_info: {process_info}")


        partial = functools.partial(ytdl.extract_info, webpage_url, download=True)
        process_info = await loop.run_in_executor(None, partial)


    if format:
        size = utils.get_file_size(f"{output_path}/{sanitized_title}.{format}")
        process_info["format"] = format
    else:
        size = utils.get_file_size(f"{output_path}/{sanitized_title}.{process_info['ext']}")
        process_info["format"] = process_info['ext']

    process_info["file_size"] = size
    process_info["title"] = sanitized_title

    return process_info

async def download_video(url: str, format=None):
    """
    Downloads video from yt.
    :param url: Video URL
    :param format: Video/Audio format
    :return: Video information
    """


    ydl_opts = create_ydl_opts(output_dir, format)

    try:
        info = await execute_download(url, ydl_opts, output_dir, format)

        return utils.extract_relevant_info(info)

    except Exception as e:
        log.exception("Error while downloading video:")
        return {"error": str(e)}, 400


if __name__ == "__main__":

    # Testing
    url = 'birdy wings nu logic'

    info = asyncio.run(download_video(url, "mp3"))

    log.info(info)



