import axios from 'axios';
import debugLib from 'debug';

const debug = debugLib('meli:RestService');

class RestService {

    public exchange(url: string, method: string, data?: any, headers?: any): Promise<any> {
        debug(`HTTP request ${method} | url: ${url} | headers: ${JSON.stringify(headers)} | data: ${JSON.stringify(data)}`);

        const request = {
            url,
            method,
            headers: {
                ...headers
            },
            data
        };

        return axios.request(request)
            .then(res => {
                debug(`HTTP response ${JSON.stringify(res.data)}`);
                res.data.status = res.status;
                return Promise.resolve(res.data);
            })
            .catch(err => {
                debug(`HTTP error ${err}`);
                return Promise.reject(err);
            });
    }
}

export const restService = new RestService();