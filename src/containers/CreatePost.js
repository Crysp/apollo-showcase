import React from 'react';
import { withRouter } from 'react-router-dom';


class CreatePost extends React.Component {
    state = {
        title: ''
    };
    onCreate = () => {
        const { history } = this.props;
        history.push('/posts/6');
    };
    onChangeText = e => {
        this.setState({ title: e.target.value });
    };
    render() {
        const { title } = this.state;
        return (
            <div>
                <div>
                    <input
                        className="field"
                        type="text"
                        value={title}
                        name="title"
                        onChange={this.onChangeText}
                    />
                </div>
                <div>
                    <button onClick={this.onCreate}>Create</button>
                </div>
            </div>
        );
    }
}


export default withRouter(CreatePost);