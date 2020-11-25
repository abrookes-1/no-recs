var relatedID = 'no-recs-related-style';
var browseID = 'no-recs-browse-style';

export function removeRelatedBlocker(){
    document.getElementById(relatedID).remove();
}

export function removeBrowseBlocker(){
    document.getElementById(browseID).remove();
}

export function createRelatedBlocker(){
    var related = document.createElement('style');
    related.id = relatedID;

    related.innerHTML = `
    #related {
        visibility: hidden;
    }
    `;

    createElementHead(related);
}

export function createBrowseBlocker(){
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
// document.addEventListener("loadstart", onReady);