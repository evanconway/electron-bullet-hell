import { GameplayController } from "src/controllerManager";
import { Gameplay } from "./Gameplay";

const frameTimeUnit = (1 / 60) * 1000;

export class UsingMessage extends Gameplay {
  private time: number;

  constructor() {
    super();
    this.time = 0;
  }

  update(input: GameplayController, timePassed: number): void {}
}
