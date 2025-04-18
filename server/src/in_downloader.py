import os.path

import instaloader
from instaloader import Post
import requests
import urllib.parse
import ffmpeg
from utils import get_parent_dir, get_file_size
import logger

log = logger.get_logger("in_logger")
download_dir = os.path.join(get_parent_dir(), "downloads")

def build_video_info(post: instaloader.Post, size, video_name):

    relevant_info = {
        'id': post.shortcode,
        'title': video_name,
        'thumbnail': post.url,
        'duration': post.video_duration,
        'format': "mp4",
        'file_size': size
    }

    return relevant_info


def download(shortcode):

    log.info(f"Starting download for: {shortcode}")

    insta = instaloader.Instaloader()
    post = Post.from_shortcode(insta.context, shortcode)
    url = post.video_url
    response = requests.get(url, stream=True)
    if response.status_code == 200:

        video_name = f"{post.owner_username}_{post.shortcode}"

        file_path = os.path.join(download_dir, video_name + ".mp4")

        with open(file_path, 'wb') as file:
            for chunk in response.iter_content(chunk_size=1024):
                if chunk:
                    file.write(chunk)

        return build_video_info(post, get_file_size(file_path), video_name)



def get_short_code(url: str):
    parsed = urllib.parse.urlparse(url)
    segments = parsed.path.split("/")
    return segments[2] if len(segments) >= 3 and segments[1] == "reels" or segments[1] == "reel" else None

def transform_video(file_path, file_format):

    new_path = file_path.replace("mp4", "") + file_format

    (
        ffmpeg
        .input(file_path)
        .output(new_path)
        .run(overwrite_output=True)
    )

def download_reel(url, format):

    try:
        short_code = get_short_code(url)
        info = download(short_code)
    except Exception as e:
        log.exception("Error while downloading Instagram video")
        return {"error": str(e)}, 400

    if format != "mp4":

        try:
            transform_video(os.path.join(download_dir, info["title"] + ".mp4"), format)
            info["format"] = format
        except Exception as e:
            log.exception("Error while transforming Instagram video")
            return {"error": str(e)}, 400

    info["url"] = url

    print(info)

    return info


if __name__ == "__main__":
    download_reel("https://www.instagram.com/reels/C_ks3NntoaD/?hl=en", "mp3")