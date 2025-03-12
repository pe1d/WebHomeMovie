import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from "../../store/actions";
import axios from 'axios';
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import HomeFooter from '../HomePage/HomeFooter';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { handleGetUserByUserName, handleLoginApi } from '../../services/userService';
function Login(props) {
    const [user, setUser] = useState(
        {
            username: '',
            password: ''
        }
    )
    const { isLoggedIn, userInfo } = useSelector(state => ({
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    }));
    const [errMessage, setErrMessage] = useState('')
    const dispatch = useDispatch()
    const handleLogin = async () => {
        setErrMessage('')        
        try {
            console.log("check user:", user);
            const isLogin = await handleLoginApi(user);
            console.log('Check:isLogin: ',isLogin);
            
            if(isLogin.result === "success"){
                const userData = await handleGetUserByUserName(user.username);
                dispatch(actions.userLoginSuccess(userData))
            } else if(isLogin.result === "fail"){
                setErrMessage("Tài khoản hoặc mật khẩu không đúng!");
                setTimeout(() => {
                    setErrMessage("");
                }, 3000);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    setErrMessage(error.response.data.message) 
                }
            }
        }
    }
    const handleRes = () => {
        props.history.push('/register')
    }
    const handlekeydown = (event) => {
        if (event.key === "Enter") {
            this.handleLogin()
        }
    }
    console.log("Check log redux: ", userInfo, isLoggedIn)
    return (
        <>
            <div className='login-background'>
                <div className='login-container' >
                    <div className='login-content'>
                        <div>
                            <h1 style={{ textAlign: 'center' }}><FormattedMessage id='login.sign-in' /></h1>
                        </div>
                        <form>
                            <div className="col-12 form-group login-input">
                                <label className="form-label"><FormattedMessage id='login.input-email-title' /></label>
                                <div className="input-group input-group-lg">
                                    <FormattedMessage id="login.placeholder-email">
                                        {placeholder =>
                                            <input type="email" class="form-control" name='username' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"
                                                placeholder={placeholder}
                                                value={user.username} onChange={(event) => setUser({ ...user, username: event.target.value })} />
                                        }
                                    </FormattedMessage>
                                </div>
                            </div>
                            <div className="col-12 form-group login-input">
                                <label className="form-label"><FormattedMessage id='login.input-password-title' /></label>
                                <div className="input-group input-group-lg">
                                    <FormattedMessage id="login.placeholder-password">
                                        {placeholder =>
                                            <input type="password" class="form-control" name='password' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"
                                                placeholder={placeholder}
                                                value={user.password} onChange={(event) => setUser({ ...user, password: event.target.value })} />
                                        }
                                    </FormattedMessage>
                                </div>
                            </div>
                            <div className='col-12' style={{ color: 'red' }}>
                                {errMessage}
                            </div>
                            <button type="button" className="btn btn-primary btn-signin"
                                onClick={() => handleLogin()}
                            >
                                <FormattedMessage id='login.btn-sign-in' />
                            </button>
                            <div className="col-12">
                                <div className="col" style={{ margin: '5px', textAlign: 'center' }}>
                                    <a href="#!"><FormattedMessage id='login.forgot-password' /></a>
                                </div>
                            </div>
                            <div className="text-center ">
                                <div className='top-c'>
                                    <FormattedMessage id='login.title-reg' />
                                    <div className='register' onClick={() => handleRes()}><FormattedMessage id='login.reg' /></div>
                                </div>
                                <p><FormattedMessage id='login.more-way-sign-in' /></p>
                                <div className='sign-other'>
                                    <button type="button" className="btn btn-link btn-floating mx-1">
                                        <i className="fab fa-facebook-f"></i>
                                    </button>

                                    <button type="button" className="btn btn-link btn-floating mx-1">
                                        <i className="fab fa-google"></i>
                                    </button>

                                    <button type="button" className="btn btn-link btn-floating mx-1">
                                        <i className="fab fa-twitter"></i>
                                    </button>

                                    <button type="button" className="btn btn-link btn-floating mx-1">
                                        <i className="fab fa-github"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
            <HomeFooter></HomeFooter>
        </>
    )
}

export default Login;
