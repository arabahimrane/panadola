window.addEventListener('load', function () {
    // Select the <body> element
    var body = document.querySelector('body');

    // Create a new MutationObserver instance
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            // Check if the class attribute has changed
            if (mutation.attributeName === 'class') {
                var currentClass = mutation.target.className;
                // Perform actions based on the new class value
                if (currentClass.includes('dark')) {
                    // Class contains 'dark'
                    console.log('Dark mode activated');
                    // Update the CSS link href attribute
                    var cssLink = document.getElementById('dateTimeLink');
                    cssLink.setAttribute('href', 'https://npmcdn.com/flatpickr/dist/themes/dark.css');
                } else {
                    // Class does not contain 'dark'
                    console.log('Dark mode deactivated');
                    // Restore the default CSS link href attribute
                    var cssLink = document.getElementById('dateTimeLink');
                    cssLink.setAttribute('href', 'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.css');
                }
            }
        });
    });

    // Configure and start observing the attribute changes
    var observerConfig = {
        attributes: true,
        attributeFilter: ['class'],
        attributeOldValue: true
    };

    observer.observe(body, observerConfig);

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
