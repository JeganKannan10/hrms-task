function addDataTable(tableId) {
    $('#' + tableId).DataTable({
        "processing": true,
        "serverSide": true,
        "ordering": false,
        "destroy": true,
        "stripeClasses": [],
        "lengthMenu": [10, 25, 50, 100],
        "pageLength": 10,
        "searching": true, // Enable searching
            "ajax": {
            "url": url, // This route should return JSON data for the table
            "type": "GET"
        },
        "columns": columns,
        "fnRowCallback": function (nRow, aData, iDisplayIndex) {
            $("td:nth-child(1)", nRow).html(iDisplayIndex + 1);
            return nRow;
        }
    });
}

/**
 * Initializes a DataTable with specified options on the given selector.
 *
 * @param {string} selector - The CSS selector of the element to initialize the DataTable on.
 * @param {boolean} [ordering=true] - Whether to enable sorting of the table columns.
 * @param {boolean} [searching=true] - Whether to enable searching within the table.
 * @param {number} [pageLength=10] - The initial number of rows to display per page.
 * @param {number[]} [lengthMenu=[10, 25, 50, 100]] - The options for the number of rows to display per page.
 */
function useDataTable(
        selector,
        ordering = true,
        searching = true,
        pageLength = 10,
        bLengthChange = true,
        lengthMenu = [10, 25, 50, 100]
    ) {

    return $(selector).DataTable({
        "ordering": ordering,
        "lengthMenu": lengthMenu,
        "pageLength": pageLength,
        "searching": searching,
        "bLengthChange": bLengthChange
    });
}

function initDataTable(selector, url, columns) {
    $(selector).DataTable({
        "processing": true,
        "serverSide": true,
        "ordering": false,
        "destroy": true,
        "stripeClasses": [],
        "lengthMenu": [10, 25, 50, 100],
        "pageLength": 10,
        "searching": true, // Enable searching
            "ajax": {
            "url": url, // This route should return JSON data for the table
            "type": "GET"
        },
        "columns": columns,
        "fnRowCallback": function (nRow, aData, iDisplayIndex) {
            $("td:nth-child(1)", nRow).html(iDisplayIndex + 1);
            return nRow;
        }
    });
}
