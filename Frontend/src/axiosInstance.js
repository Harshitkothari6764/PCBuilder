import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://pcbuilding-29503.firebaseio.com/'
});

export default instance;