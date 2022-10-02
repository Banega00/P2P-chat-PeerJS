const onlineUsersDiv = document.querySelector('.online-users-div')
const messagesDiv = document.querySelector('.messages-div')
const sendMessageInput = document.querySelector('#send-message-input')

function addNewPeerToOnlinePeers(peerId) {
    const newPeerElement = document.createElement('div')
    newPeerElement.classList.add('online-user')
    newPeerElement.setAttribute('data-peerid', peerId)
    newPeerElement.innerHTML = peerId
    onlineUsersDiv.appendChild(newPeerElement)
}

let PEER_ID;

const peers = {}

const myPeer = new Peer(undefined, {
    host: '/',
    port: '12345'
})

myPeer.on('open', id => {
    const socket = io('http://192.168.1.10:3000')

    PEER_ID = id;
    document.getElementById('peer-id').innerHTML = `Your peer id is: <b>${id}</b>`
    socket.emit('new-peer', id)

    socket.on('new-peer', peerId => {

        addNewPeerToOnlinePeers(peerId)
        connectToNewPeer(peerId)
    })

    socket.on('peer-disconnected', peerId => {
        removePeerFromOnlinePeers(peerId)
    })
 
    
})

function connectToNewPeer(peerId) {

    const connection = myPeer.connect(peerId);

    connection.on('open', function () {
        console.log('Connection id:', connection.connectionId)

        connection.on('data', data => {

            receiveMessage(peerId, data)
        })
    });

    connection.on('close', () => {
        removePeerFromOnlinePeers(connection.peer)
        console.log('connection closed')
    })

    peers[peerId] = connection;
}

function sendMessage(){
    const message = sendMessageInput.value
    if(!message) return;

    for(const peerId in peers){
        peers[peerId].send(message)
    }
    receiveMessage(PEER_ID, message)
    sendMessageInput.value=""
}

function receiveMessage(peerId, message){
    const div = document.createElement('div')
    div.classList.add('message')
    div.setAttribute('data-peerid',peerId)
    div.innerHTML =
    `
        <div class="message__title">${peerId}</div>
        <div class="message__content">${message}</div>
    `
    messagesDiv.appendChild(div);
}

function removePeerFromOnlinePeers(peerId) {
    console.log('peer disconnected', peerId)
    if (peers[peerId]) {
        peers[peerId].close();
        delete peers[peerId]
    }

    const cssQuery = `.online-user[data-peerid="${peerId}"  ]`;
    console.log(cssQuery)
    const element = onlineUsersDiv.querySelector(cssQuery)
    console.log(element);
    element.remove()
}

myPeer.on('connection', function (connection) {
    console.log(`Connection established: ${connection.connectionId}`)
    addNewPeerToOnlinePeers(connection.peer)
    connection.on('data', function (data) {
        receiveMessage(connection.peer, data)
    });
    peers[connection.peer] = connection;
});




