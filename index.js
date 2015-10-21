/**
 * Created by erictsangx on 5/10/2015.
 */

const self = require("sdk/self");
const data = self.data;
const pageMods = require("sdk/page-mod");
const tabs = require("sdk/tabs");

const {Cu} = require("chrome");
Cu.import('resource://gre/modules/Services.jsm');

pageMods.PageMod({
    include: ['*'],
    contentScriptFile: data.url("./dropHandler.js"),
    onAttach: startListening
});

function startListening(worker) {
    worker.port.on('triggerDrop', function (msg) {
        if (msg.search) {
            let searchLink = Services.search.getEngineByName(Services.search.getDefaultEngineInfo().name).getSubmission(msg.content).uri.spec;
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