import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';


class Post extends React.Component {
    onVote = () => {
        const { votePost, getPostData } = this.props;
        votePost().then(() => {
            getPostData.refetch();
        });
    };
    render() {
        const {
            getPostData: { loading, post },
            votePost: { loading: voteLoading }
        } = this.props;
        return loading ? 'Loading...' : (
            <div>
                <h1>#{post.id} {post.title}</h1>
                <button
                    className="vote"
                    onClick={this.onVote}
                    disabled={voteLoading}
                >
                    Votes: {post.votes}
                </button>
            </div>
        );
    }
}


export default withRouter(compose(
    graphql(gql`
        query getPost($id: Int!) {
            post(id: $id) {
                id
                title
                votes
            }
        }
    `, {
        name: 'getPostData',
        options: ({ match: { params: { id } } }) => ({
            variables: {
                id
            }
        })
    }),
    graphql(gql`
        mutation vote($id: Int!) {
            upvotePost(postId: $id) {
                id
            }
        }
    `, {
        name: 'votePost',
        options: ({ match: { params: { id } } }) => ({
            variables: {
                id
            }
        })
    })
)(Post))