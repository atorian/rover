// @flow


import type { Direction } from './index';
import { isSamePosition } from "./index";

export type MapSize = {
    width: number,
    height: number,
}

type Rover = {
    position: Position,
    direction: Direction,
}

export default class PlateauMap {
    width: number;

    height: number;

    rovers: Rover[];

    constructor(size: MapSize) {
        this.width = size.width;
        this.height = size.height;
        this.rovers = [];
    }

    deployRover(rover: Rover) {
        this.rovers.push(rover);
    }

    isFree(position: Position) {
        if (position.x >= 0 && position.x <= this.width) {
            if (position.y >= 0 && position.y <= this.width) {
                if (!this.rovers.find(x => isSamePosition(x.position, position))) {
                    return true;
                }
            }
        }
        return false;
    }
}
