import React from 'react';
import {Form,
        Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Cookie from 'js-cookie';
import $ from 'jquery';
import jwt from 'jsonwebtoken';

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const AdminLoginPage = () => {
    var usernameRef = React.createRef();
    var passwordRef = React.createRef();

    function handleUsername() {
        return usernameRef.current.value;
    }

    function handlePassword() {
        return passwordRef.current.value;
    }

    function handleLogin(e,username,password) {
        e.preventDefault();
        var payload = {};
        payload["username"] = username;
        payload["password"] = password;
        var stringPayload = JSON.stringify(payload);
        $.ajax(
            { 
                method : 'POST',
                url : API_URL+'/login?apiKey='+API_KEY,
                dataType : 'json',
                contentType : 'application/json',
                data : stringPayload,
                success : function(res) {
                    if (res.status == 403) { 
                        alert('403 - Unknown credentials');
                    } else {
                        const decodedToken = jwt.verify(
                            res.token,
                            'shhhhh'
                        );
                        const cookieToken = decodedToken.token;
                        Cookie.set('AUTHTOKEN',cookieToken,{expires : 1});
                        localStorage.setItem('AUTHTOKEN',cookieToken);
                        window.location.reload();
                    }
                }
            }
        )
    }

    return (
        <div style={{position:'relative',height:'100vh',backgroundImage : 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.6) 100%), url(https://placeimg.com/1000/480/nature)',backgroundSize:'100% 100%'}}>
            <Form className='mx-auto' style={{position:'relative',top:'30vh',width : '30vw',border : '2px grey solid',borderRadius : '20px',padding : '20px 20px 20px 20px',backgroundColor:'white'}}>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control onInput={handleUsername} ref={usernameRef} type="text" placeholder="Username" required />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control onInput={handlePassword} ref={passwordRef} type="password" placeholder="Password" required />
            </Form.Group>
            <Button onClick={(e)=>{handleLogin(e,usernameRef.current.value,passwordRef.current.value);}} variant="primary" type="submit">
                Login
            </Button>
            </Form>
        </div>
    )
}

export default AdminLoginPage;