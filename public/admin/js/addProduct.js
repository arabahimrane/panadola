window.addEventListener('DOMContentLoaded', function () {
    // Select the <body> element
    var body = document.querySelector('body');
    var generateVariation = document.getElementById('generateVariation');
    var submit = document.getElementById('submit');
    var inputVariation = [];
    const variationGenerateContainer = document.querySelector('.variationGenerate');


    let product;
    let productInformation;
    const gallery = [];
    let generaleInformation;
    var variationList = {
        size: [],
    };
    let publish;
    let publishSchedule;
    let datetimePicker;
    let meta;
    const productTitle = document.querySelector('input[name="productTitle"]');
    const categorie = document.querySelector('select[name="categorie"]');
    const slug = document.querySelector('input[name="slug"]');
    const price = document.querySelector('input[name="price"]');
    const discount = document.querySelector('input[name="discount"]');
    const status = document.querySelector('select[name="status"]');
    const visibility = document.querySelector('select[name="visibility"]');
    const metaTitle = document.querySelector('input[name="metaTitle"]');
    const metaDescription = document.querySelector('input[name="metDescription"]');






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
                            if (xhr.status === 200) {
                                const responseObj = JSON.parse(xhr.response);
                                file.path = responseObj.file;
                                gallery.push(file.path);
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
    // Sélectionnez la div contenant les éléments input
    const variationDiv = document.querySelector('.variation');

    // Sélectionnez tous les éléments input à l'intérieur de la div
    const inputElements = variationDiv.querySelectorAll('input');

    // Ajoutez un gestionnaire d'événements pour chaque élément input
    inputElements.forEach(input => {
        input.addEventListener('keyup', event => {
            if (event.key === 'Enter') {
                var name = input.value.trim();

                const chip = document.createElement('p');
                chip.className = "chip";
                chip.innerHTML = name;

                if (name != "") {
                    // Check if name already exists in variationList.size
                    let nameExists = false;
                    for (const item of variationList.size) {
                        if (item.name === name) {
                            nameExists = true;
                            break;
                        }
                    }

                    if (!nameExists) {
                        variationList.size.push({ name: name, value: null });

                        document.getElementById("sizeValue").appendChild(chip);
                        input.value = "";
                    }
                }
            }
        });
    });

    const parentChips = document.querySelectorAll(".variationList");

    parentChips.forEach(parentChip => {
        parentChip.addEventListener('click', event => {
            if (event.target.className == 'chip') {
                variationList.size.splice(variationList.size.indexOf(event.target.innerHTML, 1));
                event.target.parentNode.removeChild(event.target);
            }
        });
    });

    generateVariation.addEventListener('click', function () {

        const sizeArray = variationList.size;

        for (let i = 0; i < sizeArray.length; i++) {
            if (inputVariation.indexOf(sizeArray[i]) == -1) {
                const inputContainer = document.createElement("div");
                inputContainer.className = "input_container";

                const labelInput = document.createElement('label');
                const labelFor = sizeArray[i].name;
                labelInput.setAttribute('for', labelFor);
                labelInput.textContent = labelFor;

                const input = document.createElement('input');
                input.setAttribute('type', 'text');
                input.setAttribute('id', labelFor);
                input.setAttribute('placeholder', "price");
                input.setAttribute('name', labelFor);
                input.className = "variableInput";

                inputContainer.appendChild(labelInput);
                inputContainer.appendChild(input);

                variationGenerateContainer.appendChild(inputContainer);
                inputVariation.push(sizeArray[i]);
            }
        }
    });

    variationGenerateContainer.addEventListener('input', function (event) {

        const target = event.target;

        if (target.tagName === 'INPUT') {
            const inputValue = target.value.trim();
            const inputName = target.name;

            let indexToUpdate = -1;
            for (let i = 0; i <= variationList.size.length; i++) {
                if (variationList.size[i].name === inputName) {
                    indexToUpdate = i;
                    break;
                }

            }
            if (indexToUpdate !== -1) {
                variationList.size[indexToUpdate].value = inputValue;
            }
        }
    });


    /*================================================================================================*/

    submit.addEventListener('click', function () {
        productInformation = {
            productTitle: productTitle.value,
            description: description,
            slug: slug.value,
            categorie: categorie.value
        }

        generaleInformation = {
            price: price.value,
            discount: discount.value
        }

        publish = {
            status: status.value,
            visibility: visibility.value,
        }

        publishSchedule = {
            date: datetimePicker,
        }

        meta = {
            metaTitle: metaTitle.value,
            metaDescription: metaDescription.value
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

        console.log(product);
        fetch('/dashboard/creatProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(response => {
                if (response.status == 200) {
                    window.location.replace("menu");
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    })
})