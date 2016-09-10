
class Iterator {
  cursor = -1;

  constructor(private values: number[]) {
  }

  next() {
    this.cursor++;
    if (this.cursor < this.values.length) {
      return this.values[this.cursor];
    }
  }

  hasNext() {
    return (this.cursor + 1 < this.values.length);
  }
}

const iterator = new Iterator([1, 2, 3, 4, 5]);

while (iterator.hasNext()) {
  console.log(iterator.next());
}
