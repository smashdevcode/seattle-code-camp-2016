var Iterator = (function () {
    function Iterator(values) {
        this.values = values;
        this.cursor = -1;
    }
    Iterator.prototype.next = function () {
        this.cursor++;
        if (this.cursor < this.values.length) {
            return this.values[this.cursor];
        }
    };
    Iterator.prototype.hasNext = function () {
        return (this.cursor + 1 < this.values.length);
    };
    return Iterator;
}());
var iterator = new Iterator([1, 2, 3, 4, 5]);
while (iterator.hasNext()) {
    document.write("<p>" + iterator.next() + "</p>");
}
