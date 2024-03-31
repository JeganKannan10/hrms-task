$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
    }
});


$(document).ready(function () {
    const categoryId = $('#category-list-0').data('id');
    const keyword = ''
    $('#category-list-0').closest("div.category").addClass('background')
    categoryBasedProductList(categoryId, keyword);
    $('.category').on('click', function () {
        $('.category').removeClass('background')
        $(this).addClass('background')
        categoryBasedProductList($(this).data('id'), keyword);
    });
    $("#item_details").hide();
});



let variant_count = 2;
$(document).on("click", ".product", function () {
    $('.product').removeClass('background')
    $(this).addClass('background')
    getProductDetails($(this).data('id'))
});



$('.add_new_item').on('click', function () {
    $(`.variant_quantity, .variant_preparation, .variant_size,
        .variant_base, .variant_rice, .variant_make_own, .menu_error`).empty()
    $("#exist_product_details").hide();
    $("#item_details").show();
    $('.product').removeClass('background');
    $(".days").prop("disabled", false);
    $(".day-selection").show();
    $(".all-day-selection").hide();
    $(".image_text").css('display', 'block');
    $(".image_preview").css('display', 'none');
    variant_count = 2
});

$(document).on('change','#image', function(){
    readURL(this);
})


$(document).on('click', '.addon-edit', function () {
    editAddon($(this).data('id'));
});


$(document).on('keyup', '.before_item_price', function () {
    let mode = $(this).data('inclusive_exclusive_mode');

    let beforePrice = parseFloat($(this).val())
    let adminCommissionPrice = beforePrice * (parseFloat($(this).data('percentage')) / 100);

    let price = (mode == 'admin_commission') ? beforePrice + adminCommissionPrice : beforePrice;

    $(this).siblings(`.${mode}`).val(adminCommissionPrice);
    $(this).siblings(".item_price").val(price);
});

$(document).on("click", ".variant_modal", function () {
    let basicPrice = $(this).closest("div.store_form").find('#price').val()
    $('.basic_price').val(basicPrice)
    $('.final_price').each(function () {
        if ($(this).val() == 0) {
            $(this).val(basicPrice)
        }
    });
});



$(document).on("keyup", ".additional_price", function () {
    let basicPrice = $(this).closest("div.store_form").find('.item_price').val() || 0
    let additionalPrice = $(this).val() || 0

    let finalPrice = parseInt(basicPrice) + parseInt(additionalPrice)
    $(this).closest(".common_variant").find(".final_price").val(finalPrice);
});



$(document).on("keyup", ".description_count", function () {
    let count = ($(this).val()).length
    $(this).closest("div.textarea").find(".textarea_count_number").html(count + '/500')
})



$(document).on("keyup", ".item_name_input", function () {
    let count = ($(this).val()).length
    $(this).closest("div.input_name_div").find(".name_count").html(count + '/100')
})

$(document).on("keyup", ".category_name_input", function () {
    let count = ($(this).val()).length
    $(this).closest("div.category_name").find(".category_count").html(count + '/100')
})


$(document).on("keyup", ".before_item_price, .final_price_cal", function () {
    let pricingDetails = $(this).closest("div.pricing_details")
    let price = pricingDetails.find("#price").val() || 0
    let packagePrice = pricingDetails.find("#package_price").val() || 0
    let gst = pricingDetails.find("#gst").val() || 0
    let priceGst = (gst / 100) * price
    if(pricingDetails.find(".gst_status_check").is(':checked')){
        finalAmount = parseInt(price)  + parseInt(packagePrice)
    }else{
        finalAmount = parseInt(price) + parseInt(priceGst) + parseInt(packagePrice)        
    }
    pricingDetails.find(".final_amount").html(finalAmount)
})



$(document).on("click", ".gst_status_check", function () {
    let finalAmountInputs = $(this).closest("div.pricing_details").find(".final_amount_inputs");
    finalAmountInputs.html("")
    let pricingDetails = $(this).closest("div.pricing_details")
    let gst = pricingDetails.find("#gst").val() || 0
    let price = pricingDetails.find("#price").val() || 0
    let packagePrice = pricingDetails.find("#package_price").val() || 0
    let priceGst = (gst / 100) * price
    let finalAmount = 0;
    if ($(this).is(':checked')) {
        finalAmount = parseInt(price)  + parseInt(packagePrice)
        finalAmountInputs.html("Inclusive GST + Packaging")
    } else {
        finalAmount = parseInt(price) + parseInt(priceGst) + parseInt(packagePrice)        
        finalAmountInputs.html("Price + Packing + GST")
    }
    pricingDetails.find(".final_amount").html(finalAmount)
})



