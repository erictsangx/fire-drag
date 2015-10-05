/**
 * Created by erictsangx on 5/10/2015.
 */
var self = require("sdk/self");
var data = self.data;
var pageMods = require("sdk/page-mod");
var tabs = require("sdk/tabs");
var queryString = require("sdk/querystring");

pageMods.PageMod({
    include: ['*'],
    contentScriptFile: data.url("./dropHandler.js"),
    onAttach: startListening
});


function startListening(worker) {
    worker.port.on('triggerDrop', function (msg) {
        if (msg.search) {
            let searchLink = `https://www.google.com/search?${queryString.stringify({q: msg.content})}`;
            tabs.open({
                url: searchLink,
                inBackground: false
            });
        }
        else {
            tabs.open({
                url: msg.content,
                inBackground: true
            });
        }

    });
}