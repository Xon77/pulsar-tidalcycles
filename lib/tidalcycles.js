'use babel';

import ConsoleView from './console-view';
import Repl from './repl';

export default {
    consoleView: null,
    tidalRepl: null,
    config: {
        'ghciPath': {
            type: 'string',
            default: 'ghci'
        },
        'bootTidalPath': {
            type: 'string',
            default: ''
        },
        'useBootFileInCurrentDirectory': {
            type: 'boolean',
            default: false,
            description: 'If a BootTidal.hs file is found at the root of your Atom project, it will be used to boot Tidal.'
        },
        'onlyShowWhenErrors': {
            type: 'boolean',
            default: false,
            description: 'Only show console if last message was an error.'
        },
        'onlyLogLastMessage': {
            type: 'boolean',
            default: false,
            description: 'Only log last message to the console.'
        }
    },

    activate(state) {
        this.consoleView = new ConsoleView(state.consoleViewState);
        this.tidalRepl = new Repl(this.consoleView);
    },

    deactivate() {
        this.consoleView.destroy();
        this.tidalRepl.destroy();
    },

    serialize() {
        return {
            consoleViewState: this.consoleView.serialize()
        };
    }

};
