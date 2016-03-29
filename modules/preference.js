/**
 * Created by erictsangx on 23/11/2015.
 */

'use strict';

const self = require('sdk/self');
const Panel = require('sdk/panel').Panel;
const sp = require('sdk/simple-prefs');
const lowLevelAPI = require('./lowLevelAPI');
const data = self.data;

const engine = lowLevelAPI.getSearchEngine(sp.prefs.selectedSearchEngine);
if (engine === null) {
    sp.prefs.selectedSearchEngine = lowLevelAPI.getDefaultEngine().name;
}

sp.on('setEngine', function () {
    let panel = Panel({
        width: 200,
        contentURL: data.url('enginePreference.html'),
        contentScriptFile: data.url('enginePreference.js')
    });

    panel.port.emit('searchEngineList', {engines: lowLevelAPI.getAllSearchEngines(), selected: sp.prefs.selectedSearchEngine});
    panel.port.on('setSearchEngine', (msg)=> {
        sp.prefs.selectedSearchEngine = msg;
    });

    panel.show();
});