import { createInterface } from 'node:readline';
import { stdin, stdout } from 'node:process';

export function cleanInput(input: string): string[] {
    const trimmedString = input.trim();
    const splitString = trimmedString.split(" ");
    const nonEmpty = splitString.filter((str) => str !== '');
    const lowercase = nonEmpty.map((str) => str.toLowerCase());

    return lowercase;
}

const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: "Pokédex > "
});

export function startREPL() {
    rl.prompt();
    rl.on("line", (line) => {
        const parsedInput = cleanInput(line);
        
        if (parsedInput.length > 0) {
            console.log(`Your command was: ${parsedInput[0]}`);
        }

        rl.prompt();
    });
}