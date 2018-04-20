import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Home from './containers/Home';
import Post from './containers/Post';
import CreatePost from './containers/CreatePost';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <div className="App-intro">
                    <div>
                        <Link to="/">Home</Link>
                        <span> | </span>
                        <Link to="/create">Create post</Link>
                    </div>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/create" component={CreatePost}/>
                    <Route path="/posts/:id" component={Post}/>
                </div>
            </div>
        );
    }
}

export default App;
