$(document).on('change','#service', function(){
    let serviceName = $(this).find(":selected").data('name')
    if(serviceName != 'food') {
        $("#product_type").val(null)
        $("#cuisine").val(null)
        $("#cost_for_two").val('')
        $("#food_service").hide()
        $("#cost_for_two_div").hide()
    }else {
        $("#food_service").show()
        $("#cost_for_two_div").show()
    }
})

$("#image").change(function() {
    readURL(this);
});