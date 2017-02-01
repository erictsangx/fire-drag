/**
 * Created by erictsangx on 5/10/2015.
 */
import { IGNORED_TAG, TEXT_TYPE, IMAGE_TYPE, LINK_TYPE } from '../constants'

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

function parseDataTransfer(data) {
  const array = [...data.types];
  if (array.includes('application/x-moz-nativeimage')) {
    return {
      type: IMAGE_TYPE,
      content: data.getData('text/uri-list').trim()
    };
  }

  if (array.includes('text/uri-list')) {
    return {
      type: LINK_TYPE,
      content: data.getData('text/uri-list').trim()
    };
  }

  return {
    type: TEXT_TYPE,
    content: data.getData('text').trim()
  };
}


export default () => {
  const start = {};
  let distance = 0;
  let preventDrop = false;

  document.addEventListener('dragstart', (event) => {
    start.x = event.clientX;
    start.y = event.clientY;
  }, false);


  document.addEventListener('dragend', (event) => {
    if (!preventDrop) {
      event.preventDefault();

      const payload = parseDataTransfer(event.dataTransfer);

      const emitObj = {
        ...payload,
        distance
      };

      if (payload.type === TEXT_TYPE) {
        const parsed = parseLink(payload.content);
        if (parsed.isLink) {
          emitObj.content = parsed.link;
          emitObj.typr = LINK_TYPE;
        }
      }
      browser.runtime.sendMessage(emitObj);
    }
  });

  document.ondrop = (event) => {
    if (!preventDrop) {
      event.preventDefault();
    }
  };

  document.ondragover = (event) => {
    event.preventDefault();
    if (IGNORED_TAG.includes(event.target.nodeName)) {
      preventDrop = true;
    } else {
      distance = Math.hypot(event.clientX - start.x, event.clientY - start.y);
      preventDrop = false;
    }
  };
};
