import api from "./api";
import { API } from "../api/endpoints";

const authService = {

  login(data) {
    return api.post(API.LOGIN, data);
  },

  register(data) {
    return api.post(API.REGISTER, data);
  },

  getCurrentUser() {
    return api.get(API.ME);
  }

};

export default authService;