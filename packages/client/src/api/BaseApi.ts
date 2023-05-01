import axios, { AxiosInstance } from 'axios'

export abstract class BaseAPI {
  protected readonly instance: AxiosInstance

  public constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      withCredentials: true,
      timeout: 3000,
    })

    this.addInterceptor =
      this.addInterceptor.bind(this)
  }

  //с документации, чтобы перехватывать запросы или ответы до того, как они будут обработаны then или catch https://axios-http.com/docs/interceptors
  private addInterceptor() {
    this.instance.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      return Promise.reject(error);
    });
  }
}
