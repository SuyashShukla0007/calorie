import axios from 'axios';

const news = async () => {
  try {
    const response = await axios.get('https://calorie-rose.vercel.app/news');
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
}

export default news;
