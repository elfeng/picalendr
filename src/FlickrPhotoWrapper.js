import moment from 'moment';
import FlickrExifTagWrapper from './FlickrExifTagWrapper';
import { getPhotoSnapshotUrl } from './FlickrURLs';
import { some, map } from "lodash"

/**
 * Wrapper for Flickr "getInfo" responses;
 */
export default class FlickrPhotoWrapper {

    constructor(photoInfo, photoExif) {
        this.photo = photoInfo.photo;
        this.exifTags = [];
        if (photoExif && photoExif.photo) {
            this.exifTags = map(photoExif.photo.exif, tag => new FlickrExifTagWrapper(tag));
        }
    }

    isDateTakenKnown() {
        return this.photo && this.photo.dates.taken !== null &&
            this.isTakenunknownAttributeFalse() &&
            this.isGranularityPreciseEnough() &&
            this.hasAnExifTagWithDateTaken();
    }

    /**
     * see https://www.flickr.com/services/api/misc.dates.html
     */
    isGranularityPreciseEnough() {
        const granularity = parseInt(this.photo.dates.takengranularity, 10);
        return granularity < 5;
    }

    isTakenunknownAttributeFalse() {
        const takenunknown = parseInt(this.photo.dates.takenunknown, 10);
        return takenunknown === 0;
    }

    hasAnExifTagWithDateTaken() {
        const dateTakenAsExif = this.getDateTakenWithExifFormat();
        const tagWithDateTaken = some(this.exifTags, function (exifTag) {
            return exifTag.isCreationTagWithDate(dateTakenAsExif);
        });
        return tagWithDateTaken;
    }

    getId(){
        return this.photo.id;
    }

    getSnapshotUrl() {
        return getPhotoSnapshotUrl(this.photo);
    }

    getLinkUrl() {
        return this.photo.urls.url[0]._content;
    }

    getTitle() {
        return this.photo.title._content;
    }

    getDateTakenAsMillis() {
        const dateTakenAsMillis = Date.parse(this.photo.dates.taken);
        return moment(dateTakenAsMillis);
    }

    /**
     * @return a plain text date such as "April 1, 2015". 
     */
    getDateTakenAsPlainText() {
        return this.getDateTakenAsMillis().format('LL');
    }

    /**
     * @return an EXIF-formatted date such as "2015:04:01". 
     */
    getDateTakenWithExifFormat() {
        return this.getDateTakenAsMillis().format('YYYY:MM:DD');
    }

};
