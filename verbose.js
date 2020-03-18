const chalk = require('chalk');
// eslint-disable-next-line no-unused-vars
const verbose = module.exports = {
	// Colored outputs
	printOK: (text) => console.log(chalk.bold.green(text)),
	printNOK: (text) => console.log(chalk.bold.red(text)),
	printMEH: (text) => process.stdout.write(chalk.bold.yellow(text)),
	/**
	 * @description Display a title
	 * @param {String} title Display a title
	 */
	displayTitle(title) {
		console.log(
			`\n${chalk.bold.blue('------------------')}`,
			`\n${chalk.bold(title)}`,
			`\n${chalk.bold.blue('------------------')}`,
		);
	},
};
