set host=https://mariejuku.github.io/trackmania/modernSkinPack/dist/stadium2020/Advertisement6x1/
del *.tga.loc
del *.webm.loc
for /r %%a in (*.tga) do @echo %host%%%~nxa > %%~nxa.loc
for /r %%a in (*.webm) do @echo %host%%%~nxa > %%~nxa.loc