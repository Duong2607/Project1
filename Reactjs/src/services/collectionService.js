import axios from '../axios';

const getDataCollectionApi = (collectionName) => {
    return axios.get('/api/get-data-collection', { name: collectionName});
}
export { getDataCollectionApi }
