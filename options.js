// import {createBrowseBlocker,
//     createRelatedBlocker,
//     removeBrowseBlocker,
//     removeRelatedBlocker} from './styles';

function onStart () {
    onInstall(); // TODO: run only at install

    createBrowseBlocker();
    createRelatedBlocker();
}

onStart();

function onInstall () {
    var defaultPrefs = {
        "browse-block": true,
        "related-block": true
    }
    setPreferences(defaultPrefs);
}

function setPreferences (text) {
    chrome.storage.sync.set({ norec_prefs: text });
}

function getPreferences () {
    var prefs;
    chrome.storage.sync.get('norec_prefs', function(data) {
        prefs = data.norec_prefs;
    });
    return prefs;
}

var relatedID = 'no-recs-related-style';
var browseID = 'no-recs-browse-style';

function removeRelatedBlocker () {
    document.getElementById(relatedID).remove();
}

function removeBrowseBlocker () {
    document.getElementById(browseID).remove();
}

function createRelatedBlocker () {
    var related = document.createElement('style');
    related.id = relatedID;

    related.innerHTML = `
    #related {
        visibility: hidden;
    }
    `;

    createElementHead(related);
}

function createBrowseBlocker () {
    var browse = document.createElement('style');
    browse.id = browseID;

    browse.innerHTML = `
    .ytd-browse {
        visibility: hidden;
    }
    `;

    createElementHead(browse);
}

function createElementHead(element){
    if (document.head) {
        document.head.append(element);
    } else {
        const root = document.documentElement;
        root.append(element);
        const observer = new MutationObserver(() => {
            if (document.head) {
                observer.disconnect();
                if (element.isConnected) {
                    document.head.append(element);
                }
            }
        });
        observer.observe(root, {childList: true});
    }
}