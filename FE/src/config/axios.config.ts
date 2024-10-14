import { getAccessToken, getRefreshToken } from '@/storages/AuthenticationStorage';
import axios, { AxiosInstance } from 'axios'

const BASE_URL = 'http://localhost:8088'

const addInterceptor = (instant: AxiosInstance) => {

    instant.interceptors.request.use(
        (config) => {
            const token = getAccessToken();
            if (config?.headers && !config?.headers?.Authorization) {
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                } else {
                    config.headers.Authorization = '';
                }
            }

            return config;
        },
        (err) => Promise.reject(err),
    );

    const interceptor = instant.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const { status } = error.response || {};
            switch (status) {
                case 401: {
                    axios.interceptors.response.eject(interceptor)
                    const refreshToken = getRefreshToken()

                    try {
                        const response = await instant.post('/api/handle-refreshtoken', {}, {
                            headers: {
                                'x-rf-token': refreshToken
                            }
                        });

                        //TODO: update authen key
                        console.log(response.data)
                    } catch (error_1) {
                        // TODO: Handle refresh token error here
                        console.log(error_1)
                    }
                    finally {
                        // eslint-disable-next-line no-unsafe-finally
                        return addInterceptor(instant);
                    }
                }
                default: {
                    console.log('Failed')
                }
            }
            return Promise.reject(error);
        },
    );

}

const createAxiosInstance = (api: string) => {
    const instant = axios.create({
        baseURL: api
    })

    addInterceptor(instant)

    return instant;
}

export const instanceCoreApi = createAxiosInstance(BASE_URL)

export default function setUpAxiosInstance () {
    axios.defaults.baseURL = BASE_URL
    addInterceptor(axios)
}