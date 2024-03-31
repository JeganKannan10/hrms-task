//socket order notification
document.getElementById('notification').style.display = 'none'; 
let socket = io(socketUrl,{"path":"","transports":["websocket"]});
socket.on('connect', function() {
    if (socket) {
        socket.on('newRequestAlert', function(evt){     
            if((isAdmin == 1 && notificationMode == 1) || (vendorBranchId == evt.vendorId)){
                if(isAdmin == 1) {
                    $('#notification').find('.request-alert').html('New ' +(evt.serviceId == 1 ? 'Order' : 'Trip')+ ' Received. To view click Here')
                    $('#notification').find('.request-alert').attr('href', (evt.serviceId == 1 ? deliveryOrderUrl : transportTripUrl) );
                }
                $('#notification').css("display", "block");
                setTimeout(function() {
                    $('#notification').fadeOut('fast');
                }, 10000);
            }
        });
    }
});

/**
 * TO close the notification new order notification
 */
$('#close_new_order_notification').click(function(){
    $('#notification').css("display", "none");
});
