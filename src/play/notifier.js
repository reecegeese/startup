const Event = {
  System: "system",
};

class EventMessage {
  constructor(from, type, value) {
    this.from = from;
    this.type = type;
    this.value = value;
  }
}

class EventNotifier {
  events = [];
  handlers = [];

  constructor() {
    // Simulate chat messages that will eventually come over WebSocket
    setInterval(() => {
      const score = Math.floor(Math.random() * 3000);
      const date = new Date().toLocaleDateString();
      const userName = "Berners-Lee";
      this.broadcastEvent(userName, Event.End, {
        name: userName,
        score: score,
        date: date,
      });
    }, 5000);
  }

  broadcastEvent(from, type, value) {
    const event = new EventMessage(from, type, value);
    this.receiveEvent(event);
  }

  addHandler(handler) {
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    this.handlers.filter((h) => h !== handler);
  }

  receiveEvent(event) {
    this.events.push(event);

    this.events.forEach((e) => {
      this.handlers.forEach((handler) => {
        handler(e);
      });
    });
  }
}

const Notifier = new EventNotifier();
export { Event, Notifier };
