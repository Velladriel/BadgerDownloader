import logging, os
from logging.handlers import TimedRotatingFileHandler
import utils

FILELOC = f"{utils.get_parent_dir()}/server_logs"
LEVEL = logging.INFO
FORMAT = "%(asctime)s %(name)s [%(levelname)-5.5s] %(message)s"

os.makedirs(FILELOC, exist_ok=True)

def get_logger(logger_name="badger", level=LEVEL):

    server_logger = logging.getLogger(logger_name)
    server_logger.setLevel(level)

    if not server_logger.handlers:
        # Daily Rotating FileHandler
        file_handler = TimedRotatingFileHandler(f"{FILELOC}/{logger_name}.log", when="midnight",
                                                interval=1, backupCount=7)
        file_handler.suffix = "%Y-%m-%d"
        file_formatter = logging.Formatter(FORMAT)
        file_handler.setFormatter(file_formatter)
        server_logger.addHandler(file_handler)

        # StreamHandler
        stream_handler = logging.StreamHandler()
        stream_formatter = logging.Formatter(FORMAT)
        stream_handler.setFormatter(stream_formatter)
        server_logger.addHandler(stream_handler)

    return server_logger


if __name__ == "__main__":

    log = get_logger()
    log.info("info")





