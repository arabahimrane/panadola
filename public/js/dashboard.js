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
        modeSwitch = body.querySelector(".toggle-switch"),
        modeText = body.querySelector(".mode-text"),
        cards = body.querySelectorAll('.card'),
        menubar = body.querySelector('.menu-bar');


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
            main.style.marginLeft = "250px";
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

    cards.forEach(function (card) {
        card.addEventListener('mouseleave', function () {
            var icon = this.querySelector('.material-symbols-outlined');
            icon.removeAttribute('style');
        });
    });

    toggle.addEventListener("click", () => {
        if (getCookie('toogleState') == "open") {
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

    modeSwitch.addEventListener("click", () => {
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



});
