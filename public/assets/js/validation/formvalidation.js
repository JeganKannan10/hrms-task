function Validate(formId,validationRules,validationMessages){
    $('#' + formId).validate({
        rules: validationRules,
        messages: validationMessages,
    });
}

function formValidate(formId, textValidation) {
    var validationRules = {};
    var validationMessages = {};

    textValidation.forEach(function (field) {
        validationRules[field] = {
            required: true,
        };
        validationMessages[field] = {
            required: "Please enter a valid " + field,
        };
    });
    Validate(formId,validationRules,validationMessages);
}

function numberValidate(formId, numberValidation) {
    var validationRules = {};
    var validationMessages = {};

    numberValidation.forEach(function (numberField) {
        validationRules[numberField] = {
            required: true,
            pattern: /^\d*\.?\d*$/,
        };
        validationMessages[numberField] = {
            required: "Please enter a valid " + numberField,
            pattern: "Please enter a valid number for " + numberField,
        };
    });
    Validate(formId, validationRules, validationMessages);
}