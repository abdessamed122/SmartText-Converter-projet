

import "./css2.css"
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <div className="navbar desktop">
        <div className="logo-div">
          <div>
            <Link to="/" className="logo">
              <img src="https://www.imagetotext.info/web_assets/frontend/img/logo.svg?v=1.2" alt="logo" />
              <span>Image To Text</span>
            </Link>
          </div>
          <div className="nav-links tools">
            <ul>
              <li>
                <Link to="/">
                  JPG to Text 
                </Link>
              </li>
              <li>
                <Link to="/extract-text-summarize-ai">
                  Text Summarization
                </Link>
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
            {/* <li className="online-chat-li">
              <Link to="javascript:void(0)">
                <img src="https://www.imagetotext.info/web_assets/frontend/img/icons/chat-us.svg?v=1.4" alt="chat" width={30} height={30} />
                Chat
              </Link>
            </li> */}
            {/* <li className="get-api-nav-li">
              <Link to="/premium">
                <img src="https://www.imagetotext.info/web_assets/frontend/img/icons/pricing-icon.svg?v=1.4" alt="pricing" width={30} height={30} />
                <span>Pricing</span>
              </Link>
            </li> */}
            {/* <li>
              <Link to="/login" className="account-item auth-btns">
                <img src="https://www.imagetotext.info/web_assets/frontend/img/icons/login.svg" alt="icon" width={30} height={30} />
                <span>Login</span>
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
