const verbose = require("./verbose");
/**
 * @description Mown handling
 */
class Mown {
	/**
	 * Creates an instance of Mown.
	 * @param {any} {} [{ posx = 0, posy = 0, orientation = "N", instructions = "" }={}]
	 */
	constructor({ posx = 0, posy = 0, orientation = "N", instructions = "" } = {}) {
		this.posx = posx;
		this.posy = posy;
		this.orientation = orientation;
		this.instructions = instructions;
		// Linked cardinal with clockwise 90° rotation
		this.orientations = {
			"N": { next: "E", prev: "W" },
			"E": { next: "S", prev: "N" },
			"W": { next: "N", prev: "S" },
			"S": { next: "W", prev: "E" },
		};
		return this;
	}
	/**
	 * @description 90° rotate the mown
	 * @param {Char} dir Direction of the turn (G=gauche, D=droite)
	 * @return {Mown} This
	 */
	rotate(dir) {
		this.orientation = (
			dir == "G" ?
				// Previous cardinal if "G"
				this.orientations[this.orientation].prev :
				// else next cardinal
				this.orientations[this.orientation].next
		);
		return this;
	}
	/**
	 * @description Move the mown, according to its current orientation and the current grass patch bounds. If OOB, don't do anything.
	 * @param {GrassPatch} grassPatch
	 * @return {Mown} This
	 */
	move(grassPatch) {
		// Up
		if (this.orientation == "N") this.posy = (this.posy++ < grassPatch.y ? this.posy++ : this.posy);
		// Down
		if (this.orientation == "S") this.posy = (this.posy-- < grassPatch.y ? this.posy-- : this.posy);
		// Right
		if (this.orientation == "E") this.posx = (this.posx++ < grassPatch.x ? this.posx++ : this.posx);
		// Left
		if (this.orientation == "W") this.posx = (this.posx-- < grassPatch.x ? this.posx-- : this.posx);
		return this;
	}
	/**
	 * @description Perform a required instruction
	 * @param {String} instruction Instruction to follow (D=droite/G=gauche/A=avancer)
	 * @param {GrassPatch} grassPatch Grass patch to move on
	 */
	async process(instruction, grassPatch) {
		return new Promise((resolve, reject) => {
			// Rotate
			if (/D|G/.test(instruction)) this.rotate(instruction);
			// Move
			else if (/A/.test(instruction)) this.move(grassPatch);
			// Unknown
			else reject(new Error("Instruction error: " + instruction));
			// If we're there, we've correctry processed the instruction
			resolve();
		});
	}
	/**
	 * @description Activate the given instructions routine
	 * @param {GrassPatch} grassPatch Grass patch to rotate on
	 */
	async activate(grassPatch) {
		return new Promise(async (resolve, reject) => {
			verbose.displayTitle(`Processing ${this.instructions} from [${this.posx}, ${this.posy}, ${this.orientation}]`);
			for (let [i, instruction] of this.instructions.split("").entries()) {
				await new Promise((resolve) => setTimeout(resolve, 50)).then(async () => {
					verbose.printMEH(`\t-> ${(i += 1)}/${this.instructions.length} instructions\r`);
					await this.process(instruction, grassPatch).catch((e) => {
						verbose.printNOK(e.message);
						reject(e);
					});
				});
			}
			this.emitPosition();
			resolve(this);
		});
	}
	/**
	 * @description Emit the mown position
	 */
	emitPosition() {
		verbose.printOK(`\t-> Mown @ ${this.posx}-${this.posy} towards ${this.orientation}`);
	}
}
module.exports = Mown;
