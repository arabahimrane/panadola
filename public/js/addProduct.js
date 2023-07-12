window.addEventListener('load', function () {
    var editor = document.getElementById('editor');
    var quill = new Quill(editor, {
        theme: 'snow'
    });
    var description = quill.getText();
    
    flatpickr("#datetimePicker", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
    });
})
