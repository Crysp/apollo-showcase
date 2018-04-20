import React from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


class Home extends React.Component {
    render() {
        const { data: { loading, posts } } = this.props;
        return loading ? 'Loading...' : (
            <ul>
                {posts.map(({ id, title, author, votes }) => (
                    <li key={id}>[#{id}] <Link to={`/posts/${id}`}>{title}</Link> <b>Votes: {votes}</b></li>
                ))}
            </ul>
        );
    }
}


export default graphql(gql`{
    posts {
        id
        title
        votes
    }
}`)(Home)