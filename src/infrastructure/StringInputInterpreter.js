// @flow

import type { MapSize } from '../domain/PlateauMap';
import type { MissionUseCaseCommand } from '../application/MissionUseCase';

function parseRoverInitialState(line) {
    const stateParams = line.split(' ');
    return {
        position: {
            x: parseInt(stateParams[0], 10),
            y: parseInt(stateParams[1], 10),
        },
        direction: stateParams[2],
    };
}

function parseRoverSteps(line) {
    return line.split('');
}

export default class StringInputInterpreter {
    interpret(input: string): MissionUseCaseCommand {
        const lines = input.split('\n').map(x => x.trim()).filter(s => s);
        const mapSizeParams = lines[0].split(' ');
        const mapSize: MapSize = { width: 1 * mapSizeParams[0], height: 1 * mapSizeParams[1] };
        const roverOperationsLines = lines.slice(1);

        const operations = roverOperationsLines.reduce((ops, line, index) => {
            const roverIndex = Math.floor(index / 2);
            if (index % 2 === 0) {
                return {
                    ...ops,
                    [roverIndex]: parseRoverInitialState(line),
                };
            }

            return {
                ...ops,
                [roverIndex]: {
                    ...ops[roverIndex],
                    steps: parseRoverSteps(line),
                },
            };
        }, {});

        return {
            mapSize,
            operations: Object.values(operations),
        };
    }
}
