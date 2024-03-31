$(document).ready(function() {
    $("#vendor").hide()
})
$(document).on('change','#delivery_type', function(){
    if($("#delivery_type").val() == 2) {
        $(".vendor").show()
    }else {
        $(".vendor").hide()
    }
})

$('.rider-store').submit(function(e){
    console.log('riderId :' , riderId)
    if(riderId != '') {
        return
    }

    $(".document-common-error").html('')
    let error = 0
    $(".document-common-div").find('input:file').each(function(e){	
        if(this.value == '') {
            error = 1
            let html = `<p class="text-danger mt-3">Please fill the  ${$(this).data('name')} field</p>`
            $(".document-common-error").append(html)
        }

        if($(this).closest('.document-collapse').find('.sub-document-div').length > 0  && $(this).closest('.document-collapse').find("input[type='radio']:checked").length == 0) {
            let documentId = $(this).data('id')
            let documentName = $(this).closest('.document-collapse').find('.sub-document-div').data('name')
            if ($(".document-common-error").find("."+documentId).length == 0){
                let html = `<p class="text-danger mt-3 ${documentId} ">Please choose ${documentName} document type</p>`
                $('.document-common-error').append(html)
                error = 1
            }
        }
    });

    if(error == 1) {
        e.preventDefault();
    }
})