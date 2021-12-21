setlocal enabledelayedexpansion
for %%a in (* copy.tga) do (
  set file=%%a
  ren "!file!" "!file: copy.tga=.tga!"
)

for %%a in (* copy.png) do (
  set file=%%a
  ren "!file!" "!file: copy.png=.png!"
)