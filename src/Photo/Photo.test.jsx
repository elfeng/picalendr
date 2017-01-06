import { formatDateTaken } from './Photo.jsx';

test("formatDateTaken", () => {

    const seconds31122016 = 1483138800; //currentmillis.com

    expect(formatDateTaken(seconds31122016)).toBe("December 31, 2016");
});