import { connect, useDispatch, useSelector } from 'react-redux';

import './HeaderMoviePage.scss'
import { useEffect, useRef, useState } from 'react';
import { LANGUAGES } from '../../../untils';
import * as actions from "../../../store/actions";
import { withRouter } from 'react-router';
import HeaderSW from '../../mainWatch/SideWatch/Header/HeaderSW';

function HeaderMoviePage(props) {
    const [user, setUser] = useState({
        userName: '',
        avatar: ''
    })
    const [background, setBackground] = useState('headerMoviePage');
    const { side, language } = useSelector(state => (
        {
            side: state.app.side,
            language: state.app.language
        }
    ))
    const dispatch = useDispatch()
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 80) {
                setBackground('headerMoviePage bg-solid')
            } else {
                setBackground('headerMoviePage')
            }
        }
        window.addEventListener('scroll', handleScroll, true)
        return () => window.removeEventListener('scroll', handleScroll, true)
    }, [])
    const handleBackHome = () => {
        dispatch(actions.setSideInfo(false))
        props.history.push('/home')
    }
    return (
        <div className={background}>
            <div className='content-left'>
                <div className='btn-menu col-1' onClick={() => dispatch(actions.setSideInfo(!side))} >
                    <i className="fas fa-bars"></i>
                </div>
                <div className='name-brand col-4' onClick={() => handleBackHome()}>
                </div>
            </div>
            <div className='content-center'>
                <div className='menu-movie'>
                    <div className='name-menu'>
                        Trang chủ
                    </div>
                    <div className='name-menu'>
                        Phim Phổ biến
                    </div>
                    <div className='name-menu'>
                        Phim bộ
                    </div>
                    <div className='name-menu'>
                        Phim lẻ
                    </div>
                </div>
                <div className='content-2'>
                    <div className='languages' style={{ width: '60px', height: '30px' }}>
                        <div className={language === LANGUAGES.VI ? 'lang-vi active' : 'lang-vi'}>
                            <span onClick={() => dispatch(actions.changeLanguageApp(LANGUAGES.VI))}>VI</span>
                        </div>
                        <div className={language === LANGUAGES.EN ? 'lang-en active' : 'lang-en'}>
                            <span onClick={() => dispatch(actions.changeLanguageApp(LANGUAGES.EN))}>EN</span>
                        </div>
                    </div>
                    <div className='header-search'>
                        <i class="fa fa-search"></i>
                        <input type="text" className="form-control form-input" placeholder="Search anything..." />
                        <span className="left-pan"><i class="fa fa-microphone"></i></span>
                    </div>
                </div>

            </div>
            <div className='content-right'>
                <HeaderSW />
            </div>
        </div>
    )
}

export default withRouter(HeaderMoviePage);