import axios from 'axios';

const rawgInstance = axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    //REACT_APP_RAWG_KEY
    key: '247f561e517b4dde96fe9ed3496c64ff',
  },
});

export default rawgInstance;
