@echo =====================================================
:: start /b /wait "" nmake /nologo %*
@nmake /nologo %*
@echo end of make.bat
@exit /B