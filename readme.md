# P2P chat with PeerJS

This is exercise project made for purpose of testing [PeerJS](https://peerjs.com/) library for establishing Peer-to-Peer connection over WebRTC.

## Demo
Every user is identified by randomly-generated id.<br>
Id of current user is at the bottom of the chat window
![demo1](/public/assets/ss/Screenshot%20from%202022-10-02%2020-55-53.png)
![demo2](/public/assets/ss/Screenshot%20from%202022-10-02%2020-56-59.png)

## Setup
1. Start backend server by running `npm start` command from the root of the project
2. Start PeerJS server which acts as **signaling server** for connecting peers. Run these two commands:<br>
    Command to install peer server as a global library: `npm i -g peer`<br> 
    Start peer server on port 3001: `peerjs --port 3001`

3. In public/script.js file line 23. with your local ip address
4. In web browser open http://<YOUR_LOCAL_IP_ADDRESS>:3001

