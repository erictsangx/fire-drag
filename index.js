/**
 * Created by erictsangx on 5/10/2015.
 */

const self = require('sdk/self');
const data = self.data;
const pageMods = require('sdk/page-mod');
const tabs = require('sdk/tabs');
const prefs = require('sdk/simple-prefs').prefs;
const lowAPI = require('./lowAPI');

pageMods.PageMod({
    include: ['*'],
    contentScriptFile: data.url('./dropHandler.js'),
    onAttach: startListening
});


function startListening(worker) {
    worker.port.on('triggerDrop', function (msg) {
        if (msg.distance >= prefs.threshold) {
            if (msg.search) {
                let searchLink = lowAPI.getSearchLink(msg.content);
                tabs.open({
                    url: searchLink,
                    inBackground: prefs.searchIn
                });
            }
            else {
                tabs.open({
                    url: msg.content,
                    inBackground: prefs.openIn
                });
            }
        }
    });
}