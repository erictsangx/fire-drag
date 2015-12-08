/**
 * Created by erictsangx on 5/10/2015.
 */


(function () {
    'use strict';
    const start = {};
    let distance = 0;
    let dropOnInput = false;

    function parseLink(text) {
        if (text.startsWith('http')) {
            return {
                link: text,
                isLink: true
            };
        }
        if (text.startsWith('www.')) {
            return {
                link: `http://${text}`,
                isLink: true
            };
        }
        return {
            isLink: false
        };
    }

    this.addEventListener('dragstart', event => {
        start.x = event.clientX;
        start.y = event.clientY;
    }, false);


    this.addEventListener('dragend', event => {
        if (!dropOnInput) {
            event.preventDefault();
            const link = event.dataTransfer.getData('URL');
            const text = event.dataTransfer.getData('text');

            const emitObj = {
                content: '',
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
            self.port.emit('triggerDrop', emitObj);
        }
    });

    this.ondrop = (event) => {
        if (!dropOnInput) {
            event.preventDefault();
        }
    };

    this.ondragover = (event)=> {
        event.preventDefault();
        if (event.target.nodeName == 'INPUT') {
            dropOnInput = true;
        }
        else {
            distance = Math.hypot(event.clientX - start.x, event.clientY - start.y);
            dropOnInput = false;
        }
    };


}).call(document);
