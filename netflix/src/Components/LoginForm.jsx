import React from 'react';
import { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const displayEmailError = () => {
        document.querySelector('#email-error').classList.toggle('hide');
    }
    
    const displayPasswordError = () => {
        document.querySelector('#password-error').classList.toggle('hide');
    }


    const handleSubmitButtun = () => {
        setEmail(document.querySelector('#floatingId').value);
        setPassword(document.querySelector('#floatingPassword').value);
        if (document.querySelector('#remember').checked) {
            setRemember(true);
        }
        if(email === ''){
            displayEmailError();
        }
        if(password === ''){
            displayPasswordError();
        }

        if(email !== '' && password !== ''){
            fetch(url+"login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    remember: remember
                })
            }).then(response => response.json()).then(data => {
                console.log(data);
            }
            ).catch(error => {
                console.error('Error:', error);
            });
        }
    }

    return (
        <div>
            <div className='form'>
                <h1>S'identifier</h1>
                <FloatingLabel
                    controlId="floatingId"
                    label="E-mail ou numéro de téléphone"
                    className="mb-3"
                >
                    <Form.Control type="text" placeholder="E-mail ou numéro de téléphone" onChange={e => setEmail(e.target.value)}/>
                </FloatingLabel>
                <p id='email-error' className='hide'>Veuillez saisir une adresse e-mail ou un numéro de téléphone valide.</p>
                <FloatingLabel controlId="floatingPassword" label="Mot de passe">
                    <Form.Control type="password" placeholder="Mot de passe" onChange={e => setPassword(e.target.value)} />
                </FloatingLabel>
                <p id='password-error' className='hide'>Veuillez saisir un mot de passe.</p>
                <button className='btn-signup' onClick={handleSubmitButtun}>S'identifier</button>
                    <span>OU</span>
                <button className="signup-code">Utiliser un code d'identification</button>
                <p>Mot de passe oublié</p>
                <Form.Check type='checkbox'>
                    <Form.Check.Input type='checkbox' id='remember' isValid onChange={e => {
                        setRemember(e.target.value == 'on' ? true : false)
                        }
                    } />
                    <Form.Check.Label>Se souvenir de moi</Form.Check.Label>
                </Form.Check>


                <p>Première fois sur Netflix <b>Inscrivez-vous</b></p>
            </div>
        </div>
    );
};

export default LoginForm;