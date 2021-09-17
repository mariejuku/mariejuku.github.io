set prefix=<skin type="image" file="
set suffix="></skin>
del names.txt
for /r %%a in (*.dds) do @echo %%~nxa >> names.txt