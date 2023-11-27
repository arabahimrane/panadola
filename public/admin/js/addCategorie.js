window.addEventListener('DOMContentLoaded', function () {
    const submit = document.getElementById('submit');
    const categorieName = document.querySelector('input[name="categorieName"]').value;
    const slug = document.querySelector('input[name="slug"]').value;
    let categoriePicture;

    const myDropzone = new Dropzone("#myDropzone", {
        url: "/dashboard/uploadProductImg",
        paramName: "file",
        maxFiles: 1,
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
                                categoriePicture = file.path;
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

    submit.addEventListener('click', function () {
        var categorie = {
            categorieName: categorieName,
            slug: slug,
            categoriePicture: categoriePicture
        }
        console.log(categorie);
        fetch('/dashboard/createCategorie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categorie)
        })
            .then(response => {
                window.location.href = '/dashboard/categories';
            })
            .catch(error => {
                // Handle errors
            });
    });
})