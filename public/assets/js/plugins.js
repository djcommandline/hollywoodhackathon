///////////
// Video //
///////////

var apiKey = '<%= data.apiKey %>';
//var sessionId = '1_MX4zNTA5MzY3Mn4xMjcuMC4wLjF-U2F0IEp1bCAxMyAxMjozMTowOSBQRFQgMjAxM34wLjM0NDUxOTYyfg';
//var token = 'T1==cGFydG5lcl9pZD0zNTA5MzY3MiZzZGtfdmVyc2lvbj10YnJ1YnktdGJyYi12MC45MS4yMDExLTAyLTE3JnNpZz1iNzI0MmMzZWFkZTkwNjk4Zjg5YjYwZWY2MThiOGNlMjdlZGQxY2JhOnJvbGU9cHVibGlzaGVyJnNlc3Npb25faWQ9MV9NWDR6TlRBNU16WTNNbjR4TWpjdU1DNHdMakYtVTJGMElFcDFiQ0F4TXlBeE1qb3pNVG93T1NCUVJGUWdNakF4TTM0d0xqTTBORFV4T1RZeWZnJmNyZWF0ZV90aW1lPTEzNzM3NDM5MTEmbm9uY2U9MC4yODMyMTQ1ODEyMjQ1NjE4JmV4cGlyZV90aW1lPTEzNzM4MzAzMTImY29ubmVjdGlvbl9kYXRhPQ==';
var session = TB.initSession('<%= data.sessionId %>');
var publisher = TB.initPublisher(apiKey, 'myPublisherDiv');

session.addEventListener('sessionConnected', function(e){
session.publish( publisher );
    for (var i = 0; i < e.streams.length; i++) {
    // Make sure we don't subscribe to ourself
        if (e.streams[i].connection.connectionId == session.connection.connectionId) {
          return;
        }
        session.subscribe(e.streams[i]);
    }
});

session.addEventListener('streamCreated', function(e){
    for (var i = 0; i < e.streams.length; i++) {
        // Make sure we don't subscribe to ourself
        if (e.streams[i].connection.connectionId == session.connection.connectionId) {
            return;
        }
        // Create the div to put the subscriber element in to
        var div = document.createElement('div');
        div.setAttribute('id', 'stream' + e.streams[i].streamId);
        document.body.appendChild(div);
        session.subscribe(e.streams[i], div.id);
    }
});

session.connect(apiKey, '<%= data.token %>');



/////////////
// Sockets //
/////////////

var App = {};

App.socket = io.connect('http://localhost:3001');

App.socket.emit('test', { data: 'data' });

App.socket.on('draw', function(data) {
    return App.draw(data.x, data.y, data.type);
});

/////////////
// Drawing //
/////////////

App.init = function() {

    App.canvas = document.getElementById('canvas');
    App.canvas.height = 200;
    App.canvas.width = 200;
    
    App.ctx = App.canvas.getContext("2d");
    App.ctx.fillStyle = "solid";
    App.ctx.strokeStyle = "#000000";
    App.ctx.lineWidth = 5;
    App.ctx.lineCap = "round";
    
    return App.draw = function(x, y, type) {
        if (type === "dragstart") {
            console.log(type);
            App.ctx.beginPath();
            App.ctx.moveTo(x, y);
        } else if (type === "drag") {
            console.log(type);
            App.ctx.lineTo(x, y);
            App.ctx.stroke();
        } else {
            console.log(type);
            App.ctx.closePath();
        }
    }
}

$(document).ready(function () {
    $("#share-link").html("<a href='http://drizzlefrizzle.com:3001/"+ "<%= data.sessionId %>" +"'>Get Link</a>");

    App.init();

    // Draw Event

    $('#canvas').on('dragstart drag dragend', function(e) {
        var offset, type, x, y;
        
        type = e.handleObj.type;
        //console.log(type);
        //console.dir(e);
        offset = $(this).offset();
        e.offsetX = e.screenX - offset.left;
        e.offsetY = e.screenY - offset.top;
        x = e.offsetX;
        y = e.offsetY;
       
        App.draw(x, y, type);
        
        App.socket.emit('drawClick', {
            x: x,
            y: y,
            type: type
        });
    });
});