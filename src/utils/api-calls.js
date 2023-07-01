import axios from "axios";
import baseUrl from "../../secrets/apiURL";

const apiUrl = baseUrl;

export const getGuidelines = (searchParam) => {
  return axios
    .get(`${apiUrl}/guidelines?search=${searchParam}`)
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

export const getAllUsers = () => {
  return axios
    .get(`${apiUrl}/users`)
    .then((res) => {
      return res.data.users;
    })
    .catch((err) => {
      throw err;
    });
};

export const getAllBranches = () => {
  return axios
    .get(`${apiUrl}/branches`)
    .then((res) => {
      return res.data.branches;
    })
    .catch((err) => {
      throw err;
    });
};

export const getBranchByBranchName = (branch_name) => {
  return axios
    .get(`${apiUrl}/branches/${branch_name}`)
    .then((res) => {
      return res.data.branch;
    })
    .catch((err) => {
      throw err;
    });
};

export const postNewBranch = (branchToSetup) => {
  return axios
    .post(`${apiUrl}/branches?type=edit`, branchToSetup)
    .then((res) => {
      return res.data.branch;
    })
    .catch((err) => {
      throw err;
    });
};

export const patchBranchByBranchName = ({
  branch_name,
  chapterNum,
  sectionNum,
  patchBody,
}) => {
  const branchToSend = { chapterNum, sectionNum, patchBody };
  return axios
    .patch(`${apiUrl}/branches/${branch_name}`, branchToSend)
    .then((res) => {
      return res.data.branch;
    })
    .catch((err) => {
      throw err;
    });
};
