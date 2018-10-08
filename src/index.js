// @flow
import getStdin from 'get-stdin';
import MissionUseCase from './application/MissionUseCase';
import CliRoverPresenter from './infrastructure/CliRoverPresenter';
import StringInputInterpreter from './infrastructure/StringInputInterpreter';

export default class MissionControl {
    interpreter: StringInputInterpreter;

    useCase: MissionUseCase;

    constructor() {
        this.presenter = new CliRoverPresenter();
        this.interpreter = new StringInputInterpreter();
        this.useCase = new MissionUseCase(
            this.presenter,
        );
    }

    async start() {
        try {
            const input = await getStdin();
            this.useCase.execute(
                this.interpreter.interpret(input),
            );
        } catch (e) {
            // todo: check for error type
            // print only ApplicationErrors
            // log others
            this.presenter.error(e);
        }
    }
}

const app = new MissionControl();

app.start();
