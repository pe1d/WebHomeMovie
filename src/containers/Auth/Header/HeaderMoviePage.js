import { connect } from 'react-redux';

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
    const { side } = props
    useEffect(() => {
        const handleScroll = () => {
            console.log(window.scrollY);
            // console.log('check ref', header);
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
        props.history.push('/home')
    }
    return (
        <div className={background}>
            <div className='content-left'>
                <div className='btn-menu col-1' onClick={() => props.changeSide(!side)} >
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
                        <div className={props.language === LANGUAGES.VI ? 'lang-vi active' : 'lang-vi'}>
                            <span onClick={() => props.changeLanguageAppRedux(LANGUAGES.VI)}>VI</span>
                        </div>
                        <div className={props.language === LANGUAGES.EN ? 'lang-en active' : 'lang-en'}>
                            <span onClick={() => props.changeLanguageAppRedux(LANGUAGES.EN)}>EN</span>
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
const mapStateToProps = state => {
    return {
        language: state.app.language,
        side: state.app.side
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
        changeSide: (side) => dispatch(actions.setSideInfo(side))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderMoviePage));