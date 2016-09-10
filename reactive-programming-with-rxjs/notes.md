
# Notes



## TODO

Rob Wormald says...
  It's not necessary to use Immutable.js because RxJS operators are immutable (i.e. don't change their sources)
  But that doesn't sound absolutely correct to me
  Test this theory myself...
    If you're passing around an array of objects and filtering that array, are you getting copies of those objects or just references to the original objects?

Look into how the Angular 2 Router uses Observables
  Params
    Looks like params are an observable
    This allows the component to update if the params changes
    This might happen if a component is being reused
    We need to make sure that we unsubscribe when the component is destroyed to avoid memory leaks
  Router guards
    ???
  
Rob Wormald really handled well answering a question that he didn't know the answer too
  "Great question... I'm not sure, but I'd love to figure it out and let you know the answer to it."

Angular 2 Source Code
  Review the code for the `async` pipe... how does it allow you to bind to an observable?

Angular 2 and the Http Module
  Do you need to unsubscribe to Observables?
    Is this something that Angular 2 is automatically doing for us somehow?
  If you use more than one `async` pipe in a view template...
    This should create more than one subscription
    Is the observable that comes out of the `Http.get` call shared?
      If not, then this might make two API calls happen





TAKING ADVANTAGE OF OBSERVABLES IN ANGULAR 2
http://blog.thoughtram.io/angular/2016/01/06/taking-advantage-of-observables-in-angular2.html

Netflix JavaScript Talks - Async JavaScript with Reactive Extensions
https://www.youtube.com/watch?v=FAZJsxcykPs

Netflix JavaScript Talks - RxJS Version 5
https://www.youtube.com/watch?v=COviCoUtwx4





Angular 2 and webpack

  Can I move zones and reflect metadata into the bundle???
    Seems like I should be able to do this

  Download and test Sean Larkin's Angular 2 and webpack starter
    Is there a way for me to get the app bundle to something less than 2MB???





Does a non-ending observable stop emitting values if the subscriber is another observable that completes?
  Rx.Observable.interval(1000).take(5);





Code up GitHub users example

  Add `User` class and parse the JSON data into those classes

  Setup UI

  Setup close button on each result





Need to work on getting an auto-refresh/reload environment setup

Submit PR to create RxJS 5 version of Staltz's article

Write blog post that walks through creating the GitHub example using webpack and TS





Setup npm scripts
  At a minimum call `typings install` after a `npm i`
  Also setup `npm start` to call webpack and maybe webpack server?

Remove `main` property from all package.json files

Write up instructions for setting up RxJS with webpack
Write up instructions for setting up RxJS with webpack and TypeScript




Start working up Angular 2 with RxJS examples

  Intro to RxJS & Observables in Angular 2
  http://slides.com/samjulien/rxjs#/

  TAKING ADVANTAGE OF OBSERVABLES IN ANGULAR 2
  http://blog.thoughtram.io/angular/2016/01/06/taking-advantage-of-observables-in-angular2.html

  REACTIVE FORMS IN ANGULAR 2
  http://blog.thoughtram.io/angular/2016/06/22/model-driven-forms-in-angular-2.html

  COLD VS HOT OBSERVABLES
  http://blog.thoughtram.io/angular/2016/06/16/cold-vs-hot-observables.html

  Everything is a Stream - Rob Wormald
  https://www.youtube.com/watch?v=UHI0AzD_WfY

  NG-NL 2016: Rob Wormald - Reactive Angular 2
  https://www.youtube.com/watch?v=xAEFTSMEgIQ

  Reactive Programming and Redux with Angular 2 with Rob Wormald
  https://devchat.tv/adv-in-angular/079-aia-reactive-programming-and-redux-with-angular-2-with-rob-wormald

  Reactive Data Flow in Angular 2 -- this has a great example of a TODO app
  http://blog.lambda-it.ch/reactive-data-flow-in-angular-2/

  Reactive MVC and the Virtual DOM - Andre Staltz
  http://futurice.com/blog/reactive-mvc-and-the-virtual-dom

  Migrating model driven forms to the new forms API in Angular 2
  http://schwarty.com/2016/07/18/migrating-model-driven-forms-to-the-new-forms-api-in-angular-2/




  RC5 was released 8/9
    Getting closer to a release
    Looks like there are still major changes happening
    http://angularjs.blogspot.com/2016/08/angular-2-rc5-ngmodules-lazy-loading.html

  Angular 2 Forms - a first look
  http://juristr.com/blog/2016/08/ng2-forms-first-look/

  Angular CLI
    Resources
      https://cli.angular.io/
      https://cli.angular.io/reference.pdf
    Sounds like this is still very early
    They're in the process of updating the CLI to use webpack

  Angular 2 Hot Loading with @ngrx/store and Webpack
  http://teropa.info/blog/2016/08/08/angular-2-hot-loading-with-ngrx-store-and-webpack.html

  CodeChat 059 - The State of Angular 2.0 with Brad Green
  https://channel9.msdn.com/Shows/codechat/059?ocid=relatedentry

  CodeChat 061 - Talking TypeScript and Angular 2.0 with Bill Wagner
  https://channel9.msdn.com/Shows/codechat/061?ocid=relatedentry

  Angular 2.0 With Typescript By Bill Wagner
  https://channel9.msdn.com/Blogs/semjs/semjs201512Ang






