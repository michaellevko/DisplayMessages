:: Manages "DisplayMessages" application startup
:: Arguments legend: 
:: %1 - MongoDB installation bin directory
:: %2 - "DisplayMessages" project root directory
:: WARNING - path arguements must each be encased with quotation marks "", or script will fail

@echo off

:: Calls setup_msgDB.bat to setup data directory in project and import messages to db
call %2\startup_scripts\setup_msgDB.bat %1 %2
:: Calls run_app.bat to run "DisplayMessages" application and browse to app url in chrome
call %2\startup_scripts\run_app.bat %2