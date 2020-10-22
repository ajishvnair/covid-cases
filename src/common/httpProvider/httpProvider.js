/* eslint-disable handle-callback-err */
import axios from 'axios';

const httpProvider = {
    getAction: url => axios.get(url).catch(err => {})
};

export default httpProvider;
