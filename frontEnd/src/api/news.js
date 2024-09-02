import axios from 'axios';

const news = async () => {
  try {
    const response = await axios.get('https://saurav.tech/NewsAPI/top-headlines/category/health/in.json');
    return response.data; // Return the data directly

  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
}

export default news;
