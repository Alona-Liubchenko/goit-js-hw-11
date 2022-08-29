import axios from 'axios';

export default async function fetchDate(query, page, perPage) {
  axios.defaults.baseURL = 'https://pixabay.com/api';
  const KEY = '29510449-399a931f33aaf543423460729';
  try {
    const response = await axios.get(
      `/?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&&per_page=${perPage}&page=${page}`
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}
