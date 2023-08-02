import { Space, Input, Tooltip } from "antd";
import { SearchOutlined, InfoCircleOutlined } from "@ant-design/icons";

export const AllGuidelinesSearchBar = ({ searchInput, setSearchInput }) => {
  const { Search } = Input;

  const onChange = (event) => {
    setSearchInput(event.target.value);
  };

  const onSearch = () => {
    setSearchInput("");
  };

  return (
    <>
      <Space direction="vertical" id="guidelines_search_bar">
        <Search
          placeholder="Search Guidelines..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          value={searchInput}
          onChange={onChange}
          onSearch={onSearch}
          suffix={
            <Tooltip title="You can use this search bar to narrow down your search for specific Guidelines.">
              <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
            </Tooltip>
          }
        />
      </Space>
    </>
  );
};
