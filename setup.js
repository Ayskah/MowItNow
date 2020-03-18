const GrassPatch = require("./grasspath");
const Mown = require("./mown");
const verbose = require("./verbose");
const fs = require("fs");

/**
 * @description Parse the instruction file given by our API
 * @class Setup
 */
class Setup {
	/*
	  According to the specs, each lines of this file can be:
		  - A grass patch instance
		  - A mown instance (added to the most recent grass patch)
		  - A mown instructions (added to the most recent mown)
	  Step 1: each line separated by \n is parsed and sanitized, just to be sure.
	  Step 2: each parsed instruction is one of the three tasks above.
	  */
	/**
	 * Creates an instance of Setup.
	 */
	constructor() {
		verbose.displayTitle("File parsing");
		this.grasspatchs = [];
		try {
			// Step 1: line parsing and san
			this.rawFile = fs.readFileSync("./input.txt", { encoding: "utf-8" });
			this.parsedFile = this.rawFile.split(/\n/).map((_) => _.replace(/\r|\n/, ""));
			this.totalMownsCount = (_) =>
				this.grasspatchs.map(
					(gp) => gp.mowns).reduce((a, b) => a + b.length, 0);
			this.averageMownsCount = (_) => this.totalMownsCount() / this.totalGPCount();
			this.totalGPCount = (_) => this.grasspatchs.length;
			verbose.printOK(`${this.parsedFile.length} instructions parsed`);
			return this;
		} catch (e) {
			verbose.printNOK("Setup error");
			verbose.printNOK(e.stack);
			process.exit();
		}
	}
	/**
	 * @description Parse a set of raw instructions
	 * @return {Array} Parsed grass patchs
	 */
	parseInstructions() {
		verbose.displayTitle("Instructions parsing");
		// Step 2: instruction parsing
		let currentGrassPatch; let currentMown;
		for (const parsedInstruction of this.parsedFile) {
			// X X is probably a grass patch
			if (/^\d*\s\d*$/.test(parsedInstruction)) {
				// We're supposed to find the X/Y at the first and second index
				currentGrassPatch = new GrassPatch({
					x: parsedInstruction.split(/\s/)[0],
					y: parsedInstruction.split(/\s/)[1],
				});
				this.grasspatchs.push(currentGrassPatch);
			// X X N/S/E/W is probably a new mown
			} else if (/^\d*\s\d*\s[NSEW]$/.test(parsedInstruction)) {
				currentMown = new Mown({
					// The grass patch is already set up, according to the specs
					grasspatch: currentGrassPatch,
					// We're supposed to find the X at the first index
					posx: parsedInstruction.split(/\s/)[0],
					// The y position at the 2nd
					posy: parsedInstruction.split(/\s/)[1],
					// The orientation at the 3rd
					orientation: parsedInstruction.split(/\s/)[2],
				});
				currentGrassPatch.mowns.push(currentMown);
			// DGA composed string is probably the current mown instructions
			} else if (/^[DGA]+$/.test(parsedInstruction)) {
				// According to the specs, this instruction line is assigned to the most recently created mown
				currentMown.instructions = parsedInstruction;
			// Unknown instruction: exiting
			} else verbose.printNOK(`Unknown instruction ${parsedInstruction}`) || process.exit();
		}
		verbose.printOK(`${this.totalGPCount()} grasspatchs created - ${this.totalMownsCount()} mowns created (~${this.averageMownsCount()} per grasspatch)`);
		return this.grasspatchs;
	}
}
module.exports = Setup;
