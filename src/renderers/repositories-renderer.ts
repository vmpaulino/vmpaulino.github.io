import { Repository } from '../models/repository.js';

export function renderRepositories(repositories: Repository[]): string {
  return repositories.map(repo => `
    <div class="col-md-6">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">${escapeHtml(repo.title)}</h5>
          <p class="card-text">${escapeHtml(repo.description)}</p>
          <a href="${escapeHtml(repo.url)}" target="_blank" class="btn btn-sm btn-outline-primary">View Repo</a>
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