## Questions

When using RxJS should you polyfill Promise?
  What does the browser support look like for RxJS?

Start using lite-server?
What is concurrently doing?
Setup npm scripts?











## Operator Tips

Use `of` not `from` if you need just a single string value
  `from` will treat your string as an array of characters








## Functional Reactive Programming for Angular 2 Developers - RxJs and Observables

http://blog.angular-university.io/functional-reactive-programming-for-angular-2-developers-rxjs-and-observables/

A new asynchronous programming concept: the stream
  A stream is a sequence of values over time
  Examples
    Stream of numbers
    Stream of mouse clicks
  Other examples of streams in a browser
    Events that are trigger when a user interacts with the UI
    Data arriving from the server
    Timeouts getting triggered

A new primitive type: Observables
  We need a way to...
    Create streams
    Subscribe to them
    React to new values
    Combine streams to build new ones
  Arrays have a rich extended API
  RxJS builds upon that and goes even further
    Combination of a stream and functional operators
    Functional in that an operator doesn't modify the original observable
  Don't make the mistake of thinking of observables as streams
    Observables create streams of data and provide the means to subscribe to the stream

Functional Reactive Programming and RxJs
  RxJS is an implementation of observables
    If Observables make it into ES++ then you could think of RxJS more or less as a polyfill
  FRP is a paradigm in software development that says entire programs can be written around the notion of streams
  When developing in this paradigm, development consists of...
    Creating or identifying the streams of values your program is interested in
    Combining them together
    And subscribing to those streams to produce a reaction to new values
  The main idea of FRP is to build programs in a declarative way
    By defining what are the streams
    How they are linked together
    What happens if a new stream value arrives over time
  Programs are typically built with little to no application state variables
    State is stored instead in streams or in the DOM

The essential of how Observables work
  Observables that affect something are said to have "side effects"
  Cold observables do not produce values
    They only produce values when they are subscribed to
  Cold observables are not shared by default
    Each subscriber gets its own set of values
  When working with RxJS, keep two things in mind
    Is the observable hot or cold?
    Is the observable shared or not?

Commonly used operators: map, filter, reduce, scan
  There are many functional operators that can be used to combine observables
  Angular 2 uses RxJS Observables in two different ways
    As an internal implementation mechanism
    As part of a public API... namely Forms and HTTP

Common uses of RxJs in Angular 2: Forms and Http
  The map operator is probably the most well-known functional programming operator
    Transforms the output of the stream
    The output of map is another observable
  The map and filter operators can be used to do form validation
    Forms can be handled as observables
    The value of the form is an observable
    And the value of each individual field is also an observable
  The reduce operator sums the values in a stream when it has closed
    But this probably not what you think of when you think of "reducers" in a redux architecture
  The scan operator gives you the intermediate values of the reduce process
    It's at the heart of how we build redux like apps in Angular 2 using RxJS

