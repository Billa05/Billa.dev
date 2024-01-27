const axios = require('axios');
module.exports = async (req, res) => {
    let activity = []

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');


    try {
        const response = await axios.get('https://api.github.com/users/BIlla05/events', {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
            }
        });

        if (response.status < 200 || response.status >= 300) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.data;

        for (let i=0;i<data.length;i++){
            let date = new Date(data[i]?.created_at);
            let repo_name = data[i]?.repo?.name;
            let issue_title = data[i]?.payload?.issue?.title;
            let commit_msg = data[i]?.payload?.commits?.[0]?.message;

            let existingActivity = activity.find(a => a.issue_title === issue_title);

            if (existingActivity) {
                let existingDate = new Date(existingActivity.date);
                if (date > existingDate) {
                    let index = activity.indexOf(existingActivity);
                    activity[index] = {
                        date: date,
                        repo_name: repo_name,
                        issue_title: issue_title,
                        commit_msg: commit_msg
                    };
                }
            } else {
                activity.push({
                    date: date,
                    repo_name: repo_name,
                    issue_title: issue_title,
                    commit_msg: commit_msg
                });
            }
        }

        res.json(activity.reverse());
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};