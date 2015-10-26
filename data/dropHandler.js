/**
 * Created by erictsangx on 5/10/2015.
 */


(function () {
    "use strict";

    const start = {};

    function parseLink(text) {
        if (text.startsWith("http")) {
            return {
                link: text,
                isLink: true
            };
        }
        if (text.startsWith("www.")) {
            return {
                link: `http://${text}`,
                isLink: true
            };
        }
        return {
            isLink: false
        };
    }

    this.addEventListener("dragstart", event=> {
        start.x = event.clientX;
        start.y = event.clientY;
    }, false);

    this.ondrop = (event)=> {
        event.preventDefault();
        const distance = Math.hypot(event.clientX - start.x, event.clientY - start.y);
        const link = event.dataTransfer.getData("URL");
        const text = event.dataTransfer.getData("text");
        const emitObj = {
            content: "",
            search: true,
            distance: distance
        };
        if (link) {
            emitObj.content = link;
            emitObj.search = false;
        }
        else {
            const parsed = parseLink(text);
            if (parsed.isLink) {
                emitObj.content = parsed.link;
                emitObj.search = false;
            }
            else {
                emitObj.content = text;
                emitObj.search = true;
            }
        }
        self.port.emit("triggerDrop", emitObj);
    };

    this.ondragover = (event)=> {
        event.preventDefault();
    };

}).call(document);
