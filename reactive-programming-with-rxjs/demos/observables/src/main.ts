
import * as Rx from 'rxjs';

const mouse = Rx.Observable.fromEvent(document, 'mousemove');

const subscription = mouse.subscribe(
  value => console.log(value),
  err => console.error(err),
  () => console.log('Done')
);
