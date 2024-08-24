import axios from 'axios';

const news = async () => {
  try {
    const response = await axios.get('https://calorie-rose.vercel.app/api/news');
       // console.log(response)
    return response.data.json();
 
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
}

export default news;
