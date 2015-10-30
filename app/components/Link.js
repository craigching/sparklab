
const React = require('react');

module.exports = React.createClass({

    render: function(){
        var url = this.props.rowData.url;
        return <a href={url}>{url}</a>
    }

});
