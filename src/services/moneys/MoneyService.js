import { BASE_URL } from "../../helpers/BaseUrl"
import axios from 'axios';

const MONEY_BASE_URL = `${BASE_URL}/moneys`;

class MoneyService {

    createMoney = (money) => {
        return axios.post(MONEY_BASE_URL, money);
    };


    getMoney = (moneyId) => {
        return axios.get(`${MONEY_BASE_URL}/${moneyId}`);
    };

    updateMoney = async (moneyId, body) => {
        const response = await axios.put(`${MONEY_BASE_URL}/${moneyId}`, body);
        return response.data;
    };

    deleteMoney = async (moneyId) => {
        const response = await axios.delete(`${MONEY_BASE_URL}/${moneyId}`);
        return response.data;
    };

    allMoneys = async (params) => {
        let url = `${MONEY_BASE_URL}`;
        
        if(params && params.search){
            url = `${MONEY_BASE_URL}?page=${params.page+1}`;
        }
       
       if(params && params.search!==null){
           let keys = Object.keys(params.search);
           url = `${MONEY_BASE_URL}?page=${1}&${keys[0]}=${params.search.name}`;
       }    

       return await axios.get(url);

    
    }

    exportMoneys= async (params) => {

        let url = `${MONEY_BASE_URL}/export`;
        // if(params.search!==null){
        //     let keys = Object.keys(params.search);
        //     url = `${MONEY_BASE_URL}/export?${keys[0]}=${params.search.name}`;
        // }
        const response = await axios.get(url, { responseType: 'blob' });
        const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
        const urlObject= URL.createObjectURL(blob);
        return urlObject;

      }
}

export default new MoneyService();