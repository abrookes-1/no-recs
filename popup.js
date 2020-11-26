document.addEventListener('DOMContentLoaded', function () {
    var btn1 = document.getElementById('browse-switch');

    btn1.addEventListener('change', function() {
        setPreferences({norec_browse_block: btn1.checked});
    });

    var btn2 = document.getElementById('related-switch');

    btn2.addEventListener('change', function() {
        setPreferences({norec_related_block: btn2.checked});
    });
});

window.onload = () => {
    setButtons();
}

function setButtons () {
    chrome.storage.local.get(['norec_browse_block', 'norec_related_block'], (stored) => {
        document.getElementById('browse-switch').checked = stored.norec_browse_block;
        document.getElementById('related-switch').checked = stored.norec_related_block;
    });
}

function setPreferences (obj) {
    chrome.storage.local.set(obj); // TODO : change local to sync
}