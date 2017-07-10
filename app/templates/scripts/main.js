/**
 * <%=projectName%>
 */

var msg = '<%= projectName %>';

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
