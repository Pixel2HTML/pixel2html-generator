require('require-dir')('<%= paths.src.gulp %>');
<% if(frontEndFramework || jQuery){ %>
require('require-dir')('<%= paths.src.gulp %>/vendor');
<% } %>
