export function renderExperience(experiences) {
    return experiences.map((exp, index) => {
        const website = escapeHtml(safeExternalUrl(exp.website));
        return `
    <div class="carousel-item ${index === 0 ? 'active' : ''}">
      <div class="company-card">
        <div class="company-logo-wrap">
          <img src="${escapeHtml(exp.logo)}" alt="${escapeHtml(exp.company)}">
          <a class="company-name" href="${website}" target="_blank" rel="noopener noreferrer">${escapeHtml(exp.company)}</a>
        </div>
        <div class="company-content">
          <h5>${escapeHtml(exp.title)}</h5>
          <p>${exp.description}</p>
          <small class="experience-period">${escapeHtml(exp.period)}</small>
          <div class="company-tags">
            ${exp.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('\n            ')}
          </div>
        </div>
      </div>
    </div>
  `;
    }).join('');
}
function safeExternalUrl(url) {
    try {
        const parsed = new URL(url);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:' ? parsed.href : '#';
    }
    catch {
        return '#';
    }
}
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
//# sourceMappingURL=experience-renderer.js.map