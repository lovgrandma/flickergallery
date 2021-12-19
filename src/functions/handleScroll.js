/**
 * Will determine if user is at the bottom of a page to update  image feed
 * @param {event} e 
 * @returns {boolean}
 */

export default function handleScroll(e) {
    // author: enqtran/[ReactJS] Detect Scrolls To Bottom
    // https://gist.github.com/enqtran/25c6b222a73dc497cc3a64c090fb6700
    try {
        if (window && document) {
            if (document.documentElement) {
                const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
                const body = document.body;
                const html = document.documentElement;
                const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
                const windowBottom = windowHeight + window.pageYOffset;
                if (windowBottom >= docHeight) {
                    return true; // at the bottom
                }
            }
        }
        return false;
    } catch (err) {
        return false;
    }
}