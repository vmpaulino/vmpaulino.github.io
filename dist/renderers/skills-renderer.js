export function renderSkills(skills) {
    return {
        technical: skills.technical.map(skill => `<span class="tag">${escapeHtml(skill)}</span>`).join('\n              '),
        soft: skills.soft.map(skill => `<span class="tag">${escapeHtml(skill)}</span>`).join('\n              '),
        businessAreas: skills.businessAreas.map(area => `<span class="tag">${escapeHtml(area)}</span>`).join('\n              ')
    };
}
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
//# sourceMappingURL=skills-renderer.js.map