The share operator and Hot vs Cold Observables
  The share operator allows you to share a single subscription of a processing chain with multiple subscribers

Conclusions
  You have options
    Go all-in with a reactive approach and use RxJS extensively
    Or only use RxJS where Angular 2 exposes it via its public API... such as Forms and HTTP
    Of mix and match

How to approach the learning of RxJs
  Start with two core concepts: Observable lazyness and hot vs cold observables
  Then focus on the most frequently used operators
    You can get by with ~10-15 operators
  Use JsBin








## Angular University

```
import { Observable } from 'rxjs/Observable';
declare function fetch(url: string);

export function initObservable() {
  const lessonsPromise = fetch('/lessons').then(res => res.json());
  const lessons$ = Observable.fromPromise(lessonsPromise);

  lessons.subscribe(
    lessons => console.log(lessons),
    error => console.error(error),
    () => console.log('Completed!')
  );
}
```

An HTTP call be thought of as a stream with a single value that either completes or throws an error

Wny not just use promises?
  Observables are...
    Easier to combine and chain together
    Cancellable and retryable

The Http module in Angular 2 always returns Observables
  `http.get()` returns a `Response` object

The `async` pipe allows you to bind directly to an Observable
  ```
  <div>Total Lessons: {{ (lessons | async)?.length }}</div>
  <lessons-list [lessons]="lessons$ | async"></lessons-list>
  ```

`map` can be used to create new observables from other observables

`combineLatest` can be used to combine the latest values from two observables

Be careful when subscribing more than once to the Http observables
  If you do this when using `http.post` for instance...
    You'll POST the data twice

One possible solution is to add the `cahce` operator to the end of the operator chain

`concat` can be used to make sequential requests

Hmm... he keeps using the `cache` operator to prevent multiple subscribers from producing multiple results












## How to build Angular 2 apps using Observable Data Services - Pitfalls to avoid

http://blog.angular-university.io/how-to-build-angular2-apps-using-rxjs-observable-data-services-pitfalls-to-avoid/


## Angular 2 Observable Data Services

https://coryrylan.com/blog/angular-2-observable-data-services


## ANGULAR2 DATA FLOW - Rob Wormald

https://vimeo.com/144625829


## Angular 2 HTTP Requests with Observables

https://scotch.io/tutorials/angular-2-http-requests-with-observables


## HTTP CLIENT

https://angular.io/docs/ts/latest/guide/server-communication.html


## Observables and Reactive Programming in Angular 2

http://blog.rangle.io/observables-and-reactive-programming-in-angular-2/















## Introduction to Angular 2 Forms - Template Driven vs Model Driven or Reactive Forms

http://blog.angular-university.io/introduction-to-angular-2-forms-template-driven-vs-model-driven/



















## When to Use Flux-Like Architecture

https://github.com/petehunt/react-howto/issues/12

1) You have a piece of data that needs to be used in multiple places in your app, and passing it via props makes your components break the single-responsibility principle (i.e. makes their interface make less sense)

2) There are multiple independent actors (generally, the server and the end-user) that may mutate that data.

Stores solve the first problem (as do single state atoms and event emitters), a serializable action queue solves the second.












## Angular 2 Application Architecture - Building Redux-like apps using RxJs

http://blog.angular-university.io/angular-2-application-architecture-building-applications-using-rxjs-and-functional-reactive-programming-vs-redux/





## Angular 2 Application Architecture - Building Flux Apps with Redux and Immutable.js

http://blog.angular-university.io/angular-2-application-architecture-building-flux-like-apps-using-redux-and-immutable-js-js/







## Tackling State

https://vsavkin.com/managing-state-in-angular-2-applications-caf78d123d02#.xbcok8wui






## RxJS Observable: performing cleanup when the last subscription is disposed?

http://stackoverflow.com/questions/33353869/rxjs-observable-performing-cleanup-when-the-last-subscription-is-disposed

## Prevent memory leaks in Angular 2?

http://stackoverflow.com/questions/34461842/prevent-memory-leaks-in-angular-2

Summary: Using the `async` pipe ensures that the observable subscription is properly disposed





## Angular Remote Conf - Everything is a Stream - Rob Wormald

