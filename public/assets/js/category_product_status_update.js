$(document).ready(function () {
    const categoryId = $('#category-list-0').data('id');
    $('#category-list-0').closest("div.category").addClass('background')
    const keyword = ''
    categoryBasedProductList(categoryId, keyword);
    $(document).on('click','.category', function(){
        const categoryId = $(this).data('id');
        $('.category').removeClass('background')
        $(this).addClass('background')
        categoryBasedProductList(categoryId, keyword);
    })
});

/**
 * category based product list
 * @param {*} categoryId
 * @param {*} keyword
 */

function categoryBasedProductList(categoryId, keyword) {
        csrfToken;
        $.ajax({
            type: 'POST',
            url: categoryBasedProductListUrl,
            data: {
                id: categoryId,
                keyword: keyword
            },
            success: function (response) {
                console.log('response', response);

                $('#productCount').text(response.data.productsCounts);
                $('.product-items-list').empty();
                response.data.products.forEach(function (product) {
                const productHTML = `<div class="list-view">
                                        <div class="category_split">
                                            <div>
                                                <img src="${product.is_veg ? '/assets/img/non-veg.png' : '/assets/img/veg.png'}" alt="">
                                            </div>
                                            <div>
                                                <h3>${product.name}</h3>
                                                <h3><i class="bi bi-currency-rupee"></i>${product.price}</h3>
                                            </div>
                                        </div>
                                        <div>
                                            <label class="switch s-success mr-2">
                                                <input type="checkbox" class="product-checkbox" data-id="${product.product_id}" ${product.status == 1 ? 'checked' : ''}>
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                    </div>`;

                $('.product-items-list').append(productHTML);
                });
            },
        });
}

// category status update
$(document).on('change','.category-checkbox', function(){
    const isChecked = $(this).prop('checked');
    const categoryId = $(this).data('id');
    csrfToken;
    $.ajax({
        type: 'POST',
        url: updateCategoryStatusUrl,
        data: {
            id: categoryId,
            status: isChecked ? 1 : 0
        },
        success: function (response) {
            console.log('category-checkbox-success',response);
        },
    });
});

// product status update
$(document).on('change','.product-checkbox',function () {
    const isChecked = $(this).prop('checked');
    const productId = $(this).data('id');
    csrfToken;
    $.ajax({
        type: 'POST',
        url: updateProductStatusUrl,
        data: {
            id: productId,
            status: isChecked ? 1 : 0
        },
        success: function (response) {
            console.log('product-checkbox-success',response);
        },
    });
});

// addon status update
$(document).on('change','.addon-checkbox',function () {
    const isChecked = $(this).prop('checked');
    const addonId = $(this).data('id');
    csrfToken;
    $.ajax({
        type: 'POST',
        url: updateAddonStatusUrl,
        data: {
            id: addonId,
            status: isChecked ? 1 : 0
        },
        success: function (response) {
            console.log('addon-checkbox-success',response);
        },
    });
});

// search category and item
function searchMenu(val) {
    let keyword = $("#search").val()
    $.ajax({
        type: 'POST',
        url: searchMenuUrl,
        data: {
            keyword: keyword,
            type: val
        },
        success: function (response) {
            $(".category-content").empty()
            $(".append_search_category").empty().append(response.data)
            $("#item_details").hide();
            if(response.data != 0) {
                let categoryId = $("#category-list-0").data('id');
                $('#category-list-0').closest("div.category").addClass('background')
                categoryBasedProductList(categoryId, keyword);
            }else {
                $("#exist_product_form").empty()
            }
        },
    });
}
