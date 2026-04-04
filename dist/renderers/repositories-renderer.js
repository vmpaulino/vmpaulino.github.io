export function renderRepositories(repositories) {
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
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
//# sourceMappingURL=repositories-renderer.js.map