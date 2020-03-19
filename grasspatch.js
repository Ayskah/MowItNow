const verbose = require("./verbose");

/**
 * @description Grass patch handling
 * @class GrassPatch
 */
class GrassPatch {
	/**
   * Creates an instance of GrassPatch.
   */
	constructor({ x = 0, y = 0 } = {}) {
		this.x = x;
		this.y = y;
		this.mowns = [];
		// verbose.printOK(`[+] Grath path created (${this.x}-${this.y})`);
		return this;
	}
	/**
	 * @description Add a mown on this grass patch
	 * @param {any} aMown
	 * @return {GrassPatch} This grasspatch
	 */
	addMown(aMown) {
		this.mowns.push(aMown);
		return this;
	}
	/**
	 * @description Activate the mowns' processes (async/await for each mown to finish its task before the next one begins)
	 */
	async activateMowns() {
		return new Promise(async (resolve, reject) => {
			verbose.printMEH("\n----------------");
			verbose.printMEH(`\n-> Activating ${this.mowns.length} mowns on a ${this.x}-${this.y} patch`);
			verbose.printMEH("\n----------------");
			for (const aMown of this.mowns) await aMown.activate(this);
			resolve();
		});
	}
}
module.exports = GrassPatch;
