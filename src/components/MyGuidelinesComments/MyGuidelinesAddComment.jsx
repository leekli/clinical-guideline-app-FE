import { Input, Button, Space, Form, Card, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/User";
import { branchAddNewComment } from "../../utils/api-calls";
const { TextArea } = Input;

export const MyGuidelinesAddComment = ({ branchName, setBranchComments }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [newCommentBody, setNewCommentBody] = useState("");
  const { loggedInUser } = useContext(UserContext);

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Your comment was successfully added.",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "There was an error, please try again.",
    });
  };

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
        success();
        setBranchComments((currentComments) => {
          const newCurrentComments = [newComment, ...currentComments];

          return newCurrentComments;
        });
        setNewCommentBody("");
      })
      .catch(() => {
        error();
      });
  };

  return (
    <>
      {contextHolder}
      <Space direction="vertical" size={16}>
        <Card
          title="Add a new comment:"
          style={{
            width: "74vw",
            borderColor: "darkgray",
          }}
          bordered={true}
        >
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
        </Card>
      </Space>
      <br />
      <br />
    </>
  );
};
