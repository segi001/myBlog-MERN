import React from 'react';
import {Form,
        Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';
import date from 'date-and-time';

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const AdminPostCreator = () => {
    var titleRef = React.createRef();
    var contentRef = React.createRef();
    var tagRef = React.createRef();

    function handleTitleInput() {
        return titleRef.current.value;
    }

    function handleContentInput() {
        return contentRef.current.value;
    }

    function handleTagInput() {
        return tagRef.current.value;
    }

    function createPost(e,title,content,tags) {
        e.preventDefault();
        const now = new Date();
        var payload = {};
        payload['title'] = title;
        payload['content'] = content;
        payload['date'] = date.format(now,'YYYY/MM/DD HH:mm:ss');
        payload['tags'] = tags.split(" ");
        payload['comments'] = [];
        payload['views'] = 0;
        var stringPayload = JSON.stringify(payload);
        $.ajax(
            {
                async : false,
                method : 'POST',
                url : API_URL+'/?apiKey='+API_KEY,
                dataType : 'json',
                contentType : 'application/json',
                data : stringPayload
            }
        );
        window.location.reload();
    }


    return (
        <Form className="mx-auto" style={{width:'70vw',margin:'20px 20px 20px 20px'}}>
        <Form.Group controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control onInput={handleTitleInput} ref={titleRef} type="text" placeholder="Title..." />
        </Form.Group>

        <Form.Group controlId="formBasicContent">
            <Form.Label>Content</Form.Label>
            <Form.Control onInput={handleContentInput} ref={contentRef} as="textarea" placeholder="Content..." />
        </Form.Group>

        <Form.Group controlId="formBasicTags">
            <Form.Label>Tags</Form.Label>
            <Form.Control onInput={handleTagInput} ref={tagRef} type="text" placeholder="Tags..." />
        </Form.Group>

        <Button onClick={(e) => {createPost(e,titleRef.current.value,contentRef.current.value,tagRef.current.value)}} variant="primary" type="submit">
            Submit
        </Button>
        </Form>
    )
}

export default AdminPostCreator;