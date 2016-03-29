/**
 * Created by erictsangx on 5/10/2015.
 */

'use strict';

const self = require('sdk/self');
const pageMods = require('sdk/page-mod');
const tabs = require('sdk/tabs');
const prefs = require('sdk/simple-prefs').prefs;
const lowLevelAPI = require('./modules/lowLevelAPI');
const data = self.data;

require('./modules/preference');

pageMods.PageMod({
    include: ['*'],
    contentScriptFile: data.url('dropHandler.js'),
    contentScriptWhen: 'start',
    onAttach: startListening
});


function startListening(worker) {
    worker.port.on('triggerDrop', function (msg) {
        if (msg.distance >= prefs.threshold) {
            if (msg.search) {
                let searchLink = lowLevelAPI.getSearchLink(msg.content);
                tabs.open({
                    url: searchLink,
                    inBackground: prefs.searchIn,
                    onOpen: onOpen
                });
            }
            else {
                let tab = tabs.open({
                    url: msg.content,
                    inBackground: prefs.openIn,
                    onOpen: onOpen
                });
            }
        }
    });
}

function onOpen(tab) {
    if (prefs.insertAfterCurrent) {
        tab.index = tabs.activeTab.index + 1;
    }
}