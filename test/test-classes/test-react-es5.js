var React = require('react');

var Greeting = React.createClass({
    propTypes: {
        name: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            name: 'Ben'
        };
    },

    render: function() {
        return (
            <p>
                React is run by {this.props.name}.
            </p>
        );
    }
});

module.exports = Greeting;