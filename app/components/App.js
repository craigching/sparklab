
const React = require('react');
const ReactDOM = require('react-dom');
const Grid = require('react-bootstrap/lib/Grid');
const Row = require('react-bootstrap/lib/Row');
const Col = require('react-bootstrap/lib/Col');

const CreateReservation = require('./CreateReservation');
const ViewReservations = require('./ViewReservations');

const App = React.createClass({

    render: function() {

        return (
                <Grid>
                  <Row className="show-grid">
                    <Col xs={12} md={8}><CreateReservation /></Col>
                  </Row>
                  <Row className="show-grid">
                    <Col xs={12} md={8}><ViewReservations /></Col>
                  </Row>
                </Grid>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));
