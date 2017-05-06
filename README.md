# DisplayMessages
College project in Internet Applications development.

DisplayMessages application requests messages from server based on screen id
    given by the GET request params in the url.
Client-side javascript logic dictates which message will be displayed.
Each message has certain time frames in which they are allowed to be displayed.
*** Note: there may be times when no messages will be displayed.

Pre-requisite
*** Seeing as this is a node.js based application, before starting the server run
    the command "npm install" to download module dependencies from package.json

Task-2 instructions
1. Run server, listens on port 8080
2. Browse at "http://127.0.0.1:8080/screen=X" where 'X' is the screen id ranging
    from 1-3 in order to view messages from server.
3. Browsing at "http://127.0.0.1:8080/" will display the default route with same
    instructions as previous step.
4. Messages information is saved on messages.json.
    4.1 Edit the json file to test application behavior for different message details.