#!/bin/bash

mkdir Captures
mkdir ffmpeg-workdir
mkdir output

[ -z "$(ls Captures)" ] && exit 0

for file in $(ls Captures)
do
	tmux new-session -d -s "ffmpeg-${file/./_}" \
		"
		mkdir 'ffmpeg-workdir/workdir_$file' && \
		cd 'ffmpeg-workdir/workdir_$file' && \
		mv '../../Captures/$file' '.' && \
		ffmpeg -i '$file' -c:v libaom-av1 -bf -1 -lossless 1 -strict -2 -pass 1 -an -f null /dev/null && \
		ffmpeg -i '$file' -c:v libaom-av1 -bf -1 -lossless 1 -strict -2 -pass 2 -c:a libopus '../../output/${file/.mkv/.webm}' && \
		cd ../.. && \
		rm -r 'ffmpeg-workdir/workdir_$file'
		"	
done
