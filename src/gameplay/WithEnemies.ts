import { GameplayController } from "src/controllerManager";
import { Gameplay } from "./Gameplay";

export class WithEnemies extends Gameplay {
  constructor() {
    super();
  }

  update(input: GameplayController, timePassed: number): void {}
}
