import "../styles/Footer.css"

export const Footer = () => {
    return (
        <>
        <footer>
            <hr />
            <div className="footer_main_container">
                <sub><p align="right"><strong>Developed by: Lee Kirkham - 2023</strong></p></sub>
                <div className="footer_nice_acknowledgement">
                    <img src="/images/nice_landscape_logo.png" alt="A black and white version of the logo for NICE (National Institute for Health and Care Excellent" id="footer_nice_logo" />
                    <p id="footer_nice_copyright_label">© National Institute for Health and Care Excellence 2018</p>
                    <p>This content is made available by NICE (National Institute for Health and Care Excellence) but distributed by a third-party distributor. NICE takes no responsibility for the format in which this content is delivered. The distributor is responsible for incorporating updates from NICE and cannot alter NICE content in any way. Any content delivered alongside content provided by NICE will not necessarily reflect the views of either NICE or those organisations commissioned to develop NICE guidance.</p>
                </div> 
            </div>

        </footer>
        </>
    )
}