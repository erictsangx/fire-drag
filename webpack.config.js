/**
 * Created by erictsangx on 19/12/2016.
 */

module.exports = {
    entry: {
        background_scripts: "./background_scripts/index.js",
        content_scripts: "./content_scripts/index.js",
    },
    output: {
        path: "addon",
        filename: "[name]/index.js"
    }
};
