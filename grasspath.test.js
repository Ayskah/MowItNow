const GrassPatch = require("./grasspath");
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
