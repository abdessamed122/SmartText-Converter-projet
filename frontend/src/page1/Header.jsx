import { Link } from "react-router-dom"
import "./css.css"
// import Page2 from "../page2/Page2"
// import Page3 from "../page3/Page3"

const Header = () => {
  return (
    <div>
      <div className="navbar desktop">
        <div className="logo-div">
          <div>
            <Link to="/" className="logo">
              <img src="https://www.imagetotext.info/web_assets/frontend/img/logo.svg?v=1.2" alt="logo" />
              <span>SmartText Converter</span>
            </Link>
          </div>
          <div className="nav-links tools">
            <ul>
              <li>
              <Link to="/extract-text-summarize-ai">
              Text Summarization
              </Link>
              </li>
              <li>
                <Link to="/extract-text-translate-ai">
                Image Translator
                </Link>
              </li>
              <li>
                <Link to="/pdf-to-word">
                  PDF To Word
                </Link>
              </li>
             
            </ul>
          </div>
        </div>
        <div className="nav-links topnav" id="myTopnav">
          <ul>
            {/* <li className="online-chat-li" >
              <a href="javascript:void(0)">
                <img src="https://www.imagetotext.info/web_assets/frontend/img/icons/chat-us.svg?v=1.4" alt="chat" width={30} height={30} />
                Chat
              </a>
            </li> */}
            {/* <li className="get-api-nav-li">
              <a href="https://www.imagetotext.info/premium">
                <img src="https://www.imagetotext.info/web_assets/frontend/img/icons/pricing-icon.svg?v=1.4" alt="pricing" width={30} height={30} />
                <span>Pricing</span>
              </a>
            </li> */}
            {/* <li>
              <a href="https://www.imagetotext.info/login" className="account-item auth-btns">
                <img src="https://www.imagetotext.info/web_assets/frontend/img/icons/login.svg" alt="icon" width={30} height={30} />
                <span>Login</span>
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
