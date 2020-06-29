import Axios from 'axios'
Axios.defaults.baseURL = 'http://localhost:3333';
export const getTreeList = () => {
    return Axios.get('/getTreeList')
}