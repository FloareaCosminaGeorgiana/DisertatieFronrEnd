import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8082/api/specializations';

export const fetchSpecializationList = () => {
    return axios.get(REST_API_BASE_URL);
} 