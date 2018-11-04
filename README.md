# peer to peer messaging and session handling demo

I have attached with all the dependency files, server file and html file for live demo.

I have used PeerJS server and peer client to achieve the peer to peer messaging demo.


# Dependencies

1. NodeJS 
2. PM2 (if running in cluster mode)
3. Browser should allow cors-domain



# Setup for the demo

1. Unzip the archived file.

2. Check whether port 9000 is unallocated if not close the server running in 9000 port.

3. Run the server file as $node peerConnectionDemo.js

3. PeerJS server will run in the port 9000 and API's will also be running.

4. Now open the peerConnectionDemo.html file in any of your browser (Chrome and Firefox are recommended). 

5. Allow access origin, use cors domain extension to activate as HTML file will use the localhost for POST API's.



# Steps to run through the demo 

1. Initially create a peer object with any string value(User Name) which will be the unique peer ID, which will create a peer object and will open socket connection to the peerJS server.

2. For testing open the peerConnectionDemo.html in other browser and follow thw step 1.

3. Now you are ready to message between the peers.

4. Send message to peer using the peer receiver ID in the text box and draft some text message, now click SendMessageToPeer which will connect to the receiver peer and transmit the message, you can view the conversation in the textarea.

5. Receiver end the other browser will automatically receive the message as the socket will be open.

6. You can enjoy a messaging app which will be really live.

7. Add ons are also available to check for the active nodes by clicking the ActiveNodes button, and can start conversation to whom ever is active.

8. Also I have some interesting add ons through which you can check for the nodes who were connected past 1hr, 2hrs and 1 day.

9. Kindly checkout and enjoy a live conversation with your buddies instantly with no restriction.

10. In the upcoming update I will come up with media streaming (Call and Video streaming).

----------------------------

# For further queries reach me out.

grashias14@gmail.com

https://www.linkedin.com/in/grashias/
