Rapp.Chat = {
    PUSHER_API_KEY: '9a61ffe1cc42022e4156',
    NEW_MESSAGE_EVENT: 'client-message-created',
    NEW_USER_EVENT: 'client-user-joined',


    sendMessage: function(body) {
        var payload;

        if (!Rapp.Chat._channel) {
            return;
        }

        payload = {
            body: body,
            username: Rapp.Chat._username,
        }

        Rapp.Chat._channel.trigger(Rapp.Chat.NEW_MESSAGE_EVENT, payload);
    },


    subscribe: function(channel, username, message_fnc, user_fnc) {
        if (Rapp.Chat._channel) {
            Rapp.Chat.pusherConnection().unsubscribe(Rapp.Chat._channel.name);
        }

        Rapp.Chat._username = username;
        Rapp.Chat._channel = Rapp.Chat.pusherConnection().subscribe('private-'+channel);
        Rapp.Chat._channel.bind(Rapp.Chat.NEW_MESSAGE_EVENT, message_fnc);
        Rapp.Chat._channel.bind(Rapp.Chat.NEW_USER_EVENT, user_fnc);
        
        setTimeout(function() {
            Rapp.Chat._channel.trigger(Rapp.Chat.NEW_USER_EVENT, {username: username});
        }, 1000);
    },


    pusherConnection: function() {
        if (!Rapp.Chat._pusher_connection) {
            Rapp.Chat._pusher_connection = new Pusher(Rapp.Chat.PUSHER_API_KEY);
        }

        return Rapp.Chat._pusher_connection;
    }
}
