import http from "./httpServices";
import config from "../config.json";

export function getGenres() {
  return http.get(config.apiUrl + "/genres");
}
