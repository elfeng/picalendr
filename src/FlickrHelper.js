
const API_KEY = 'TMP_KEY';
const SAFE_SEARCH_ACTIVATED = 1;

export function getSearchUrl(search, month, year){
    return `https://api.flickr.com/services/rest/?method=flickr.photos.search&
    api_key=${API_KEY}&
    per_page=10&
    format=json&
    nojsoncallback=1&
    sort=relevance&
    safe_search=${SAFE_SEARCH_ACTIVATED}&
    text=${search}&
    min_taken_date=${month.getMinDateAsSeconds(year)}&
    max_taken_date=${month.getMaxDateAsSeconds(year)}`;
};

export function getPhotoInfoUrl({id}) {
    return `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&format=json&nojsoncallback=1&api_key=${API_KEY}&photo_id=${id}`;
};

export function getPhotoSnapshotUrl({farm, server, id, secret}){
    return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
};

export function getPhotoLinkUrl(photo){
    return photo.urls.url[0]._content;
};