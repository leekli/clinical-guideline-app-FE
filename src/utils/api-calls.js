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

export const patchGuidelineById = (
  guideline_id,
  patchedGuideline,
  submissionInfo
) => {
  const bodyToSend = { patchedGuideline, submissionInfo };
  return axios
    .patch(`${apiUrl}/guidelines/${guideline_id}`, bodyToSend)
    .then((res) => {
      return res.data.guideline;
    })
    .catch((err) => {
      throw err;
    });
};

export const postNewGuideline = (guidelineToSend) => {
  return axios
    .post(`${apiUrl}/guidelines`, guidelineToSend)
    .then((res) => {
      return res.data.guideline;
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

export const postNewCreateBranch = (branchToSetup) => {
  return axios
    .post(`${apiUrl}/branches?type=create`, branchToSetup)
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
  newTitle,
}) => {
  const branchToSend = { chapterNum, sectionNum, patchBody, newTitle };
  return axios
    .patch(`${apiUrl}/branches/${branch_name}`, branchToSend)
    .then((res) => {
      return res.data.branch;
    })
    .catch((err) => {
      throw err;
    });
};

export const branchLockRequest = (branch_name) => {
  return axios
    .patch(`${apiUrl}/branches/${branch_name}/lockbranch`)
    .then((res) => {
      return res.data.branch;
    })
    .catch((err) => {
      throw err;
    });
};

export const branchUnLockRequest = (branch_name) => {
  return axios
    .patch(`${apiUrl}/branches/${branch_name}/unlockbranch`)
    .then((res) => {
      return res.data.branch;
    })
    .catch((err) => {
      throw err;
    });
};

export const branchAddNewAuthdUser = ({ branch_name, userToAdd }) => {
  return axios
    .patch(`${apiUrl}/branches/${branch_name}/addusers`, { userToAdd })
    .then((res) => {
      return res.data.branch;
    })
    .catch((err) => {
      throw err;
    });
};

export const branchAddNewSubSection = ({ branch_name, chapterNum }) => {
  const dataToSend = { chapterNum };

  return axios
    .patch(`${apiUrl}/branches/${branch_name}/addsection`, dataToSend)
    .then((res) => {
      return res.data.branch;
    })
    .catch((err) => {
      throw err;
    });
};

export const branchGetAllComments = (branch_name) => {
  return axios
    .get(`${apiUrl}/branches/${branch_name}/comments`)
    .then((res) => {
      return res.data.comments;
    })
    .catch((err) => {
      throw err;
    });
};

export const branchAddNewComment = (branch_name, newComment) => {
  return axios
    .post(`${apiUrl}/branches/${branch_name}/comments`, newComment)
    .then((res) => {
      return res.data.comment;
    })
    .catch((err) => {
      throw err;
    });
};

export const deleteBranchByBranchName = (branch_name) => {
  return axios.delete(`${apiUrl}/branches/${branch_name}`);
};

export const postBranchForApproval = (postBody) => {
  return axios
    .post(`${apiUrl}/approvals?type=edit`, postBody)
    .then((res) => {
      return res.data.approval;
    })
    .catch((err) => {
      throw err;
    });
};

export const getAllApprovals = () => {
  return axios
    .get(`${apiUrl}/approvals`)
    .then((res) => {
      return res.data.approvals;
    })
    .catch((err) => {
      throw err;
    });
};

export const getApprovalByName = (approval_name) => {
  return axios
    .get(`${apiUrl}/approvals/${approval_name}`)
    .then((res) => {
      return res.data.approval;
    })
    .catch((err) => {
      throw err;
    });
};

export const deleteApprovalByName = (approval_name) => {
  return axios.delete(`${apiUrl}/approvals/${approval_name}`);
};
