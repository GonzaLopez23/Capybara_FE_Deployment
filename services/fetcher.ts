import environment from "../environment";
import axios, { AxiosRequestConfig } from "axios";

const fetcher = (url: string, config: AxiosRequestConfig<any> | undefined) =>
  axios.get(environment.BASE_URL + url, config).then((res) => res.data);

export default fetcher;
