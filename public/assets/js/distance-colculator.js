let route, currentLatitude, currentLongitude = '';

/**
 * Retrieves a list of riders for a given order ID.
 * @param {string} orderId - The ID of the order.
 */
function getRiders(orderId) {
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    let columns = [
        { "data": null },
        { "data": "first_name" ,
            "render": function(data, type, row) {
                return row.first_name + ' ' + row.last_name;
            }
        },
        { "data": "phone_number" },
        { "data": "distance" },
        {
            "data": "rider_id",
            "render": function(data, type, row) {
                return `
                <div class="organize">
                    <div>
                        <form action="${riderRoutes(orderId)}" method="post">
                            <input type="hidden" name="_token" value="${csrfToken}" autocomplete="off">
                            <input type="hidden" name="_method" value="PUT">

                            <input type="hidden" name="rider_id" value="${row.rider_id}">

                            <button type="submit" class="btn btn-primary">Assign Rider</button>
                        </form>
                    </div>
                </div>`;
            }
        },
    ];
    initDataTable('#riders', nearbyRiderRoute(orderId), columns);
    $('#assignRiderModel').modal('show');
}


/**
 * Updates the order status and performs additional actions if specified.
 *
 * @param {string} model - The selector of the model to update.
 * @param {string} action - The action to be performed on the order.
 * @param {object|null} options - The current status of the order (optional, defaults to null).
 * @param {number|null} longitude - The longitude coordinate (optional, defaults to null).
 *                                  || If click view button it hide select tag from model
 * @param {number|null} latitude - The latitude coordinate (optional, defaults to null).
 */
function updateOrderStatus(model, action, options = null, longitude = null, latitude = null) {
    $(`${model} form`).attr('action', action);
    $(`${model}`).modal('show');

    if (options) {
        if (options.status) {
            $(`${model} form select[name='status']`).val(options.status);
        }

        for (let key in options) {
            if (options.hasOwnProperty(key) && typeof options[key] === 'object') {
                updateDetails(options[key], key);
            }
        }

        if (longitude) {
            $(`${model} form`).find('.selectElement, button[type=submit]').hide();
        }

        disableSubmitButton(model, options);
    }

    if (longitude && latitude) {
        route = action;
        currentLatitude = latitude;
        currentLongitude = longitude;
        updateDistance(latitude, longitude);
    }
}

/**
 * Updates the details of a given data object.
 *
 * @param {object} data - The data object containing the details to be updated.
 * @param {string} type - The type of details to be updated.
 *
 * @return {void} - This function does not return a value.
 */
function updateDetails(data, type) {
    if (Array.isArray(data)) {
        $(`.${type}Details:not(:first)`).remove();
        $(`.${type}Details`).find('span').text('');

        let loopCount = 0;
        data.forEach((item) => {
            loopCount++;

            if (loopCount < data.length) {
                let clonedElement = $(`.${type}Details:first`).clone();
                $(`#${type}Details`).append(clonedElement);
            }

            Object.entries(item).forEach(([key, value]) => {
                $(`.${type}Details`).eq(loopCount - 1).find(`.${type}_${key}`).text(value);
            });
        });
    } else {
        $(`#${type}Details`).find('span').text('');
        Object.entries(data).forEach(([key, value]) => {
            value = updateValue(type, key, value);
            $(`#${type}Details .${type}_${key}`).text(value);
        });
    }
}

/**
 * Updates the value based on the given type, key, and value.
 *
 * @param {string} type - The type of value being updated.
 * @param {string} key - The key of the value being updated.
 * @param {any} value - The new value to be assigned.
 *
 * @return {string} The updated value.
 */
function updateValue(type, key, value) {
    if (type == 'rider' && key == 'delivery_type' &&  value == 1) {
        value = 'Admin';
    } else if (type == 'rider' && key == 'delivery_type' &&  value == 2) {
        value = 'Vendor Branch';
    }

    return value;
}

$('#riders').on('page.dt', function () {
    updateDistance(currentLatitude, currentLongitude);
});

$(document).on('click','#filter_submit', function(){
    let date = $(".select_date").val()
    let type = $("#delivery_type").val()
    let url = base_path+"/vendor-branch/order-managements/food_delivered/status"
    if(date != '' && type != null) {
        url += "?date="+date+"&type="+type
    }else if(date != ''){
        url += "?date="+date
    }else if(type != null){
        url += "?type="+type
    }
    window.location.href = url;
})

/**
 * Updates the distance values in the HTML table based on the provided model, latitude, and longitude.
 *
 * @param {number} latitude - The latitude of the reference point.
 * @param {number} longitude - The longitude of the reference point.
 */
function updateDistance(latitude, longitude) {
    table.rows({ page: 'current' }).every(function (rowIdx, tableLoop, rowLoop) {
        let cellInputData = table.cell({ row: rowIdx, column: 2 }).data();
        let html = $(`<div>${cellInputData}</div>`);
        let longitude2 = html.find('input[name="longitude"]').val();
        let latitude2 = html.find('input[name="latitude"]').val();

        let distance = calculateDistance(latitude, longitude, latitude2, longitude2);

        let cell = table.cell({ row: rowIdx, column: 3 });
        let cellData = cell.data();

        if (cellData.includes('<span class="distance">')) {
            cell.data(`<span class="distance">${distance}</span>`);
        }
    });
}


/**
 * Calculates the distance between two points on the Earth's surface.
 *
 * @param {number} lat1 - The latitude of the first point.
 * @param {number} lon1 - The longitude of the first point.
 * @param {number} lat2 - The latitude of the second point.
 * @param {number} lon2 - The longitude of the second point.
 *
 * @return {number} The distance between the two points in kilometers.
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
    let earthRadius = 6371;
    let dLat = deg2rad(lat2 - lat1);
    let dLon = deg2rad(lon2 - lon1);

    let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = earthRadius * c; // Distance in kilometers
    return Math.round(distance * 100) / 100 + ' KM';
}


/**
 * Converts degrees to radians.
 *
 * @param {number} deg - The degree value to be converted.
 *
 * @return {number} The equivalent value in radians.
 */
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

/**
 * Disables the submit button based on rider object length.
 *
 * @param {string} model - The model selector.
 * @param {object} options - The options object.
 */
function disableSubmitButton(model, options) {
    if ([1, 2].includes(options.status)) {
        const isRiderEmpty = (typeof options.rider === 'undefined') || (Object.keys(options.rider).length === 0);

        let submitButton = $(`${model}`).find('button[type=submit]');
        submitButton.attr('title', isRiderEmpty ? 'Please select a rider' : '');
        submitButton.prop('disabled', isRiderEmpty);
    }
}
