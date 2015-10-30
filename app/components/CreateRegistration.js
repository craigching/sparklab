
const React = require('react');

const Input = require('react-bootstrap/lib/Input');
const Button = require('react-bootstrap/lib/Button');
const ButtonInput = require('react-bootstrap/lib/ButtonInput');
const $ = require('jquery');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            username: ''
        };
    },

    handleSubmit: function(e) {

        var reservationId = $('#reservation_id').val();
        var url = "docker/register/" + reservationId;

        $.post(url, function() {
            console.log(arguments);
            //this.props.refresh();
        }.bind(this));


        e.preventDefault();
    },

    render: function() {
        return (
                <form ref="form" onSubmit={this.handleSubmit}>
                  <Input id="reservation_id" type="text" label="Enter your id" placeholder="Enter text" />
                  <ButtonInput type="submit" value="Create" />
                </form>
        );
    }
});
