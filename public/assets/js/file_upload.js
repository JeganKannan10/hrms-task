$(document).ready(function() {
    App.init();

    const fileInput = document.querySelectorAll('[data-upload-id]');
    fileInput.forEach((input) => {
        const uploadId = input.getAttribute('data-upload-id');
        new FileUploadWithPreview(uploadId);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const fileInputs = document.querySelectorAll('.imagenew');
    const previewContainers = document.querySelectorAll('.show_image');

    fileInputs.forEach(function(fileInput, index) {
        fileInput.addEventListener('change', function () {
            const previewContainer = previewContainers[index];

            if (fileInput.files && fileInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    previewContainer.style.backgroundImage = `url(${e.target.result})`;
                };
                reader.readAsDataURL(fileInput.files[0]);
            }
        });
    });
});


/**
 * Reads the URL of an input file and displays the preview of the selected image or background.
 * Ex: readURL(this, 'background');
 *
 * @param {Object} input - The input element that triggers the file selection.
 * @param {string} [element='image'] - The type of element to preview. Can be 'image' or 'background'.
 * @return {void} This function does not return a value.
 */
function readURL(input, element = 'image') {
    if (input.files && input.files[0]) {
        let file = input.files[0];
        let maxFileSize = $(input).data("max-file-size") ?? 2;
        if (file.size > maxFileSize * 1024 * 1024) {
            alert(`File size exceeds ${maxFileSize} MB.`);
            return;
        }

        let reader = new FileReader();
        reader.onload = function(e) {
            if (element === 'background') {
                let preview = $(input).data("preview") ?? "#imagePreview";
                $(preview).css('background-image', `url(${e.target.result})`).hide().fadeIn(650);
            } else {
                let id = $(input).attr("id");
                $(`.${id}_text`).css('display', 'none');
                $(`.${id}_preview`).css('display', 'block').attr('src', e.target.result);
                $(`#${id}_preview`).remove();
            }
        }
        reader.readAsDataURL(file);
    }
}
