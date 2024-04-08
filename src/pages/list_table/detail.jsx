import React, { useState, useEffect} from 'react';

import { connect } from 'react-redux';

function Deatil(props) {
    return (
        <div>
            详情页面啊啊啊啊啊啊啊
        </div>
    );
}

function propMap(state, ownProps) {
    return {
        modal: state.modal,
        routing: ownProps
    };
}

export default  connect(propMap)(Deatil);