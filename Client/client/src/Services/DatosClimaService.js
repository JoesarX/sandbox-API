import axios from 'axios';
//const API_URL = 'http://joesar.azurewebsites.net';
const API_URL = 'http://localhost:8000';
export const getAllData = async () => {
    console.log("helloService")
    try {
        const res = await axios.get(`${API_URL}/datosclima/average/`);
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to fetch data');
    }
};

const Services = {
    getAllData
};

export default Services;