import React from 'react';
import PrivateContext from '../../contexts/PrivateContext';
import './userinforoute.scss';
import TokenService from '../../services/token-service';
import config from '../../config'

class UserInfo extends React.Component {
    static contextType = PrivateContext;
    constructor(props) {
        super(props);
        this.state = {
            viewMode: true,
            saveComplete: false,
        };
    }

    shouldComponentUpdate() {
        // if (this.state.viewMode && this.state.saveComplete) {
        //     return true
        // }
        return this.state.viewMode === false && this.state.saveComplete === true
    };

    handleEdit = () => {
        this.setState({viewMode: !this.state.viewMode})
        console.log(this.state.viewMode)
    };

    componentDidMount = () => {
        console.log('Saving...')
        // this.setState({saving: !this.state.saving})
        return fetch(`${config.API_ENDPOINT}/users/contact`, {
            headers: {
                authorization: `bearer ${TokenService.getAuthToken()}`,
            }
        })
        .then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json())
        .then((data) => {
            console.log('response here:',data)
        });
        // this.setState({saveComplete: true})
    };

    renderNameField = (currentName) => {
        return <input type='text' name='input-name' placeholder={currentName} />
    }
    renderUsernameField = (currentUsername) => {
        return (
            <input type='text' name='input-username' placeholder={currentUsername} />
        )
    }
    renderPasswordField = () => {
        return (
            <fieldset>
                <input type='password' name='input-password'/>
                <input type='password' name='input-repassword' placeholder='Re-enter Password' />
            </fieldset>
        )
    }

    renderEmailField = (currentEmail) => {
        return (
            <input type='text' name='input-email' placeholder={currentEmail} />
        )
    }

    renderPhonNumberField = (currentPhoneNumber) => {
        return (
            <input type='text' name='input-phone' placeholder={currentPhoneNumber} />
        )
    }
    
    render() {
        const userAccountInfo = this.context.user
        const userContactInfo = this.context.userContact
        
        console.log('user from context',this.context.user.id)
        return (
            <div className='account-page'>
                <div className='account-title'>My Account</div>
                <form className='update-account-form' onSubmit={() => this.handleSave()}>
                    <div className='save-edit-buttons'>
                        <button className='edit-button btn' onClick={() => this.handleEdit()}>{this.state.viewMode ? 'Edit': 'Cancel'}</button>
                        <button type='submit' className='save-button btn'>Save</button>
                    </div>
                    <div className='account-area'>
                        <label htmlFor="input-name" className='account-name'>Name</label>
                        <div className='account-name-field'>{this.state.viewMode ?  userAccountInfo.name: this.renderNameField(userAccountInfo.name)}</div>
                        <label htmlFor="input-username" className='account-username'>Username</label>
                        <div className='account-username-field'>{this.state.viewMode ? userAccountInfo.username : null}</div>
                        <label htmlFor="input-password" className='account-password'>Password</label>
                        <div className='account-password-field'>{this.state.viewMode ? null : this.renderPasswordField()}</div>
                        <label htmlFor="input-email" className='account-email'>Email</label>
                        <div className='account-email-field'>{this.state.viewMode ? null : this.renderEmailField('email') }</div>
                        <label htmlFor="name" className='account-phone'>Phone Number</label>
                        <div htmlFor="input-phone" className='account-phone-field'>{this.state.viewMode ? null : this.renderNameField(userAccountInfo.name)}</div>
                        <div className='account-companyid'>Company Code</div>
                        <div className='account-companyid-field'>{this.state.viewMode ? this.context.user.company_id : null}</div>
                    </div>
                </form>
            </div>
            
            
            
        )
    };
}

export default UserInfo;