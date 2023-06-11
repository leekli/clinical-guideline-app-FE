import "../styles/SingleGuideline.css"
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import parse from "html-react-parser"
import { getGuidelineById } from "../utils/api-calls";
import { convertUnixTime } from "../utils/convertUnixTime";
import { BeatLoader } from "react-spinners";


export const SingleGuideline = () => {
  const { guideline_id } = useParams()
  const [guideline, setGuideline] = useState("")
  const [isLoading, setIsLoading] = useState(true)

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

if (isLoading) return (
    <div className="loading-section">
        <BeatLoader color="blue" size={16} />
        <p>Loading...</p>
    </div>

)

return (
  <>
  <h2>{guideline.LongTitle}</h2>
  <p><strong>Date Issued: </strong>{convertUnixTime(guideline.MetadataApplicationProfile.Issued)}</p>
  {guideline.Chapters.map((chapter) => {
      return (
          <>
          <button type="button" className="collapsible_chapter" onClick={handleClick}>{chapter.Title}</button>
          <div className="content">
              {parse(chapter.Content)}
              {chapter.Sections.map((section) => {
                  return (
                      <>
                          <button type="button" className="collapsible_section" onClick={handleClick}>{section.Title}</button>
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
