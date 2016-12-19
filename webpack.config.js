/**
 * Created by erictsangx on 19/12/2016.
 */

module.exports = {
    entry: {
        content_scripts: "./content_scripts/index.js",
    },
    output: {
        path: "addon",
        filename: "[name]/index.js"
    }
};
