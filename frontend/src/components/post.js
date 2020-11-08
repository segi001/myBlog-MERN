import React from 'react';
import $ from 'jquery';
import {Card,
        Form,
        Button,
        Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import NavigationBar from './navBar/navigationBar';

const REACT_URL = process.env.REACT_APP_URL;
const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const PostPage = () => {
    var usernameRef = React.createRef();
    var contentRef = React.createRef();

    function handleUsername() {
        return usernameRef.current.value;
    }

    function handleContent() {
        return contentRef.current.value;
    }

    function postComment(e,id,username,content) {
        e.preventDefault();
        var payload = {};
        payload['postID'] = id;
        payload['name'] = username;
        payload['comment'] = content;
        var stringPayload = JSON.stringify(payload);
        $.ajax(
            { 
                async : false,
                method : 'PUT',
                url : API_URL+'/comment?apiKey='+API_KEY,
                dataType : 'json',
                contentType : 'application/json',
                data : stringPayload
            }
        );
        window.location.reload();
    }

    var postArray = [];
    var commentArray = [];
    const id = window.location.href.replace(REACT_URL+'post?id=','');

    const API_URL_WITH_ID = 'http://localhost:8003/api/blog/'+id;

    $.ajax({
        async : false,
        method : 'get',
        url : API_URL_WITH_ID,
        data : {
            apiKey : API_KEY
        },
        success : function(data) {
            if (data.comments.length == 0) {
                commentArray.push(
                    <Alert variant='secondary' className='shadow mx-auto' style={{width:'40vw',margin:'20px 0px 20px 0px',padding:'20px 20px 20px 20px'}} >
                        This comment section is empty! Be the first one to comment!
                    </Alert>
                )
            } else {
                $.each(data.comments,function(i) {
                    commentArray.push(
                        <Card className="shadow mx-auto" style={{ width: '40vw',margin:'20px 1vh 1vw 1vh' }}>
                        <Card.Header as="h5">{data.comments[i].name}</Card.Header>
                        <Card.Body>
                            <Card.Text>
                            {data.comments[i].comment}
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    );
                })
            }
            postArray.push(
                <div>
                    <Card className="shadow text-center mx-auto" style={{ width: '60vw',margin:'2vw 5vh 2vw 5vh' }}>
                    <Card.Body>
                        <Card.Title className="display-4">{data.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{data.date}</Card.Subtitle>
                        <Card.Text className="h4" style={{padding : '20px 20px 20px 20px'}}>
                        {data.content}
                        </Card.Text>
                    </Card.Body>
                    </Card>
                    <Card className='mx-auto shadow' style={{width:'40vw',margin:'0px 0px 0px 0px',padding:'20px 20px 20px 20px'}} >
                        <Form>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name: </Form.Label>
                            <Form.Control onInput={handleUsername} ref={usernameRef} type="text" placeholder="Your name" />
                        </Form.Group>

                        <Form.Group controlId="formBasicText">
                            <Form.Label>Comment :</Form.Label>
                            <Form.Control onInput={handleContent} ref={contentRef} as="textarea" placeholder="Your comment" />
                        </Form.Group>

                        <Button onClick={(e)=>{postComment(e,data._id,usernameRef.current.value,contentRef.current.value)}} variant="primary" type="submit">
                            Submit
                        </Button>
                        </Form>
                    </Card>
                    {commentArray}
                </div>
            );
        }
    });

    return (
        <div className="shadow" style={{height:'105vh',backgroundImage : 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.6) 100%), url(https://placeimg.com/1000/480/nature)',backgroundSize:'cover'}}>
            <NavigationBar />
            {postArray}
        </div>
    )
}

export default PostPage;