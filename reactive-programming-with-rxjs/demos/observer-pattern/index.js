// The Producer is typically called the "Subject"
// but we'll use Producer to not collide with the 
// RxJS Subject class name.
var Producer = (function () {
    function Producer() {
        this.listeners = [];
    }
    Producer.prototype.add = function (listener) {
        this.listeners.push(listener);
    };
    Producer.prototype.remove = function (listener) {
        var index = this.listeners.indexOf(listener);
        this.listeners.splice(index, 1);
    };
    Producer.prototype.notify = function (message) {
        this.listeners.forEach(function (listener) {
            listener.update(message);
        });
    };
    return Producer;
}());
var listener1 = {
    update: function (message) {
        console.log("Listener 1 received: " + message);
    }
};
var listener2 = {
    update: function (message) {
        console.log("Listener 2 received: " + message);
    }
};
var notifer = new Producer();
notifer.add(listener1);
notifer.add(listener2);
notifer.notify('Hello there!');
