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
		// verbose.printOK(`[+] Grath path created (${this.x}-${this.y})`);
		return this;
	}
}
module.exports = GrassPatch;
