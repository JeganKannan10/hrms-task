$('.rider-list-status-change').click(function(){
    $('.rider-list-status-change').addClass('btn-outline-success').removeClass('btn-success');
    $(this).addClass('btn-success');
    $('#rider-filter-type').val($(this).data('type'));
    url = riderInactiveUrl.replace(/:RIDERSTATUS/g, $(this).data('type'));
    addDataTable('rider_table_pagination');       
});