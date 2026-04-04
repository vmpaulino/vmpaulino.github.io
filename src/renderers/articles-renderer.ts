import { Article } from '../models/article.js';

export function renderArticles(articles: Article[]): string {
  const articlesPerSlide = 4;
  const slides: Article[][] = [];

  for (let i = 0; i < articles.length; i += articlesPerSlide) {
    slides.push(articles.slice(i, i + articlesPerSlide));
  }

  return slides.map((slideArticles, slideIndex) => `
    <div class="carousel-item ${slideIndex === 0 ? 'active' : ''}">
      <div class="row g-4">
        ${slideArticles.map(article => `
          <div class="col-md-6 col-lg-6">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">${escapeHtml(article.title)}</h5>
                <p class="card-text">${escapeHtml(article.description)}</p>
                <div class="mb-2">
                  ${article.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
                </div>
                <p class="text-muted small">${escapeHtml(article.date)} &middot; ${escapeHtml(article.readTime)}</p>
                <a href="${escapeHtml(article.url)}" target="_blank" class="btn btn-sm btn-outline-primary">Read Article</a>
              </div>
            </div>
          </div>
        `).join('')}
        ${slideArticles.length < articlesPerSlide ? Array.from({ length: articlesPerSlide - slideArticles.length }).map(() => '<div class="col-md-6 col-lg-6"></div>').join('') : ''}
      </div>
    </div>
  `).join('');
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
