require('dotenv').config();


async function fetchData() {
    let activity = []

    try {
        const response = await fetch('https://api.github.com/users/BIlla05/events', {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const keys = Object.keys(data[0]);
        

        for (let i=0;i<data.length;i++){
            let date = new Date(data[i]?.created_at);
            let repo_name = data[i]?.repo?.name;
            let repo_url = repo_name ? "https://github.com/"+repo_name : undefined;
            let issue_title = data[i]?.payload?.issue?.title;
            let commit_msg = data[i]?.payload?.commits?.[0]?.message;

            let existingActivity = activity.find(a => a.issue_title === issue_title);

            if (existingActivity) {
                let existingDate = new Date(existingActivity.date);
                if (date > existingDate) {
                    // Replace the existing activity with the new one
                    let index = activity.indexOf(existingActivity);
                    activity[index] = {
                        date: date,
                        repo_name: repo_name,
                        repo_url: repo_url,
                        issue_title: issue_title,
                        commit_msg: commit_msg
                    };
                }
            } else {
                activity.push({
                    date: date,
                    repo_name: repo_name,
                    repo_url: repo_url,
                    issue_title: issue_title,
                    commit_msg: commit_msg
                });
            }
        }

        return activity;
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchData().then(responseData => {
    console.log(responseData);
});