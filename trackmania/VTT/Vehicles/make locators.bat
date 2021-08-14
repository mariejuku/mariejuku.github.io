set host=https://mariejuku.github.io/trackmania/VTT/Vehicles/
del *.zip.loc
for /r %%a in (*.zip) do @echo %host%%%~nxa > %%~nxa.loc