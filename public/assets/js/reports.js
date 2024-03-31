$(document).on('change','#vendor', function(){
    $.ajax({
        type: 'GET',
        url: vendorBasedVendorBranchListUrl+'?vendor_id='+$(this).val(),
        success: function (response) {
            $('#vendor_branch').empty();
            $('#vendor_branch').append(response.data.vendorBranch);
        },
        error: function (response) {
            console.log('vendor-branch-error :',response);
        }
    });
})