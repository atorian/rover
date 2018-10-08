import Rover from '../domain/Rover';

export interface RoverPresenter {
    position(rover: Rover): void;

    error(message: string): void;
}
