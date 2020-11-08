import React from 'react';
import $ from 'jquery';
import {Card,
        Jumbotron} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';
import NavigationBar from './navBar/navigationBar';

require('dotenv').config();

const REACT_URL = process.env.REACT_APP_URL;
const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const Home = () => {
    var allPosts;

    $.ajax({
        async : false,
        method : 'get',
        url : API_URL,
        data : {
            apiKey : API_KEY
        },
        success : function(data) {
            allPosts = data;
        }
    });

    var postElement = [];

    $.each(allPosts,function(i) {
        const url = REACT_URL+'post?id='+allPosts[i]._id;
        postElement.push(
            <Card style={{ position:'relative', width: '20rem',margin : '20px 20px 20px 20px',float:'left',height :'230px',overflow:'hidden'}}>
            <Card.Body>
                <Card.Title>{allPosts[i].title}</Card.Title>
                <Card.Text style={{position:'absolute',backgroundImage:'linear-gradient(to bottom,#000000 0%,rgba(0,0,0,0) 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
                {allPosts[i].content.substring(0,200)}
                </Card.Text>
                <Card.Link style={{position:'relative',top:'130px'}} href={url}>Read More</Card.Link>
            </Card.Body>
            </Card>
        )
    })

    return (
        <div>
            <NavigationBar />
            <Jumbotron className="jumbotron text-white shadow" style={{height:'50vh',backgroundPostion:'center center',backgroundImage : 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.6) 100%), url(https://placeimg.com/1000/480/nature)',backgroundSize:'cover'}}>
                <h1 className="text-center">Hello, Welcome To My Blog!</h1>
                <p className="text-center">
                    This is a simple blog application made with MERN stack. Check out my posts!
                    You are able to add and delete posts and comment on those same posts as well!
                </p>
            </Jumbotron>
            {postElement}
        </div>
    )
}

export default Home;
