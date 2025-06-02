const API_KEY = 'e727731dd97b429b9114bd0c2ccb8cfb'; // Replace with your actual API key
const API_URL = `https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=${API_KEY}`;

async function fetchTechNews() {
  const container = document.getElementById('news-container');
  container.innerHTML = '<p>Loading news...</p>';

  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (data.articles && data.articles.length > 0) {
      container.innerHTML = '';

      data.articles.forEach(article => {
        const newsItem = document.createElement('article');
        newsItem.className = 'news-item';
        newsItem.innerHTML = `
          <h2 class="news-title">${article.title}</h2>
          <div class="news-date">${new Date(article.publishedAt).toDateString()}</div>
          <p class="news-description">${article.description || ''}</p>
          <a href="${article.url}" target="_blank">Read more</a>
        `;
        container.appendChild(newsItem);
      });
    } else {
      container.innerHTML = '<p>No news found.</p>';
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    container.innerHTML = '<p>Error loading news. Try again later.</p>';
  }
}

fetchTechNews();
