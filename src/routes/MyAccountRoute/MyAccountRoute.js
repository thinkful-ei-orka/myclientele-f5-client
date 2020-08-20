import React from 'react';
import PrivateContext from '../../contexts/PrivateContext';
import './MyAccountRoute.scss';
import TokenService from '../../services/token-service';
import config from '../../config';
import {CopyToClipboard, contextType} from 'react-copy-to-clipboard';
import UserApiService from '../../services/user-api-service';
import { info } from 'autoprefixer';

class MyAccountRoute extends React.Component {
    static contextType = PrivateContext;
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            username: '',
            password:'',
            rePassword:'',
            phoneNumber: '',
            email: '',
            error:''
        };
    }

    handleSave = (e) => {
        e.preventDefault();
        let passwordSame = true
        let infoToUpdate = {}
        if (this.state.password === this.state.rePassword) {
            passwordSame = this.state.password
            infoToUpdate.password = passwordSame
        }
        Object.entries(this.state).forEach(entry => {
            const [key, value] = entry;
            if(value !== this.state.password || value !== this.state.rePassword || value !== this.state.error){
                infoToUpdate[key] = value
            }
        })
        console.log(infoToUpdate)

        UserApiService.updateUserContactInfo(infoToUpdate)
        .catch((res) => {
            this.setState({ error: res.error});
        })
    };

    componentDidMount = () => {
    //     console.log('Saving...')
    //     // this.setState({saving: !this.state.saving})
    //     return fetch(`${config.API_ENDPOINT}/users/contact`, {
    //         headers: {
    //             authorization: `bearer ${TokenService.getAuthToken()}`,
    //         }
    //     })
    //     .then((res) =>
    //   !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json())
    //     .then((data) => {
    //         console.log('response here:',data)
    //     });
        this.setState({contactInfo: this.context.userContact})
    };

    setName =(e) => {
        this.setState({
            name: e.target.value
        })
    };
    setUsername =(e) => {
        this.setState({
            username: e.target.value
        })
    };
    setPassword =(e) => {
        this.setState({
            password: e.target.value
        })
    };
    setRepassword =(e) => {
        this.setState({
            rePassword: e.target.value
        })
    };
    setPhoneNumber =(e) => {
        this.setState({
            phoneNumber: e.target.value
        })
    };
    setEmail =(e) => {
        console.log(e.target.value)
        this.setState({
            email: e.target.value
        })
    };

    render() {
        const userAccountInfo = this.context.user
        const userContactInfo = this.context.userContact
        return (
            <div className='account-page wrapper'>
                <form className='update-account-form' onSubmit={(e) => this.handleSave(e)}>
                    <h2 id="title">My Account</h2>
                    <label htmlFor="input-name" className='account-name'>Name</label>
                    <input type='text' name='input-name'
                    value={userAccountInfo.name}
                    placeholder='Enter new name' onChange={this.setName}/>
                    <label htmlFor="input-username" className='account-username'>Username</label>
                    <input type='text' name='input-username' value={userAccountInfo.username} placeholder='Enter new username' onChange={this.setUsername}/>
                    <label htmlFor="input-password" className='account-password'>Password</label>
                    <fieldset>
                        <input type='password' name='input-password'placeholder='Enter new password'onChange={this.setPassword}/>
                        <input type='password' name='input-repassword' placeholder='Re-enter password' onChange={this.setRepassword}/>
                    </fieldset>
                    <label htmlFor="input-email" className='account-email'>Email</label>
                    <input type='text' name='input-email' value={userContactInfo.email} placeholder='Enter new email address' onChange={this.setEmail}/>
                    <label htmlFor="name" className='account-phone'>Phone Number</label>
                    <input type='text' name='input-phone' value={userContactInfo.phone_number} placeholder='Enter new phone number' onChange={this.setPhoneNumber}/>
                    <label>Company Code</label>
                    <input className="company-code" type="text" value={this.context.user.company_id} disabled></input>
                    <CopyToClipboard text={this.context.user.company_id}>
                        <button className="btn">Copy</button>
                    </CopyToClipboard>
                    <button type='submit' className='save-button btn'>Save</button>
                </form>
                {this.state.error? this.state.error : null}
            </div>
        )
    };
}

export default MyAccountRoute;
