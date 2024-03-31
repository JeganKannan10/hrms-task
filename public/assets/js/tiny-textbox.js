/**
 * Initializes the TinyMCE editor with the given selector and configuration options.
 *
 * @param {string} selector - The CSS selector for the textarea element to convert into a TinyMCE editor.
 * @return {void}
 */
function tinyInputConfig(selector) {
    const tinyConfig = {
        selector: selector,
        // width: 755,
        // height: 500,
        resize: false,
        plugins:[
            'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'prewiew', 'anchor', 'pagebreak',
            'searchreplace', 'wordcount', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media',
            'table', 'emoticons', 'template', 'codesample'
        ],
        toolbar: 'undo redo | styles | bold italic underline | alignleft aligncenter alignright alignjustify |' +
            'bullist numlist outdent indent | link image | print preview media fullscreen | ' +
            'forecolor backcolor emoticons',
        menu: {
            favs: {title: 'Menu', items: 'code | visualaid | searchreplace | emoticons'}
        },
        menubar: 'favs file edit view insert format tools table',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
    };

    tinymce.init(tinyConfig);
}
