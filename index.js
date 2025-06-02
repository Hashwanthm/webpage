const RSS_URL = 'https://www.gadgets360.com/rss/news';
const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;

async function fetchRSSNews() {
  const container = document.getElementById('news-container');
  container.innerHTML = 'Loading tech news...';

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    if (data.items.length === 0) {
      container.innerHTML = 'No news found.';
      return;
    }

    container.innerHTML = '';

    data.items.forEach(item => {
      const newsItem = document.createElement('div');
      newsItem.className = 'news-item';
      newsItem.innerHTML = `
        <h2 class="news-title">${item.title}</h2>
        <div class="news-date">${new Date(item.pubDate).toDateString()}</div>
        <p>${item.description}</p>
        <a href="${item.link}" target="_blank">Read more</a>
      `;
      container.appendChild(newsItem);
    });
  } catch (err) {
    container.innerHTML = 'Error loading news.';
    console.error(err);
  }
}

fetchRSSNews();
