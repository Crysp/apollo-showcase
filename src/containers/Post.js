import React from 'react';
import { withRouter } from 'react-router-dom';


class Post extends React.Component {
    render() {
        const { match: { params: { id } } } = this.props;
        return (
            <div>
                <h1>#{id} Post {id}</h1>
                <button className="vote"> Votes: 0</button>
            </div>
        );
    }
}


export default withRouter(Post);