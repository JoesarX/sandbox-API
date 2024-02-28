import axios from 'axios';
const API_URL = 'https://los-toneles.azurewebsites.net';

export const getAllData = async () => {
    console.log("helloService")
    try {
        const res = await axios.get(`${API_URL}/datosclima/latest`);
        return res.data;
    } catch (error) {
        
        throw new Error('Failed to fetch data');
    }
};

const Services = {
    getAllData
};

export default Services;