import { assert } from 'chai';
import { given } from 'mocha-testdata';
import Rover, { DIRECTIONS } from '../../src/domain/Rover';
import PlateauMap from '../../src/domain/PlateauMap';

describe('Rover', () => {
    given(
        [DIRECTIONS.NORTH, DIRECTIONS.WEST],
        [DIRECTIONS.WEST, DIRECTIONS.SOUTH],
        [DIRECTIONS.SOUTH, DIRECTIONS.EAST],
        [DIRECTIONS.EAST, DIRECTIONS.NORTH],
    ).it('should turn left for 90 degrees', (initial, expected) => {
        const rover = new Rover({ x: 0, y: 0 }, initial);

        rover.turnLeft();

        assert.equal(rover.direction, expected);
    });

    given(
        [DIRECTIONS.NORTH, DIRECTIONS.EAST],
        [DIRECTIONS.EAST, DIRECTIONS.SOUTH],
        [DIRECTIONS.SOUTH, DIRECTIONS.WEST],
        [DIRECTIONS.WEST, DIRECTIONS.NORTH],
    ).it('should turn right for 90 degrees', (initial, expected) => {
        const rover = new Rover({ x: 0, y: 0 }, initial);

        rover.turnRight();

        assert.equal(rover.direction, expected);
    });

    given(
        [DIRECTIONS.NORTH, { x: 1, y: 2 }],
        [DIRECTIONS.EAST, { x: 2, y: 1 }],
        [DIRECTIONS.SOUTH, { x: 1, y: 0 }],
        [DIRECTIONS.WEST, { x: 0, y: 1 }],
    ).it('should move for 1 cell in a given direction', (initial, expected) => {
        const rover = new Rover({ x: 1, y: 1 }, initial);

        rover.move(new PlateauMap({ width: 3, height: 3 }));

        assert.deepEqual(rover.position, expected);
    });

    it('should throw if next position is not free', () => {
        const rover = new Rover({ x: 1, y: 1 }, DIRECTIONS.NORTH);
        const map = new PlateauMap({ width: 3, height: 3 });

        assert.throws(() => rover.move());
    });
});
