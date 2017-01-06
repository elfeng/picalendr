import PhotoListContainer from './PhotoListContainer';

describe("hasSearchReturned", () => {

    it("should return false when no search was done", () => {
        const component = new PhotoListContainer();
        expect(component.hasSearchReturned()).toBe(false);
    });

});

describe("hasSearchReturnedWithResults", () => {

    it("should return false when no search was done", () => {
        const component = new PhotoListContainer();
        expect(component.hasSearchReturnedWithResults()).toBe(false);
    });

    it("should return false when the results are empty", () => {
        const component = new PhotoListContainer();
        component.state.searchResults = [];
        expect(component.hasSearchReturnedWithResults()).toBe(false);
    });

    it("should return true when there are search results", () => {
        const component = new PhotoListContainer();
        component.state.searchResults = ["photo"];
        expect(component.hasSearchReturnedWithResults()).toBe(true);
    });

});


describe("hasSearchReturnedEmpty", () => {

    it("should return false when no search was done", () => {
        const component = new PhotoListContainer();
        expect(component.hasSearchReturnedEmpty()).toBe(false);
    });

    it("should return true when the results are empty", () => {
        const component = new PhotoListContainer();
        component.state.searchResults = [];
        expect(component.hasSearchReturnedEmpty()).toBe(true);
    });

    it("should return false when there are search results", () => {
        const component = new PhotoListContainer();
        component.state.searchResults = ["photo"];
        expect(component.hasSearchReturnedEmpty()).toBe(false);
    });

});