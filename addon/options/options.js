const gettingItem = browser.storage.local.get("options");

gettingItem.then(results => {
    console.log(results);
    const {options} = results;
    initSearchIn(options);
    initOpenIn(options);
    initThreshold(options);
});

function initSearchIn(options) {
    $(`input:radio[name=searchIn][value=${options.searchIn}]`).prop("checked", true);
    $('input:radio[name=searchIn]').change(() => {
        options.searchIn = $('input:radio[name=searchIn]:checked').val();
        browser.storage.local.set({options});
    })
}

function initOpenIn(options) {
    $(`input:radio[name=openIn][value=${options.openIn}]`).prop("checked", true);
    $('input:radio[name=openIn]').change(() => {
        options.openIn = $('input:radio[name=openIn]:checked').val();
        browser.storage.local.set({options});
    })
}

function initThreshold(options) {
    const input = $("#threshold");
    input.val(options.threshold);
    input.on('input', event => {
        event.preventDefault();
        const value = event.target.value;
        if (!isNaN(value) && value >= 0) {
            input.val(value);
            options.threshold = value;
            browser.storage.local.set({options});
        } else {
            input.val(0)
        }
    });
}