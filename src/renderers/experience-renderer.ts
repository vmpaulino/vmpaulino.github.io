import { Experience } from '../models/experience.js';

export function renderExperience(experiences: Experience[]): string {
  return experiences.map((exp, index) => `
    <div class="carousel-item ${index === 0 ? 'active' : ''}">
      <div class="company-card">
        <img src="${escapeHtml(exp.logo)}" alt="${escapeHtml(exp.company)}">
        <div>
          <h5>${escapeHtml(exp.title)}</h5>
          <p>${exp.description}</p>
          <small>${escapeHtml(exp.period)}</small>
          <div>
            ${exp.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('\n            ')}
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
