import axios from 'axios';

const news = async () => {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=4495415c9b6b4982b5cd3b9ebe8ddfd2');
    return response.data; // Return the data directly

  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
}

export default news;