https://www.youtube.com/watch?v=UHI0AzD_WfY


## RxJS and Observables with Angular 2

https://www.youtube.com/watch?v=ZmEvKLYF0os


## RxJS In-Depth – Ben Lesh

https://www.youtube.com/watch?v=KOOT7BArVHQ


## RxJS 5 in-depth - Gerard Sans - Best of Web 2016

https://www.youtube.com/watch?v=KTlay8cZdAk















## Angular 2 Source Code

### EventEmitter

The Angular 2 event emitter extends the RxJS Subject class

https://github.com/angular/angular/blob/master/modules/%40angular/facade/src/async.ts

Uses Rx.Observable but provides an adapter to make it work as specified here:
https://github.com/jhusain/observable-spec








## RxJS Beyond the Basics - Andre Staltz

https://egghead.io/courses/rxjs-beyond-the-basics-creating-observables-from-scratch

There are two versions of RxJS
  If you search for "rxjs" you'll see two different repos
  https://github.com/Reactive-Extensions/RxJS
    This is the original Microsoft lead project
    Known as RxJS 4
  https://github.com/ReactiveX/rxjs
    This is a community driven effort
    Successor to the Microsoft project
    Known as RxJS 5
  Version 4 is the older version
  Version 5 is the newer version that is being used in Angular 2

Observables are like a generalization of a function
  The difference between a function and an Observable is that a function can only return one value whereas an Observable can return one or more values over time

Observables (push) compared to generator functions (pull)
  Observables and generators are a combination of producers and consumers
  With observables the producer determines when values are sent (push)
  With generators the consumer determines when values are sent (pull)

Observables can throw errors
  Consumer provides an error handler function

Observables can complete
  Values are not delivered after an observable completes
  The idea of completion is important when using concat and last operators

Creation operator: of()
  Delivers synchronous list of values

Creation operators: from, fromArray, fromPromise
  `fromArray` creates an Observable from an array of values
  `fromPromise` creates an Observable from a Promise
  `from` creates an Observable from an array, Promise, or generator

Creation operators: fromEventPattern, fromEvent
  `fromEventPattern` creates an Observable when you've got an API that provides `addEventHandler` and `removeEventHandler` (DOM or Node)
  `fromEvent` creates an Observable from a DOM event

Creation operators: empty, never, throw
  `empty` just completes (no values)
  `never` never sends values or completes
  `throw` throws an error
  These operators are useful when combined with other operators

Creation operators: interval and timer
  `interval` delivers a stream of values
    Values are not shared between subscribers
  `timer` also allows you to specify when to start the stream of values

Creation operator: create()
  Same as calling the Observable constructor
  An Observable's `subscribe` function is the function that you pass to `create`
    It's the function that's responsible for calling `next`, `complete`, or `error` on an observer
  The `subscribe` function accepts an Observer object
    Contains `next`, `complete`, and `error` methods

Returning subscriptions from the subscribe function
  Subscribing to an Observable returns a Subscription object
  Subscription exposes an `unsubscribe` method that allows you to unsubscribe

Observables are the foundation in RxJS
  A way of representing many values from a Producer to a Consumer
  The Producer is lazy so it only delivers values once `subscribe` is called
  The Consumer is a set of callbacks (i.e. `next` handler, `complete` handler, `error` handler)
  Observables are the foundation for RxJS operators



## RxJS Beyond the Basics: Operators in Depth - Andre Staltz

https://egghead.io/courses/rxjs-beyond-the-basics-operators-in-depth

What RxJS operators are
  Are functions attached to the Observable object
  Each takes an input of Observable and outputs an Observable
  Internally the operator creates an Observable that subscribes to the source Observable
  Each operator is pure... meaning that it does not modify the source Observable

```
var foo = Rx.Observable.of(1, 2, 3, 4, 5);

// foo.map
// foo.filter
// foo.merge
// foo.combineLatest

function multiplyBy(multiplier) {
  var source = this;
  var result = Rx.Observable.create(function subscribe(observer) {
    source.subscribe(
      function (x) { observer.next(x * multiplier); },
      function (err) { observer.error(err); },
      function () { observer.complete(); }
    );
  });
  return result;
}

Rx.Observable.prototype.multiplyBy = multiplyBy;

var bar = foo.multiplyBy(100);

bar.subscribe(
  function (x) { console.log('next ' + x); },
  function (err) { console.log('error ' + err); },
  function () { console.log('done'); },
);
```

