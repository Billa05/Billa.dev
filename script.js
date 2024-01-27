let timeoutId;

async function fetchData() {
    const response = await fetch('https://billa05-github-io.vercel.app/api/fetchdata');
    const data = await response.json();
    return data;
}

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
        if (index==activity.length-1){
            descriptionDiv.className = 'absolute bottom-full mt-2 p-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded shadow opacity-0 ';
        }else{
            descriptionDiv.className = 'absolute top-full mt-2 p-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded shadow opacity-0 ';
        }
        if(!item.issue_title){
            descriptionDiv.innerHTML = `<p><a href="https://github.com/${item.repo_name}" target="_blank">repository: ${item.repo_name}</a></p>
        <br><p>Self Project</p>`;
        }else{
            descriptionDiv.innerHTML = `<p><a href="https://github.com/${item.repo_name}" target="_blank">repository: ${item.repo_name}</a></p>
        <br><p>Issue: ${item.issue_title}</p>`;
        }
        element.appendChild(descriptionDiv);

        container.appendChild(element);

        numberDiv.addEventListener("mouseenter",()=>{
            clearTimeout(timeoutId);
            descriptionDiv.classList.remove("opacity-0");
        })

        numberDiv.addEventListener("mouseleave",()=>{
            timeoutId = setTimeout(() => {
                descriptionDiv.classList.add("opacity-0");
            }, 200); // 200ms delay before hiding the description
        })

        descriptionDiv.addEventListener("mouseenter",()=>{
            clearTimeout(timeoutId);
        })

        descriptionDiv.addEventListener("mouseleave",()=>{
            descriptionDiv.classList.add("opacity-0");
        })

        element.addEventListener("mouseleave",()=>{
            descriptionDiv.classList.add("opacity-0");
        })

        if(index!=activity.length-1){
            const separator = document.createElement('div');
            separator.className = 'h-24 w-px bg-gray-300 dark:bg-gray-700';
            container.appendChild(separator);
        }
        
    });
});