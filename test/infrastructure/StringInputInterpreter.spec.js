// @flow

import { assert } from 'chai';
import StringInputInterpreter from '../../src/infrastructure/StringInputInterpreter';

describe('StringInputInterpreter', () => {
    const interpreter = new StringInputInterpreter();
    it('should parse valid input to MissionUseCaseCommand', () => {
        const input = `
            5 5
            1 2 N
            LMLMLMLMM
            3 3 E
            MMRMMRMRRM
        `;

        assert.deepEqual(interpreter.interpret(input), {
            mapSize: { width: 5, height: 5 },
            operations: [{
                position: { x: 1, y: 2 },
                direction: 'N',
                steps: ['L', 'M', 'L', 'M', 'L', 'M', 'L', 'M', 'M'],
            }, {
                position: { x: 3, y: 3 },
                direction: 'E',
                steps: ['M', 'M', 'R', 'M', 'M', 'R', 'M', 'R', 'R', 'M'],
            }],
        });
    });
});
