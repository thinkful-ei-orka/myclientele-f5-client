import React from 'react';
import PrivateContext from '../../contexts/PrivateContext';
import './userinforoute.scss';

class UserInfo extends React.Component {
    static contextType = PrivateContext;
    constructor(props) {
        super(props);
        // this.state = {
        //     phone
        // }
    }

    render() {
        return <div>Hello!</div>
    }
}

export default UserInfo;