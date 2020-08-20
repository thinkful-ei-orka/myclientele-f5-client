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
            infoToUpdate['passwords'] = passwordSame
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
            this.setState({ error: res.error})
        })
        .then(
            this.setState({
                name: '',
                username: '',
                password:'',
                rePassword:'',
                phoneNumber: '',
                email: '',
                error:''})
        );
    };

    componentDidMount = () => {
    this.context.fetchContext()
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

        const userContactInfo = this.context.userContact
        return (
            <div className='account-page'>
                <div className='account-title'>My Account</div>
                <form className='update-account-form' onSubmit={(e) => this.handleSave(e)}>
                    <div className='account-area'>
                        <label htmlFor="input-name" className='account-name'>Name</label>
                        <div className='account-name-field update-field'>
                            {userContactInfo.name}
                            <input type='text' name='input-name' placeholder={'Enter new name'} onChange={this.setName}/>
                        </div>
                        <label htmlFor="input-username" className='account-username'>Username</label>
                        <div className='account-username-field update-field'>
                            {userContactInfo.user_name}
                            <input type='text' name='input-username' placeholder='Enter new username' onChange={this.setUsername}/>
                        </div>
                        <label htmlFor="input-password" className='account-password'>Password</label>
                        <div className='account-password-field update-field'>
                            <fieldset>
                                <input type='password' name='input-password'placeholder='Enter new password'onChange={this.setPassword}/>
                                <input type='password' name='input-repassword' placeholder='Re-enter password' onChange={this.setRepassword}/>
                            </fieldset>
                        </div>
                        <label htmlFor="input-email" className='account-email'>Email</label>
                        <div className='account-email-field update-field'>
                            {userContactInfo.email}
                            <input type='text' name='input-email' placeholder='Enter new email address' onChange={this.setEmail}/>
                        </div>
                        <label htmlFor="name" className='account-phone'>Phone Number</label>
                        <div htmlFor="input-phone" className='account-phone-field update-field'>
                            {userContactInfo.phone_number}
                            <input type='text' name='input-phone' placeholder='Enter new phone number' onChange={this.setPhoneNumber}/>
                        </div>
                        <div className='account-companyid'>Company Code</div>
                        <div className='account-companyid-field update-field'>
                            {this.context.user.company_id}
                            <CopyToClipboard text={this.context.user.company_id}>
                                <button className= 'copy-button btn'>Copy</button>
                            </CopyToClipboard>
                        </div>
                    </div>
                    <div className='save-edit-buttons'>
                        <button type='submit' className='save-button btn'>Save</button>
                    </div>
                </form>
                {this.state.error? this.state.error : null}
            </div>
            
            
            
        )
    };
}

export default MyAccountRoute;