/**
 * Created by erictsangx on 5/10/2015.
 */


(function () {
    "use strict";

    const start = {};

    this.addEventListener("dragstart", event=> {
        start.x = event.clientX;
        start.y = event.clientY;
    }, false);

    this.ondrop = (event)=> {
        event.preventDefault();
        const distance = Math.hypot(event.clientX - start.x, event.clientY - start.y);
        const link = event.dataTransfer.getData("URL");
        const emitObj = {
            content: link ? link : event.dataTransfer.getData("text"),
            search: !link,
            distance: distance
        };

        self.port.emit("triggerDrop", emitObj);
    };

    this.ondragover = (event)=> {
        event.preventDefault();
    };

}).call(document);
