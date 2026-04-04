import { Skills } from '../models/skills.js';

export function renderSkills(skills: Skills): { technical: string; soft: string; businessAreas: string } {
  return {
    technical: skills.technical.map(skill => `<span class="tag">${escapeHtml(skill)}</span>`).join('\n              '),
    soft: skills.soft.map(skill => `<span class="tag">${escapeHtml(skill)}</span>`).join('\n              '),
    businessAreas: skills.businessAreas.map(area => `<span class="tag">${escapeHtml(area)}</span>`).join('\n              ')
  };
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
