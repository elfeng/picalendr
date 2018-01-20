# Picalendr
A webapp to search Flickr photos by month

## Used technologies
 
* ECMAScript
* React
* axios
* create-react-app 
* Jest
* Yarn/npm
* Bootstrap 3
* Docker

## How to deploy the webapp with Docker

1. `git clone https://github.com/jffourmond/picalendr.git`
2. `cd picalendr`
3. Edit src/FlickrURLs.js and set the API_KEY const to [your Flickr application key](https://www.flickr.com/services/api/misc.api_keys.html)
4. `docker build -t picalendr .`
5. `sudo docker run -p 3001:3001 --name picalendr -t picalendr`

You can have a look at the webapp here : http://picalendr.jffourmond.com
