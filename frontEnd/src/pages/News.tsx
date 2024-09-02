import  { useEffect, useState } from 'react';
import Card from '../components/Card';
//@ts-ignore
import news from '../api/news';
import { Article } from '../components/types/interface';
// import Loading from '../components/accessories/Loading';

const News = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const data = await news();
        setArticles(data.articles || []); // Ensure articles is always an array
        console.log(data);
      } catch (error) {
        console.log("Error fetching news:", error);
      }
    };
    fetchNewsData();
  }, []);

  return (
    <div>
      
      <div id="newsHead" className="bg-gray-900  text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl py-4 px-4 sm:px-8 md:px-12  lg:px-16 mx-4 mt-4 rounded-3xl font-serif">
        HEALTH NEWS
      </div>
      <div className="grid grid-cols-1 lg:ml-[2vw] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 px-4">
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
      <div></div>
      // <div className="absolute h-[100vh] w-screen  top-0 right-0 xl:w-[76vw]">
      //     <Loading/>
      // </div>
        )}
      </div>
    </div>
  );
};

export default News;
