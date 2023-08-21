window.addEventListener('DOMContentLoaded', function () {
    // Select the <body> element
    var body = document.querySelector('body');
    var variationInput = document.getElementById('createVariation');
    var newVariation = document.querySelector('.newVariation');
    var submit = document.getElementById('submit');


    let product;
    let productInformation;
    const gallery = [];
    let generaleInformation;
    var variationList = {};
    let publish;
    let publishSchedule;
    let datetimePicker;
    let meta;
    const productTitle = document.querySelector('input[name="productTitle"]').value;
    const categorie = document.querySelector('select[name="categorie"]').value;
    const slug = document.querySelector('input[name="slug"]').value;
    const stock = document.querySelector('input[name="stock"]').value;
    const price = document.querySelector('input[name="price"]').value;
    const discount = document.querySelector('input[name="discount"]').value;
    const status = document.querySelector('select[name="status"]').value;
    const visibility = document.querySelector('select[name="visibility"]').value;
    const metaTitle = document.querySelector('input[name="metaTitle"]').value;
    const metaDescription = document.querySelector('input[name="metDescription"]').value;






    // Create a new MutationObserver instance
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            // Check if the class attribute has changed
            if (mutation.attributeName === 'class') {
                var currentClass = mutation.target.className;
                // Perform actions based on the new class value
                if (currentClass.includes('dark')) {
                    // Update the CSS link href attribute
                    var cssLink = document.getElementById('dateTimeLink');
                    cssLink.setAttribute('href', 'https://npmcdn.com/flatpickr/dist/themes/dark.css');
                } else {
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
        onChange: function (selectedDates, dateStr, instance) {
            // Get the selected date value
            datetimePicker = dateStr;
        }
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
            this.on("removedfile", function (file) {
                const xhr = new XMLHttpRequest();
                xhr.open("DELETE", "/dashboard/uploadProductImg", true);

                xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

                xhr.onreadystatechange = function () {

                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            var index = gallery.indexOf(file.path);
                            if (index !== -1) {
                                gallery.splice(index, 1);
                            }
                        } else {
                            // 500 err serveur
                        }
                    }
                };
                const dataToSend = {
                    path: file.path
                };
                xhr.send(JSON.stringify(dataToSend));

            });
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
                                const responseObj = JSON.parse(xhr.response);
                                console.log(responseObj.file);
                                file.path = responseObj.file;
                                gallery.push(file.path);
                                console.log('gallery:', gallery);
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

            var variationValue = variationInput.value.trim();
            if (!variationList[variationValue]) {
                console.log("it is");
 
                const variation_input_container = document.createElement('div');
                variation_input_container.className = "variation_input_container";
                const input_container = document.createElement('div');
                input_container.className = 'input_container';
                input_container.id = variationValue;
                const spanElem = document.createElement('span');
                spanElem.classList = "material-symbols-outlined";
                spanElem.textContent = 'close';
                spanElem.id = variationValue

                // Create a new label element with a new value and for attribute
                const newLabel = document.createElement('label');
                newLabel.textContent = variationValue; // Set the new label value
                newLabel.setAttribute('for', variationValue); // Set the for attribute

                // Create a new input element with a new name attribute and class 'variableInput'
                const newInput = document.createElement('input');
                newInput.type = 'text';
                newInput.name = variationValue; // Set the new input name
                newInput.className = 'variableInput';

                // Append the new label and input elements to the new div
                input_container.appendChild(newLabel);
                input_container.appendChild(newInput);
                variation_input_container.appendChild(spanElem);
                variation_input_container.appendChild(input_container);

                // Append the new div to the existing div with class 'variationList'
                newVariation.appendChild(variation_input_container);

                variationList[variationInput.value] = [];
                variationInput.value = "";
                console.log(variationList);
            }
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
        var variationTodellet = event.target.id.toString();
        var delletVariation = document.getElementById(variationTodellet);


        // Use square brackets to access the property and delete it from variationList
        delete variationList[variationTodellet];

        var parentElement = delletVariation.parentNode;
        while (parentElement.firstChild) {
            parentElement.removeChild(parentElement.firstChild);
        }
        parentElement.remove(); // Remove the parent element itself

        console.log("variationList after delete:", variationList);
    });


    submit.addEventListener('click', function () {
        productInformation = {
            productTitle: productTitle,
            description: description,
            slug: slug,
            categorie: categorie
        }

        generaleInformation = {
            stock: stock,
            price: price,
            discount: discount
        }

        publish = {
            status: status,
            visibility: visibility,
        }

        publishSchedule = {
            date: datetimePicker,
        }

        meta = {
            metaTitle: metaTitle,
            metaDescription
        }

        product = {
            information: productInformation,
            gallery: gallery,
            generaleInformation: generaleInformation,
            variation: variationList,
            publish: publish,
            publishSchedule: publishSchedule,
            meta: meta,
        }

        fetch('/dashboard/creatProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(response => response.json())
            .then(data => {
                // window.location.replace("nouvelle_page.html");
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });


    })


})

