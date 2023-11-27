const storeRouter = require('express').Router();
const { saveOrders } = require("../controller/store/menu.controller");


storeRouter.get('/', (req, res) => {
    res.render('store/main', {
        title: 'Acceuil',
        scriptBody: './link/script', linkBody: './link/link',
        links: './link/links/home',
        store: {
            name: 'localhost',
        },
        theme: {
            navBar: {
                color: '#000000',
                menu: [
                    { name: 'Acceuil', icon: "home", url: "./" },
                    { name: 'Menu', icon: "menu_book", url: "./menu" },
                    { name: 'Nous trouver', icon: "home_pin", url: "./where" },
                    { name: 'contact', icon: "support_agent", url: "./contact" },
                ]
            },
            copyright: '- 2023 | Powered by Panadaola',
        },
        components: './components/home',
        components_data: {
            description: {
                title: 'Toute l\'expertise françer dans un cafe',
                paragraph: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A delectus, commodi perspiciatis itaque magnam est perferendis repellendus recusandae aut aspernatur dolorum temporibus veritatis, doloribus nisi architecto labore, odit quaerat provident.',
                backgroundImg: 'https://nolinskiparis.com/wp-content/uploads/2022/06/restaurant-nolinksi-paris-5-etoiles-luxe-7-guillaume-de-laubier.jpg',
            },
            actualites: [
                { img: "https://assets.afcdn.com/recipe/20130204/35645_w1024h1024c1cx1250cy1875.jpg", title: "Les Gyozas: comme au Japon!", description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, possimus?" },
                { img: "https://images.radio-canada.ca/q_auto,w_844/v1/alimentation/recette/16x9/burger-jamaicaine.jpg", title: "Les Gyozas: comme au Japon!", description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, possimus?" },
                { img: "https://www.ptitchef.com/imgupl/recipe/french-tacos--457637p713643.jpg", title: "Les Gyozas: comme au Japon!", description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, possimus?" },
                { img: "https://img.cuisineaz.com/1280x720/2018/02/28/i136025-pizza-legere.webp", title: "Les Gyozas: comme au Japon!", description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, possimus?" },

            ],
            dowloand_app: {
                title: "L’application mobile",
                description: "Retrouvez notre application disponible gratuitement sur les plateformes IOS et Android",
                appStoreUrl: "https://www.apple.com/fr/app-store/",
                playStoreUrl: "https://play.google.com/store/apps?hl=fr&gl=US",
            },
        }


    });
});

/*----------------------------------------------------------------------------------------------------------------------------*/

storeRouter.get('/menu', (req, res) => {



    res.render('store/main', {
        title: 'Menu',
        scriptBody: './link/script', linkBody: './link/link',
        links: './link/links/menu',
        components: './components/menu-main',
        page: '../components/menu-home',
        store: {
            name: 'localhost',
        },
        theme: {
            navBar: {
                color: '#000000',
                menu: [
                    { name: 'Acceuil', url: "/" },
                    { name: 'Menu', url: "/menu" },
                    { name: 'Nous trouver', url: "/where" },
                    { name: 'contact', url: "/contact" },
                ]
            },
        },
        data: {
            devis: "dh",
            topSell: [
                {
                    id: '0331',
                    img: "/store/img/data/02.jpg",
                    name: "Butter Chicken",
                    category: "indian food!",
                    price: "35",
                },
                {
                    id: '0122',
                    img: "/store/img/data/03.jpg",
                    name: "Butter Chicken",
                    category: "indian food!",
                    price: "325",
                },
                {
                    id: '0111',
                    img: "/store/img/data/01.jpg",
                    name: "Butter Chicken",
                    category: "indian food!",
                    price: "352",
                },
            ],
            products: [
                {
                    category: {
                        name: "India food",
                        product: [
                            {
                                id: '001',
                                img: "/store/img/data/02.jpg",
                                name: "Butter Chicken",
                                category: "indian food!",
                                price: "35",
                                description: "blabla"
                            },
                            {
                                id: '071',
                                img: "/store/img/data/03.jpg",
                                name: "Butter Chicken",
                                category: "indian food!",
                                price: "35",
                            },
                            {
                                id: '031',
                                img: "/store/img/data/01.jpg",
                                name: "Butter Chicken",
                                category: "indian food!",
                                price: "35",
                            },
                            {
                                id: '041',
                                img: "/store/img/data/02.jpg",
                                name: "Butter Chicken",
                                category: "indian food!",
                                price: "35",
                            },
                            {
                                id: '015',
                                img: "/store/img/data/03.jpg",
                                name: "Butter Chicken",
                                category: "indian food!",
                                price: "35",
                            },
                            {
                                id: '05',
                                img: "/store/img/data/01.jpg",
                                name: "Butter Chicken",
                                category: "indian food!",
                                price: "35",
                            },
                        ],
                    }
                }
            ],
        },

    });

});

storeRouter.get('/menu/chekout', (req, res) => {
    // Vérifiez si le cookie existe dans l'en-tête de la demande
    if (!req.headers.cookie) {
        // Si le cookie n'existe pas, redirigez vers /menu
        return res.redirect('/menu');
    }

    // Si le cookie existe, affichez la page de checkout
    res.render('store/main', {
        title: 'Menu',
        scriptBody: './link/script',
        linkBody: './link/link',
        links: './link/links/menu',
        components: './components/menu-main',
        page: '../components/menu-chekout',
        store: {
            name: 'localhost',
        },
        theme: {
            navBar: {
                color: '#000000',
                menu: [
                    { name: 'Acceuil', url: "./" },
                    { name: 'Menu', url: "./menu" },
                    { name: 'Nous trouver', url: "./where" },
                    { name: 'contact', url: "./contact" },
                ]
            },
        },
        data: {
            devis: "dh",
        },
    });
});


storeRouter.post('/menu/chekout', (req, res) => {
    if (!req.headers.cookie) {
        // Si le cookie n'existe pas, redirigez vers /menu
        return res.sendStatus(403);

    }
    console.log("req.body", req.hostname);
    saveOrders(req, res);
});

module.exports = storeRouter;