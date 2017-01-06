import { getSearchUrl, getPhotoSnapshotUrl } from './FlickrHelper.js';
import { TWELVE_MONTHS } from './Month.js';

test('getSearchUrl should have dates', () => {
    const april = TWELVE_MONTHS[3];
    expect(getSearchUrl("Uyuni", april)).not.toContain("undefined");
});

test('getPhotoFileUrl', () => {
    let photoInfo = {
        farm: 1, 
        server: 2, 
        id: 3, 
        secret: "secret4"
    };
    expect(getPhotoSnapshotUrl(photoInfo)).toBe("https://farm1.staticflickr.com/2/3_secret4.jpg");
});

