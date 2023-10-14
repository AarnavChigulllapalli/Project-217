const socket = io("/");

var peer = new Peer(undefined, {
    path: "/peerjs",
    host: "/",
    port: "443",
});

const user = prompt("Enter your name");


$(function () {
    $("#send").click(function () {
        if ($("#chat_message").val().length !== 0) {
            console.log(user);
            socket.emit("message", $("#chat_message").val());
            $("#chat_message").val("");
        }
    })
    $("#chat_message").keydown(function (e) {
        if (e.key == "Enter" && $("#chat_message").val().length !== 0) {
            socket.emit("message", $("#chat_message").val());
            $("#chat_message").val("");
        }
    })
    $("#send").click(function () {
        if ($("#chat_message").val().length !== 0) {
            socket.emit("message", $("#chat_message").val());
            $("#chat_message").val("");
        }
    })

    $("#chat_message").keydown(function (e) {
        if (e.key == "Enter" && $("#chat_message").val().length !== 0) {
            socket.emit("message", $("#chat_message").val());
            $("#chat_message").val("");
        }
    })
})

peer.on("open", (id) => {
    socket.emit("join-room", ROOM_ID, id, user);
});

socket.on("createMessage", (message) => {
    $(".messages").append(`
        <div class="message">
            <b><span class="username"> ${userName}: </span> </b>
            <span>${message}</span>
        </div>
    `)
});