// @flow

import type { Direction, Position } from '../domain';
import type { MapSize } from '../domain/PlateauMap';
import PlateauMap from '../domain/PlateauMap';
import Rover from '../domain/Rover';
import type { RoverPresenter } from './RoverPresenter';

type RoverCommand = 'L' | 'R' | 'M';

export type RoverOperation = {
    position: Position,
    direction: Direction,
    steps: RoverCommand[],
};

export type MissionUseCaseCommand = {
    mapSize: MapSize,
    operations: RoverOperation[],
}

export default class MissionUseCase {
    constructor(presenter: RoverPresenter) {
        this.presenter = presenter;
    }

    execute(command: MissionUseCaseCommand) {
        // todo: validate inputs & throw ApplicationErrors
        const map = new PlateauMap(command.mapSize);

        for (const operation of command.operations) {
            const rover = new Rover(
                operation.position,
                operation.direction,
            );

            map.deployRover(rover);

            for (const step of operation.steps) {
                if (step === 'L') {
                    rover.turnLeft();
                } else if (step === 'R') {
                    rover.turnRight();
                } else if (step === 'M') {
                    // Rover does not have any AI, as it gets commands from operations
                    // So, probably, it would be better to ask for target destination and
                    // check map here, so rover wont need map at all.
                    // However it could check for obstacles with camera and throw.
                    rover.move(map);
                } else {
                    throw new Error(`ApplicationError: Unknown Rover command "${step}"`);
                }
            }

            this.presenter.position(rover);
        }
    }
}
