
import * as Rx from 'rxjs';

const observer = {
  next: (value) => console.log(value),
  error: (error) => console.error(error),
  complete: () => console.log('Done!')
};
