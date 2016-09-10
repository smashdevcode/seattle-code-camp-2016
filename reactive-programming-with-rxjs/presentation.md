
# Presentation

## Prep

* Copy the demos folder to the desktop
* Open Terminal and browse to the demos folder
* Open Chrome
* Open Excel

## Introduction

What is Rx?
  [Show ReactiveX logo]
  ReactiveX or Reactive Extensions
  "The Observer pattern done right - ReactiveX is a combination of the best ideas from the Observer pattern, the Iterator pattern, and functional programming" - from reactivex.io
  Available for many different languages and platforms
    JavaScript, Java, .NET, Swift, and many more

What is RxJS?
  RxJS is the reactive extensions for JavaScript

Quick history of ReactiveX
  Authored by Matthew Podwysocki - "Open Sourcer at Microsoft"
  [Show photo of Matthew]
  JavaScript Jabber Interview
    The notion of first class events
    LINQ is a pull model against data 
    Why not use LINQ in an event push model?
    Created in 2010, open sourced in 2012
    Promises weren't a thing yet
    [Show JavaScript Jabber logo]

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

RxJS 4 => 5
  RxJS 5 is a ground-up rewrite of RxJS that began development when RxJS was in 2.0
  This new version of RxJS has three basic goals:
    Better performance
    Better debugging
    Compliance with the ES7 Observable Spec
  I'm going to be using RxJS 5 today
    RxJS 5 which is still in beta
    This is the version that is being used in Angular 2
    There's a fair amount of overlap with RxJS 4, but there are differences
  Migrating from RxJS 4 to 5
    https://github.com/ReactiveX/rxjs/blob/master/MIGRATION.md

Reactive Programming
  Open up Excel and show an example of reactive behavior
  We can have cells that contain values and other cells that are based upon those values
  If we can change a value in a cell, the dependent or observing cells will automatically update their values
  The cells "react" to changes in their dependent cells
  We simply "declare" our problem, and we don't worry about how the spreadsheet accomplishes the results

Side Effects
  When an action has impact outside of the scope where it happens, we call this a side effect
  This might include changing a variable value external to our function, logging to the console, or writing a value to a database
  We lose control of values that are produced by side effects
  We can't be sure that another function hasn't changed the value
  Tracking values produced by side effects makes our apps more complex and prone to errors
  It's nearly impossible to write apps without any side effects
  But we should strive to have as few side effects as possible

Observables
  Fusion of the Observer and Iterator Patterns
  Observables combine concepts of both patterns
  [Show photo of fusion food]
  I could take about these patterns or show you diagrams, but let's look at some code instead

## Demos

## Wrap Up

Observables vs Promises
  A promise resolves to a single value asynchronously, an observable resolves to (or emits) multiple values asynchronously (over time)

Hot and Cold Observables
  "Hot" observables emit values regardless of Observers being subscribed to them
  "Cold" observables emit the entire sequence of values from the start to every Observer
  A stream of mouse events is an example of a "hot" observable
    Every subscribe observer gets the same values
  Rx.Observable.range returns a "cold" observable
    Every subscriber gets its own values
  publish, connect, refCount, share

Unit Testing
  TestScheduler

Where can I use RxJS?
  Pretty much anywhere!
  AngularJS 1
  Angular 2
    ngrx - Redux store implemented using RxJS
  React
  Cycle.cs - Used to be based on RxJS now uses its own library?
  VanillaJS

So what?
  Why would I use Observables?
  What are the benefits?
  What are the hurdles?

Do you need to learn RxJS to be an Angular 2 developer?
  Can you avoid it?

Resources
  ReactiveX Website
  RxMarbles
  Reactive Programming with RxJS by Sergi Mansilla
  Andre's Introduction to Reactive Programming
  Egghead.io Courses
  Anything by Matthew Podwysocki, Ben Lesh, Andre Staltz, Rob Wormald
    My demos were heavily influenced by Ben Lesh's and Andre Staltz's work

Feedback
  This is the first time that I've given this talk so I'd love to hear any feedback that you might have, positive or negative

Thanks!
