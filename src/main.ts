import { Article } from './models/article.js';
import { Presentation } from './models/presentation.js';
import { Repository } from './models/repository.js';
import { Experience } from './models/experience.js';
import { Skills } from './models/skills.js';
import { renderArticles } from './renderers/articles-renderer.js';
import { renderPresentations } from './renderers/presentations-renderer.js';
import { renderRepositories } from './renderers/repositories-renderer.js';
import { renderExperience } from './renderers/experience-renderer.js';
import { renderSkills } from './renderers/skills-renderer.js';

// Declare global types for external libraries
declare global {
  interface Window {
    fullpage_api?: {
      reBuild: () => void;
    };
  }
}

const fullpage_api = (window as any).fullpage_api;

// Data loading functions
async function loadArticles(): Promise<Article[]> {
  const response = await fetch('data/articles.json');
  if (!response.ok) {
    throw new Error(`Failed to load articles: ${response.statusText}`);
  }
  return response.json();
}

async function loadPresentations(): Promise<Presentation[]> {
  const response = await fetch('data/presentations.json');
  if (!response.ok) {
    throw new Error(`Failed to load presentations: ${response.statusText}`);
  }
  return response.json();
}

async function loadRepositories(): Promise<Repository[]> {
  const response = await fetch('data/repositories.json');
  if (!response.ok) {
    throw new Error(`Failed to load repositories: ${response.statusText}`);
  }
  return response.json();
}

async function loadExperience(): Promise<Experience[]> {
  const response = await fetch('data/experience.json');
  if (!response.ok) {
    throw new Error(`Failed to load experience: ${response.statusText}`);
  }
  const experience = await response.json() as Experience[];

  // Keep timeline deterministic: newest roles first.
  return experience.sort((a, b) => getExperienceStartTimestamp(b.period) - getExperienceStartTimestamp(a.period));
}

function getExperienceStartTimestamp(period: string): number {
  const match = period.match(/^([A-Za-z]{3})\s+(\d{4})/);
  if (!match) {
    return 0;
  }

  const monthMap: Record<string, number> = {
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

async function loadSkills(): Promise<Skills> {
  const response = await fetch('data/skills.json');
  if (!response.ok) {
    throw new Error(`Failed to load skills: ${response.statusText}`);
  }
  return response.json();
}

// Initialize the application
async function initializeApp(): Promise<void> {
  try {
    console.log('Loading data...');

    // Load all data in parallel
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

    // Render articles
    const articlesContainer = document.querySelector('.section:has(h2.mb-4:first-child) .row.g-4');
    if (articlesContainer && articlesContainer.parentElement?.querySelector('h2')?.textContent === 'Articles') {
      articlesContainer.innerHTML = renderArticles(articles);
      console.log('✓ Articles rendered');
    }

    // Render presentations
    const presentationsSection = Array.from(document.querySelectorAll('.section')).find(
      section => section.querySelector('h2')?.textContent === 'Presentations'
    );
    const presentationsContainer = presentationsSection?.querySelector('.row.g-4');
    if (presentationsContainer) {
      presentationsContainer.innerHTML = renderPresentations(presentations);
      console.log('✓ Presentations rendered');
    }

    // Render repositories
    const repositoriesSection = Array.from(document.querySelectorAll('.section')).find(
      section => section.querySelector('h2')?.textContent === 'Highlighted GitHub Repositories'
    );
    const repositoriesContainer = repositoriesSection?.querySelector('.row.g-4');
    if (repositoriesContainer) {
      repositoriesContainer.innerHTML = renderRepositories(repositories);
      console.log('✓ Repositories rendered');
    }

    // Render experience (carousel)
    const experienceCarouselInner = document.querySelector('#companyCarousel .carousel-inner');
    if (experienceCarouselInner) {
      experienceCarouselInner.innerHTML = renderExperience(experience);
      resetExperienceCarouselToFirst();
      console.log('✓ Experience rendered');
    }

    // Render skills
    const skillsRendered = renderSkills(skills);
    
    // Technical skills
    const technicalSkillsContainer = Array.from(document.querySelectorAll('h5')).find(
      h5 => h5.textContent === 'Technical Skills'
    )?.nextElementSibling;
    if (technicalSkillsContainer) {
      technicalSkillsContainer.innerHTML = skillsRendered.technical;
      console.log('✓ Technical skills rendered');
    }

    // Soft skills
    const softSkillsContainer = Array.from(document.querySelectorAll('h5')).find(
      h5 => h5.textContent === 'Soft Skills'
    )?.nextElementSibling;
    if (softSkillsContainer) {
      softSkillsContainer.innerHTML = skillsRendered.soft;
      console.log('✓ Soft skills rendered');
    }

    // Business areas
    const businessAreasContainer = Array.from(document.querySelectorAll('h5')).find(
      h5 => h5.textContent === 'Business Areas'
    )?.nextElementSibling;
    if (businessAreasContainer) {
      businessAreasContainer.innerHTML = skillsRendered.businessAreas;
      console.log('✓ Business areas rendered');
    }

    // Re-initialize fullpage.js after content is loaded
    if (typeof fullpage_api !== 'undefined') {
      fullpage_api.reBuild();
      console.log('✓ fullpage.js rebuilt');
    }

    console.log('✅ Application initialized successfully!');
  } catch (error) {
    console.error('❌ Error initializing application:', error);
    alert('Failed to load content. Please check the console for details.');
  }
}

function resetExperienceCarouselToFirst(): void {
  const carouselElement = document.querySelector('#companyCarousel') as HTMLElement | null;
  if (!carouselElement) {
    return;
  }

  const items = carouselElement.querySelectorAll('.carousel-item');
  items.forEach((item, index) => {
    item.classList.toggle('active', index === 0);
  });

  const bootstrapApi = (window as any).bootstrap;
  if (bootstrapApi?.Carousel) {
    const instance = bootstrapApi.Carousel.getOrCreateInstance(carouselElement);
    instance.to(0);
  }
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
