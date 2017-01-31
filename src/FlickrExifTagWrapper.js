/**
 * Wrapper for Flickr "getExif" responses tags;
 */
export default class FlickrExifTagWrapper {

    constructor(exifTag) {
        this.name = exifTag.tag;
        this.value = exifTag.raw._content;
    }

    isCreationTagWithDate(dateTakenAsExif) {
        return this.hasDateTaken(dateTakenAsExif) && (
            this.hasName("DateTimeOriginal") 
            ||
            this.hasName("DateCreated")
        );
    }

    hasName(tagName) {
        return this.name.indexOf(tagName) === 0;
    }

    hasDateTaken(dateTakenAsExif) {
        return this.value.indexOf(dateTakenAsExif) >= 0;
    }

};