$(document).on("click", ".add_more_variant_option", function () {
    const variantType = $(this).data('id');
    const basicPrice = $(this).closest("div.store_form").find('#price').val()

    let html = $('#add_more_variant_option_click').html();

    const appendVariantHTML = html
        .replace(/{VARIANT_TYPE}/g, variantType)
        .replace(/{VARIANT_COUNT}/g, variant_count)
        .replace(/{BASIC_PRICE}/g, basicPrice);

    $(`.${variantType}`).append(appendVariantHTML);

    variant_count++
})



$(document).on("click", ".remove_variant", function () {
    $(this).closest('div.append_variant').remove();
});



$(document).on("click", ".custom-behaviour-type", function () {
    $(this).parent().find(`.custom-behaviour-type`).removeClass("clicked");

    const isMinimumLengthDisable = ($(this).val() === "OPTIONAL");
    $(this).closest('.custom-behaviour')
        .find('select.minimum-count-list')
        .prop("disabled", isMinimumLengthDisable);

    $(this).siblings(`#${$(this).data('id')}`).val($(this).val());
    $(this).addClass("clicked");
});



/**
 * Retrieves the product list based on the given category ID and updates the UI.
 *
 * @param {number} categoryId - The ID of the category.
 * @return {void} This function does not return any value.
 */
function categoryBasedProductList(categoryId, keyword) {
    $.ajax({
        type: 'POST',
        url: categoryBasedProductListRoute,
        data: {
            id: categoryId,
            keyword: keyword
        },
        success: function (response) {
            $('#productCount').text(response.data.productsCounts);
            $('.product-items-list').empty().append(response.data.view);

            if (response.data.productsCounts != 0) {
                let productId = $("#item-product-0").data('id');
                getProductDetails(productId)
            } else {
                $("#exist_product_form").empty()
            }
        },
    });
    $("#current_category_id").val(categoryId)
}



$(document).on("click", ".update-add-on", function () {
    if ($(this).parent().prev().find('.add-on-checked:checked').length > 0) {
        // Initialize empty arrays to store the values
        let checkboxValues = []; let titleValues = []; let priceValues = []; let foodType = [];

        $(this).parent().prev().find('.search-result-addon .price_view').each(function () {
            if ($(this).find('.add-on-checked:checked').length > 0) {
                checkboxValues.push($(this).find('.add-on-checked').val());
                titleValues.push($(this).find('.addon-title').val());
                priceValues.push($(this).find('.addon-price').val());
                foodType.push($(this).find('.add-on-checked').attr('data-type'));
            }
        });

        // Now, checkboxValues, titleValues, and priceValues arrays contain the values you need
        let addOptionsHtml = '';
        let type = $(this).parent().prev().find(".price_view").find("input[name=type]").val();

        for (let i = 0; i < checkboxValues.length; i++) {
            let html = $('#update-add-on-function').html();

            addOptionsHtml += html
                .replace(/{TITLE_VALUE}/g, titleValues[i])
                .replace(/{PRICE_VALUE}/g, priceValues[i])
                .replace(/{VALUE}/g, type)
                .replace(/{FOOD_TYPE}/g, foodType[i])
                .replace(/{CHECKBOX_VALUE}/g, checkboxValues[i]);
        }

        $(`.add-ons-option #${type}`).empty().append(addOptionsHtml);
        let len = $(`#${type}`).find('.search-result-addon').length;

        let options = '';
        let maximumcountoptions = (`<option value="${len}">All</option>`);
        for (let i = 1; i <= len; i++) {
            maximumcountoptions += (`<option value="${i}">${i}</option>`);
            options += (`<option value="${i}">${i}</option>`);
        }

        let model = $(this).attr('data-target');
        $(`${model}`).find('.custom-behaviour .minimum-count-list').empty().append(options);
        $(`${model}`).find('.custom-behaviour .maximum-count-list').empty().append(maximumcountoptions);
    }
});



$(document).on("click", ".remove-addon", function () {

    let removeAddOnId = $(this).data('id');

    $(`#remove-checked-add-on-${removeAddOnId}`).prop('checked', false);
    $(`#remove-checked-add-on-${removeAddOnId}`).attr('checked', false);

    let select = $(this).closest('.modal-body').find('.custom-behaviour select');
    let option = select.find('option:last-child');
    let maxCount = (option.val() - 1 > 0) ? option.val() - 1 : 0;

    if (select.hasClass('maximum-count-list')) {
        select.find('option:first-child').val(maxCount);
    }

    option.remove();
    $(this).closest('.search-result-addon').remove();

});



