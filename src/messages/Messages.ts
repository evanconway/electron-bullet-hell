enum MessageType {
  move,
}

class Messages {
  private messages: {
    [MessageType.move]: {
      target: number;
      x: number;
      y: number;
    }[];
  };

  constructor() {
    this.messages = {
      [MessageType.move]: [],
    };
  }
}
