let map; // Declare map globally
const markers = []; // Declare an array to store rider markers
let directionsDisplay; // Declare a variable for directions display
const allRiders = {
    free: [],
    busy: [],
    offline: [],
};

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 11.043016994984484, lng: 76.98553954118326 },
        zoom: 2
    });

    directionsDisplay = new google.maps.DirectionsRenderer({
        polylineOptions: {
            strokeColor: 'green',
            strokeOpacity: 0.7,
            strokeWeight: 5
        }
    });
}


function renderRiders(data, type) {
    if (data.length === 0) {
        return `<div class='no-driver'> No drivers Available.</div>`;
    }
    let html = '';
    data.forEach((rider) => {
        let order = rider.order && rider.order[0];
        let deliveryAddress = order ? order.delivery_address : '';
        let destinationLat = order ? order.lat_lng.latitude : '';
        let destinationLong = order ? order.lat_lng.longitude : '';

        html += `<div class="rider" data-is-available="${type}" data-rider_id="${rider.rider_id}" data-name="${rider.name}"
                        data-lat="${rider.lat_lng.latitude}" data-lng="${rider.lat_lng.longitude}"
                        data-destination-location="${deliveryAddress}"
                        data-destination-lat="${destinationLat}" data-destination-lng="${destinationLong}"
                    >
                    <div class="rider-info">
                        <a>${rider.name}</a><br>
                        <a>${rider.phone_number}</a>
                    </div>
                </div>`;
    });
    return html;
}

let progressingSearch = false;

$("#rider_name_search").on("input", function () {
    const searchValue = $(this).val(); // Keep the search input as is
    if (progressingSearch == false) {
        searchRider(searchValue);
    }
});
function searchRider(searchValue) {
    progressingSearch = true;
    let type = $("button.riderAvailablity.active").data("id");
    if (type == undefined) {
        type = 1;
    }
    const riderType = (type === 1) ? 'free' : (type === 2) ? 'busy' : (type === 3) ? 'offline' : '';

    const filteredRiders = allRiders[riderType].filter(rider => {
        const nameMatch = new RegExp(searchValue, 'i').test(rider.name);
        const phoneMatch = new RegExp(searchValue, 'i').test(rider.phone_number);

        // Check if either the name or phone_number matches the search value (case-insensitive)
        return nameMatch || phoneMatch;
    });

    const html = renderRiders(filteredRiders);
    $('.show').html(html);
    progressingSearch = false;
}

function clearDirections() {
    directionsDisplay.setMap(null);
}

function clearMarkers() {
    markers.forEach(marker => marker.setMap(null));
    markers.length = 0;
}

function drawRoute(start, end) {
    const directionsService = new google.maps.DirectionsService();
    directionsDisplay.setMap(map);

    const request = {
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
    };
    
    directionsService.route(request, function (response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        }
    });
}

$(document).ready(function () {
    let currentDataType = 1;
    fetchRiderAvailability(currentDataType);

    $(".riderAvailablity").on("click", function () {
        $(".riderAvailablity").removeClass("active");
        $(this).addClass("active");
        const type = $(this).data("id");
        fetchRiderAvailability(type);
    });

    $(document).on("click", ".rider", function () {
        $(".rider").removeClass("selected-rider");

        $(this).addClass("selected-rider");

        updateRiderPosition();
    });

    setInterval(() => getRider(), 1000);

    /**
     * Retrieves the selected rider details and updates the position if it has changed.
     *
     * @return {boolean} false if no rider is selected, otherwise undefined
     */
    function getRider() {
        const selectedRider = $('#rider_details_card .selected-rider');

        if (selectedRider.length == 0) {
            return false;
        }

        fetch(getRiderRoute(selectedRider.data('rider_id')))
            .then(response => response.json())
            .then(data => {
                const {latitude, longitude} = data.data.lat_lng;

                if (latitude == selectedRider.data('lat') && longitude == selectedRider.data('lng')) {
                    throw new Error('Rider position has not changed.');
                }

                selectedRider.data('lat', latitude);
                selectedRider.data('lng', longitude);
            })
            .then(() => updateRiderPosition())
            .catch(error => console.log(error));
    }

    /**
     * Updates the rider's position on the map and displays rider information.
     */
    function updateRiderPosition() {
        const selectedRider = $('#rider_details_card .selected-rider');

        const riderName = selectedRider.data("name");
        const riderLat = parseFloat(selectedRider.data("lat"));
        const riderLng = parseFloat(selectedRider.data("lng"));
        const riderIsAvailable = selectedRider.data("is-available");
        const destinationLat = parseFloat(selectedRider.data("destination-lat"));
        const destinationLng = parseFloat(selectedRider.data("destination-lng"));

        clearDirections();
        clearMarkers();

        const riderCoordinate = { lat: riderLat, lng: riderLng };
        const riderMarker = new google.maps.Marker({
            position: riderCoordinate,
            map: map,
            title: riderName
        });
        markers.push(riderMarker);

        map.setCenter(riderCoordinate);
        map.setZoom(14);

        if (riderIsAvailable === 2) {
            const destinationCoordinate = { lat: destinationLat, lng: destinationLng };
            drawRoute(riderCoordinate, destinationCoordinate);

            clearMarkers();
        }

        const riderInfoWindow = new google.maps.InfoWindow({
            content: `
                    <div>
                        <strong>Rider Name: </strong>${riderName}<br>
                    </div>
                `,
        });

        riderInfoWindow.open(map, riderMarker);
    }
});
