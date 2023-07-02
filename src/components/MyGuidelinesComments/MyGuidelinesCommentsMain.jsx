import { useEffect, useState } from "react";
import { branchGetAllComments } from "../../utils/api-calls";
import { BeatLoader } from "react-spinners";
import { MyGuidelinesAddComment } from "./MyGuidelinesAddComment";

export const MyGuidelinesCommentsMain = ({ branchName }) => {
  const [branchComments, setBranchComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    branchGetAllComments(branchName).then((data) => {
      setBranchComments(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <>
        <div className="loading-section">
          <BeatLoader color="rgb(4,2,39)" size={16} />
          <p>
            <strong>Loading...</strong>
          </p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <MyGuidelinesAddComment
          branchName={branchName}
          setBranchComments={setBranchComments}
        />
        {branchComments.map((comment) => {
          return (
            <>
              <hr />
              <p>Posted By: {comment.author}</p>
              <p>Posted on: {comment.commentDate}</p>
              <p>{comment.body}</p>
            </>
          );
        })}
      </>
    );
  }
};
