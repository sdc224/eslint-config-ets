"use strict";

const assert = require("assert");
const eslint = require("eslint");
const path = require("path");
const conf = require("..");

// The source files to lint.
const repoFiles = ["test/bad.ts"];

// Use the rules defined in this repo to test against.
const eslintOpts = {
	useEslintrc: false,
	envs: Object.keys(conf.env),
	parserOptions: conf.parserOptions,
	rules: conf.rules
};

// Runs the linter on the repo files and asserts no errors were found.
const report = new eslint.CLIEngine(eslintOpts).executeOnFiles(repoFiles);
console.log(report);
assert.equal(report.errorCount, 0);
assert.equal(report.warningCount, 0);
repoFiles.forEach((file, index) => {
	assert(path.relative(file, report.results[index].filePath) === "");
	// Below line doesn't works well in Windows
	// assert(report.results[index].filePath.endsWith(file));
});
