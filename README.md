# DisplayMessages
College project in Internet Applications development.

DisplayMessages application requests messages from server based on screen id.
Each message has certain time frames in which they are allowed to be displayed.
Client-side javascript logic dictates which message will be displayed.
*** Note: there may be times when no messages will be displayed.

Pre-requisite
*** Seeing as this is a node.js based application, before starting the server run
    the command "npm install" in project directory to download module dependencies
    from package.json.

Task-4 instructions
1. Run run.bat to setup messages db and run the node application.
2. Browse at "http://127.0.0.1:8080/screen=X" where 'X' is the screen id ranging
    from 1-3 in order to view messages from server.
3. Browsing at "http://127.0.0.1:8080/" will display the default route with same
    instructions as previous step.
4. Messages information is imported to db from message.json file.
    4.1 Edit the json file to test application behavior for different message details.
5. Browsing to /TestUpdate?id=X where X is screenId will add newMessage.json to msgCollection
    in db and send the new message to client Screen-X
    5.1 Client Screen-X must be connected to server while browsing to /TestUpdate because
        server updates using socket.io
    5.2 If Client Screen-X isnt connected, it will receive all messages associated with him
        in a bulk on next connection with server