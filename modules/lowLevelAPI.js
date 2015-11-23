/**
 * Created by erictsangx on 23/11/2015.
 */

const {Cu} = require('chrome');
Cu.import('resource://gre/modules/Services.jsm');
const prefs = require('sdk/simple-prefs').prefs;


module.exports = {
    getSearchLink: (content) => {
        return Services.search.getEngineByName(prefs.selectedSearchEngine).getSubmission(content).uri.spec;
    },
    getSearchEngine: (name) => {
        return Services.search.getEngineByName(name);
    },
    getDefaultEngine: ()=> {
        return Services.search.getDefaultEngineInfo();
    },
    getAllSearchEngines: ()=> {
        const array = [];
        Services.search.getEngines().forEach((element)=> {
            array.push(element.name);
        });
        return array;
    }
};