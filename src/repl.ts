import { State } from './state.js';

export function cleanInput(input: string): string[] {
    const trimmedString = input.trim();
    const splitString = trimmedString.split(" ");
    const nonEmpty = splitString.filter((str) => str !== '');
    const lowercase = nonEmpty.map((str) => str.toLowerCase());

    return lowercase;
}

export function startREPL(state: State) {
    state.rl.prompt();
    state.rl.on("line", async (line) => {
        const parsedInput = cleanInput(line);
        const userCommand = parsedInput[0];
        state.userArgs = parsedInput.slice(1);
        const commands = state.commands;

        if (userCommand in commands) {
            try {
                await commands[userCommand].callback(state);
            } catch (err) {
                console.log(`EXCEPTION: ${err}`)
            }
        } else {
            console.error("Unknown commmand");
        }

        state.rl.prompt();
    });
}