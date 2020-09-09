import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { FlatLibrary } from 'common/types';
import DataBase from './DataBase';

interface ParamsQuery {
    <T = any>(url: string, params?: FlatLibrary, options?: AxiosRequestConfig): Promise<AxiosResponse<T>>
}
interface BodyQuery {
    <T = any>(url: string, data?: any, params?: FlatLibrary, options?: AxiosRequestConfig): Promise<AxiosResponse<T>>
}

abstract class BaseApi {
    private request: AxiosInstance;

    constructor(protected readonly baseURL = '', protected readonly mockedServer = new DataBase()) {
        this.mockedServer = mockedServer;
        this.request = axios.create({
            baseURL,
            withCredentials: false,
            validateStatus: status => status < 550,
        });
    }

    protected sendGet: ParamsQuery = async (url, params = {}, options = {}) => {
        const config: AxiosRequestConfig = { params, ...options };
        return this.request.get(url, config);
    };

    protected sendPost: BodyQuery = async (url, data = {}, params = {}, options = {}) => {
        const config: AxiosRequestConfig = { params, ...options };
        return this.request.post(url, data, config);
    };

    protected sendPut: BodyQuery = async (url, data = {}, params = {}, options = {}) => {
        const config: AxiosRequestConfig = { params, ...options };
        return this.request.put(url, data, config);
    };

    protected sendDelete: ParamsQuery = async (url, params = {}, options = {}) => {
        const config: AxiosRequestConfig = { params, ...options };
        return this.request.delete(url, config);
    };
}

export default BaseApi;
