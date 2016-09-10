
import * as Rx from 'rxjs';

function multiplyBy(multiplier: number) {
  const source = this;
  const result = Rx.Observable.create(function subscribe(observer) {
    source.subscribe(
      (value) => observer.next(value * multiplier),
      (err) => observer.error(err),
      () => observer.complete()
    );
  });
  return result;
}

Rx.Observable.prototype.multiplyBy = multiplyBy;

const numbers = Rx.Observable.of(1, 2, 3, 4, 5)
  .multiplyBy(10);

numbers.subscribe(
  (value) => console.log(value),
  (error) => console.error(error),
  () => console.log('Done!')
);
