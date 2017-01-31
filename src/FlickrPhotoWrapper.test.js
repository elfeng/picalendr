import FlickrPhotoWrapper from './FlickrPhotoWrapper.js';

describe("hasAnExifTagWithDateTaken", () => {

    it("should return false when there are no tags", () => {
        const photo = new FlickrPhotoWrapper({
            "photo": {
                "dates": {}
            }
        }, {});
        expect(photo.hasAnExifTagWithDateTaken()).toBe(false);
    });


    it("should return false when there is a tag with an unrelated name", () => {
        const photo = new FlickrPhotoWrapper({
            "photo": {
                "dates": {}
            }
        }, {
                "photo": {
                    "exif": [{
                        "tag": "OtherTag",
                        "raw": {
                            "_content": "OtherValue"
                        }
                    }]
                }
            });
        expect(photo.hasAnExifTagWithDateTaken()).toBe(false);
    });


    it("should return true when there is a DateTimeOriginal tag", () => {
        const photo = new FlickrPhotoWrapper({
            "photo": {
                "dates": {
                    "taken": "2016-09-04 21:17:35",
                    "takengranularity": "0",
                    "takenunknown": 0
                },
            }
        }, {
                "photo": {
                    "exif": [{
                        "tag": "DateTimeOriginal",
                        "raw": {
                            "_content": "2016:09:04"
                        }
                    }]
                }
            });
        expect(photo.hasAnExifTagWithDateTaken()).toBe(true);
    });

});

describe("isDateTakenKnown", () => {

    it("should return false the date taken attribute is not set", () => {

        const infoResponse = {
            "photo": {
                "dateuploaded": "1473426706",
                "dates": {
                    "posted": "1473426706",
                    "taken": null,
                    "takengranularity": "0",
                    "takenunknown": "0",
                    "lastupdate": "1473427921"
                },
            }
        };

        const photo = new FlickrPhotoWrapper(infoResponse, {});
        expect(photo.isDateTakenKnown()).toBe(false);
    });

    it("should return false when the date taken is not precise enough", () => {

        const infoResponse = {
            "photo": {
                "dateuploaded": "1473426706",
                "dates": {
                    "posted": "1473426706",
                    "taken": "2016-09-04 21:17:35",
                    "takengranularity": "5",
                    "takenunknown": "0",
                    "lastupdate": "1473427921"
                },
            }
        };

        const photo = new FlickrPhotoWrapper(infoResponse, {});
        expect(photo.isDateTakenKnown()).toBe(false);
    });

    it.only("should return true when the taken date is known", () => {

        const infoResponse = {
            "photo": {
                "dateuploaded": "1473426706",
                "dates": {
                    "posted": "1473426706",
                    "taken": "2016-09-04 21:17:35",
                    "takengranularity": "0",
                    "takenunknown": 0,
                    "lastupdate": "1473427921"
                },
            }
        };

        const exifResponse = {
            "photo": {
                "exif": [{
                    "tag": "DateTimeOriginal",
                    "raw": {
                        "_content": "2016:09:04 01:42:07"
                    }
                }]
            }
        };

        const photo = new FlickrPhotoWrapper(infoResponse, exifResponse);
        expect(photo.isDateTakenKnown()).toBe(true);
    });

    it("should return false when the takenunknown attribute is not equal to 0", () => {

        const infoResponse = {
            "photo": {
                "dateuploaded": "1473426706",
                "dates": {
                    "posted": "1473426706",
                    "taken": "2016-09-04 21:17:35",
                    "takengranularity": "0",
                    "takenunknown": "1",
                    "lastupdate": "1473427921"
                },
            }
        };

        const photo = new FlickrPhotoWrapper(infoResponse, {});
        expect(photo.isDateTakenKnown()).toBe(false);
    });

    it("should return false when the takenunknown attribute is not set", () => {

        const infoResponse = {
            "photo": {
                "dateuploaded": "1473426706",
                "dates": {
                    "posted": "1473426706",
                    "taken": "2016-09-04 21:17:35",
                    "takengranularity": "0",
                    "takenunknown": null,
                    "lastupdate": "1473427921"
                },
            }
        };

        const photo = new FlickrPhotoWrapper(infoResponse, {});
        expect(photo.isDateTakenKnown()).toBe(false);
    });

});

describe("getDateTakenAsPlainText", () => {

    it("should be formatted as expected", function () {
        const infoResponse = {
            "photo": {
                "dates": {
                    "taken": "2016-09-04 21:17:35"
                },
            }
        };

        const photo = new FlickrPhotoWrapper(infoResponse, {});
        expect(photo.getDateTakenAsPlainText()).toBe("September 4, 2016");

    });
});

describe("getDateTakenWithExifFormat", () => {

    it("should be formatted as expected", function () {
        const infoResponse = {
            "photo": {
                "dates": {
                    "taken": "2016-09-04 21:17:35"
                },
            }
        };

        const photo = new FlickrPhotoWrapper(infoResponse, {});
        expect(photo.getDateTakenWithExifFormat()).toBe("2016:09:04");
    });

});
