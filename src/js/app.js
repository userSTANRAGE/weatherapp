window['FLS'] = true; // Включить/выключить FLS (Full Logging System) (в работе)

import "../scss/style.scss";

import * as flsFunctions from "./files/functions.js";

flsFunctions.isWebp();

// Бургер
flsFunctions.menuInit();


// Учет плавающей панели на мобильных устройствах при 100vh
flsFunctions.fullVHfix(); 

// Функции работы с скролом
import * as flsScroll from "./files/scroll/scroll.js";

// Подключение файлов со своим кодом
import "./files/script.js";
import "./files/weather.js";