The flickr Gallery App
______________________


running application
__________________

1. npm run build
2. npm start


The flickr gallery app is a React application that is used to retrieve images from flickr and paint them to a view for the user in a grid format. The solution uses a single view in App js that calls upon an individual image component in a map function to paint multiple images. 

Methods to make a fetch call to retrieve the images, handle scroll for updates and getting the size in bytes are abstracted away from the main application components to allow for reusability and use coupling of functionalities. The gallery itself uses a simple css to display the images in an appealing way regardless of their sizing. And onclick it allows for the user to focus on the single image and see extra meta data related specifically to that image.

Functions handleUpdate and doUpdate are seperated as to avoid repeting code and allow for the main view to be updated from different components in the future if necessary. The same can be said for the ImageComponent as making it a component allows for us to use the imageComponent for the single enlarged view as well.

There weren't too made trade-offs that had to be made due to the limited functionality of this app but if I were to improve it I would add an interactive load more button that would present a spinning wheel as the fetch request was running. I would consider adding different views to accomodate for users preferences that would be controlled via state and simple css rules. 

One important thing I would do is also set the live image to have its own state and not be determined by an index in the images array in state. By having its own state it would not change whenever the application fetches more images.

Higher level additions include:
- an algorithm API to remove undesirable images from the view.
- functionality to grab the width of an image and center it while ensuring that its height does not venture past the screen. Centering images by width and height in the center of screen
- an ability to select the page you want to view
- option to choose the amount of images to display per fetch
- throttling ability to throttle fetch requests to the server

