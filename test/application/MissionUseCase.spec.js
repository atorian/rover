// @flow

import { assert } from 'chai';
import MissionUseCase from '../../src/application/MissionUseCase';

describe('MissionUseCase', () => {
    it('should print final rover location when operation succeeded', () => {
        const presenter = {
            output: [],
            position(rover) {
                this.output.push(JSON.stringify(rover));
            },
            error(message) {
                this.output.push(JSON.stringify(message));
            },
        };
        const useCase = new MissionUseCase(presenter);
        useCase.execute({
            mapSize: {
                width: 3,
                height: 3,
            },
            operations: [
                {
                    position: { x: 0, y: 0 },
                    direction: 'N',
                    steps: ['R', 'M', 'M', 'L', 'M'],
                },
            ],
        });

        assert.deepEqual(presenter.output, [
            JSON.stringify({ position: { x: 2, y: 1 }, direction: 'N' }),
        ]);
    });
    it('should print error when operation failed', () => {
        const presenter = {
            output: [],
            position(rover) {
                this.output.push(JSON.stringify(rover));
            },
            error(message) {
                this.output.push(JSON.stringify(message));
            },
        };
        const useCase = new MissionUseCase(presenter);
        useCase.execute({
            mapSize: {
                width: 3,
                height: 3,
            },
            operations: [
                {
                    position: { x: 0, y: 0 },
                    direction: 'N',
                    steps: ['L', 'M'],
                },
            ],
        });

        assert.deepEqual(presenter.output, [
            JSON.stringify({ position: { x: 2, y: 1 }, direction: 'N' }),
        ]);
    });
});
