console.log(window.location.pathname);

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

function setPreferences (obj) {
    chrome.storage.local.set(obj); // TODO : change local to sync
}