$(document).ready(function() {
    var offerTypeSelect = $('#offer_type');
    var flatOfferAmount = $("#flat_offer_amount");
    var minimumPercentage = $("#minimum_percentage");
    var maximumPercentage = $("#maximum_percentage");

    function updateVisibility() {
        var offer_type = offerTypeSelect.val();
        flatOfferAmount.toggle(offer_type == 1);
        minimumPercentage.toggle(offer_type == 0);
        maximumPercentage.toggle(offer_type == 0);
    }

    // Initial visibility setup
    updateVisibility();

    // Handle the change event
    offerTypeSelect.on("change", updateVisibility);
});
