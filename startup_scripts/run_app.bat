:: Runs the node application "DisplayMessages" and opens chrome browser at app url
:: Arguments legend: 
:: %1 - DisplayMessages node.js project root directory
:: WARNING - path arguements must each be encased with quotation marks "", or script will fail

@echo off

:: Switch to project directory and run node application
start cmd.exe /k "cd %1 & node app.js"
:: Open chrome and browse to app url
start chrome.exe http://127.0.0.1:8080/ 