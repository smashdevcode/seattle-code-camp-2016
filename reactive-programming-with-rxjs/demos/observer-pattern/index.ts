
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
    console.log(`Listener 1 received: ${message}`);
  }
};

const listener2: IListener = {
  update: (message) => {
    console.log(`Listener 2 received: ${message}`);
  }
};

const notifer = new Producer();
notifer.add(listener1);
notifer.add(listener2);
notifer.notify('Hello there!');
