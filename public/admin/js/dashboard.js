window.addEventListener('load', function () {


    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
    }

    function getCookie(name) {
        var cookieName = name + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var cookieArray = decodedCookie.split(';');
        for (var i = 0; i < cookieArray.length; i++) {
            var cookie = cookieArray[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(cookieName) === 0) {
                return decodeURIComponent(cookie.substring(cookieName.length, cookie.length));
            }
        }
        return null;
    }
    var largeurEcran = window.innerWidth;
    const body = document.querySelector('body'),
        main = document.querySelector("main"),
        sidebar = body.querySelector('nav'),
        toggle = body.querySelector(".toggle"),
        searchBtn = body.querySelector(".search-box"),
        
        modeText = body.querySelector(".mode-text"),
        cards = body.querySelectorAll('.card');
    const menubar = document.querySelector('.menu-bar');
    const dropeDown = document.querySelectorAll('.dropdown');
    const switchMode = document.getElementById('statuMode');
    const mode = document.querySelector('.mode');



    if (getCookie("themeMode") == 'dark') {
        body.classList.remove("light");
        body.classList.add("dark");
        document.querySelector(".moon").style.display = "";
        document.querySelector(".sun").style.display = "none";
    } else {
        body.classList.remove("dark");
        body.classList.add("light");
        document.querySelector(".moon").style.display = "none";
        document.querySelector(".sun").style.display = "";
    }

    if (getCookie("toogleState") == 'open') {
        if (largeurEcran > 991) {
            sidebar.classList.add("open");
            sidebar.classList.remove("close");
            main.style.marginLeft = "9rem";
            menubar.style.display = "flex";

        }
        else {
            sidebar.classList.remove("open");
            sidebar.classList.add("close");
            setCookie("toogleState", 'close', 10);
            menubar.style.display = "none";

        }

    } else {
        sidebar.classList.add("close");
        sidebar.classList.remove("open");
        if (largeurEcran > 991) {
            main.style.marginLeft = "0";
        } else {
            main.style.marginTop = "0";
            menubar.style.display = "none";
        }
    }


    // Parcours de chaque élément et ajout d'un gestionnaire d'événements de clic
    dropeDown.forEach(dropdown => {
        const submenu = dropdown.querySelector('.submenu');
        const expandMoreIcon = dropdown.querySelector('.expand_more');

        dropdown.addEventListener('click', () => {
            if (!submenu.classList.contains('opensubmenu')) {
                submenu.classList.add('opensubmenu');
                expandMoreIcon.classList.add('expanded');
                console.log('drope Down');
            } else {
                console.log('un drope Down');
                submenu.classList.remove('opensubmenu');
                expandMoreIcon.classList.remove('expanded');
            }
        });
    });


    cards.forEach(function (card) {
        card.addEventListener('mouseleave', function () {
            var icon = this.querySelector('.material-symbols-outlined');
            icon.removeAttribute('style');
        });
    });

    toggle.addEventListener("click", () => {
        if (getCookie('toogleState') == "open") {
            toggle.classList.remove('expanded');

            sidebar.classList.remove("open");
            sidebar.classList.toggle("close");
            if (largeurEcran > 991) {
                main.style.marginLeft = "0";
            } else {
                main.style.marginTop = "0";
                menubar.style.display = "none";
            }
            setCookie("toogleState", 'close', 10);
        } else {
            toggle.classList.add('expanded');
            sidebar.classList.remove("close");
            sidebar.classList.toggle("open");
            if (largeurEcran > 991) {
                main.style.marginLeft = "11rem";
            }
            else {
                main.style.marginTop = "450px";
                menubar.style.display = "flex";
            }
            setCookie("toogleState", 'open', 10);
        }
    })

    searchBtn.addEventListener("click", () => {
        sidebar.classList.remove("close");
        sidebar.classList.toggle("open");
        if (largeurEcran > 991) {
            main.style.marginLeft = "11rem";
        }
        else {
            main.style.marginTop = "450px";
            menubar.style.display = "flex";
        }
        setCookie("toogleState", 'open', 10);
    })

    mode.addEventListener("click", () => {
        if (getCookie("themeMode") != 'dark') {
            body.classList.remove("light");
            body.classList.toggle("dark");
        } else {
            body.classList.remove("dark");
            body.classList.toggle("light");
        }

        if (body.classList.contains("dark")) {
            modeText.innerText = "Light mode";
            document.querySelector(".moon").style.display = "";
            document.querySelector(".sun").style.display = "none";
            setCookie('themeMode', 'dark', 10);
        } else {
            modeText.innerText = "Dark mode";
            document.querySelector(".sun").style.display = "";
            document.querySelector(".moon").style.display = "none";
            setCookie('themeMode', 'light', 10);
        }
    });

    // document.querySelectorAll('.sidebar .nav-link').forEach(function (element) {

    //     element.addEventListener('click', function (e) {

    //         console.log('click');
    //         let nextEl = element.nextElementSibling;
    //         let parentEl = element.parentElement;

    //         if (nextEl) {
    //             e.preventDefault();
    //             let mycollapse = new bootstrap.Collapse(nextEl);

    //             if (nextEl.classList.contains('show')) {
    //                 mycollapse.hide();
    //             } else {
    //                 mycollapse.show();
    //                 // find other submenus with class=show
    //                 var opened_submenu = parentEl.parentElement.querySelector('.submenu.show');
    //                 // if it exists, then close all of them
    //                 if (opened_submenu) {
    //                     new bootstrap.Collapse(opened_submenu);
    //                 }
    //             }
    //         }
    //     }); // addEventListener
    // }) 
});
