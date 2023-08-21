window.addEventListener('DOMContentLoaded', function () {
    const submit = document.getElementById('submit');
    const categorieName = document.querySelector('input[name="categorieName"]').value;
    const slug = document.querySelector('input[name="slug"]').value;

    submit.addEventListener('click', function () {
        var categorie = {
            categorieName: categorieName,
            slug: slug
        }

        // fetch('/dashboard/createCategorie', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(categorie)
        // })
        //     .then(response => {
        //         console.log(response.json());
        //     })
        //     .catch(error => {
        //         // Handle errors
        //     });
    });
})