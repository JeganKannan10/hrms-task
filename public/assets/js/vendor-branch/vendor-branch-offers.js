$(document).ready(function(e) {
    
    function toggleOfferFields() {
        if ($("#offer_type").val() == '1') {
            $(".percentage").hide();
            $(".flat_amount").show();
            $("#percentage_value").val('');
            $("#percentage_maximum_discount_amount").val('');
        } else {
            $(".percentage").show();
            $(".flat_amount").hide();
            $("#flat_amount").val('');
        }
    }
    
    // Call the function initially
    toggleOfferFields();
    
    // Bind the function to the change event of #offer_type
    $("#offer_type").change(toggleOfferFields);
    
    $('#status').change(function() {
        var statusValue = $(this).is(':checked') ? 1 : 0;
        $('#status-hidden').val(statusValue);
        $.ajax({
            type: 'POST',
            url: vendorOfferStatus,
            data: {
                status: statusValue
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function(response) {
                console.log(response);
                $('#vendor_branch').load(location.href + ' #vendor_branch');
            },
            error: function(xhr, status, error) {
                // Handle errors if the request fails
                console.error(xhr.responseText); // Log the full error details to the console
                alert('Error: ' + xhr.status + ' ' + xhr.statusText); // Show a generic error message to the user
            }
        });
    });      
});


