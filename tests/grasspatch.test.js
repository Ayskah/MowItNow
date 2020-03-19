const Mown = require("../mown");
const GrassPatch = require("../grasspatch");
jest.mock("../mown");
afterEach(() => {
	Mown.mockClear();
});
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
test("Should add a mown on a grasspatch", () => {
	const grassPatch = new GrassPatch({
		x: 5,
		y: 5,
	}).addMown(new Mown());
	expect(grassPatch.mowns.length).toBe(1);
});
test("Should crash when activating a wrong mown instruction", async () => {
	const grassPatch = new GrassPatch();
	grassPatch.addMown(new Mown({
		posx: 0,
		posy: 0,
		orientation: "N",
		instructions: "B",
	}));
	try {
		await grassPatch.activateMowns().throw();
	} catch (e) {
		console.log(e);
	}
});
