// @flow
import { assert } from 'chai';
import Rover, { DIRECTIONS } from '../../src/domain/Rover';
import PlateauMap from '../../src/domain/PlateauMap';

describe('PlateauMap', () => {
    it('should keep track of rovers', () => {
        const map = new PlateauMap({ width: 5, height: 5 });

        map.deployRover(new Rover(
            { x: 1, y: 1 },
            DIRECTIONS.NORTH,
        ));

        assert.equal(map.width, 5);
        assert.equal(map.height, 5);
        assert.lengthOf(map.rovers, 1);
    });
    it('should tell is location if free', () => {
        const map = new PlateauMap({ width: 5, height: 5 });

        map.deployRover(new Rover(
            { x: 1, y: 1 },
            DIRECTIONS.NORTH,
        ));

        assert.isOk(map.isFree({ x: 0, y: 0 }));
        assert.isOk(map.isFree({ x: 5, y: 5 }));
        assert.isNotOk(map.isFree({ x: -1, y: 0 }));
        assert.isNotOk(map.isFree({ x: 0, y: -1 }));
        assert.isNotOk(map.isFree({ x: 6, y: 0 }));
        assert.isNotOk(map.isFree({ x: 0, y: 6 }));
        assert.isNotOk(map.isFree({ x: 1, y: 1 }));
    });
});
