/**
 * Created by erictsangx on 5/10/2015.
 */

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


module.exports = () => {
  const start = {};
  let distance = 0;
  let dropOnInput = false;


  document.addEventListener('dragstart', (event) => {
    console.log('dragstart');
    start.x = event.clientX;
    start.y = event.clientY;
  }, false);


  document.addEventListener('dragend', (event) => {
    console.log('dragend');
    if (!dropOnInput) {
      event.preventDefault();
      const link = event.dataTransfer.getData('URL');
      const text = event.dataTransfer.getData('text');

      const emitObj = {
        content: '',
        search: true,
        distance
      };
      if (link) {
        emitObj.content = link;
        emitObj.search = false;
      } else {
        const parsed = parseLink(text);
        if (parsed.isLink) {
          emitObj.content = parsed.link;
          emitObj.search = false;
        } else {
          emitObj.content = text;
          emitObj.search = true;
        }
      }
      console.log('triggerDrop', emitObj);
      browser.runtime.sendMessage(emitObj);
    }
  });

  document.ondrop = (event) => {
    console.log('ondrop');
    if (!dropOnInput) {
      event.preventDefault();
    }
  };

  document.ondragover = (event) => {
    console.log('ondragover');

    event.preventDefault();
    if (event.target.nodeName === 'INPUT') {
      dropOnInput = true;
    } else {
      distance = Math.hypot(event.clientX - start.x, event.clientY - start.y);
      dropOnInput = false;
    }
  };
};
