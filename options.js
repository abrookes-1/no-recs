
function onReady () {
    var browse = document.createElement('style');
    browse.id = 'no-recs-browse-style';
    // browse.type = 'text/css';
    // browse.textContent = css;

    browse.innerHTML = `
        .ytd-browse {
            visibility: hidden;
    }
    `;

    document.head.appendChild(browse);
}

document.addEventListener("loadstart", onReady);