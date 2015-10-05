/**
 * Created by erictsangx on 5/10/2015.
 */
var self = require("sdk/self");
var data = self.data;
var pageMods = require("sdk/page-mod");
var tabs = require("sdk/tabs");
var {Ci,Cc}= require("chrome");

const threshold = 100;

pageMods.PageMod({
    include: ['*'],
    contentScriptFile: data.url("./dropHandler.js"),
    onAttach: startListening
});

function CCIN(cName, ifaceName) {
    return Cc[cName].createInstance(Ci[ifaceName]);
}

function startListening(worker) {
    worker.port.on('triggerDrop', function (msg) {
        if (msg.distance >= threshold) {
            if (msg.search) {
                var bss = Cc["@mozilla.org/browser/search-service;1"].getService(Ci.nsIBrowserSearchService);
                let submission = bss.currentEngine.getSubmission(msg.content);
                url = submission.uri.spec;
                tabs.open({
                    url: url,
                    inBackground: false
                });
            }
            else {
                tabs.open({
                    url: msg.content,
                    inBackground: true
                });
            }
        }
    });
}