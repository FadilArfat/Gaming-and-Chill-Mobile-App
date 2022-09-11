import axios from 'axios';

const rawgInstance = axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    //REACT_APP_RAWG_KEY
    key: '', //ADD YOUR OWN API KEY FOR RAWG
  },
});

export default rawgInstance;
