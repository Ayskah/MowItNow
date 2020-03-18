const Setup = require("./setup");
(async () => {
	// Setup according to the file input
	const grassPatchs = new Setup().parseInstructions();
	for (gp of grassPatchs) await gp.activateMowns();
})();
