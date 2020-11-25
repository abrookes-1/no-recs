// import {createBrowseBlocker,
//     createRelatedBlocker,
//     removeBrowseBlocker,
//     removeRelatedBlocker} from './styles';
var test;

function onStart () {
    onInstall(); // TODO: run only at install

    usePreferences();
}

onStart();

function onInstall () {
    var defaultPrefs = {
        "browse_block": true,
        "related_block": true
    }

    setPreferences(defaultPrefs);
}

function setPreferences (val) {
    chrome.storage.local.set({norec_prefs: val}); // TODO : change local to sync
}

function usePreferences () {
    chrome.storage.local.get('norec_prefs', (val) => { // TODO: change local to sync
        var prefs = val.norec_prefs;

        if (prefs.browse_block) {
            createBrowseBlocker();
        }
        if (prefs.related_block) {
            createRelatedBlocker();
        }
    });
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