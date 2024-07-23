import React, { useState } from 'react';
import { connect } from 'react-redux';
import './HeaderSW.scss'
import * as actions from "../../../../store/actions";


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
    const handleDeleteNotice = (noti, event) => {
        event.stopPropagation();
        const newNoti = noticeList.filter((item) => {
            console.log('check item', item);
            return item.id !== noti.id;
        })
        setNoticeList(newNoti)
    }
    const handleClickONnotice = (noti) => {
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
    return (
        <>
            <div typeof='button' className='btn-noti'>
                < div class="btn-badge pulse-button">{checkNewNoti()}</div>
                <i className="fas fa-bell" ></i>
                <div className='container-noti'>
                    <div className='header-noti'>
                        <div className='name-header'>
                            Thông báo
                        </div>
                        <div className='settings-header'>
                            <i className="fas fa-cog"></i>
                        </div>
                    </div>
                    <div className='box-noti'>
                        {noticeList && noticeList.length > 0 ?
                            noticeList.map((item, index) => {
                                return (
                                    <div class="sec" key={index} onClick={() => handleClickONnotice(item)}>

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
                            <div className='none'>Không còn thông báo</div>
                        }
                    </div>
                </div>

            </div>
            <div className='user'>
                <div className='name'>Xuan Diep</div>
                <div className='more-info'><i class="fas fa-caret-down"></i></div>
                <div className='logo' style={{ backgroundImage: `url(${user.avatar})` }}>
                </div>
            </div>
        </>
    )
}

export default HeaderSW;