Marble diagrams in ASCII form
  Legend
    `-` Dashes represent time going left to right
    `[0-9]` or `[a-z]` Lowercase letters or numbers are values that the Observable sends
    `|` Pipe represents completion
    `X` represents an error
  Wrapping values in `()` indicates that they were delivered synchronously

```
foo: ---0---1---2---3--...
        multiplyBy(2)
bar: ---0---2---4---6--...
```

Transformation operator: map and mapTo
  `map` allows you to apply a transformation to each value that the Observable delivers
  `mapTo` allows you to map each value to a constant value

Utility operator: do
  Helpful for debugging
  Executes the provided function and then returns the original value
  Does not trigger a subscription

Filtering operator: filter
  Filter operators provide a way to ignore certain events from the source Observable
  Filter accepts a predicate function
  Predicate functions accept a value and return true or false

Filtering operators: take, first, skip
  Allow you to ignore or pass a certain number of events from the source Observable

Filtering operators: takeLast, last
  Only sends values after the source Observable has completed
  The values are sent synchronously as a group of values

Combination operators: concat, startWith
  `concat` allows you to combine two or more Observables sequentially
    The first Observable must complete before the second can be combined with it
  `startWith` provides a shortcut for prefixing a value to the beginning of an Observable

Combination operator: merge
  The "OR" operator... values come from one Observable or the other

Combination operator: combineLatest
  The "AND" operator... values are combined from both Observables
  Events occur every time there's an event from one of the Observables
  The latest value is used from the other Observable

Combination operator: withLatestFrom
  Another "AND" operator
  Maps one Observable to another Observable with the latest value from another Observable

Combination operator: zip
  Combines the n-th events from two or more Observables
  Useful to spread the events from a synchronous Observable over time by zipping that Observable with an Observable that delivers events over time

Transformation operator: scan
  The operators in the "Combination" category are "vertical" combination operators
  `scan` is a "horizontal" combination operator
  The accumulator is the state of the Observable

Transformation operator: buffer
  This operator comes in a number of varieties
    `buffer`
    `bufferCount`
    `bufferTime`
    `bufferToggle`
    `bufferWhen`
  Another horizontal combination operator
  `bufferCount` accepts an argument that specifies the size of the buffer
  When the buffer reaches the specified size, the buffer is flushed, sending its containing values

Transformation operators: delay and delayWhen
  Delays an Observable by the specified time or date

Transformation operators: debounce and debounceTime
  Allows you to drop events if they are happening too fast
  Otherwise known as a "rate limiting" operator
  `debounceTime` accepts a time parameter that specifies how much silence needs to occur before an event is sent

Filtering operators: throttle and throttleTime
  Another "rate limiting" operator
  `debounce` and `debounceTime` waits for silence, then emits
  `throttle` and `throttleTime` first emits, then causes silence

Filtering operators: distinct and distinctUntilChanged
  Used to filter down to the distinct events
  `distinct` will track the unique events
  `distinct` also can accept an Observable that can be used to flush the registry of distinct events
  `distinctUntilChanged` will track just the last event

Error handling operator: catch
  Can be used to replace an error with an event
  Can be also used to replace an error with a retry of the output Observable

Error handling operator: retry and retryWhen
  Can be used to catch an error and retry by subscribing again to the original Observable

Transformation operator: repeat
  Repeats an Observable when it completes

More operators and conclusion














## The Introduction to Reactive Programming You've Been Missing

Learning how to think in Reactive
  About letting go of old imperative and stateful habits of typical programming

What is Reactive Programming?
  Reactive programming is programming with asynchronous data streams. - Andre Staltz
  Not really anything new - event buses or your typical click events are really an asynchronous event stream, on which you can observe and do some side effects
  Reactive programming is that on steriods
  You can create data streams of anything - variables, user inputs, properties, caches, data structures
  On top of that, you are given an amazing toolbox of functions to combine, create, and filter any of those streams

