set host=https://mariejuku.github.io/trackmania/modernSkinPack/dist/lagoon/
del *.png.loc
del *.webm.loc
for /r %%a in (*.png) do @echo %host%%%~nxa > %%~nxa.loc
for /r %%a in (*.webm) do @echo %host%%%~nxa > %%~nxa.loc