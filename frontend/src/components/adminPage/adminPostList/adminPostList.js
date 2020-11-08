import React from 'react';
import {Table,
        Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import $, { post } from 'jquery';

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const AdminPostList = () => {

    function deletePost(id) {
        $.ajax({
            async : false,
            type : 'DELETE',
            url : API_URL+'/'+id+'?apiKey='+API_KEY
        });
        window.location.reload();
    }

    var postList = [];

    $.ajax(
        {
            async : false,
            method : 'GET',
            url : API_URL+'/?apiKey='+API_KEY,
            success : function(res) {
                $.each(res,function(i) {
                    postList.push(
                        <tr>
                            <td>{i+1}</td>
                            <td>{res[i].title}</td>
                            <td>{res[i].views}</td>
                            <td><Button onClick={(e)=>{deletePost(res[i]._id)}} variant="danger">Delete</Button></td>
                        </tr>
                    )
                })
            }
        }
    )

    return (
        <Table className="mx-auto" style={{width:'70vw',margin:'20px 20px 20px 20px'}} striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Post Title</th>
                    <th>Post Views</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {postList}
            </tbody>
        </Table>
    )
}

export default AdminPostList;