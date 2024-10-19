import "./css2.css"
import { Link } from "react-router-dom"
const Header = () => {
  return (
    <div>
      <div className="navbar desktop">
        <div className="logo-div">
          <div>
            <a href="/" className="logo">
              <img src="https://www.imagetotext.info/web_assets/frontend/img/logo.svg?v=1.2" alt="logo" />
              <span>Image To Text</span>
            </a>
          </div>
          <div className="nav-links tools">
            <ul>
              <li>
                <Link to="/">
                  JPG to WORD 

                </Link>
              </li>
              <li>
                <a href="/extract-text-translate-ai">
                Image Translator
                </a>
              </li>
              <li>
              <Link to="/pdf-to-word">
                  PDF To Word
                </Link>
              </li>
              <li>
                <Link to="/">
                  PDF To Text
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
