const gettingItem = browser.storage.local.get("prefs");

gettingItem.then(results => {
    console.log(results);
    const {prefs} = results;
    initSearchIn(prefs);
    initOpenIn(prefs);
    initThreshold(prefs);
});

function initSearchIn(prefs) {
    $(`input:radio[name=searchIn][value=${prefs.searchIn}]`).prop("checked", true);
    $('input:radio[name=searchIn]').change(() => {
        prefs.searchIn = $('input:radio[name=searchIn]:checked').val();
        browser.storage.local.set({prefs});
    })
}

function initOpenIn(prefs) {
    $(`input:radio[name=openIn][value=${prefs.openIn}]`).prop("checked", true);
    $('input:radio[name=openIn]').change(() => {
        prefs.openIn = $('input:radio[name=openIn]:checked').val();
        browser.storage.local.set({prefs});
    })
}

function initThreshold(prefs) {
    const input = $("#threshold");
    input.val(prefs.threshold);
    input.on('input', event => {
        event.preventDefault();
        const value = event.target.value;
        if (!isNaN(value) && value >= 0) {
            input.val(value);
            prefs.threshold = value;
            browser.storage.local.set({prefs});
        } else {
            input.val(0)
        }
    });
}