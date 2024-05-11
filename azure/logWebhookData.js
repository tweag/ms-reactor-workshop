module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try {
        // Extract specific data from the payload
        const repositoryName = req.body.repository ? req.body.repository.name : 'Unknown';
        const pusherName = req.body.sender ? req.body.sender.login : 'Unknown';
        const ipAddress = req.headers['X-Forwarded-For'] || req.headers['x-forwarded-for'] || 'Unknown IP';
        const eventType = req.headers['x-github-event'] || 'Unknown event type';

        let commitMessage = 'Unknown';
        let branch = '';
        let workflowName = '';
        let workflowStatus = '';
        let jobName = '';
        let jobStatus = '';

        if (req.body.head_commit && req.body.head_commit.message) {
            commitMessage = req.body.head_commit.message;
        } else if (req.body.workflow_run && req.body.workflow_run.head_commit && req.body.workflow_run.head_commit.message) {
            commitMessage = req.body.workflow_run.head_commit.message;
            workflowName = req.body.workflow_run.name;
            workflowStatus = req.body.workflow_run.status;
        }

        if (eventType === 'push') {
            branch = req.body.ref;
        } else if (eventType === 'workflow_job') {
            jobName = req.body.workflow_job.name;
            jobStatus = req.body.workflow_job.status;
        }

        // Create a log object with all relevant information and the raw log
        const logEntry = {
            timestamp: new Date().toISOString(),
            eventType,
            repositoryName,
            pusherName,
            commitMessage,
            ipAddress,
            branch,
            workflowName,
            workflowStatus,
            jobName,
            jobStatus,
            RAW_LOG: JSON.stringify(req.body)  // Storing the entire request body as a raw log
        };

        // Log the entire object
        context.log(JSON.stringify(logEntry));

        // Send a response back to the caller
        context.res = {
            status: 200,
            body: "Webhook processed successfully"
        };

    } catch (error) {
        context.log('Error processing request:', error);
        context.res = {
            status: 500,
            body: "Error processing your request"
        };
    }
};
