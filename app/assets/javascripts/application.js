//= require jquery.min
//
var Rapp = {
    KEY_CODES: {ENTER: 13, DELETE: 8}
}

function pageSetup() {
    setupLogin();
    setupChatRoom();
}

function setupLogin() {
    var inputs;
    inputs = $("#login .input-group input");
    inputs.keydown(handleLoginKeyDown);
}

function handleLoginKeyDown(evt) {
    if(evt.keyCode == Rapp.KEY_CODES.ENTER){
        login();
    }
}

function login(){
    var username;
    var room_name;
    
    username = $("#username-input").val(); 
    username = $.trim(username);
    room_name = $("#room-name-input").val();
    room_name = $.trim(room_name);
    
    if(!username){
        alert("YOU NEED A USERNAME!!!!!!!");
    }else if(!room_name){
        alert("YOU NEED A ROOM NAME !!!!!!!")
    }else {
        initializeChat(username, room_name)
    }
}

function initializeChat(username, room_name){
    $('.chat-room-title').text(room_name);
    Rapp.Chat.subscribe(room_name, username, handleNewMessageFromOtherUser, handleNewUserJoined);
    
    $("#page-frame").addClass("chat-mode");    
    $("#login .input-group input").blur();
}

function setupChatRoom(){
    var chat_input;
    chat_input = $(".textarea-wrapper textarea");
    chat_input.keydown(kewDownOnChatInput)
} 
    
function kewDownOnChatInput(event){
    if(event.keyCode == Rapp.KEY_CODES.ENTER){
        event.preventDefault();
        submitNewMsg();
    }        
}

function submitNewMsg(){
    var msgtxt;
    
    msgtxt = $('textarea').val();
    
    msgtxt = $.trim(msgtxt);
    if (!msgtxt){
        alert("you need a msg");
    } else {
        Rapp.Chat.sendMessage(msgtxt);
        displayMessage(msgtxt, Rapp.Chat._username, true);
        $('textarea').val('');
    }
}

function displayMessage(msgtxt, username, my_message) {
    var message;
    var inner_message;
    var user_label;
    var body;
    
    message = $(document.createElement('div'));
    message.addClass('message');
    if (my_message) {
        message.addClass('my-message');
    }
    
    inner_message = $(document.createElement('div'));
    inner_message.addClass('inner-message');
    message.append(inner_message);
    
    user_label = $(document.createElement('label'));
    user_label.text(username);
    inner_message.append(user_label);

    body = $(document.createElement('p'));
    body.addClass('body');
    body.text(msgtxt);
    inner_message.append(body);
    
    $('.chat-room-message-list').append(message);
}

function handleNewMessageFromOtherUser(data) {
    displayMessage(data.body,data.username,false);
}

function handleNewUserJoined(data) {
    var new_user_message;
    
    data.username;
    new_user_message = $(document.createElement('div'));
    new_user_message.addClass('new-user-message');
    new_user_message.text(data.username+' joined the room');
    
    $('.chat-room-message-list').append(new_user_message);
}


$(document).ready(pageSetup);

/*
function multiply(x,y){
    var result;
    var counter;
    result = 0;
    counter = 0;
    while(counter<y){
        result = result + x;
        counter = counter + 1;
    
    }
    return result;
}

var twelve = multiply(3,4);
var juan = multiply(58936,395824); 
alert(twelve);
alert(juan);
*/

/*
while(true) {
    alert('This loop will never end');
}
*/