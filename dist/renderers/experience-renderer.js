export function renderExperience(experiences) {
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
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
//# sourceMappingURL=experience-renderer.js.map