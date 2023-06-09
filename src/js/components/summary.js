import { barChart } from "./barChart.js";
import { overall } from "./overallScore.js";
import { worldMap } from "./worldMap.js";

const summaryCity = document.getElementById('summaryCity');

export function summary(cityData) {
    // Clear previous content
    summaryCity.innerHTML = '';

    // Create title element
    const titleEl = document.createElement('h2');
    titleEl.textContent = cityData.name;
    titleEl.classList.add('text-left', 'text-[#FA9746]', 'm-4');

    // Create summary paragraph element
    const summaryEl = document.createElement('p');
    summaryEl.classList.add('m-4', 'text-left', 'text-[#667076]', 'text-base');

    if (cityData.categories.categories) {
        summaryEl.innerHTML = cityData.categories.summary;
    } else {
        summaryEl.textContent = 'No summary available';
    }

    // Create "Learn More" button
    const buttonEl = document.createElement('button');
    buttonEl.textContent = 'LEARN MORE';
    buttonEl.classList.add('learn');

    buttonEl.addEventListener('click', () => {
        const categories = document.getElementById('categories')
        categories.classList.remove('hidden');
        categories.classList.add('block');
        categories.scrollIntoView({ behavior: 'smooth' });

        // Call the necessary functions for additional content
        barChart(cityData);
        worldMap(cityData);
        overall(cityData);
    });

    summaryCity.append(titleEl, summaryEl, buttonEl);
}
