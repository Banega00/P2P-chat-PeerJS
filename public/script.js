const socket = io('http://192.168.1.10:3000')
const myPeer = new Peer(undefined, {
    host: '/',
    port: '12345'
})

const peers = {}

const peersContainer = document.querySelector('.peers-container')

myPeer.on('open', id => {
    socket.emit('new-peer', id)
})

socket.on('new-peer', peerId => {
    connectToNewPeer(peerId)
})

function addPeerIdToPage(peerId) {
    const p = document.createElement('p')
    p.innerHTML = peerId;
    peersContainer.appendChild(p);
}

function connectToNewPeer(peerId) {
    const connection = myPeer.connect(peerId);

    connection.on('open', function () {
        console.log('Connection id:', connection.connectionId)

        addPeerIdToPage(`${peerId} | ${connection.connectionId}`)

        connection.on('data', data => {

            console.log('DATA:', data)
        })
    });

    conn.on('close', () => {
        console.log('connection closed')
    })

    peers[peerId] = conn;
}

myPeer.on('connection', function (connection) {
    addPeerIdToPage(`${connection.peer} | ${connection.connectionId}`)
    console.log(`Connection established: ${connection.connectionId}`)
    connection.on('data', function (data) {
        console.log('Message received:', data);
    });
});


