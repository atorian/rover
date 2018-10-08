// @flow

export type Position = {
    x: number,
    y: number,
};

export function isSamePosition(a: Position, b: Position) {
    return a.x === b.x && a.y === b.y;
}

export type Direction = 'N' | 'S' | 'E' | 'W';
