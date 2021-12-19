
/**
 * Will get images in a fetch request from flickr api
 * @param {number} amnt 
 * @param {number} offset 
 * returns {Object}
 */
export default async function getImages(amnt, pg) {
    try {
        // Generic search route was disabled. Used getRecent API call instead
        return await fetch('https://www.flickr.com/services/rest/?api_key=ac070c2af7beaf16b7fd1c4737bd3829&method=flickr.photos.getRecent&format=json&nojsoncallback=?&size=true&extras=url_o&page=' + pg + '&per_page=' + amnt)
        .then((response) => {
            return response.json();
        })
        .then(async (data) => {
            return data;
        })
        .catch((err) => {
            return  err;
        });
    } catch (err) {
        return err;
    }
}
