:: Setup for messages db in mongoDB
:: Arguments legend: 
:: %1 - MongoDB Installation bin directory
:: %2 - DisplayMessages node.js project root directory
:: WARNING - path arguements must each be encased with quotation marks "", or script will fail

@echo off

:: Creates the database directory for the messages database
md %2\data\
:: Open different cmd windows and start the mongod process for handling mongoDB connections and actions
start cmd.exe /k "cd %1 & mongod.exe --dbpath %2\data\"
:: Imports messages.json containing 5 messages, into msgCollection under msgDB database (also creating the msgDB and msgCollection in the process)
cd %1
mongoimport.exe -d msgDB -c msgCollection %2\messages.json