import { Input, Button, Space, Form } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/User";
import { branchAddNewComment } from "../../utils/api-calls";
const { TextArea } = Input;

export const MyGuidelinesAddComment = ({ branchName, setBranchComments }) => {
  const [newCommentBody, setNewCommentBody] = useState("");
  const { loggedInUser } = useContext(UserContext);

  const onTextChange = (event) => {
    setNewCommentBody(event.target.value);
  };

  const submitNewComment = () => {
    const dateNow = Date.now();

    const newComment = {
      author: loggedInUser.username,
      body: newCommentBody,
      commentDate: dateNow,
    };

    return branchAddNewComment(branchName, { newComment })
      .then(() => {
        alert("New comment added!");
        setBranchComments((currentComments) => {
          const newCurrentComments = [newComment, ...currentComments];

          return newCurrentComments;
        });
        setNewCommentBody("");
      })
      .catch(() => {
        alert("There was an error, please try again.");
      });
  };

  return (
    <>
      <p>Add a new comment:</p>
      <div>
        <center>
          <Form
            name="basic"
            style={{ maxWidth: "75%" }}
            initialValues={{ remember: true }}
            onFinish={submitNewComment}
            autoComplete="off"
          >
            <TextArea
              rows={4}
              placeholder="Write your comment here..."
              allowClear
              bordered
              showCount
              size="large"
              value={newCommentBody}
              onChange={onTextChange}
              required
            />
            <Form.Item>
              <Space wrap>
                <Button
                  type="primary"
                  size="large"
                  icon={<MailOutlined />}
                  style={{
                    borderColor: "black",
                    margin: "10px",
                  }}
                  htmlType="submit"
                >
                  Add Comment
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </center>
      </div>
      <br />
    </>
  );
};
