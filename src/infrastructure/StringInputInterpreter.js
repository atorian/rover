// @flow

import type { MapSize } from '../domain/PlateauMap';
import type { MissionUseCaseCommand, RoverOperation } from '../application/MissionUseCase';
import type { Direction } from '../domain';

function parseRoverInitialState(line) {
    const stateParams = line.split(' ');
    return {
        position: {
            x: parseInt(stateParams[0], 10),
            y: parseInt(stateParams[1], 10),
        },
        direction: ((stateParams[2]: any): Direction),
    };
}

function parseRoverSteps(line): string[] {
    return line.split('');
}

export default class StringInputInterpreter {
    interpret(input: string): MissionUseCaseCommand {
        const lines = input.split('\n').map(x => x.trim()).filter(s => s);
        const mapSizeParams = lines[0].split(' ');
        const mapSize: MapSize = {
            width: parseInt(mapSizeParams[0], 10),
            height: parseInt(mapSizeParams[1], 10),
        };
        const roverOperationsLines = lines.slice(1);

        // todo: looks awkward :( refactor me
        const numRovers = Math.ceil(roverOperationsLines.length / 2);
        const operations: RoverOperation[] = (new Array(numRovers)).fill(null)
            .map((v, index) => {
                const operation = {
                    ...parseRoverInitialState(roverOperationsLines[index * 2]),
                    steps: parseRoverSteps(roverOperationsLines[index * 2 + 1]),
                };
                return (
                    ((operation): any): RoverOperation
                );
            });

        return {
            mapSize,
            operations,
        };
    }
}
