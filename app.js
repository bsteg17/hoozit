// Enclosing function
function() {

    IO {
        //All code related to Socket.IO connections goes here.
        init: function() {
            IO.socket = io.connect();
            IO.bindEvents();
        },

        bindEvents : function() {
            IO.socket.on('connected', IO.onConnected );
            IO.socket.on('qAsked', IO.qAsked );
            IO.socket.on('qAnswer', IO.qAnswer );
            IO.socket.on('guess', IO.guess );
            IO.socket.on('chat', IO.chat);
            IO.socket.on('incorrect', IO.hostCheckAnswer);
            IO.socket.on('gameOver', IO.gameOver);
            IO.socket.on('error', IO.error );
        },


    }

    App {
        //Generic game logic code.

        Host {
            //Game logic for the 'Host' (big) screen.
        }

        Player {
            //Game logic specific to 'Player' screens.
        }
    }       
}