import React, { useEffect, useState } from 'react';
import './HeaderSW.scss'
import { FormattedMessage } from 'react-intl';

function HeaderSW(props) {
    const [noticeList, setNoticeList] = useState([
        { id: '1', title: 'notice 1', date: 1716722226, status: 'N' },
        { id: '2', title: 'notice 2', date: 1716376619, status: 'O' },
        { id: '3', title: 'notice 3', date: 1708600619, status: 'N' },
        { id: '4', title: 'notice 4', date: 1716376619, status: 'N' },
        { id: '5', title: 'notice 5', date: 1708600619, status: 'N' },
        { id: '6', title: 'notice 6', date: 1716376619, status: 'O' },
        { id: '7', title: 'notice 7', date: 1708600619, status: 'N' },
        { id: '8', title: 'notice 4', date: 1716376619, status: 'N' },
        { id: '9', title: 'notice 5', date: 1708600619, status: 'N' },
        { id: '10', title: 'notice 6', date: 1716376619, status: 'O' },
        { id: '11', title: 'notice 7', date: 1708600619, status: 'N' }
    ])
    const [user, setUser] = useState({
        userName: '',
        avatar: ''
    })
    const [boxInfo, setBoxInfo] = useState(false)
    const [modal, setModal] = useState(false)
    useEffect(() => {
        document.body.style.overflow = modal ? 'hidden' : 'auto';
    }, [modal])
    const handleDeleteNotice = (noti, event) => {
        event.stopPropagation();
        const newNoti = noticeList.filter((item) => {
            console.log('check item', item);
            return item.id !== noti.id;
        })
        setNoticeList(newNoti)
    }
    const handleClickONnotice = (noti, event) => {
        event.stopPropagation();
        const newNotice = noticeList.map((item) => {
            if (item.id == noti.id && noti.status == 'N') {
                item.status = 'O';
            }
            return item;
        })
        setNoticeList(newNotice)
    }
    const checkNewNoti = () => {
        let allNotice = noticeList.filter((e) => {
            return e.status == 'N'
        }).length;
        return allNotice
    }
    const handleMore = () => {
        if (modal == true) {
            setModal(false);
            setBoxInfo(true)
        } else {
            setBoxInfo(!boxInfo)
        }

    }
    const checkModal = () => {
        if (boxInfo == true) {
            setBoxInfo(false);
            setModal(true);
            return
        }
        setModal(!modal)
    }
    return (
        <>
            <div typeof='button' className='btn-noti' onClick={() => checkModal()}>
                < div class="btn-badge pulse-button">{checkNewNoti()}</div>
                <i className="fas fa-bell" ></i>
                <div className={modal === true ? 'container-noti' : 'container-noti off-noti'}>
                    <div className='header-noti'>
                        <div className='name-header'>
                            <FormattedMessage id='main.header.noti' />
                        </div>
                        <div className='settings-header'>
                            <i className="fas fa-cog"></i>
                        </div>
                    </div>
                    <div className='box-noti'>
                        {noticeList && noticeList.length > 0 ?
                            noticeList.map((item, index) => {
                                return (
                                    <div class="sec" key={index} onClick={(event) => handleClickONnotice(item, event)}>
                                        <div className='new' >
                                            {item.status && item.status === 'N' &&
                                                <i class="fas fa-circle"></i>
                                            }
                                        </div>
                                        <div className='profile'></div>
                                        <div class="profCont">
                                            <div class="txt">{item.title}</div>
                                            <div class="txt sub">{new Date(item.date * 1000).toLocaleString()}</div>
                                        </div>
                                        <div className='delete-noti' onClick={(event) => handleDeleteNotice(item, event)}>
                                            <i className="fas fa-times" ></i>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            <div className='none'><FormattedMessage id='main.header.non-noti' /></div>
                        }
                    </div>
                </div>

            </div>
            <div className='user'>
                <div className='name'>Xuan Diep

                </div>
                <div className='more-info' onClick={() => handleMore()}><i class="fas fa-caret-down"></i></div>
                <div className='logo' style={{ backgroundImage: `url(${user.avatar})` }} onClick={() => handleMore()}>
                    <div className={boxInfo === true ? 'box-user' : 'box-user d-none'}>
                        <div className='header-b-u'>
                            <div className='logo' style={{ backgroundImage: `url(${user.avatar})` }}></div>
                            <div className='content-h-b-u'>
                                <div className='name-b-u'>
                                    Xuan Diep
                                </div>
                                <div className='id'>
                                    @id
                                </div>
                                <div className='info'><a href='#'>Xem tài khoản</a></div>
                            </div>
                        </div>
                        <div className='section-b-u'>
                            <div className='row-s-u'>
                                <div className='icon'><i className="fas fa-users"></i></div>
                                Chuyển người dùng
                            </div>
                            <div className='row-s-u'>
                                <div className='icon'><i className="fas fa-sign-out-alt"></i> </div>

                                Đăng xuất
                            </div>


                        </div>
                        <div className='section-b-u'>
                            <div className='row-s-u'>
                                <div className='icon'><i className="fas fa-heart"></i></div>
                                Phim yêu thích
                            </div>
                            <div className='row-s-u'>
                                <div className='icon'><i className="fas fa-box"></i> </div>
                                Tiếp tục xem
                            </div>


                        </div>
                    </div>
                </div>
            </div>
            {modal === true &&
                <div className='background-noti' onClick={() => setModal(false)}></div>
            }
            {boxInfo === true &&
                <div className='background-noti' onClick={() => setBoxInfo(false)}></div>
            }

        </>
    )
}

export default HeaderSW;