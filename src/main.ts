import { getInput, setFailed } from '@actions/core';
import { exec } from '@actions/exec';
import { join } from 'path';

async function run() {
	const project = getInput('project');
	const build = getInput('build');
	const executable = getInput('executable');
	console.log(`##[add-matcher]${join(__dirname, '..', '.github', 'tsc.json')}`);

	const tscPath = `${join(process.cwd(), 'node_modules/.bin', executable)}`;

	let args = ['--max-old-space-size=8192', tscPath, '--pretty', 'false'];

	if (project) {
		args = [...args, '--project', project];
	}
	if (build) {
		// --noEmit and --noErrorTruncation are unsupported with --build,
		// and incremental is required for composite builds
		args = [...args, '--build', build, '--incremental', 'true'];
	} else {
		args = [
			...args,
			'--noEmit',
			'--noErrorTruncation',
			'--incremental',
			'false',
		];
	}

	try {
		await exec('node', [tscPath, '--version']);
		await exec('node', args);
	} catch (error) {
		setFailed('');
	}
}

void run();
