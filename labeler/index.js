const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        const token = core.getInput('token', { required: true });
        const owner = core.getInput('owner', { required: true });
        const repo  = core.getInput('repo',  { required: true });
        const issue = core.getInput('issue', { required: true });
        const label = core.getInput('label', { required: true });

        const client = new github.GitHub(token);
        await client.issues.addLabels({
            owner,
            repo,
            issue_number: issue,
            labels: [label]
        });

        core.info(`Added label "${label}" to issue #${issue} in repository ${owner}/${repo}.`);
    } catch (error) {
        core.error(error);
        core.setFailed(error.message);
    }
}

run();