$(document).on("click", ".custom-card-addon", function () {
    const model = $(this).closest('.modal-body').find('.add-ons-option .row');
    const modeType = model.attr('id');
    const target = $(this).attr('data-target');
    let checkbox = $(target).find('input[name="add_on"][type="checkbox"]');
    let selectedOptions = [];

    model.find('.search-result-addon').each(function () {
        let option = $(this).find(`input[name="product[${modeType}][]"]`).val();
        selectedOptions.push(option);
    });

    checkbox.each(function () {
        let isChecked = ($.inArray($(this).val(), selectedOptions) !== -1);
        $(this).prop("checked", isChecked);
    });
});



$('.category-edit').on('click', function () {
    const categoryId = $(this).data('id');
    $.ajax({
        type: 'GET',
        url: vendorCategoryEditRoute.replace(':categoryId', categoryId),
        data: { id: categoryId },
        success: function (response) {
            let adminCategories = response.data.adminCategories;
            let adminCategoryId = response.data.category ? response.data.category.admin_category_id : '';
            let options = '';
            $.each(adminCategories, function (index, value) {
                let select = (value.admin_category_id == adminCategoryId) ? 'selected' : '';
                options += `<option value="${value.admin_category_id}" ${select}>${value.name}</option>`;
            });

            const html = $('#category-edit_click').html();

            const editCategoryHTML = html
                .replace(/{OPTIONS}/g, options)
                .replace(/{VENDOR_CATEGORY_STORE_ROUTE}/g, vendorCategoryStoreRoute)
                .replace(/{CATEGORY_NAME}/g, response.data.category.category_name ?? '')
                .replace(/{CATEGORY_ID}/g, response.data.category.category_id ?? '')
                .replace(/{CATEGORY_NAME_COUNT}/g, (response.data.category.category_name).length ?? '');
            $('.edit-category-item').empty().append(editCategoryHTML);
            $('#editCategory').modal('show');
        },
    });
});


/**
 * Edits the addon with the given addon ID.
 *
 * @param {number} addonId - The ID of the addon to be edited.
 * @return {undefined} This function does not return a value.
 */
function editAddon(addonId) {
    $.ajax({
        type: 'GET',
        url: vendorAddonEditRoute.replace(':addonId', addonId),
        data: {
            id: addonId
        },
        success: function (response) {
            $('.edit-addon-div').empty().append(response.data);
            $('#menuAddOn').modal('hide');
            $('#editAddOn').modal('show');
        }
    });
}



/**
 * Retrieves the details of a product using the provided productId.
 *
 * @param {number} productId - The ID of the product to retrieve details for.
 * @return {void} This function does not return a value.
 */
function getProductDetails(productId) {
    $.ajax({
        type: 'POST',
        url: getProductDetailsRoute,
        data: {
            id: productId
        },
        success: function (response) {
            $("#item_details").hide();
            $('#exist_product_details').show();
            $("#exist_product_form").empty().append(response.data);
        }
    });
}


$('.search-addon').on('keyup change', function () {
    openMenuAddons($(this).val());
});


/**
 * Fetches menu addons and opens the menu addon modal.
 *
 * @param {string} [name=$('.search-addon').val()] - The name of the addon (optional).
 */
function openMenuAddons(name = $('.search-addon').val()) {
    $('#menuAddOn').modal('show');

    $.ajax({
        type: 'GET',
        url: addonList,
        data: (name != null) ? { name: name } : {},
        success: function (response) {
            let element = $("#menuAddOn #menuAddonHtmlContent").html('');

            $.each(response.data, function (index, value) {
                let appendHtml = $('#getAddonHtmlContent').html()
                    .replace(/{FOOD_TYPE}/g, (value.food_type == 1) ? 'non-veg' : 'veg')
                    .replace(/{TITLE}/g, value.title)
                    .replace(/{PRICE}/g, value.price ?? '')
                    .replace(/:ADDON_ID/g, value.addon_id ?? '')
                    .replace(/{KEY}/g, index ?? '');

                element.append(appendHtml);
            });

            $("#menuAddOn #menuAddonHtmlContent").html(appendHtml);
        }
    });
}

$(document).on("click", ".product-submit", function () {
    const formData = new FormData($(this).closest('.product-form')[0]);
    console.log('formData', formData)
    $.ajax({
        type: "POST",
        url: productStoreForm,
        data: formData,
        processData: false,
        contentType: false,
        dataType: 'json',
        success: function(response) {
            console.log('success' , response)
            sessionStorage.setItem("success","Data stored successfully.");
            location.reload();
        },
        error: function(response) {
            let errors = response.responseJSON.errors;
            console.log('errors' , errors)
            $('.menu_error').html('')
            $.each(errors, function(key, value) {
                $(".common_error").html('Please fill all the required fields')
                let errorClass
                if(key.indexOf('.') !== -1) {
                    errorClass = $('[class^="'+key+'"]')
                }else {
                    errorClass = $('.'+key)
                }
                errorClass.html(value)
            });
        }
    });
});