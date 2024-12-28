// Импорт основного модуля
import gulp from "gulp";
// Импорт общих плагинов
import { plugins } from "./config/gulp-plugins.js";
// Імпорт шляхів
import { path } from "./config/gulp-settings.js";

// Передаем значение в глобальную переменную
global.app = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	isWebP: !process.argv.includes('--nowebp'),
	isImgOpt: !process.argv.includes('--noimgopt'),
	isFontsReW: process.argv.includes('--rewrite'),
	gulp: gulp,
	path: path,
	plugins: plugins
}

// Импорт задач
import { reset } from "./config/gulp-tasks/reset.js";
import { html } from "./config/gulp-tasks/html.js";
import { css } from "./config/gulp-tasks/css.js";
import { js } from "./config/gulp-tasks/js.js";
import { jsDev } from "./config/gulp-tasks/js-dev.js";
import { images } from "./config/gulp-tasks/images.js";
import { ftp } from "./config/gulp-tasks/ftp.js";
import { zip } from "./config/gulp-tasks/zip.js";
import { sprite } from "./config/gulp-tasks/sprite.js";
import { gitignore } from "./config/gulp-tasks/gitignore.js";
import { otfToTtf, ttfToWoff, fonstStyle } from "./config/gulp-tasks/fonts.js";

// Последовательная обработка шрифтов
const fonts = gulp.series(reset, otfToTtf, ttfToWoff, fonstStyle);
// Основные задачи будем выполнять параллельно после обработки шрифтов
const devTasks = gulp.parallel(fonts, gitignore);
// Основные задачи будем выполнять параллельно после обработки шрифтов
const buildTasks = gulp.series(fonts, jsDev, js, gulp.parallel(html, css, images, gitignore));

// Экспорт задач
export { html }
export { css }
export { js }
export { jsDev }
export { images }
export { fonts }
export { sprite }
export { ftp }
export { zip }

// Побудова сценаріїв виконання завдань
const development = gulp.series(devTasks);
const build = gulp.series(buildTasks);
const deployFTP = gulp.series(buildTasks, ftp);
const deployZIP = gulp.series(buildTasks, zip);

// Експорт сценаріїв
export { development }
export { build }
export { deployFTP }
export { deployZIP }

// Виконання сценарію за замовчуванням
gulp.task('default', development);






