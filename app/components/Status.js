const React = require('react');
const DropdownButton = require('react-bootstrap/lib/DropdownButton');
const MenuItem = require('react-bootstrap/lib/MenuItem');
const $ = require('jquery');



module.exports = React.createClass({

    getInitialState: function() {

        var status = this.props.rowData.status;

        return {
            bsStyle: status === 'running' ? 'success' : 'danger',
            control: status === 'running' ? 'Stop' : 'Start',
            status: status
        }
    },

    onSelect: function(event, eventKey) {
        console.log('onSelect, event: ' + event + ', eventKey: ' + eventKey);

        var url = 'docker/' + eventKey.toLowerCase() + '/' + this.props.rowData.name;

        this.setState({
            bsStyle: 'warning',
            status: eventKey == 'Start' ? 'starting' : 'stopping'
        });

        $.post(url, function() {
            console.log(arguments);
            this.props.metadata.onRefresh();
        }.bind(this));
    },

    render: function() {

        var i = 0, control = this.state.control;

        return (
                <DropdownButton bsStyle={this.state.bsStyle} title={this.state.status} key={i} id={`dropdown-basic-${i}`} onSelect={this.onSelect}>
                <MenuItem eventKey={this.state.control}>{this.state.control}</MenuItem>
                </DropdownButton>
        );
    }
});
