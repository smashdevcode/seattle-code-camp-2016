
# Demos

## Demo: The Observer Pattern

The Producer keeps an internal list of listeners that have subscribed to it. Listeners are notified, by calling their `update` method, whenever the state of the Producer changes.

`listener1` and `listener2` are notified whenever the Producer notifier updates its internal state, without the listeners having to check for any changes.

```
interface IListener {
  update: (message: string) => void;
}

// The Producer is typically called the "Subject"
// but we'll use Producer to not collide with the 
// RxJS Subject class name.
class Producer {
  listeners: IListener[] = [];

  add(listener: IListener) {
    this.listeners.push(listener);
  }

  remove(listener: IListener) {
    const index = this.listeners.indexOf(listener);
    this.listeners.splice(index, 1);
  }

  notify(message: string) {
    this.listeners.forEach((listener) => {
      listener.update(message);
    });
  }
}

const listener1: IListener = {
  update: (message) => {
    document.writeln(`<p>Listener 1 received: ${message}</p>`);
  }
};

const listener2: IListener = {
  update: (message) => {
    document.writeln(`<p>Listener 2 received: ${message}</p>`);
  }
};

const notifer = new Producer();
notifer.add(listener1);
notifer.add(listener2);
notifer.notify('Hello there!');
```

The key idea here is that the Producer is pushing values to its listeners as they occur.

## Demo: The Iterator Pattern

An iterator is an object that provides a consumer with an easy way to traverse its contents, hiding the implementation from the consumer.

The Iterator interface is simple, it's just two methods: `next` to get the next item in the sequence and `hasNext` to check if there are any items left in the sequence.

```
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
  document.write(`<p>${iterator.next()}</p>`);
}
```

Key idea here is that an Iterator contains a sequence of values that we can retrieve without having to know its internal implementation.

[Switch back to slides here]

## The Rx Pattern and the Observable

* An Observable emits its values in order like an Iterator
* But instead of its consumers requesting or pulling the next value, the Observable pushes values to its consumers (or subscribers) when they become available
* The Observable is similar to the Observer pattern's Producer
* The consumers of Observables are Observers which are equivalent to listeners in the Observer pattern

[Switch back to demos]

## Demo: Observables

Let's create our first Observable!

We can create an Observable by calling the `Observable.create` static method. We pass in a function that accepts a parameter named `observer`. The `observer` object has three methods we can call: `next`, `complete`, and `error`.

```
import * as Rx from 'rxjs';

const numbers = Rx.Observable.create(observer => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.next(4);
  observer.next(5);
});

numbers.subscribe((value) => console.log(value));
```

Are observables asynchronous? It's very common to compare them to Promises, which are always asynchronous. Let's do a test.

```
console.log('Before');
numbers.subscribe((value) => console.log(value));
console.log('After');
```

We can also let subscribers now when the observable is done sending values by calling the `complete` method.

```
import * as Rx from 'rxjs';

const numbers = Rx.Observable.create(observer => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.next(4);
  observer.next(5);
  observer.complete();
});

console.log('Before');
numbers.subscribe(
  (value) => console.log(value),
  (error) => console.error(error),
  () => console.log('Done!')
);
console.log('After');
```

We can also catch and send error information to subscribers.

```
import * as Rx from 'rxjs';

const numbers = Rx.Observable.create(observer => {
  try {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.next(4);
    observer.next(5);
    observer.complete();
  } catch (err) {
    observer.error(err);
  }
});

console.log('Before');
numbers.subscribe(
  (value) => console.log(value),
  (error) => console.error(error),
  () => console.log('Done!')
);
console.log('After');
```

We can also send values asynchronously from the observable.

```
import * as Rx from 'rxjs';

const numbers = Rx.Observable.create(observer => {
  try {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.next(4);
    setTimeout(function () {
      observer.next(5);
      observer.complete();
    }, 5000);
  } catch (err) {
    observer.error(err);
  }
});

console.log('Before');
numbers.subscribe(
  (value) => console.log(value),
  (error) => console.error(error),
  () => console.log('Done!')
);
console.log('After');
```

This is an example of using the Observable `create` method to our own Observable, this is not typically how we create Observables. There are a variety of static methods that we can use to create Observables.

```
import * as Rx from 'rxjs';

const numbers = Rx.Observable.of(1, 2, 3, 4, 5);

numbers.subscribe(
  value => console.log(value),
  err => console.error(err),
  () => console.log('Done')
);
```

We can also send values over time.

```
import * as Rx from 'rxjs';

const numbers = Rx.Observable.interval(1000);

numbers.subscribe(
  (value) => console.log(value),
  (error) => console.error(error),
  () => console.log('Done!')
);
```

Notice that the observable never completes. Let's delay our initial subscription by 5 seconds.

```
import * as Rx from 'rxjs';

const numbers = Rx.Observable.interval(1000);

setTimeout(function () {
  numbers.subscribe(
    (value) => console.log(value),
    (error) => console.error(error),
    () => console.log('Done!')
  );
}, 5000);
```

Notice that values aren't emitted until the observable gets its first subscriber. This observable is "cold", meaning that it's inert until an observer subscribes to it.

Now let's add a second subscriber.

