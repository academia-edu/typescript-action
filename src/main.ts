import { getInput, setFailed } from '@actions/core';
import { exec } from '@actions/exec';
import { join } from 'path';

async function run() {
	const project = getInput('project');
	const build = getInput('build');
	const executable = getInput('executable');
	console.log(`##[add-matcher]${join(__dirname, '..', '.github', 'tsc.json')}`);

	let args = ['exec', executable, '--pretty', 'false'];

	if (project) {
		args = [...args, '--project', project];
	}
	if (build) {
		// --noEmit and --noErrorTruncation are unsupported with --build,
		// and incremental is required for composite builds
		args = [...args, '--build', build, '--incremental', 'true'];
	} else {
		args = [...args, '--noEmit', '--noErrorTruncation', '--incremental', 'false'];
	}

	try {
		await exec('npm', ['exec', executable, '--version']);
		await exec('npm', args);
	} catch (error) {
		setFailed('');
	}
}

void run();