Streams
  A stream is a sequence of ongoing events ordered in time
  It can emit three things - a value, an error, or a "completed" signal
  We capture these events by defining functions, called observers
  "Listening" to a stream is called subscribing
  The stream is the subject or "observable"
  This is the Observer Design Pattern

Operators
  Calling an operator function returns a new stream - it does not modify the original stream in any way
  This is a property called immutability

Why Should Consider Adopting RP?
  RP raises the level of abstraction so you can focus on the interdependence of events that define the business logic
  The benefit is more evident in modern web and mobile apps that are highly interactive with a multitude of UI events related to data events

Why RxJS?
  It's available for wide variety of languages

Request and response
  (Almost) everything can be a stream

Observable is Promise++
  In Rx you can easily convert a Promise to an Observable by doing `var stream = Rx.Observable.fromPromise(promise)`
  A Promise is simply an Observable with one single emitted value.

When driving a stream from a stream of events (such as button clicks)
  You can jump start the process by using the `startWith` operator

If you add console logs throughout the code, you'll notice that a request is made for each response stream subscriber
  The reason for this is that the response stream is cold, so every subscriber gets its own request stream










## Reactive Programming with RxJS

Hot and Cold Observables
  "Hot" observables emit values regardless of Observers being subscribed to them
  "Cold" observables emit the entire sequence of values from the start to every Observer

A stream of mouse events is an example of a "hot" observable
  Every subscribe observer gets the same values

Rx.Observable.range returns a "cold" observable
  Every subscriber gets its own values

When does this become a problem?
  Show the example of Rx.Observable.interval with multiple observers that subscribe at different times
  Show how to change a cold observable to a hot observable using publish

TODO Try out the examples in the book starting on page 72






## Learning Observable By Building Observable - Ben Lesh
https://medium.com/@benlesh/learning-observable-by-building-observable-d5da57405d87#.clxa165d3

Observables are a function that take an observer and return a function (actually RxJS returns a Subscription object).

## Hot vs Cold Observables - Ben Lesh
https://medium.com/@benlesh/hot-vs-cold-observables-f8094ed53339#.oej0s9w5g

TL;DR: You want a HOT observable when you don’t want to create your producer over and over again.

## RxJS: Don’t Unsubscribe - Ben Lesh
https://medium.com/@benlesh/rxjs-dont-unsubscribe-6753ed4fda87#.njh461fsi

Keeping too many subscription objects around is a sign you’re managing your subscriptions imperatively, and not taking advantage of the power of Rx.

As a rule of thumb, if you see two or more subscriptions being managed in a single component, you should wonder if you could be composing those better.

takeUntil(otherObservable): returns the values from the source observable sequence until the other observable sequence or Promise produces a value.
take(n): emits N values before stopping the observable.
takeWhile(predicate): tests the emitted values against a predicate, if it returns `false`, it will complete.
first(): emits the first value and completes.
first(predicate): checks each value against a predicate function, if it returns `true`, then emits that value and completes.




## RxJS 5 Docs Introduction

RxJS is a library for composing asynchronous and event-based programs by using observable sequences. It provides one core type, the Observable, satellite types (Observer, Schedulers, Subjects) and operators inspired by Array#extras (map, filter, reduce, every, etc) to allow handling asynchronous events as collections.

Think of RxJS as Lodash for events.





## RxJS 5 Docs

https://github.com/ReactiveX/rxjs/tree/master/doc

### Observable
https://github.com/ReactiveX/rxjs/blob/master/doc/observable.md

Observables are lazy Push collections of multiple values.

### Observer
https://github.com/ReactiveX/rxjs/blob/master/doc/observer.md

What is an Observer? An Observer is a consumer of values delivered by an Observable. Observers are simply a set of callbacks, one for each type of notification delivered by the Observable: next, error, and complete.

### Subject
https://github.com/ReactiveX/rxjs/blob/master/doc/subject.md

See also: BehaviorSubject, ReplaySubject, AsyncSubject

