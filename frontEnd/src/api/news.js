const news = async () => {
  const newsData = await fetch('https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=4495415c9b6b4982b5cd3b9ebe8ddfd2');
  
  // Check if the response is okay
  if (!newsData.ok) {
    throw new Error('Network response was not ok');
  }

  // Read the response body as JSON
  const jsonData = await newsData.json();



  return jsonData;
}

export default news;
