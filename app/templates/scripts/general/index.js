// You can do global stuff in here
// for example the menus, footers, etc
<% if (jQuery || frontEndFramework) { -%>
import './jquery'
<% } -%>
<% if (frontEndFramework === 'bootstrap-3' || frontEndFramework === 'bootstrap-4') { -%>
import './bootstrap'
<% } -%>
<% if (frontEndFramework === 'foundation') { -%>
import './foundation'
<% } -%>
