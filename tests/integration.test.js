const Mown = require("../mown");
const GrassPatch = require("../grasspatch");
beforeEach(() => {
	jest.spyOn(process.stdout, "write").mockImplementation(() => { });
});
test("Should create a 5x5 grasspatch", () => {
	const grassPatch = new GrassPatch({
		x: 5,
		y: 5,
	});
	expect(grassPatch.x).toBe(5);
	expect(grassPatch.y).toBe(5);
});
test("Should create a mown @ 1 2 towards N", () => {
	const mown = new Mown({
		posx: 1,
		posy: 2,
		orientation: "N",
	});
	expect(mown.posx).toBe(1);
	expect(mown.posy).toBe(2);
	expect(mown.orientation).toBe("N");
});
test("Should create a mown @ 3 3 towards E", () => {
	const mown = new Mown({
		posx: 3,
		posy: 3,
		orientation: "E",
	});
	expect(mown.posx).toBe(3);
	expect(mown.posy).toBe(3);
	expect(mown.orientation).toBe("E");
});
test("Should set instruction set GAGAGAGAA to 1 2 N", () => {
	const mown = new Mown({
		posx: 3,
		posy: 3,
		orientation: "E",
		instructions: "GAGAGAGAA",
	});
	expect(mown.instructions).toBe("GAGAGAGAA");
});
test("Should set instruction set AADAADADDA to 3 3 E", () => {
	const mown = new Mown({
		posx: 3,
		posy: 3,
		orientation: "E",
		instructions: "AADAADADDA",
	});
	expect(mown.instructions).toBe("AADAADADDA");
});
test("Should run GAGAGAGAA instructions from 1 2 N", async () => {
	const grassPatch = new GrassPatch({
		x: 5,
		y: 5,
	});
	const mown = new Mown({
		posx: 1,
		posy: 2,
		orientation: "N",
		instructions: "GAGAGAGAA",
	});
	grassPatch.addMown(mown);
	await grassPatch.activateMowns();
	expect(mown.posx).toBe(1);
	expect(mown.posy).toBe(3);
	expect(mown.orientation).toBe("N");
});
test("Should run AADAADADDA instructions from 3 3 E", async () => {
	const grassPatch = new GrassPatch({
		x: 5,
		y: 5,
	});
	const mown = new Mown({
		posx: 3,
		posy: 3,
		orientation: "E",
		instructions: "AADAADADDA",
	});
	grassPatch.addMown(mown);
	await grassPatch.activateMowns();
	expect(mown.posx).toBe(5);
	expect(mown.posy).toBe(1);
	expect(mown.orientation).toBe("E");
});
