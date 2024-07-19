import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import HomeFooter from '../HomePage/HomeFooter';
// class Login extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             userName: '',
//             password: '',
//             errMessage: ''
//         }
//     }
//     handleOnChangeInput = (event) => {
//         this.setState({
//             [event.target.name]: event.target.value,
//         })
//     }
//     handleLogin = () => {
//         this.setState({
//             errMessage: ''
//         })
//         let { userName, password } = this.state;
//         console.log('Username: ', userName, 'Password: ', password)
//         try {
//             let data = { userName, password }
//             this.props.userLoginSuccess(data)
//         } catch (error) {
//             if (error.response) {
//                 if (error.response.data) {
//                     this.setState({
//                         errMessage: error.response.data.message
//                     })
//                 }
//             }
//         }
//     }
//     handlekeydown = (event) => {
//         if (event.key === "Enter") {
//             this.handleLogin()
//         }
//     }
//     render() {
//         return (
//             <>
//                 <div className='login-background'>
//                     <div className='login-container' >
//                         <div className='login-content'>
//                             <div>
//                                 <h1 style={{ textAlign: 'center' }}><FormattedMessage id='login.sign-in' /></h1>
//                             </div>
//                             <form>
//                                 <div className="col-12 form-group login-input">
//                                     <label className="form-label"><FormattedMessage id='login.input-email-title' /></label>
//                                     <div className="input-group input-group-lg">
//                                         <FormattedMessage id="login.placeholder-email">
//                                             {placeholder =>
//                                                 <input type="email" class="form-control" name='userName' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"
//                                                     placeholder={placeholder}
//                                                     value={this.state.userName} onChange={(event) => this.handleOnChangeInput(event)} />
//                                             }
//                                         </FormattedMessage>
//                                     </div>
//                                 </div>
//                                 <div className="col-12 form-group login-input">
//                                     <label className="form-label"><FormattedMessage id='login.input-password-title' /></label>
//                                     <div className="input-group input-group-lg">
//                                         <FormattedMessage id="login.placeholder-password">
//                                             {placeholder =>
//                                                 <input type="password" class="form-control" name='password' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"
//                                                     placeholder={placeholder}
//                                                     value={this.state.password} onChange={(event) => this.handleOnChangeInput(event)} />
//                                             }
//                                         </FormattedMessage>
//                                     </div>
//                                 </div>
//                                 <div className='col-12' style={{ color: 'red' }}>
//                                     {this.state.errMessage}
//                                 </div>
//                                 <button type="button" className="btn btn-primary btn-signin"
//                                     onClick={() => this.handleLogin()}
//                                 >
//                                     <FormattedMessage id='login.btn-sign-in' />
//                                 </button>
//                                 <div className="col-12">
//                                     <div className="col" style={{ margin: '5px', textAlign: 'center' }}>
//                                         <a href="#!"><FormattedMessage id='login.forgot-password' /></a>
//                                     </div>
//                                 </div>
//                                 <div className="text-center ">
//                                     <p><FormattedMessage id='login.title-reg' /><a href="#!"><FormattedMessage id='login.reg' /></a></p>
//                                     <p><FormattedMessage id='login.more-way-sign-in' /></p>
//                                     <div className='sign-other'>
//                                         <button type="button" className="btn btn-link btn-floating mx-1">
//                                             <i className="fab fa-facebook-f"></i>
//                                         </button>

//                                         <button type="button" className="btn btn-link btn-floating mx-1">
//                                             <i className="fab fa-google"></i>
//                                         </button>

//                                         <button type="button" className="btn btn-link btn-floating mx-1">
//                                             <i className="fab fa-twitter"></i>
//                                         </button>

//                                         <button type="button" className="btn btn-link btn-floating mx-1">
//                                             <i className="fab fa-github"></i>
//                                         </button>
//                                     </div>
//                                 </div>
//                             </form>
//                         </div>
//                     </div >
//                 </div >
//                 <HomeFooter></HomeFooter>
//             </>
//         )
//     }
// }
function Login(props) {
    const [user, setUser] = useState(
        {
            userName: '',
            password: ''
        }
    )
    const [errMessage, setErrMessage] = useState('')
    const handleLogin = () => {
        setErrMessage('')
        console.log('Username: ', user.userName, 'Password: ', user.password)
        try {
            props.userLoginSuccess(user)
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
            this.handleLogin()
        }
    }
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
                                            <input type="email" class="form-control" name='userName' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"
                                                placeholder={placeholder}
                                                value={user.userName} onChange={(event) => setUser({ userName: event.target.value })} />
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
                                                value={user.password} onChange={(event) => setUser({ password: event.target.value })} />
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
                                <p><FormattedMessage id='login.title-reg' /><a href="#!"><FormattedMessage id='login.reg' /></a></p>
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
const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
