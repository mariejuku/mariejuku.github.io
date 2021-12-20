set /p list=file names (no extension): 
(for %%a in (%list%) do ( 
ffmpeg -i %%a.mp4 -c:v libvpx -b:v 4M -c:a libvorbis webm/%%a.webm -y
))