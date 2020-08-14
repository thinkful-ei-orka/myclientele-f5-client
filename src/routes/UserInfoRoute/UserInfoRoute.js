import React from 'react';
import PrivateContext from '../../contexts/PrivateContext';
import './userinforoute.scss';

class UserInfo extends React.Component {
    static contextType = PrivateContext;
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            saving: false,
        };
    }

    handleEdit = () => {
        this.setState({editMode: !this.state.editMode})
        console.log('Editing...')
    };

    handleSave = () => {
        console.log('Saving...')
        this.setState({saving: !this.state.saving})
        //sav
        this.setState({saving: !this.state.saving})
    };

    render() {
        const userAccountInfo = this.context.user
        const userContactInfo = this.context.userContact
        
        console.log('user from context',this.context.user.id)
        return (
            <div className='account-page'>
                <div className='account-title'>My Account</div>
                <div className='save-delete-buttons'>
                    <button className='edit-button btn' onClick={() => this.handleEdit()}>{this.state.editMode ? 'Cancel' : 'Edit'}</button>
                    <button className='save-button btn' onClick={() => this.handleSave()}>Save</button>
                </div>
                <div className='account-area'>
                    <div className='account-name'>Name</div>
                    <div className='account-name-field'>{this.state.editMode ? null : userAccountInfo.name}</div>
                    <div className='account-username'>Username</div>
                    <div className='account-username-field'>{this.state.editMode ? null : userAccountInfo.username}</div>
                    <div className='account-password'>Password</div>
                    <div className='account-password-field'>{this.state.editMode ? null : null}</div>
                    <div className='account-email'>Email</div>
                    <div className='account-email-field'>{this.state.editMode ? null : null }</div>
                    <div className='account-phone'>Phone Number</div>
                    <div className='account-phone-field'>{this.state.editMode ? null : null }</div>
                    <div className='account-companyid'>Company Code</div>
                    <div className='account-companyid-field'>{this.state.editMode ? null : this.context.user.company_id}</div>
                </div>
            </div>
            
            
            
        )
    };
}

export default UserInfo;