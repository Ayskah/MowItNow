const Mown = require("./mown");
const GrassPatch = require("./grasspath");
jest.mock("./grasspath");
afterEach(() => {
	GrassPatch.mockClear();
});
beforeEach(() => {
	// Mute verbose
	jest.spyOn(process.stdout, "write").mockImplementation(() => { });
});
test("Should create a mown", () => {
	const mown = new Mown({
		grasspatch: new GrassPatch(),
		posx: 0,
		posy: 0,
		orientation: "N",
	});
	expect(mown.posx).toBe(0);
	expect(mown.posy).toBe(0);
	expect(mown.orientation).toBe("N");
});
test("Should rotate a mown from N to W", () => {
	const mown = new Mown({
		grasspatch: new GrassPatch(),
		posx: 0,
		posy: 0,
		orientation: "N",
	}).rotate("G");
	expect(mown.orientation).toBe("W");
});
test("Should rotate a mown from N to E", () => {
	const mown = new Mown({
		grasspatch: new GrassPatch(),
		posx: 0,
		posy: 0,
		orientation: "N",
	}).rotate("D");
	expect(mown.orientation).toBe("E");
});
test("Should move a mown from x=0 to x=1", () => {
	const mown = new Mown({
		grasspatch: new GrassPatch(),
		posx: 0,
		posy: 0,
		orientation: "N",
	})
		// Rotate to face E
		.rotate("D")
		// Move towards E
		.move(new GrassPatch());
	expect(mown.posx).toBe(1);
});
test("Should move a mown from y=0 to y=1", () => {
	const mown = new Mown({
		grasspatch: new GrassPatch(),
		posx: 0,
		posy: 0,
		orientation: "N",
	}).move(new GrassPatch());
	expect(mown.posy).toBe(1);
});
