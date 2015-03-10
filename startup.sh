#!/bin/bash
uv4l --auto-video_nr --driver raspicam --encoding mjpeg \
	--server-option '--port=8554' \
	--server-option '--max-streams=5' \
	--server-option '--max-threads=10' \
	--server-option '--thread-idle-time=3' \
	--width 352 --height 480
