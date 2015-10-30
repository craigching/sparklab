

const React = require('react');

const Griddle = require('griddle-react');
const Status = require('./Status');
const Link = require('./Link');
const $ = require('jquery');

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

module.exports = React.createClass({

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

        page = page||1

        this.setState({
            isLoading: true
        });

        $.getJSON('docker/status', function(data) {
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

    getColumnMetadata: function() {
        return [
            {
                'columnName': 'status',
                'locked' : false,
                'visible' : true,
                'customComponent' : Status,
                'onRefresh' : this.getExternalData
            },
            {
                'columnName': 'url',
                'locked' : false,
                'visible' : true,
                'customComponent' : Link
            }
        ];
    },

    render: function(){
        return <Griddle useExternal={true} externalSetPage={this.setPage} enableSort={false} columns={["name", "status", "url"]}
        columnMetadata={this.getColumnMetadata()}
        showFilter={true} showSettings={false}
        externalSetPageSize={this.setPageSize} externalMaxPage={this.state.maxPages}
        externalChangeSort={function(){}} externalSetFilter={this.setFilter}
        externalCurrentPage={this.state.currentPage} results={this.state.results} tableClassName="table" resultsPerPage={this.state.externalResultsPerPage}
        externalSortColumn={this.state.externalSortColumn} externalSortAscending={this.state.externalSortAscending} externalLoadingComponent={Loading} externalIsLoading={this.state.isLoading}/>
    }
});
