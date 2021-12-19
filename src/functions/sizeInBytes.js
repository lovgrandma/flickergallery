/**
 * Will retrieve size in bytes from url
 * @param {string} url 
 * @returns string
 */
export default async function sizeInByes(url) {
    try {
        let response = await fetch('url');
        let data = await response.blob();
        let metadata = {
            type: 'image/jpeg'
        };
        let file = new File([data], "test.jpg", metadata);
        return file.size;
    } catch (err) {
        console.log(err);
    }
}