```
numbers.subscribe(
  (value) => console.log(value),
  (error) => console.error(error),
  () => console.log('Done!')
);

numbers.subscribe(
  (value) => console.log(value),
  (error) => console.error(error),
  () => console.log('Done!')
);
```

Everything seems to work as expected, but let's subscribe 5 seconds after the first subscription.

```
import * as Rx from 'rxjs';

const numbers = Rx.Observable.interval(1000);

numbers.subscribe(
  (value) => console.log(value),
  (error) => console.error(error),
  () => console.log('Done!')
);

setTimeout(function () {
    numbers.subscribe(
      (value) => console.log(value),
      (error) => console.error(error),
      () => console.log('Done!')
    );
  }, 5000);
```

That doesn't seem right! But this is the expected behavior. Our "cold" observable is not shared by default. We can change this behavior by using the `share` operator.

```
import * as Rx from 'rxjs';

const numbers = Rx.Observable.interval(1000).share();

numbers.subscribe(
  (value) => console.log(value),
  (error) => console.error(error),
  () => console.log('Done!')
);

setTimeout(function () {
    numbers.subscribe(
      (value) => console.log(value),
      (error) => console.error(error),
      () => console.log('Done!')
    );
  }, 5000);
```

And when we're done receiving values we can unsubscribe by calling the `unsubscribe` method on the Subscription object that's return from the `subscribe` method call.

```
import * as Rx from 'rxjs';

const numbers = Rx.Observable.interval(1000).share();

var subscription = numbers.subscribe(
  (value) => console.log(value),
  (error) => console.error(error),
  () => console.log('Done!')
);

setTimeout(function () {
  subscription.unsubscribe();
}, 5000);
```

We can also create observables from DOM events.

```
import * as Rx from 'rxjs';

const mouse = Rx.Observable.fromEvent(document, 'mousemove');

mouse.subscribe(
  (value) => console.log(value),
  (error) => console.error(error),
  () => console.log('Done!')
);
```

## Operators

RxJS operators...

* Are functions attached to the Observable object
* Each takes an input of Observable and outputs an Observable
* Internally the operator creates an Observable that subscribes to the source Observable
* Each operator is pure... meaning that it does not modify the source Observable

## Demo: Custom Operator

Let's build our own operator!

```
import * as Rx from 'rxjs';

function multiplyBy(multiplier) {
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
  .multiplyBy(100);

numbers.subscribe(
  (value) => console.log(value),
  (error) => console.error(error),
  () => console.log('Done!')
);
```

## Demo: Common Operators

https://www.learnrxjs.io/operators

The RxJS operators are organized into categories.

* Combination
* Conditional
* Creation
* Error Handling
* Multicasting
* Filtering
* Transformation
* Utility

### map

```
import * as Rx from 'rxjs';

const observer = {
  next: (value) => console.log(value),
  error: (error) => console.error(error),
  complete: () => console.log('Done!')
};

const numbers = Rx.Observable.interval(1000)
  .map(v => v * 2);

numbers.subscribe(observer);
```

### filter

```
const numbers = Rx.Observable.interval(1000)
  .map(v => v * 2)
  .filter(v => v % 4 === 0);

numbers.subscribe(observer);
```

### first, take, skip, takeLast, last

```
const numbers = Rx.Observable.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

numbers.first().subscribe(observer);
numbers.take(2).subscribe(observer);
numbers.skip(5).subscribe(observer);
numbers.takeLast(2).subscribe(observer);
numbers.last().subscribe(observer);
```

### distinct

```
const numbers = Rx.Observable.of(1, 2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

numbers.distinct().subscribe(observer);
```

### startWith

```
const numbers = Rx.Observable.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

numbers.startWith(-1).subscribe(observer);
```

### combineLatest and withLatestFrom

```
const numbers = Rx.Observable.interval(1000);
const click = Rx.Observable.fromEvent(document, 'click');

const result = click.combineLatest(numbers);
// const result = click.withLatestFrom(numbers);

result.subscribe(observer);
```

### debounce and debounceTime

```
import * as Rx from 'rxjs';

const mouse = Rx.Observable.fromEvent(document, 'mousemove');

const observer = {
  next: (value) => console.log(value),
  error: (error) => console.error(error),
  complete: () => console.log('Done!')
};

// mouse.debounce(() => Rx.Observable.timer(1000)).subscribe(observer);
mouse.debounceTime(1000).subscribe(observer);
```

## Demo: Angular 2

This is an Angular 2 app with an ASP.NET Core service for the back end.

First, we need to start the back end.

```
dotnet run
```

Then, we can browse to the site at `http://localhost:5000/`.

The Angular 2 Reactive Form Control exposes an Observable that we can subscribe to and receive values from the form. Then we can easily use the RxJS `debounceTime` and `distinctUntilChanged` operators to prevent too many API requests and eliminate unnecessary requests.

```
this.term.valueChanges
  .debounceTime(400)
  .distinctUntilChanged()
  .do(value => console.log(`Performing search: ${value}`))
  .subscribe(
    term => {
      if (term) {
        this.resourceService.getResourcesSearch(term)
          .subscribe(
            resource => this.resources = resource,
            error => this.errorMessage = <any>error            
          );
      } else {
        this.getResources();
      }
    }
  );
```
