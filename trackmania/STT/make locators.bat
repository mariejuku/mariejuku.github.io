set host=https://mariejuku.github.io/trackmania/STT/
del *.tga.loc
del *.webm.loc
del *.png.loc
for /r %%a in (*.tga) do @echo %host%%%~nxa > %%~nxa.loc
for /r %%a in (*.webm) do @echo %host%%%~nxa > %%~nxa.loc
for /r %%a in (*.png) do @echo %host%%%~nxa > %%~nxa.loc