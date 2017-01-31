import FlickrExifTagWrapper from './FlickrExifTagWrapper';

export const testExifTag = {
    tagspace: "ExifIFD",
    tagspaceid: 0,
    tag: "DateTimeOriginal",
    label: "Date and Time (Original)",
    raw: {
        _content: "2014:02:21 01:42:07"
    }
};

describe("hasName", () => {

    it("should return true when the tag name is known", () => {

        const tagWrapper = new FlickrExifTagWrapper(testExifTag);
        expect(tagWrapper.hasName("DateTimeOriginal")).toBe(true);
    });

    it("should return false when the tag name is not known", () => {

        const tagWrapper = new FlickrExifTagWrapper(testExifTag);
        expect(tagWrapper.hasName("DateTaken")).toBe(false);
    });
});



describe("isCreationTagWithDate", () => {

    it("should return false when the date is not correct", () => {

        const tag = {
            tag: "DateTimeOriginal",
            raw: {
                _content: "Invalid date"
            }
        };

        const tagWrapper = new FlickrExifTagWrapper(tag);
        expect(tagWrapper.isCreationTagWithDate("2014:02:21")).toBe(false);
    });

    it("should return true with a DateTimeOriginal tag and a true date", () => {

        const tag = {
            tag: "DateTimeOriginal",
            raw: {
                _content: "2014:02:21 01:42:07"
            }
        };

        const tagWrapper = new FlickrExifTagWrapper(tag);
        expect(tagWrapper.isCreationTagWithDate("2014:02:21")).toBe(true);
    });

    it("should return false with an unknown tag and a true date", () => {

        const tag = {
            tag: "DateCreated",
            raw: {
                _content: "2014:02:21 01:42:07"
            }
        };

        const tagWrapper = new FlickrExifTagWrapper(tag);
        expect(tagWrapper.isCreationTagWithDate("2014:02:21")).toBe(true);
    });

});
