import axios from 'axios';

const rawgInstance = axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    //REACT_APP_RAWG_KEY
    key: '8389aa7c48574208963de2cf90cabcaa',
  },
});

export default rawgInstance;
