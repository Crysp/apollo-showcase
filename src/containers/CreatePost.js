import React from 'react';
import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


class CreatePost extends React.Component {
    state = {
        title: ''
    };
    onCreate = () => {
        const { title } = this.state;
        const { mutate, history } = this.props;
        mutate({
            variables: { title }
        }).then(({ data: { post } }) => {
            if ('id' in post) {
                history.push(`/posts/${post.id}`);
            }
        });
    };
    onChangeText = e => {
        this.setState({ title: e.target.value });
    };
    render() {
        const { title } = this.state;
        const { mutate: { loading } } = this.props;
        return (
            <div>
                <div>
                    <input
                        className="field"
                        type="text"
                        value={title}
                        name="title"
                        onChange={this.onChangeText}
                        disabled={loading}
                    />
                </div>
                <div>
                    <button onClick={this.onCreate} disabled={loading}>Create</button>
                </div>
            </div>
        );
    }
}


export default withRouter(graphql(gql`
    mutation createPost($title: String!) {
        post: createPost(title: $title) {
            id
            title
            votes
        }
    }
`)(CreatePost));