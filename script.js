
import fetchData from './GIthubApi.js';

fetchData().then(activity => {
    const container = document.querySelector('.flex.flex-col.items-center.space-y-8');

    activity.forEach((item, index) => {
        const element = document.createElement('div');
        element.className = 'group relative';

        const numberDiv = document.createElement('div');
        numberDiv.className = 'flex items-center justify-center w-10 h-10 rounded-full bg-transparent border border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-white dark:hover:text-white transition-colors duration-500';
        numberDiv.innerHTML = `<span>${index + 1}</span>`;
        element.appendChild(numberDiv);

        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'absolute bottom-full mb-2 w-48 p-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200';
        if(!item.issue_title){
            descriptionDiv.innerHTML = `<p><a href="https://github.com/${item.repo_name}" target="_blank">repository: ${item.repo_name}</a></p>
        <br><p>Self Project</p>`;
        }else{
            descriptionDiv.innerHTML = `<p><a href="https://github.com/${item.repo_name}" target="_blank">repository: ${item.repo_name}</a></p>
        <br><p>Issue: ${item.issue_title}</p>`;
        }
        element.appendChild(descriptionDiv);

        container.appendChild(element);

        if(index!=activity.length-1){
            const separator = document.createElement('div');
            separator.className = 'h-24 w-px bg-gray-300 dark:bg-gray-700';
            container.appendChild(separator);
        }
        
    });
});