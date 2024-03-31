$(document).on("click", "#add_sub_document", function() {
    const subDocumentHtml = `<div class="w-50 sub_document">
                                <div class="mr-4 d-flex align-items-center mb-4">
                                    <div class="w-100 mr-4">
                                        <label>Sub Document Name</label>
                                        <input type="text" class="form-control" placeholder="enter sub document name" name="sub_document_name[${subCount}]" value="" required>
                                    </div>
                                    <div class="mt-4 pt-1">
                                        <button type="button" class="form-control btn btn-danger" id="remove_sub_document">remove</button>
                                    </div>
                                </div>
                            </div>`;
    $(".append_sub_document").append(subDocumentHtml);
    subCount++
});

$(document).on("click","#remove_sub_document", function() {
    $(this).closest(".sub_document").remove()
})