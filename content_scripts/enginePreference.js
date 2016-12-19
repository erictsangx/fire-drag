/**
 * Created by erictsangx on 23/11/2015.
 */

(()=> {
    const elementRef = document.getElementById('setEngine');
    self.port.on('searchEngineList', (msg)=> {
        msg.engines.forEach((element)=> {
            const optionRef = document.createElement('option');
            optionRef.setAttribute('value', element);
            optionRef.textContent = element;
            if (msg.selected === element) {
                optionRef.setAttribute('selected', 'selected');
            }
            elementRef.appendChild(optionRef);
        });
    });
    elementRef.addEventListener('change', function (event) {
        self.port.emit('setSearchEngine', event.target.value);
    });
})();

