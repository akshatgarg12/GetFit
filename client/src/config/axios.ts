import axios, {AxiosRequestConfig} from 'axios'
import { getCurrentUser } from '../helpers/auth';


const defaultOptions:AxiosRequestConfig<any> = {
    baseURL: "http://localhost:8080/",
    headers: {
      'Content-Type': 'application/json',
    }
}

let instance = axios.create(defaultOptions);


instance.interceptors.request.use(async function (config) {
    const user:any = await getCurrentUser()
    if (user) {
        const token = await user.getIdToken();
        console.log("token : ", token);
        // @ts-ignore
        config.headers.Authorization = token;
    } else {
        // @ts-ignore
        config.headers.Authorization = null;
    }
    return config
});

export default instance