document.addEventListener('DOMContentLoaded', function () {

    function addProduct(product, action, fromCookies) {
        if (product) {
            var existingItem = orders.find(item => item.productId === product.productId);

            if (action == "++") {
                if (existingItem) {
                    // Si un objet avec le même productId est trouvé, incrémentez la quantité
                    existingItem.quantity += 1;

                } else {
                    // Si l'objet n'existe pas encore dans le panier, ajoutez-le au panier
                    orders.push(product);
                    orderList.appendChild(createOrderListItem(product));
                }

            } else {
                console.log('existingItem.quantity start =>', existingItem.quantity);
                if (existingItem.quantity != 0) {
                    existingItem.quantity -= 1;
                }
                else {
                    orders = orders.filter(item => item.productId !== product.productId);
                    document.querySelector(`li[data-info="${product.productId}"]`).remove();
                    console.log('orders => ', orders)
                }
                console.log('existingItem.quantity end =>', existingItem.quantity);

            }

            if (document.querySelector(`li[data-info="${product.productId}"]`)) {
                document.querySelector(`li[data-info="${product.productId}"]`).querySelector('.price').querySelector('p').innerHTML
                    = orders.find(item => item.productId === product.productId).quantity;
            }

            if (!fromCookies) {
                var updatedArray = JSON.stringify(orders);
                Cookies.set('orders', updatedArray);
            }
            console.log('orders', orders);
            sommePrixTotalElement.innerHTML = orders.reduce((sum, order) => {
                const productTotal = order.price * order.quantity;
                return sum + productTotal;
            }, 0);

        }

    }

    function createOrderListItem(itemData) {

        const li = document.createElement('li');
        // Utilisez cet identifiant dans votre structure HTML
        li.innerHTML = `
        <img src= ${itemData.img}>
        <div class="content">
            <h3>${itemData.name}</h3>
            <p>${itemData.category}</p>
            <div class="price">
                 <section>
                    <h3>${itemData.price}</h3>
                    <h3 class="devis">${devis}</h3>
                </section>
                <div class="action">
                    <span class="material-symbols-outlined remove">
                        remove
                    </span>
                    <p>1</p>
                    <span class="material-symbols-outlined">
                        add
                    </span>
                </div>
            </div>
        </div>       
   `;
        li.setAttribute('data-info', itemData.productId);
        return li;
    }

    const devis = document.querySelector('.devis').innerHTML;
    const sommePrixTotalElement = document.getElementById('prix');
    const orderList = document.getElementById('orderList');
    const cookiesOrdersString = Cookies.get('orders'); // Récupérez la chaîne JSON depuis les cookies



    let orders = [];
    let cookiesOrders = [];

    if (cookiesOrdersString) {
        cookiesOrders = JSON.parse(cookiesOrdersString); // Parsez la chaîne JSON en un tableau JavaScript
        console.log(cookiesOrders);

        for (let e = 0; e < cookiesOrders.length; e++) { // Utilisez < au lieu de <=
            addProduct(cookiesOrders[e], "++", true);
        }
    }

    orderList.addEventListener("click", function (event) {
        var li = event.target.closest('li');

        var foundItem = orders.find(item => item.productId === li.getAttribute('data-info'));

        if (event.target.innerHTML.trim() == 'add') {

            addProduct(foundItem, "++", false);

        } else if (event.target.innerHTML.trim() == 'remove') {

            addProduct(foundItem, "--", false);

        }
    });

    if (window.location.pathname == "/menu") {



        const submit = document.getElementById('submit');


        const cards = document.querySelectorAll('.card');
        const product_details = document.querySelector('.product_details');

        const commande = document.querySelector('.commande');
        const addCartElements = document.querySelectorAll('.addCart');




        addCartElements.forEach(function (element) {
            element.addEventListener('click', function (event) {
                const productId = event.target.dataset.info;

                var cardElement = document.getElementById(event.target.dataset.info);
                const img = cardElement.querySelector('.card-header img').src;
                const name = cardElement.querySelector('h3').textContent;
                const category = cardElement.querySelector('p').textContent;
                const price = cardElement.querySelector('.price h3').textContent;

                const itemData = {
                    img: img,
                    name: name,
                    category: category,
                    price: price,
                    productId: productId,
                    quantity: 1
                };


                addProduct(itemData, "++", false);

            });
        });

        // Ajoutez un écouteur d'événements "click" au document
        document.addEventListener('click', function (event) {
            if (!product_details.contains(event.target) && product_details.style.display != "none") {
                product_details.style.display = 'none';
            }
        });

        // Sélectionnez tous les éléments .card

        // Ajoutez un écouteur d'événements "click" à chaque élément .card
        cards.forEach(function (element) {
            element.addEventListener('click', function (event) {

                if (event.target.tagName !== "SPAN") {

                    event.stopPropagation();
                    // Créez un élément img
                    const img = document.createElement('img');
                    img.src = element.querySelector(".card-header img").src;

                    // Créez un élément div avec la classe "description"
                    const descriptionDiv = document.createElement('div');
                    descriptionDiv.className = 'description';

                    // Créez un élément h3 pour le titre
                    const h3Title = document.createElement('h3');
                    h3Title.textContent = element.querySelector('.card-body h3').textContent;

                    // Créez un élément p pour la description
                    const descriptionP = document.createElement('p');
                    element.querySelector('.card-body .productDescription') ? descriptionP.textContent = element.querySelector('.card-body .productDescription').textContent : null;

                    // Ajoutez les éléments h3 et p à la div de description
                    descriptionDiv.appendChild(h3Title);
                    descriptionDiv.appendChild(descriptionP);

                    // Créez un élément div avec la classe "price"
                    const priceDiv = document.createElement('div');
                    priceDiv.className = 'price';

                    // Créez un élément section pour le prix
                    const priceSection = document.createElement('section');

                    // Créez un élément h3 pour le prix
                    const h3Price = document.createElement('h3');
                    h3Price.textContent = element.querySelector('.card-body .price h3').textContent;

                    // Créez un élément h3 pour "dh"
                    const h3Devis = document.createElement('h3');
                    h3Devis.className = 'devis';
                    h3Devis.textContent = 'dh';

                    // Ajoutez les éléments h3 à la section de prix
                    priceSection.appendChild(h3Price);
                    priceSection.appendChild(h3Devis);

                    // Créez un élément div avec la classe "shopping_cart"
                    const shoppingCartDiv = document.createElement('div');
                    shoppingCartDiv.className = 'shopping_cart';

                    // Créez un élément span avec la classe "addCart" et l'attribut "data-info"
                    const spanAddCart = document.createElement('span');
                    spanAddCart.className = 'material-symbols-outlined addCart';
                    spanAddCart.setAttribute('data-info', element.getAttribute('id'));
                    spanAddCart.textContent = 'shopping_cart';

                    // Ajoutez le span à la div "shopping_cart"
                    shoppingCartDiv.appendChild(spanAddCart);

                    // Ajoutez les éléments créés à la div "product_details"
                    priceDiv.appendChild(priceSection);
                    priceDiv.appendChild(shoppingCartDiv);

                    // Effacez tout contenu précédent de product_details
                    product_details.innerHTML = '';

                    // Ajoutez les éléments à product_details
                    product_details.appendChild(img);
                    product_details.appendChild(descriptionDiv);
                    product_details.appendChild(priceDiv);
                    product_details.style.display = 'block';
                }
            });
        });

        product_details.addEventListener('click', function (event) {
            if (event.target.tagName === 'SPAN' && event.target.classList.contains('addCart')) {
                // Récupérer les données à partir de l'élément cliqué
                const img = product_details.querySelector('img').src
                const productId = event.target.getAttribute('data-info');
                const productName = product_details.querySelector('h3').textContent;
                const productPrice = parseFloat(product_details.querySelector('.price h3').textContent);
                const productQuantity = 1;

                // Créer l'objet itemData avec les données récupérées
                const itemData = {
                    img: img,
                    productId: productId,
                    name: productName,
                    price: productPrice,
                    quantity: productQuantity
                };
                addProduct(itemData, "++", false);
            }
        })

        submit.addEventListener('click', function () {
            if (orders.length > 0)
                window.location.href = './menu/chekout'; // Replace with your desired URL
        })
    }
    else {
        submit.style.display = "none";
        const next = document.getElementById("next");
        const next2 = document.getElementById("next2");

        const send = document.getElementById("send");


        const adresseForm = document.getElementById("adresseForm");
        const paimentMethode = document.getElementById("paiment");
        const delivery_mad = document.getElementById('delivery-man');


        const name = document.getElementsByName("name")[0].value;
        const phone = document.getElementsByName("phone")[0].value;
        const adresse = document.getElementsByName("adresse")[0].value;



        next.addEventListener('click', function () {
            if (!adresse) {
                document.getElementById("adresse").style.borderColor = "red";
            } else {
                adresseForm.style.display = "none";
                paimentMethode.style.display = "flex";
            }
        });


        send.addEventListener('click', function () {
            let ordersFinal = orders.map(order => ({ productId: order.productId, quantity: order.quantity }));
            // Créez un objet contenant les données à envoyer dans la requête POST
            let body = {
                orders: ordersFinal,
                name: name,
                phone: phone,
                address: adresse,
            };

            if (!adresse) {
                document.getElementById("adresse").style.borderColor = "red";
            } else {
                // Effectuez la requête POST
                fetch(window.location.href, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                })
                    .then(response => {
                        // Traitez la réponse de la requête ici, si nécessaire
                        if (response.ok) {
                            paimentMethode.style.display = "none";
                            delivery_mad.style.display = "flex";
                            Cookies.remove('orders');
                            setTimeout(function () {
                                // Code to run after the timeout

                                // Use window.location.href to navigate to the new page
                                window.location.href = "../menu";
                            }, 1500);
                        } else {
                            console.error('Erreur lors de la requête POST');
                        }
                    })
                    .catch(error => {
                        // Gérez les erreurs ici
                        console.error('Erreur lors de la requête POST : ', error);
                    });
            }


            console.log("orders send: ", body);
        });

    }
})