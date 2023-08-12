import { Space, Alert } from "antd";

export const HelpHome = () => {
  return (
    <>
      <section>
        <Space
          direction="vertical"
          style={{
            width: "75%",
          }}
        >
          <Alert
            message={<strong>Help & Support</strong>}
            description={`This area contains answers help & support, on how to use this application.`}
            type="info"
            showIcon
          />
        </Space>
      </section>
    </>
  );
};
