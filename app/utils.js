'use strict';

function formatDate() {
  var today = new Date(),
    month = today.getMonth() + 1,
    day = today.getDate();

  month = month > 9 ? month : "0" + month;
  day = day > 9 ? day : "0" + day;
  return day +'/'+(month +'/'+today.getFullYear() ) + ' ' + today.getHours() + ":"+ today.getMinutes()
}

gulp.pkg = require('./package.json');

gulp.banner = ['/**',
  ' * ',
  ' *   Pixel2HTML - <%= project_name %>',
  ' *   @version v<%= pkg.version %> - '+formatDate(),
  ' * ',
  ' */\n\n',
  ''].join('\n');
