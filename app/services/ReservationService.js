
const $ = require('jquery');

module.exports = {

    get: function(/*Function*/ callback) {
        $.getJSON('docker/status', function(data) {
            callback(data);
        });
    },

    create: function(/*String*/ reservationId, /*Function*/ callback) {

        var url = "docker/register/" + reservationId;

        $.post(url, function() {
            callback();
        });
    }
};
