import React, { Component, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import HomeFooter from '../HomePage/HomeFooter';
function Register(props) {
    const [user, setUser] = useState(
        {
            userName: '',
            password: '',
            rePass: '',
        }
    )
    const [errMessage, setErrMessage] = useState('')
    const dispatch = useDispatch()
    const handleReg = () => {
        setErrMessage('')
        console.log('Username: ', user.userName, 'Password: ', user.password, user.rePass)
        if (user.password !== user.rePass) {
            console.log("Error");

            setErrMessage("Hai mật khẩu không trùng khớp. Vui lòng nhập lại!");
            return;
        }
        try {
            dispatch(actions.userLoginSuccess(user))
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
        }
    }

    const handlekeydown = (event) => {
        if (event.key === "Enter") {
            this.handleReg()
        }
    }
    return (
        <>
            <div className='login-background'>
                <div className='login-container' >
                    <div className='login-content'>
                        <div>
                            <h1 style={{ textAlign: 'center' }}><FormattedMessage id='register.title' /></h1>
                        </div>
                        <form>
                            <div className="col-12 form-group login-input">
                                <label className="form-label"><FormattedMessage id='register.input-email-title' /></label>
                                <div className="input-group input-group-lg">
                                    <FormattedMessage id="register.placeholder-email">
                                        {placeholder =>
                                            <input type="email" class="form-control" name='userName' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"
                                                placeholder={placeholder}
                                                value={user.userName} onChange={(event) => setUser({ ...user, userName: event.target.value })} />
                                        }
                                    </FormattedMessage>
                                </div>
                            </div>
                            <div className="col-12 form-group login-input">
                                <label className="form-label"><FormattedMessage id='register.input-password-title' /></label>
                                <div className="input-group input-group-lg">
                                    <FormattedMessage id="register.placeholder-password">
                                        {placeholder =>
                                            <input type="password" class="form-control" name='password' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"
                                                placeholder={placeholder}
                                                value={user.password} onChange={(event) => setUser({ ...user, password: event.target.value })} />
                                        }
                                    </FormattedMessage>
                                </div>
                            </div>
                            <div className="col-12 form-group login-input">
                                <label className="form-label"><FormattedMessage id='register.re-pass' /></label>
                                <div className="input-group input-group-lg">
                                    <FormattedMessage id="register.placeholder-password">
                                        {placeholder =>
                                            <input type="password" class="form-control" name='password' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"
                                                placeholder={placeholder}
                                                value={user.rePass} onChange={(event) => setUser({ ...user, rePass: event.target.value })} />
                                        }
                                    </FormattedMessage>
                                </div>
                            </div>
                            <button type="button" className="btn btn-primary btn-signin"
                                onClick={() => handleReg()}
                            >
                                <FormattedMessage id='register.title' />
                            </button>
                            <div className='col-12' style={{ color: 'red' }}>
                                {errMessage}
                            </div>
                            <div className="text-center ">

                                <p><FormattedMessage id='login.more-way-sign-in' /></p>
                                <div className='sign-other '>
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

export default Register;
