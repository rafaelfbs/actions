const core = require('@actions/core');
const github = require('@actions/github');

function extractIssueFromCardContentUrl(contentUrl) {
    const match = contentUrl.match(/issues\/(\d+)$/);
	if (!match) {
		throw new Error('Failed to get issue id');
	}

	return parseInt(match[1], 10);
}

async function run() {
    try {
        const token = core.getInput('token', { required: true });
        const cardId = core.getInput('card',  { required: true });

        const client = new github.GitHub(token);
        const card = await client.projects.getCard({ card_id: cardId.toString() });
        const issueId = extractIssueFromCardContentUrl(card.data.content_url);

        core.setOutput('issue', issueId.toString());
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
