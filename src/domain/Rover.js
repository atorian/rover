// @flow

import PlateauMap from './PlateauMap';
import type { Direction, Position } from './index';

export const DIRECTIONS = {
    NORTH: 'N',
    EAST: 'E',
    SOUTH: 'S',
    WEST: 'W',
};

const ROTATIONS = {
    N: { LEFT: 'W', RIGHT: 'E' },
    E: { LEFT: 'N', RIGHT: 'S' },
    S: { LEFT: 'E', RIGHT: 'W' },
    W: { LEFT: 'S', RIGHT: 'N' },
};

type Axis = 'x' | 'y';
type Movement = {
    axis: Axis,
    value: 1 | -1,
};

const MOVEMENTS: { [Direction]: Movement } = {
    N: { axis: 'y', value: 1 },
    S: { axis: 'y', value: -1 },
    E: { axis: 'x', value: 1 },
    W: { axis: 'x', value: -1 },
};


export default class Rover {
    position: Position;

    direction: Direction;

    constructor(position: Position, direction: Direction) {
        this.position = position;
        this.direction = direction;
    }

    turnLeft() {
        this.direction = ROTATIONS[this.direction].LEFT;
    }

    turnRight() {
        this.direction = ROTATIONS[this.direction].RIGHT;
    }

    move(map: PlateauMap) {
        const movement = MOVEMENTS[this.direction];
        const nextPosition = {
            ...this.position,
            [movement.axis]: this.position[movement.axis] + movement.value,
        };

        if (map.isFree(nextPosition)) {
            this.position = nextPosition;
        } else {
            throw new Error('DomainError: position is not available');
        }
    }
}
