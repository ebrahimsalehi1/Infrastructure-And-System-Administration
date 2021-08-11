// /*jshint latedef: nofunc */
//
// $(function() {
//     var hostname=window.location.hostname;
//     var serverUrl="192.168.3.2";
//     /*var localHosts=["localhost","127.0.0.1","192.168.15.125","192.168.15.126","192.168.15.130","mis.tuka.local"];
//     var remoteHosts=["46.148.42.177"];
//     if(localHosts.indexOf(hostname.toLowerCase())>-1){
//         serverUrl="192.168..";
//     }else if(remoteHosts.indexOf(hostname.toLowerCase())>-1){
//         serverUrl="46.148.42.177";
//     }*/
//     var settings = {
//         xmpp: {
//             url: 'http://'+serverUrl+':7070/http-bind/',
//             domain: '192.168.3.2',
//             resource: '',
//             overwrite: true
//         }
//     };
//     jsxc.init({
//         /*hideOffline: true,
//         logoutElement:$('#logout_btn,#logout_btn_effect'),
//         autoLang: false,
//         defaultLang: 'fa',*/
//         root: '/jsxc',
//         rosterAppend:'jsxc_roster',
//         /*displayRosterMinimized: function() {
//             return true;
//         },*/
//         loadSettings: function(username, password, cb) {
//             cb(settings);
//         },
//         xmpp: {
//             url: settings.xmpp.url
//         }
//     });
// });
var serverUrl = "172.25.40.47";
var settings = {
    xmpp: {
        url: 'http://' + serverUrl + ':7070/http-bind/',
        domain: '172.25.40.47',
        resource: '',
        overwrite: true
    }
};
jsxc.init({
    loadSettings: function (username, password, cb) {
        cb(settings);
    },
    xmpp: {
        url: settings.xmpp.url
    },
    rosterAppend:'#chat_JSXC',
    hideOffline: false,
    root: '/jsxc'

});
$(document).ready(function () {
    $("#btnopenbox").click(jsxc.gui.showLoginBox);
});

