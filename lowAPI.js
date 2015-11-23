/**
 * Created by erictsangx on 23/11/2015.
 */


const {Cu} = require('chrome');
Cu.import('resource://gre/modules/Services.jsm');

module.exports = {
    getSearchLink: (content) => {
        return Services.search.getEngineByName(Services.search.getDefaultEngineInfo().name).getSubmission(content).uri.spec;
    }
};