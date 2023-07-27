declare const annyang: Annyang | null;

interface Annyang {
  start(options?: StartOptions, autoRestart?: boolean): void;
  abort(): void;
  addCommands(commands: CommandOption | CommandOption[]): void;
  removeCommands(command?: string | string[]): void;
  setLanguage(language: string): void;
  addCallback(event: string, callback: CallbackFunction, context?: any): void;
  removeCallback(event: string, callback?: CallbackFunction): void;
  getSpeechRecognizer(): SpeechRecognition | null;
  trigger(command: string): void;
}

interface CommandOption {
  [phrase: string]: ((...args: any[]) => void) | CommandAction;
}

type CommandAction = string | string[] | CallbackFunction;

type CallbackFunction = (userSaid: string[], commandText: string, results: any) => void;

interface StartOptions {
  autoRestart?: boolean;
  continuous?: boolean;
  paused?: boolean;
}
