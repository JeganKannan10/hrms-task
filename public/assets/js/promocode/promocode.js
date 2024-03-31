$(document).ready(function(e) {
    if ($("#offer_type").val() == '0') {
        $(".percentage").show();
    } else {
        $(".percentage").hide();
        $("#max_amount").val('');
    }

    $("#offer_type").change(function() {
        if ($(this).val() == '0') {
            $(".percentage").show();
        } else {
            $(".percentage").hide();
            $("#max_amount").val('');
        }
    });

});
$(document).ready(function () {
    var select = $('#vendor-select').select2();
        // Listen for changes to the Select2 dropdown
        select.on("select2:select", function (e) {
        if (e.params.data.id === '0') {
            // If "All" is selected, select all other options
            select.find('option').not(':selected').prop('selected', true);
            select.trigger('change');
        }
    });

    select.on("select2:unselect", function (e) {
        if (e.params.data.id === '0') {
            // If "All" is unselected, deselect all options except "All"
            select.find('option:selected').prop('selected', false);
            select.trigger('change');
        }else{
            select.find("option[value='0']").prop('selected', false);
            select.trigger('change');
        }
    });
});