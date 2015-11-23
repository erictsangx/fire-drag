/**
 * Created by erictsangx on 23/11/2015.
 */

(()=> {
    const elementRef = document.getElementById('setEngine');
    self.port.on('searchEngineList', (msg)=> {
        elementRef.innerHTML = msg.engines.map((element)=> {
            if (msg.selected === element) {
                return `<option value="${element}" selected>${element}</option>`;
            }
            return `<option value="${element}">${element}</option>`;
        });
    });
    elementRef.addEventListener('change', function (event) {
        self.port.emit('setSearchEngine', event.target.value);
    });
})();