What is a Subject? An RxJS Subject is a special type of Observable that allows values to be multicasted to many Observers. While plain Observables are unicast (each subscribed Observer owns an independent execution of the Observable), Subjects are multicast.

A Subject is like an Observable, but can multicast to many Observers. Subjects are like EventEmitters: they maintain a registry of many listeners.

### Subscription
https://github.com/ReactiveX/rxjs/blob/master/doc/subscription.md

What is a Subscription? A Subscription is an object that represents a disposable resource, usually the execution of an Observable. A Subscription has one important method, unsubscribe, that takes no argument and just disposes the resource held by the subscription. In previous versions of RxJS, Subscription was called "Disposable".

### Operators
https://github.com/ReactiveX/rxjs/blob/master/doc/operators.md

RxJS is mostly useful for its operators, even though the Observable is the foundation. Operators are the essential pieces that allow complex asynchronous code to be easily composed in a declarative manner.

#### Instance vs Static Operators

What is an instance operator? Typically when referring to operators, we assume instance operators, which are methods on Observable instances.

What is a static operator? Besides instance operators, static operators are functions attached to the Observable class directly. A static operator uses no this keyword internally, but instead relies entirely on its arguments.










## Angular 2 (ng-book 2)

Angular 2 has four dependencies
  ES6 Shim
  Zones
  Reflect Metadata
  SystemJS

Angular and RxJS are loaded using module loading







UNDERSTANDING ZONES
http://blog.thoughtram.io/angular/2016/01/22/understanding-zones.html

















Backpressure
https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/backpressure.md







Looks like an interesting npm package
https://matthewphillips.info/posts/using-npm-with-systemjs

jspm getting started
http://jspm.io/docs/getting-started.html





Creating and Subscribing to Simple Observable Sequences
https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/creating.md#cold-vs-hot-observables





!!! Egghead Rx - Great stuff here
https://egghead.io/technologies/rx

Learn RxJS
http://www.learnrxjs.io/
http://www.learnrxjs.io/operators/

Yolk UI Library for RxJS
https://github.com/garbles/yolk





MDN Array Object
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array






Introduction to Rx
http://www.introtorx.com/





A Dive into SystemJS – Part 1
https://superdevelopment.com/2016/03/16/a-dive-into-systemjs-part-1/

Browse the Build Redux Style Applications with Angular2, RxJS, and ngrx/store course.
https://egghead.io/courses/building-a-time-machine-with-angular-2-and-rxjs

Reactive Angular2 with ngRx - Rob Womald
https://www.youtube.com/watch?v=mhA7zZ23Odw

Everything is a Stream - Rob Womald
https://www.youtube.com/watch?v=UHI0AzD_WfY





## Next Steps

https://en.wikipedia.org/wiki/Observer_pattern
http://futurice.com/blog/top-7-tips-for-rxjava-on-android



### @ngrx

@ngrx/store
https://github.com/ngrx/store

Comprehensive Introduction to @ngrx/store - Brian Troncone
https://gist.github.com/btroncone/a6e4347326749f938510

@ngrx/store in 10 minutes - Brian Troncone
https://egghead.io/lessons/angular-2-ngrx-store-in-10-minutes







## Code Examples

Capture Link Double Clicks - Andre Staltz
http://jsfiddle.net/staltz/4gGgs/27/





## Tools

