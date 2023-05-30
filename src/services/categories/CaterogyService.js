import { BASE_URL } from "../../helpers/BaseUrl"
import axios from 'axios';

const CATEGORY_API_BASE_URL = `${BASE_URL}/categories`;

class CategoryService {

    createCategory = (category) => {
        return axios.post(CATEGORY_API_BASE_URL, category);
    };


    getCategory = (categoryId) => {
        return axios.get(`${CATEGORY_API_BASE_URL}/${categoryId}`);
    };

    updateCategory = async (categoryId, body) => {
        const response = await axios.put(`${CATEGORY_API_BASE_URL}/${categoryId}`, body);
        return response.data;
    };

    deleteCategory = async (categoryId) => {
        const response = await axios.delete(`${CATEGORY_API_BASE_URL}/${categoryId}`);
        return response.data;
    };

    allCategories = async (params) => {

        let url = `${CATEGORY_API_BASE_URL}`;

        if(params && params.clasification_id !== null){
            url = `${CATEGORY_API_BASE_URL}?clasification_id=${params.clasification_id}`;
        }
        
        if(params && params.subclasification_id !== null){
            url = `${CATEGORY_API_BASE_URL}?subclasification_id=${params.subclasification_id}`;
        }

        if(params && params.page !== null && params.page !== undefined){
            url = `${CATEGORY_API_BASE_URL}?page=${params.page+1}&pageSize=${10}`;
        }
       
       if(params && params.search!==null && params.search!==undefined){
           let keys = Object.keys(params.search);
           url = `${CATEGORY_API_BASE_URL}?page=${1}&${keys[0]}=${params.search.name}`;
       }    
       return await axios.get(url);
    }

    exportCategories = async (params) => {

        let url = `${CATEGORY_API_BASE_URL}/export`;
        // if(params.search!==null){
        //     let keys = Object.keys(params.search);
        //     url = `${CATEGORY_API_BASE_URL}/export?${keys[0]}=${params.search.name}`;
        // }
        const response = await axios.get(url, { responseType: 'blob' });
        const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
        const urlObject= URL.createObjectURL(blob);
        return urlObject;

      }
}

export default new CategoryService();