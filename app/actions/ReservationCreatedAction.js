

const appDispatcher = require('../dispatcher/AppDispatcher');

function didCreateReservation() {

    var action = {
        type: 'reservation_created'
    };

    appDispatcher.dispatch(action);

}

module.exports = {
    didCreateReservation: didCreateReservation
};
