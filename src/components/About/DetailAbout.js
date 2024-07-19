import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
// import '../../containers/Auth/About.scss'
import * as actions from "../../store/actions";
import { FormattedMessage } from 'react-intl';
function DetailAbout(props) {
    let { id, srcImg } = props
    return (
        <>
            {id && id % 2 == 1 ?
                <div className='detail-about'>
                    <div className='content-image' style={{
                        backgroundImage: `url('${srcImg}')`
                    }}>
                    </div>
                    <div className='content-title'>
                        <div className='title-detail'>
                            <FormattedMessage id={`about.details-${id}`} />
                        </div>
                        <div className='p1'>
                            <FormattedMessage id={`about.sub-details-${id}`} />
                        </div>
                    </div>
                </div>
                :
                <div className={`detail-about id-${id % 2}`}>
                    <div className='content-title'>
                        <div className='title-detail'>
                            <FormattedMessage id={`about.details-${id}`} />
                        </div>
                        <div className='p1'>
                            <FormattedMessage id={`about.sub-details-${id}`} />
                        </div>
                    </div>
                    <div className='content-image' style={{
                        backgroundImage: `url('${srcImg}')`
                    }}>
                    </div>
                </div >
            }

        </>
    )
}
const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailAbout);