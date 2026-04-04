import { renderArticles } from './renderers/articles-renderer.js';
import { renderPresentations } from './renderers/presentations-renderer.js';
import { renderRepositories } from './renderers/repositories-renderer.js';
import { renderExperience } from './renderers/experience-renderer.js';
import { renderSkills } from './renderers/skills-renderer.js';
const fullpage_api = window.fullpage_api;
async function loadArticles() {
    const response = await fetch('data/articles.json');
    if (!response.ok) {
        throw new Error(`Failed to load articles: ${response.statusText}`);
    }
    return response.json();
}
async function loadPresentations() {
    const response = await fetch('data/presentations.json');
    if (!response.ok) {
        throw new Error(`Failed to load presentations: ${response.statusText}`);
    }
    return response.json();
}
async function loadRepositories() {
    const response = await fetch('data/repositories.json');
    if (!response.ok) {
        throw new Error(`Failed to load repositories: ${response.statusText}`);
    }
    return response.json();
}
async function loadExperience() {
    const response = await fetch('data/experience.json');
    if (!response.ok) {
        throw new Error(`Failed to load experience: ${response.statusText}`);
    }
    const experience = await response.json();
    return experience.sort((a, b) => getExperienceStartTimestamp(b.period) - getExperienceStartTimestamp(a.period));
}
function getExperienceStartTimestamp(period) {
    const match = period.match(/^([A-Za-z]{3})\s+(\d{4})/);
    if (!match) {
        return 0;
    }
    const monthMap = {
        Jan: 0,
        Feb: 1,
        Mar: 2,
        Apr: 3,
        May: 4,
        Jun: 5,
        Jul: 6,
        Aug: 7,
        Sep: 8,
        Oct: 9,
        Nov: 10,
        Dec: 11
    };
    const month = monthMap[match[1]];
    const year = Number(match[2]);
    if (month === undefined || Number.isNaN(year)) {
        return 0;
    }
    return Date.UTC(year, month, 1);
}
async function loadSkills() {
    const response = await fetch('data/skills.json');
    if (!response.ok) {
        throw new Error(`Failed to load skills: ${response.statusText}`);
    }
    return response.json();
}
async function initializeApp() {
    try {
        console.log('Loading data...');
        const [articles, presentations, repositories, experience, skills] = await Promise.all([
            loadArticles(),
            loadPresentations(),
            loadRepositories(),
            loadExperience(),
            loadSkills()
        ]);
        console.log('Data loaded successfully:', {
            articles: articles.length,
            presentations: presentations.length,
            repositories: repositories.length,
            experience: experience.length,
            skills: {
                technical: skills.technical.length,
                soft: skills.soft.length,
                businessAreas: skills.businessAreas.length
            }
        });
        const articlesContainer = document.querySelector('.section:has(h2.mb-4:first-child) .row.g-4');
        if (articlesContainer && articlesContainer.parentElement?.querySelector('h2')?.textContent === 'Articles') {
            articlesContainer.innerHTML = renderArticles(articles);
            console.log('✓ Articles rendered');
        }
        const presentationsSection = Array.from(document.querySelectorAll('.section')).find(section => section.querySelector('h2')?.textContent === 'Presentations');
        const presentationsContainer = presentationsSection?.querySelector('.row.g-4');
        if (presentationsContainer) {
            presentationsContainer.innerHTML = renderPresentations(presentations);
            console.log('✓ Presentations rendered');
        }
        const repositoriesSection = Array.from(document.querySelectorAll('.section')).find(section => section.querySelector('h2')?.textContent === 'Highlighted GitHub Repositories');
        const repositoriesContainer = repositoriesSection?.querySelector('.row.g-4');
        if (repositoriesContainer) {
            repositoriesContainer.innerHTML = renderRepositories(repositories);
            console.log('✓ Repositories rendered');
        }
        const experienceCarouselInner = document.querySelector('#companyCarousel .carousel-inner');
        if (experienceCarouselInner) {
            experienceCarouselInner.innerHTML = renderExperience(experience);
            resetExperienceCarouselToFirst();
            console.log('✓ Experience rendered');
        }
        const skillsRendered = renderSkills(skills);
        const technicalSkillsContainer = Array.from(document.querySelectorAll('h5')).find(h5 => h5.textContent === 'Technical Skills')?.nextElementSibling;
        if (technicalSkillsContainer) {
            technicalSkillsContainer.innerHTML = skillsRendered.technical;
            console.log('✓ Technical skills rendered');
        }
        const softSkillsContainer = Array.from(document.querySelectorAll('h5')).find(h5 => h5.textContent === 'Soft Skills')?.nextElementSibling;
        if (softSkillsContainer) {
            softSkillsContainer.innerHTML = skillsRendered.soft;
            console.log('✓ Soft skills rendered');
        }
        const businessAreasContainer = Array.from(document.querySelectorAll('h5')).find(h5 => h5.textContent === 'Business Areas')?.nextElementSibling;
        if (businessAreasContainer) {
            businessAreasContainer.innerHTML = skillsRendered.businessAreas;
            console.log('✓ Business areas rendered');
        }
        if (typeof fullpage_api !== 'undefined') {
            fullpage_api.reBuild();
            console.log('✓ fullpage.js rebuilt');
        }
        console.log('✅ Application initialized successfully!');
    }
    catch (error) {
        console.error('❌ Error initializing application:', error);
        alert('Failed to load content. Please check the console for details.');
    }
}
function resetExperienceCarouselToFirst() {
    const carouselElement = document.querySelector('#companyCarousel');
    if (!carouselElement) {
        return;
    }
    const items = carouselElement.querySelectorAll('.carousel-item');
    items.forEach((item, index) => {
        item.classList.toggle('active', index === 0);
    });
    const bootstrapApi = window.bootstrap;
    if (bootstrapApi?.Carousel) {
        const instance = bootstrapApi.Carousel.getOrCreateInstance(carouselElement);
        instance.to(0);
    }
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
}
else {
    initializeApp();
}
//# sourceMappingURL=main.js.map