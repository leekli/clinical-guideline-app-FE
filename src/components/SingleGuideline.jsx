import "../styles/SingleGuideline.css"
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import parse from "html-react-parser"
import { getGuidelineById } from "../utils/api-calls";
import { convertUnixTime } from "../utils/convertUnixTime";
import { BeatLoader } from "react-spinners";
import { Input, Space } from 'antd';


export const SingleGuideline = () => {
  const { Search } = Input;
  const { guideline_id } = useParams()
  const [guideline, setGuideline] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    getGuidelineById(guideline_id).then((data) => {
      setIsLoading(true)
      setGuideline(data.guideline)
      setIsLoading(false)
    })
}, [])

function handleClick(event) {
  event.target.classList.toggle("active")
  let content = event.target.nextElementSibling

  if (content.style.display === "block") {
    content.style.display = "none"
  }
  else {
    content.style.display = "block"
  }
}

const onChange = (event) => {
  setSearchInput(event.target.value)

  // set up logic for highlighting found text
  // need be able check every element and look within it
  // if found... highlight yellow (if within a closed box then open it maybe? or have a better way of listing found text results?)
}

const onSearch = (event) => {
  // logic for onSearch submit here
}

if (isLoading) return (
    <div className="loading-section">
        <BeatLoader color="rgb(4,2,39)" size={16} />
        <p><strong>Loading...</strong></p>
    </div>

)

return (
  <>
    <Space direction="vertical" id="single_guideline_search_bar">
      <Search
        placeholder="Search this guideline..."
        allowClear
        enterButton="Search"
        size="large"
        value={searchInput}
        onChange={onChange}
        onSearch={onSearch}
      />
  </Space>

  <h2>{guideline.LongTitle}</h2>
  <p><strong>Date Issued: </strong>{convertUnixTime(guideline.MetadataApplicationProfile.Issued)}</p>
  {guideline.Chapters.map((chapter) => {
      return (
          <>
          <button type="button" className="collapsible_chapter" onClick={handleClick}><strong>{chapter.Title}</strong></button>
          <div className="content">
              {parse(chapter.Content)}
              {chapter.Sections.map((section) => {
                  return (
                      <>
                          <h3 align="left">Sub-section (Click to view):</h3>
                          <button type="button" className="collapsible_section" onClick={handleClick}><strong>{section.Title}</strong></button>
                          <div className="content">
                            {parse(section.Content)}
                          </div>
                      </>
                  )
              })}
          </div>
          </>
      )
  })}
  </>
)
};
