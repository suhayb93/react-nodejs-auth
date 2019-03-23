import React from 'react';
import {connect} from 'react-redux';

export default ChildComponent => {
    class ComposedComponemt extends React.Component {
        componentDidMount() {
            this.shouldNavigateAway();
        }

        componentDidUpdate() {
            this.shouldNavigateAway();
        }

        shouldNavigateAway() {
            if(!this.props.auth) {
                this.props.history.push('/');
            }

        }

        render() {
            return <ChildComponent {...this.props} />
        }

    }

    const matchStateToProps = (state) => {
        return {auth: state.auth.authenticated}
    }

    return connect(matchStateToProps)(ComposedComponemt);
}