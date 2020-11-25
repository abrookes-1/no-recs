// import {createBrowseBlocker,
//     createRelatedBlocker,
//     removeBrowseBlocker,
//     removeRelatedBlocker} from './styles';
window.onInstall = onInstall;

// onStart();

function onStart () {
    usePreferences();
}

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
        
        removeBrowseBlocker(); // TODO: only remove if needed
        removeRelatedBlocker();

        if (prefs.browse_block) { // TODO: only create if not already there
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