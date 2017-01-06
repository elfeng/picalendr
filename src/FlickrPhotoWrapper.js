import moment from 'moment';
import { getPhotoSnapshotUrl } from './FlickrURLs';

/**
 * Wrapper for Flickr "getInfo" responses;
 */
export default class FlickrPhotoWrapper {

    constructor(photoInfo) {
        this.photo = photoInfo.photo;
    }

    isDateTakenKnown() {
        const takenunknown = this.photo.dates.takenunknown;
        return this.photo.dates.taken !== null &&
            (takenunknown === "0" || takenunknown === 0) &&
            this.isGranularityPreciseEnough();
    }

    /**
     * see https://www.flickr.com/services/api/misc.dates.html
     */
    isGranularityPreciseEnough() {
        const granularity = this.photo.dates.takengranularity;
        return granularity < 5;
    }

    getSnapshotUrl() {
        return getPhotoSnapshotUrl(this.photo);
    }

    getLinkUrl() {
        return this.photo.urls.url[0]._content;
    }

    getDateTakenFormatted() {
        const dateTakenAsMillis = Date.parse(this.photo.dates.taken);
        const dateTakenAsMoment = moment(dateTakenAsMillis);
        return dateTakenAsMoment.format('LL');
    }

};
