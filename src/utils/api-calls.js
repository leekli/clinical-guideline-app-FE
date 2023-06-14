import axios from "axios";
import baseUrl from "../../secrets/apiURL";

const apiUrl = baseUrl;

export const getGuidelines = () => {
  return axios
    .get(`${apiUrl}/guidelines`)
    .then((res) => {
      return res.data.guidelines;
    })
    .catch((err) => {
      throw err;
    });
};

export const getGuidelineById = (guideline_id) => {
  return axios
    .get(`${apiUrl}/guidelines/${guideline_id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
