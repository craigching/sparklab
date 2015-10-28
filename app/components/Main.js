var React = require('react');
var ReactDOM = require('react-dom');
var Griddle = require('griddle-react');

var Alert = require('react-bootstrap/lib/Alert');
var Input = require('react-bootstrap/lib/Input');
var Button = require('react-bootstrap/lib/Button');
var ButtonInput = require('react-bootstrap/lib/ButtonInput');
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');

var $ = require('jquery');

const CreateAccount = React.createClass({
    getInitialState: function() {
        return {
            username: ''
        };
    },

    render: function() {
        return (
          <form>
            <Input type="text" label="Enter your id" placeholder="Enter text" />
            <ButtonInput type="submit" value="Create" />
          </form>
        );
    }
});


const Loading = React.createClass({
    getDefaultProps: function(){
        return {
            loadingText: "Loading"
        }
    },
    render: function(){
        return <div className="loading">{this.props.loadingText}</div>;
    }
});

const ViewAccounts = React.createClass({

    getInitialState: function(){
        var initial = { "results": [],
                        "currentPage": 0,
                        "isLoading": false,
                        "maxPages": 0,
                        "externalResultsPerPage": 10,
                        "externalSortColumn":null,
                        "externalSortAscending":true,
                        "results": []
                      };

        return initial;
    },

    componentWillMount: function(){
    },

    componentDidMount: function(){
        this.getExternalData();
    },

    getExternalData: function(page){
        var that = this;
        page = page||1

        this.setState({
            isLoading: true
        });

        $.getJSON(this.props.source, function(data) {
            if (this.isMounted()) {
                this.setState({
                    results: data,
                    currentPage: page - 1,
                    maxPages: 10,
                    isLoading: false
                });
            }
        }.bind(this));
    },

    setPage: function(index){
        //This should interact with the data source to get the page at the given index
        index = index > this.state.maxPages ? this.state.maxPages : index < 1 ? 1 : index + 1;
        this.getExternalData(index);
    },

    setPageSize: function(size){
    },

    setFilter: function(filter) {
        console.log("set filter: '" + filter + "'");

        if (!filter || filter.length === 0) {
            // Restore the original results
            // if we had a filter previously
            if (this.state.unfilteredResults) {
                if (this.isMounted()) {
                    this.setState({
                        results: this.state.unfilteredResults,
                        unfilteredResults: undefined
                    });
                }
            }
        } else {
            var unfilteredResults = this.state.unfilteredResults || this.state.results.slice(0);
            var filteredResults = this.state.results.filter(function(item) {
                var name = item.name;
                return name.slice(0, filter.length) === filter;
            });

            if (this.isMounted()) {
                this.setState({
                    results: filteredResults,
                    unfilteredResults: unfilteredResults
                });
            }
        }
    },

    render: function(){
      //columns={["name", "city", "state", "country"]}
        return <Griddle useExternal={true} externalSetPage={this.setPage} enableSort={false} columns={["name", "status", "control", "url"]}
        showFilter={true} showSettings={false}
        externalSetPageSize={this.setPageSize} externalMaxPage={this.state.maxPages}
        externalChangeSort={function(){}} externalSetFilter={this.setFilter}
        externalCurrentPage={this.state.currentPage} results={this.state.results} tableClassName="table" resultsPerPage={this.state.externalResultsPerPage}
        externalSortColumn={this.state.externalSortColumn} externalSortAscending={this.state.externalSortAscending} externalLoadingComponent={Loading} externalIsLoading={this.state.isLoading}/>
    }
});

const gridInstance = (
  <Grid>
    <Row className="show-grid">
        <Col xs={12} md={8}><CreateAccount /></Col>
    </Row>
    <Row className="show-grid">
        <Col xs={12} md={8}><ViewAccounts source="api/v1/status"/></Col>
    </Row>
  </Grid>
);

ReactDOM.render(gridInstance, document.getElementById('app'));
