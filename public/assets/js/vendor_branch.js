        timePicket(0)
        function timePicket(dayCount) {
            flatpickr(document.getElementsByClassName('timeFlatpickr-'+dayCount), {
                enableTime: true,
                noCalendar: true,
                dateFormat: "H:i",
            });
        }
        $(document).on("click", "#headingOnenine", function () {
            timePicket(0);
        });

        $(document).on("click", ".add_day", function () {
            $html_timing_ = `<div class="form-row mb-4 new_days">
                                <div class="col">
                                    <select class="form-control basic" name="select_days[${dayCount}][day]" required>
                                        <option value="sunday">Sunday</option>
                                        <option value="monday">Monday</option>
                                        <option value="tuesday">Tuesday</option>
                                        <option value="wednesday">WednesDay</option>
                                        <option value="thursday">Thursday</option>
                                        <option value="friday">Friday</option>
                                        <option value="saturday">Saturday</option>
                                    </select>
                                </div>
                                <div class="col">
                                    <input class="timeFlatpickr-${dayCount} form-control flatpickr flatpickr-input active" name="select_days[${dayCount}][start_at]" type="text" placeholder="Select Time.." readonly="readonly">
                                </div>
                                <div class="col">
                                    <input class="timeFlatpickr-${dayCount} form-control flatpickr flatpickr-input active" name="select_days[${dayCount}][end_at]" type="text" placeholder="Select Time.." readonly="readonly">
                                </div>
                                <div class="col d-flex flex-column justify-content-end m-auto">
                                    <button type="button" class="mb-4 btn btn-danger w-50 mb-0 mx-auto remove_day">Remove</button>
                                </div>
                            </div>`;
            $(".append_days").append($html_timing_);
            timePicket(dayCount)
            $(".basic").select2({
                tags: false,
            });
            dayCount++
        });
        $(document).on("click", ".remove_day", function () {
            $(this).closest('div.new_days').remove();
        });

        // Packaging charge
        $(document).on("click", "#packaging_charge_mode", function () {
            if($('#packaging_charge_mode').is(":checked")) {
                $("#packaging_charge_mode").val(true)
            }else {
                $("#packaging_charge_mode").val(false)
            }
        });

        // Delivery charge
        $(document).on("click", "#delivery_charge_mode", function () {
            if($('#delivery_charge_mode').is(":checked")) {
                $("#delivery_charge_mode").val(true)
                $(".delivery_charge_append").show()
                $deliveryCharge = `<div class="form-row mb-4">
                                        <div class="col">
                                            <label for="exampleFormControlInput1">Delivery Charge <span class="d-block"> Base Distance</span></label>
                                            <input type="number" name="delivery_charge_base_distance" value="" class="form-control" placeholder="enter delivery charge base distance" required>
                                        </div>
                                        <div class="col">
                                            <label for="exampleFormControlInput1">Delivery Charge  <span class="d-block"> Base Price </span> </label>
                                            <input type="number" name="delivery_charge_base_price" value="" class="form-control" placeholder="enter delivery charge base price">
                                        </div>
                                        <div class="col">
                                            <label for="exampleFormControlInput1">Delivery Charge  <span class="d-block"> Extra Price Per KM </span> </label>
                                            <input type="number" name="delivery_charge_extra_price_per_km" value="" class="form-control" placeholder="enter delivery charge extra price per km">
                                        </div>
                                        <div class="col">
                                            <div class="d-flex flex-column justify-content-end m-auto">
                                                <button type="button" class="mb-4 btn btn-primary w-50 mb-0 mx-auto add_delivery_charge">Add +</button>
                                            </div>
                                        </div>
                                    </div>`;
                $(".delivery_charge_append").append($deliveryCharge);
                $(".delivery_charge_extra").show()
            }else {
                $("#delivery_charge_mode").val(false)
                $(".delivery_charge_append").empty();
                $(".delivery_charge_extra").hide();
            }
        });

        $(document).on("click",".add_delivery_charge", function () {
            $(".delivery_charge_extra").show()
            $deliveryChargeExtra = `<div class="form-row mb-4 remove_extra_delivery_charge">
                                        <div class="col">
                                            <label for="exampleFormControlInput1">Minimum Distance</label>
                                            <input type="number" name="add_extra_delivery_charge[${addDeliveryChargeCOunt}][min_distance]" value="" class="form-control" placeholder="enter minimum distance">
                                        </div>
                                        <div class="col">
                                            <label for="exampleFormControlInput1">Maximum Distance</label>
                                            <input type="number" name="add_extra_delivery_charge[${addDeliveryChargeCOunt}][max_distance]" value="" class="form-control" placeholder="enter maximum distance">
                                        </div>
                                        <div class="col">
                                            <label for="exampleFormControlInput1">Delivery Charge</label>
                                            <input type="number" name="add_extra_delivery_charge[${addDeliveryChargeCOunt}][price]" value="" class="form-control" placeholder="enter price">
                                        </div>
                                        <div class="col">
                                            <div class="d-flex flex-column justify-content-end m-auto">
                                                <button type="button" class="mb-4 btn btn-danger w-50 mb-0 mx-auto remove_delivery_charge_extra">Remove</button>
                                            </div>
                                        </div>
                                    </div>`;
            $(".delivery_charge_extra").append($deliveryChargeExtra);
            addDeliveryChargeCOunt++
        });
        $(document).on("click", ".remove_delivery_charge_extra", function () {
            $(this).closest('div.remove_extra_delivery_charge').remove();
        });



        // Rider commission
        $(document).on("click", "#rider_commission_mode", function () {
            if($('#rider_commission_mode').is(":checked")) {
                $("#rider_commission_mode").val(true)
                $(".rider_commission_append").show()
                $deliveryCharge = `<div class="form-row mb-4">
                                        <div class="col">
                                            <label for="exampleFormControlInput1">Driver Commission  <span class="d-block"> Base Distance </span></label>
                                            <input type="number" name="rider_commission_base_distance" value="" class="form-control" placeholder="enter rider commission base distance" required>
                                        </div>
                                        <div class="col">
                                            <label for="exampleFormControlInput1">Driver Commission  <span class="d-block"> Base Price </span></label>
                                            <input type="number" name="rider_commission_base_price" value="" class="form-control" placeholder="enter rider commission base price">
                                        </div>
                                        <div class="col">
                                            <label for="exampleFormControlInput1">Driver Commission  <span class="d-block"> Extra Price Per KM</span></label>
                                            <input type="number" name="rider_commission_extra_price_per_km" value="" class="form-control" placeholder="enter rider commission extra price per km">
                                        </div>
                                        <div class="col">
                                            <div class="d-flex flex-column justify-content-end m-auto">
                                                <button type="button" class="mb-4 btn btn-primary w-50 mb-0 mx-auto add_rider_commission">Add +</button>
                                            </div>
                                        </div>
                                    </div>`;
                $(".rider_commission_append").append($deliveryCharge);
                $(".rider_commission_extra").show()
            }else {
                $("#rider_commission_mode").val(false)
                $(".rider_commission_append").empty();
                $(".rider_commission_extra").hide();
            }
        });

        $(document).on("click",".add_rider_commission", function () {
            $(".rider_commission_extra").show()
            $deliveryChargeExtra = `<div class="form-row mb-4 remove_extra_rider_commission">
                                        <div class="col">
                                            <label for="exampleFormControlInput1">Minimum Distance</label>
                                            <input type="number" name="add_extra_rider_commission[${addRiderCommissionCount}][min_distance]" value="" class="form-control" placeholder="enter minimum distance">
                                        </div>
                                        <div class="col">
                                            <label for="exampleFormControlInput1">Maximum Distance</label>
                                            <input type="number" name="add_extra_rider_commission[${addRiderCommissionCount}][max_distance]" value="" class="form-control" placeholder="enter maximum distance">
                                        </div>
                                        <div class="col">
                                            <label for="exampleFormControlInput1">Rider Commission Charge</label>
                                            <input type="number" name="add_extra_rider_commission[${addRiderCommissionCount}][price]" value="" class="form-control" placeholder="enter price">
                                        </div>
                                        <div class="col">
                                            <div class="d-flex flex-column justify-content-end m-auto">
                                                <button type="button" class="mb-4 btn btn-danger w-50 mb-0 mx-auto remove_rider_commission_extra">Remove</button>
                                            </div>
                                        </div>
                                    </div>`;
            $(".rider_commission_extra").append($deliveryChargeExtra);
            addRiderCommissionCount++
        });
        $(document).on("click", ".remove_rider_commission_extra", function () {
            $(this).closest('div.remove_extra_rider_commission').remove();
        });


        // Admin commission
        $(document).on("click", "#admin_commission_mode", function () {
            if($('#admin_commission_mode').is(":checked")) {
                $("#admin_commission_mode").val(true)
                $(".admin_commission_append").show()
                $deliveryCharge = `<div class="form-row mb-4">
                                        <div class="col">
                                            <label for="exampleFormControlInput1">Admin Commission (%)</label>
                                            <input type="number" name="admin_commission" value="" class="form-control" placeholder="enter admin commission">
                                        </div>
                                    </div>`;
                $(".admin_commission_append").append($deliveryCharge);
            }else {
                $("#admin_commission_mode").val(false)
                $(".admin_commission_append").empty();
            }
        });

        $(document).on('click', '.show-all-day-timing-edit', function() {
            if($('#allDaysCheckbox-1').prop('checked'))
            {
                $('#allDaysCheckbox-2').empty();
                let key = 1;
                toggleIndividualDays(key);

            } else {
                $('#allDaysCheckbox-2').empty();
                let key = 2;
                toggleIndividualDays(key);
            }
        });
        $(document).on('click', '.show-all-day-timing-add', function() {
                $('#allDaysCheckbox-1').empty();
                let key = 2;
                toggleIndividualDays(key);
        });

    // Function to toggle visibility of individual day selection
        function toggleIndividualDays(key) {
            let allDaysCheckbox = (key != null) ? $("#allDaysCheckbox-" + key) : $("#allDaysCheckbox");
            let daySelection = $(".day-selection");
            let allDaySelection = $(".all-day-selection");

            if (allDaysCheckbox.prop("checked")) {
                daySelection.hide();
                allDaySelection.show();
                $(".days").prop("disabled", true);
                $(".allday").prop("disabled", false);
            } else {
                daySelection.show();
                allDaySelection.hide();
                $(".days").prop("disabled", false);
                $(".allday").prop("disabled", true);
            }
        }

    // Attach event handler to checkbox

        $(document).on("change", ".allDaysCheckbox", function () {
            let edit = $(this).data('id');
            toggleIndividualDays(edit);
        });
