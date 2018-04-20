import React from 'react';
import { Link } from 'react-router-dom';


export default class Home extends React.Component {
    render() {
        return (
            <ul>
                <li>[#1] <Link to="/posts/1">Post 1</Link> <b>Votes: 0</b></li>
                <li>[#2] <Link to="/posts/2">Post 2</Link> <b>Votes: 0</b></li>
                <li>[#3] <Link to="/posts/3">Post 3</Link> <b>Votes: 0</b></li>
                <li>[#4] <Link to="/posts/4">Post 4</Link> <b>Votes: 0</b></li>
                <li>[#5] <Link to="/posts/5">Post 5</Link> <b>Votes: 0</b></li>
            </ul>
        );
    }
}