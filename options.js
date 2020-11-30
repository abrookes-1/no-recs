// import {createBrowseBlocker,
//     createRelatedBlocker,
//     removeBrowseBlocker,
//     removeRelatedBlocker} from './styles';
onStart();

function onStart () {
    usePreferences();
    // defaults();
}

function defaults () {
    var default1 = {
        norec_browse_block: true
    }
    var default2 = {
        norec_related_block: true
    }

    setPreferences(default1);
    setPreferences(default2);
}

function setPreferences (obj) {
    chrome.storage.local.set(obj); // TODO : change local to sync
}

function usePreferences () {
    chrome.storage.local.get(['norec_browse_block', 'norec_related_block'], (stored) => { // TODO: change local to sync
        
        console.log(stored);

        removeBrowseBlocker(); // TODO: only remove if needed
        removeRelatedBlocker();

        console.log(stored.norec_browse_block);
        console.log(stored.norec_related_block);

        if (stored.norec_browse_block) { // TODO: only create if not already there
            console.log('one');
            createBrowseBlocker();
        }
        if (stored.norec_related_block) {
            console.log('two');
            createRelatedBlocker();
        }
    });
}

var relatedID = 'no-recs-related-style';
var browseID = 'no-recs-browse-style';

function removeRelatedBlocker () {
    if (document.getElementById(relatedID)){
        document.getElementById(relatedID).remove();
    }
}

function removeBrowseBlocker () {
    if (document.getElementById(browseID)){
        document.getElementById(browseID).remove();
    }
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