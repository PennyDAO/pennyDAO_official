import React, { useState } from 'react';

import WrapperBox from '../components/WrapperBox/WrapperBox';
import FormInput from '../components/FormInput/FormInput';

import Modal from 'react-modal';

import { useAuth } from '../hooks/AuthContext';
import { Link, useHistory } from "react-router-dom"

import CircleButton from '../components/CircleButton/CircleButton';
import NavBar from '../app/NavBar/NavBar';
import Footer from '../components/Footer/Footer';

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        padding               : '20px 50px',
        backgroundColor       : '#FFFAF2',
        borderRadius          : '30px',
        boxShadow             : '0px 4px 4px rgba(0, 0, 0, 0.25)',
        border                : 'none'
    }
};

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [isStudent, setIsStudent] = useState(null);

    const history = useHistory();
    const { signup } = useAuth();

    function openModal(e) {
        setIsOpen(true);
    }
    

    function closeModal(){
        setIsOpen(false);
    }

    return(
        <div>
            <NavBar />
            <h1>New to PennyDAO?</h1>
            <WrapperBox>
                <form>
                    <h1>Register</h1>
                    <h3 style={{color: 'red'}}>{error}</h3>

                    <FormInput title='Email' value={email} setValue={setEmail}/>
                    <FormInput title='Password' value={password} setValue={setPassword}/>
                    <FormInput title='Confirm Password' value={passwordConfirm} setValue={setPasswordConfirm}/>
                    
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <CircleButton 
                            disabled={!(email && password && passwordConfirm)} 
                            onClick={e => 
                                {
                                    e.preventDefault(); 
                                    // TODO: Email verfication
                                    if (email === '')
                                        return setError('Email is empty')
                                    if (password === '')
                                        return setError('Password is empty')
                                    if (passwordConfirm === '')
                                        return setError('Confirm password is empty')
                                    if (password !== passwordConfirm) {
                                        return setError("Passwords do not match")
                                    }
                                    email && password && passwordConfirm ? openModal() : void(0);
                                }
                            }/>
                    </div>  
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Example Modal"
                        style={customStyles}
                    >
                        <button onClick={closeModal}>x</button>
                        <h1>Are you a...</h1>
                        <form className='modal-form'>
                            <button onClick={e => {e.preventDefault(); setIsStudent(true);}} className={isStudent ? 'enabled' : 'disabled'}>
                                Student
                            </button>
                            <h2>or</h2>
                            <button onClick={e => {e.preventDefault(); setIsStudent(false);}} className={isStudent ? 'disabled' : 'enabled'}>
                                Investor
                            </button>
                            <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '30px'}}>
                                <CircleButton disabled={isStudent===null} onClick={e => {e.preventDefault(); isStudent ? history.push('/student-application', {state: {email, password}}) : history.push('/investor-application', {state: {email, password}})}}/>
                            </div>
                        </form>
                    </Modal>
                </form>
            </WrapperBox>
            <Footer />
        </div>
    );
}

export default Register;