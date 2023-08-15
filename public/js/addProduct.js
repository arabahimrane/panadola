window.addEventListener('DOMContentLoaded', function () {
    // Select the <body> element
    var body = document.querySelector('body');
    var variationInput = document.getElementById('createVariation');
    var newVariation = document.querySelector('.newVariation');




    // var newVariationButton = document.getElementById('newVariationButton');
    //data variable
    var dataProduct = [];

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

    //==================drope zone===============
    // Initialize the dropzone
    const myDropzone = new Dropzone("#myDropzone", {
        url: "/dashboard/uploadProductImg",
        paramName: "file",
        maxFiles: 5,
        autoProcessQueue: false,
        maxFilesize: 10,
        acceptedFiles: ".jpg, .png, .gif",
        addRemoveLinks: true,
        init: function () {
            this.on("addedfile", function (file) {
                file.previewElement.classList.add("dz-upload");
                const progressElement = file.previewElement.querySelector(".dz-upload");

                const reader = new FileReader();
                reader.onload = function () {
                    const base64String = reader.result.split(",")[1];
                    progressElement.style.width = 40 + "%";

                    const xhr = new XMLHttpRequest();
                    xhr.open("POST", "/dashboard/uploadProductImg", true);

                    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest"); // Optional header
                    progressElement.style.width = 80 + "%";

                    xhr.onreadystatechange = function () {
                        progressElement.style.width = 100 + "%";

                        if (xhr.readyState === 4) {
                            console.log('xhr statue:', xhr.status);
                            if (xhr.status === 200) {
                                file.previewElement.classList.add("dz-complete");
                                file.previewElement.classList.add("dz-success");
                            } else {
                                file.previewElement.classList.add("dz-complete");
                                file.previewElement.classList.add("dz-error");                            

                                const errorElement = document.createElement("div");
                                errorElement.className = "dz-error-message";
                                errorElement.textContent = 'Error serveur';
                                file.previewElement.appendChild(errorElement);
                                console.error("Error uploading file:", xhr.statusText);
                            }
                        }
                    };
                    const dataToSend = {
                        file: base64String
                    };
                    xhr.send(JSON.stringify(dataToSend));
                };
                reader.readAsDataURL(file);
            });
        },
    });


    /*===============================variation=============================*/


    variationInput.addEventListener("keydown", function (event) {
        if (event.keyCode === 13) {

            var variation = variationInput.value;

            const variation_input_container = document.createElement('div');
            variation_input_container.className = "variation_input_container";
            const input_container = document.createElement('div');
            input_container.className = 'input_container';
            const spanElem = document.createElement('span');
            spanElem.classList = "material-symbols-outlined";
            spanElem.textContent = 'close';
            spanElem.id = variation

            // Create a new label element with a new value and for attribute
            const newLabel = document.createElement('label');
            newLabel.textContent = variation; // Set the new label value
            newLabel.setAttribute('for', variation); // Set the for attribute

            // Create a new input element with a new name attribute and class 'variableInput'
            const newInput = document.createElement('input');
            newInput.type = 'text';
            newInput.name = variation; // Set the new input name
            newInput.className = 'variableInput';

            // Append the new label and input elements to the new div
            input_container.appendChild(newLabel);
            input_container.appendChild(newInput);
            variation_input_container.appendChild(spanElem);
            variation_input_container.appendChild(input_container);

            // Append the new div to the existing div with class 'variationList'
            newVariation.appendChild(variation_input_container);

        }

    });

    newVariation.addEventListener('keydown', function (event) {
        if (event.keyCode === 13 && event.target.classList.contains('variableInput')) {
            var inputName = event.target.name;
            var inputValue = event.target.value;
            console.log({ name: inputName, value: inputValue });
        }
    });

    newVariation.addEventListener('click', function (event) {
        console.log(event.target.id);
    }
    )
})

