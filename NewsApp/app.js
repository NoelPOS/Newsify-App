const apiKey = 'd4197c236792432c8269589052b98c96'

const searchBar = document.querySelector('.search-bar')
const searchBtn = document.querySelector('.search-btn')

const newsContainer = document.querySelector('.news')

async function fetchData() {
  try {
    const url =
      'https://newsapi.org/v2/everything?q=bitcoin&apiKey=d4197c236792432c8269589052b98c96'
    const response = await fetch(url)
    const data = await response.json()
    return data.articles
  } catch (error) {
    console.log('Error fetching the data')
    return []
  }
}

function displayArticles(articles) {
  newsContainer.innerHTML = ''
  articles.forEach((article) => {
    const news = document.createElement('div')
    news.classList.add('new')

    const img = document.createElement('img')
    // img.src =
    //   article.urlToImage === null
    //     ? 'https://placehold.jp/300x300.png'
    //     : article.urlToImage

    if (article.urlToImage.length) {
      img.src = article.urlToImage
    }
    if (!article.urlToImage) {
      img.src = 'https://placehold.jp/300x300.png'
    }
    img.alt = article.title
    img.classList.add('new-img')

    const newsDesc = document.createElement('div')
    newsDesc.classList.add('new-desc')

    const newstitle = document.createElement('h1')
    newstitle.classList.add('new-title')
    const trimtitle =
      article.title.length > 30
        ? article.title.slice(0, 30) + '...'
        : article.title
    newstitle.textContent = trimtitle

    const newsDetail = document.createElement('p')
    newsDetail.classList.add('new-detail')
    const trimdetail =
      article.description.length > 120
        ? article.description.slice(0, 120) + '...'
        : article.description
    newsDetail.textContent = trimdetail

    newsDesc.appendChild(newstitle)
    newsDesc.appendChild(newsDetail)

    news.appendChild(img)
    news.appendChild(newsDesc)
    news.addEventListener('click', () => {
      window.open(article.url, '_blank')
    })

    newsContainer.appendChild(news)
  })
}

searchBtn.addEventListener('click', async () => {
  const query = searchBar.value.trim()
  if (query !== '') {
    try {
      const articles = await fetchDataQuery(query)
      displayArticles(articles)
    } catch (error) {
      console.log(error)
    }
  }
})

async function fetchDataQuery(query) {
  try {
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=d4197c236792432c8269589052b98c96`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data.articles)
    return data.articles
  } catch (error) {
    console.log('Error fetching the data')
    return []
  }
}
;(async () => {
  try {
    const articles = await fetchData()
    displayArticles(articles)
  } catch (error) {
    console.log('Error with the fetch funtion')
  }
})()
