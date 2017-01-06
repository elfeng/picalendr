import { getSearchUrl, getPhotoSnapshotUrl } from './FlickrURLs.js';
import { TWELVE_MONTHS } from './Month.js';

test('getSearchUrl should have dates', () => {
    const january = TWELVE_MONTHS[0];
    const january1st2016Seconds = 1451602800; // currentmillis.com
    const february1st2016Seconds = 1454281200; // currentmillis.com

    const searchUrl = getSearchUrl("Uyuni", january, 2016);
    
    expect(searchUrl).not.toContain("undefined");
    expect(searchUrl).toContain(january1st2016Seconds);
    expect(searchUrl).toContain(february1st2016Seconds);
});

test('getPhotoSnapshotUrl', () => {
    let photoInfo = {
        farm: 1, 
        server: 2, 
        id: 3, 
        secret: "secret4"
    };
    expect(getPhotoSnapshotUrl(photoInfo)).toBe("https://farm1.staticflickr.com/2/3_secret4.jpg");
});

