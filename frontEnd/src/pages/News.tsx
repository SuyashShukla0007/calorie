// @ts-ignore
import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
// @ts-ignore
import news from '../api/news'
// @ts-ignore
import { Article } from '../components/types/interface'

const News = () => {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const data = await news()
        setArticles(data.articles || []) // Ensure articles is always an array
        console.log(data.articles)
      } catch {
        console.log("error")
      }
    }
    fetchNewsData()
  }, [])

  return (
    <div>
      <div id="newsHead" className="h-[120px] bg-gray-900 text-white text-5xl py-[35px] px-[350px] w-[75vw] mx-3 mt-4 rounded-3xl font-serif">
        HEALTH NEWS
      </div>
      <div className="grid grid-cols-4 mt-3 ml-[85px] text-pretty">
        {articles && articles.length > 0 ? (
          articles.map((article, index) => (
            <Card
              key={index}
              urlToImage={article.urlToImage}
              description={article.description}
              url={article.url}
              title={article.title}
            />
          ))
        ) : (
          <div>No articles available</div>
        )}
      </div>
    </div>
  )
}

export default News
