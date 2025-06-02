const RSS_URL = 'https://tech.hindustantimes.com/rss/technology';
const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;

async function fetchTechNews() {
  const container = document.getElementById('news-container');
  if (!container) return; // Skip if not on news page

  container.innerHTML = 'Loading tech news...';

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      container.innerHTML = 'No news found.';
      return;
    }

    container.innerHTML = '';
    data.items.forEach(item => {
      const newsItem = document.createElement('div');
      newsItem.className = 'news-item';
      newsItem.innerHTML = `
        <h2>${item.title}</h2>
        <p>${new Date(item.pubDate).toDateString()}</p>
        <p>${item.description}</p>
        <a href="${item.link}" target="_blank">Read more</a>
      `;
      container.appendChild(newsItem);
    });
  } catch (error) {
    console.error('Error:', error);
    container.innerHTML = 'Error loading news.';
  }
}

fetchTechNews();
