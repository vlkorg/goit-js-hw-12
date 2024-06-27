
import axios from 'axios';

const getArr = async (userParam, page) => {
  const searchParams = new URLSearchParams({
    key: '44484405-088f061e287c84f80e0f16531',
    q: userParam,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 15,
  });

  return await axios.get(`https://pixabay.com/api/?${searchParams}`);
};

export default getArr;