RxMarbles
[http://rxmarbles.com/](http://rxmarbles.com/)

Excellent interactive tool for visualizing RxJS operators.

## Debugging

Use the `do` operator to do logging.

```
var shortLowerCaseName$ = name$
  .map(name => name.toLowerCase())
  .filter(name => name.length < 5);
```

```
var shortLowerCaseName$ = name$
  .map(name => name.toLowerCase())
  .do(x => console.log(x))
  .filter(name => name.length < 5);
```

## Using with SystemJS

Install the following packages.

```
npm init
npm install rxjs --save
npm install symbol-observable --save
npm install systemjs --save
npm install core-js --save
```

* `rxjs` is the latest version of RxJS 5
* `symbol-observable` is a `Symbol.observable` polyfill required by RxJS 5
* `systemjs` is the SystemJS module loader
* `core-js` is a modular standard library for JavaScript

### Configure SystemJS

Add the `systemjs.config.js` file to the root of your project.

```
(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'app':                        'app',
    'rxjs':                       'node_modules/rxjs',
    'symbol-observable':          'node_modules/symbol-observable'
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'symbol-observable':          { main: 'index.js', defaultExtension: 'js' }
  };
  var config = {
    map: map,
    packages: packages
  };
  System.config(config);
})(this);
```

### HTML

Add an `index.html` page to the root of your project.

```
<html>

<head>
  <title>setInterval Example</title>

  <script src="node_modules/core-js/client/shim.min.js"></script>
  <script src="node_modules/systemjs/dist/system.src.js"></script>
  <script src="systemjs.config.js"></script>
  <script>
    System.import('app').catch(function(err){ console.error(err); });
  </script>

</head>

<body>
  <h1>setInterval Example</h1>
  <p id="content"></p>
</body>

</html>
```

### Using TypeScript

Add a `tsconfig.json` to the root of your project.

```
{
    "version": "1.8.10",
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "moduleResolution": "node",
        "sourceMap": true,
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
        "removeComments": true,
        "noImplicitAny": false,
        "outDir": "app"
    },
    "exclude": [
        "node_modules"
    ]
}
```

Then install the typings for `core-js`.

```
typings init
typings install dt~core-js --global --save
```

### Code

Then in `app/main.js` or `src/main.ts` (if you're using TypeScript) add the following code.

```
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

const observable = Observable.from([1,2,3,4,5]);
observable.subscribe(v => console.log(v));
```

Then load the `index.html` page into a browser and view the console.















// import { Observable } from 'rxjs/Observable';

// import 'rxjs/add/observable/interval';
// import 'rxjs/add/observable/from';
// import 'rxjs/add/observable/fromEvent';

// import 'rxjs/add/operator/filter';
// import 'rxjs/add/operator/map';

// const observable = Observable.from([1,2,3,4,5]);
// observable.subscribe(v => console.log(v));

// setTimeout(() => {
//   observable.subscribe(v => console.log(v));
// }, 2000);

// const clock = Observable.interval(1000);
// clock.subscribe(console.log.bind(console));



// const source = Observable
//   .fromEvent<MouseEvent>(document, 'mousemove');

// source.subscribe(e => console.log(e.clientX, e.clientY));

// // TODO need to get a reference to this via the A2 component
// const content = document.getElementById('content');

// const filtered = source
//   .filter(e => e.clientX < 200 && e.clientY < 200)
//   .map(e => {
//     const x = e.clientX * 2;
//     const y = e.clientY * 2;
//     return x + ', ' + y;
//   });

// filtered.subscribe(x => content.innerText = x);



// temp();

// var observable = Observable.create(function(observer) {
//   observer.onNext('Simon');
//   observer.onNext('Jen');
//   observer.onNext('Sergi');
//   observer.onCompleted();
// });

// observable.subscribe(
//   function onNext(x) { console.log('Result: ' + x); },
//   function onError(err) { console.log('Error: ' + err); },
//   function onCompleted() { console.log('Completed'); }
// );

// const source = Observable
//   .fromEvent(document, 'mousemove');

// source.subscribe(e => console.log(e.clientX, e.clientY));

// const content = document.getElementById('content');

// const filtered = source
//   .filter(e => e.clientX < 200 && e.clientY < 200)
//   .map(e => {
//     const x = e.clientX * 2;
//     const y = e.clientY * 2;
//     return x + ', ' + y;
//   });

// filtered.subscribe(x => content.innerText = x);

// const source = Rx.Observable
//   .create(function(observer) {
//     console.log(observer);
//     observer.next('Simon');
//     observer.next('Jen');
//     observer.next('Sergi');
//     observer.complete();
//   });

// const filter = source.filter(x => x === 'Simon');

// source.subscribe(
//   (x) => { console.log('Result: ' + x); },
//   (err) => { console.log('Error: ' + err); },
//   () => { console.log('Completed'); }
// );

// filter.subscribe(
//   (x) => { console.log('Result: ' + x); },
//   (err) => { console.log('Error: ' + err); },
//   () => { console.log('Completed'); }
// );








