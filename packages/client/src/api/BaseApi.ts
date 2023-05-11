import axios, { AxiosInstance } from 'axios'

export const RESOURCE_URL = 'https://ya-praktikum.tech/api/v2/resources';

export abstract class BaseAPI {
  protected readonly api: AxiosInstance
  
  public constructor(baseURL= 'https://ya-praktikum.tech/api/v2', timeout = 3000) {
    this.api = axios.create({
      baseURL,
      withCredentials: true,
      timeout,
    })

    this.addInterceptor =
      this.addInterceptor.bind(this)
  }

  //с документации, чтобы перехватывать запросы или ответы до того, как они будут обработаны then или catch https://axios-http.com/docs/interceptors
  private addInterceptor() {
    this.api.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      return Promise.reject(error);
    });
  }
}
