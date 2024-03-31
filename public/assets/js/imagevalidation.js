function validateForm(formId, ids) {
    var isValid = true;

    ids.forEach(function (id) {
        var imageSrc = $('#' + formId + ' .' + id + '_preview').attr('src');
        console.log(id, imageSrc);
       var formattedName = id.replace(/_/g, ' ').replace(/(?:^|\s)\S/g, match => match.toLowerCase());

        var parts = imageSrc.split('/');
        var lastPart = parts[parts.length - 1];
        console.log(lastPart);

        var inputField = $('#' + formId + ' [name="' + id + '"]');
        var errorMessage = 'The ' + formattedName + ' field is required.';

        // Find or create the error message span
        var errorMessageSpan = $('#' + formId + ' [data-error-for="' + id + '"]');
        if (errorMessageSpan.length === 0) {
            errorMessageSpan = $('<span class="error-message error" id="' + id + '_preview"  data-error-for="' + id + '"></span>');
            inputField.after(errorMessageSpan);
        }

        if (lastPart === 'placeholder.jpeg') {
            // Set the field as required
            inputField.prop('required', true);

            // Display the error message
            errorMessageSpan.text(errorMessage);

            // Mark the form as invalid
            isValid = false;
        } else {
            // Remove the required attribute
            inputField.removeAttr('required');

            // Clear the error message
            errorMessageSpan.text('');
        }
    });

    return isValid;
}
