// @flow
/* eslint no-console: "off" */
import Rover from '../domain/Rover';

// todo: add tests
export default class CliRoverPresenter {
    position(rover: Rover) {
        console.log(`${rover.position.x} ${rover.position.y} ${rover.direction}`);
    }

    error(message: string) {
        console.error(message);
    }
}
