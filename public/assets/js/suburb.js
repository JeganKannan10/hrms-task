$(document).on('change','#country', function(){
    csrfToken
    $.ajax({
        type: 'POST',
        url: countryBasedStateListUrl,
        data: {
            id: $(this).val(),
        },
        success: function (response) {
            console.log('country-based-state',response.data.states);
            $('#city').empty();
            $('#area').empty();
            $('#state_data').empty();
            $('#state_data').append(response.data.states);
        }
    });
})

$(document).on('change','#state', function(){
    csrfToken
    $.ajax({
        type: 'POST',
        url: stateBasedCityListUrl,
        data: {
            id: $(this).val(),
        },
        success: function (response) {
            console.log('state-based-city',response.data.cities);
            $('#area').empty();
            $('#city_data').empty();
            $('#city_data').append(response.data.cities);
        }
    });
})

$(document).on('change','#city', function(){
    csrfToken
    $.ajax({
        type: 'POST',
        url: cityBasedAreaListUrl,
        data: {
            id: $(this).val(),
        },
        success: function (response) {
            console.log('city-based-area',response.data.areas);
            $('#area_data').empty();
            $('#area_data').append(response.data.areas);
        }
    });
})