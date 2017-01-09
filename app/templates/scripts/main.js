/**
 * Pixel2HTML - <%= clientId %>/<%= projectId %>
 */

var msg = 'Pixel2HTML - <%= clientId %>/<%= projectId %>';

function printLog(log){
    'use strict';
  return console && console.log(log);
}

printLog(msg);

<% if (frontEndFramework === 'foundation') { %>
/**
* Foundation Framework Initializer
*/
$(document).foundation();
<% } %>
