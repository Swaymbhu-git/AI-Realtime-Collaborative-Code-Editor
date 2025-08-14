import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    // This page is now a simple landing page for non-logged-in users.
    return (
        <div className="homePageWrapper">
            <div className="formWrapper">
                <img
                    className="homePageLogo"
                    src="/logo.svg"
                    alt="logoOfCodeEditor"
                />
                <h4 className="mainLabel" style={{ textAlign: 'center' }}>
                    Welcome to the Real-Time Collaborative Editor
                </h4>
                <div className="inputGroup">
                    <Link to="/login" style={{ width: '100%' }}>
                        <button className="btn joinBtn" style={{ width: '100%' }}>Login</button>
                    </Link>
                    <span className="createInfo">
                        If you don't have an account, &nbsp;
                        <Link to="/register" className="createNewBtn">
                            register here
                        </Link>
                    </span>
                </div>
            </div>
            <footer>
                <h4>
                    Built for Perfection by{' '}
                    <a href="https://github.com/Swaymbhu-git">Himanshu Patel</a>
                </h4>
            </footer>
        </div>
    );
};

export default Home;