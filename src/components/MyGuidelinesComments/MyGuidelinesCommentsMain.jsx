import { useEffect, useState } from "react";
import { branchGetAllComments } from "../../utils/api-calls";
import { BeatLoader } from "react-spinners";
import { Avatar, List } from "antd";
import { MyGuidelinesAddComment } from "./MyGuidelinesAddComment";
import { convertNormalJSTime } from "../../utils/convertNormalJSTime";

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

  const data = [
    {
      title: "There are currently no collaborator comments on this workspace.",
    },
  ];

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
        <center>
          {branchComments.length > 0 ? (
            <List
              itemLayout="horizontal"
              dataSource={branchComments}
              style={{
                width: "75%",
                alignItems: "center",
              }}
              bordered
              header={<strong>Collaborator Comments</strong>}
              loadMore
              alignItems="center"
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                      />
                    }
                    title={
                      <div>
                        <p>Posted by: {item.author}</p>
                        <p>
                          Posted on: {convertNormalJSTime(item.commentDate)}
                        </p>
                      </div>
                    }
                    description={<p style={{ color: "black" }}>{item.body}</p>}
                  />
                </List.Item>
              )}
            />
          ) : (
            <List
              itemLayout="horizontal"
              dataSource={data}
              style={{
                width: "75%",
                alignItems: "center",
              }}
              bordered
              header={<strong>Collaborator Comments</strong>}
              loadMore
              alignItems="center"
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    title={item.title}
                    description={
                      <p style={{ color: "black" }}>
                        You can add a new comment by using the comment box,
                        above.
                      </p>
                    }
                  />
                </List.Item>
              )}
            />
          )}
        </center>
      </>
    );
  }
};
