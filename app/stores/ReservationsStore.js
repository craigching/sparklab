
const appDispatcher = require('../dispatcher/AppDispatcher');
const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');

function emitChange() {
    ReservationStore.emit('change');
}

const ReservationStore = assign({}, EventEmitter.prototype, {

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }
});

function handleAction(action) {
    if (action.type === 'reservation_created') {
        emitChange();
    }
}

ReservationStore.dispatchToken = appDispatcher.register(handleAction);

module.exports = ReservationStore;
