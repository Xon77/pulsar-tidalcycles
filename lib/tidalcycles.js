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
        }
    },

    activate(state) {
        consoleView = new ConsoleView(state.consoleViewState);
        tidalRepl = new Repl(consoleView);
    },

    deactivate() {
        consoleView.destroy();
        tidalRepl.destroy();
    },

    serialize() {
        return {
            consoleViewState: consoleView.serialize()
        };
    }

};
