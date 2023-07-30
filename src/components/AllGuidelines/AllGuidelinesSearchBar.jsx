import { Space, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

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
        />
      </Space>
    </>
  );
};
