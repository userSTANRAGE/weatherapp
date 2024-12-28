(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
        }
    };
    function fullVHfix() {
        const fullScreens = document.querySelectorAll("[data-fullscreen]");
        console.log(isMobile.any());
        if (fullScreens.length && isMobile.any()) {
            window.addEventListener("resize", fixHeight);
            function fixHeight() {
                let vh = window.innerHeight;
                document.documentElement.style.setProperty("--vh", `${vh}px`);
                console.log(vh, fullScreens);
            }
            fixHeight();
        }
    }
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        let menuBody = document.querySelector(".menu__body");
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                menuBody.classList.toggle("_active");
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    if (document.title === "Page not found") setTimeout((function() {
        window.location.href = "/";
    }), 5e3);
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    ymaps.ready((() => {
        ymaps.geolocation.get({
            provider: "yandex",
            autoReverseGeocode: true
        }).then((result => {
            const userLocation = result.geoObjects;
            console.log(userLocation.position);
            getWeatherData(userLocation.position);
        }));
    }));
    const getWeatherData = async location => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location[0]}&lon=${location[1]}&appid=b2e800893688bfb52a003bd731d279cb&units=metric`);
        const data = await response.json();
        console.log(data);
        setUserCity(data.name);
        const currentWeatherValue = Math.round(data.main.temp);
        const weatherValue = document.querySelector(".weather__value");
        weatherValue.classList.remove("load-holder");
        weatherValue.textContent = currentWeatherValue + "°C";
    };
    const setUserCity = city => {
        const cityValue = document.querySelector(".weather__about-city");
        cityValue.classList.remove("load-holder");
        cityValue.textContent = city;
    };
    window["FLS"] = true;
    isWebp();
    menuInit();
    fullVHfix();
})();