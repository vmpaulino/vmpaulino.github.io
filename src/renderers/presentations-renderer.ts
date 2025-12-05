import { Presentation } from '../models/presentation.js';

export function renderPresentations(presentations: Presentation[]): string {
  return presentations.map(presentation => `
    <div class="col-md-6">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">${escapeHtml(presentation.title)}</h5>
          <p class="card-text">${escapeHtml(presentation.description)}</p>
          <div class="mb-2">
            ${presentation.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
          </div>
          <a href="${escapeHtml(presentation.url)}" target="_blank" class="btn btn-sm btn-outline-primary">Slide Deck</a>
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
