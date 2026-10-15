'use babel'

import Repl from './repl';
import {Editors} from './editors';
import OscServer from './osc-server';

export function oscEvalSubscriber(tidalRepl: Repl, editors: Editors) {
    return (args: {}): void => {
        const message = OscServer.asDictionary(args);

        if (message['tab'] !== undefined) {
            if (message['pane'] !== undefined) {
                // Show the given tab of the given pane (split windows)
                const targetPane = atom.workspace.getPanes()[message['pane']];
                targetPane.activate();
                targetPane.setActiveItem(targetPane.getItems()[message['tab']]);
                // Same in one expression:
                // atom.workspace.getPanes()[message['pane']].activate();
                // atom.workspace.getPanes()[message['pane']].setActiveItem(atom.workspace.getPanes()[message['pane']].getItems()[message['tab']])
            } else {
                // Unconditional version (needed, because getTextEditors lists the editors of all panes):
                // atom.workspace.getPanes()[0].activate();

                // Focus the first pane only if another one is active.
                // Could be removed if the window is never split.
                const firstPane = atom.workspace.getPanes()[0];
                if (atom.workspace.getActivePane() !== firstPane) {
                    firstPane.activate();
                }
                firstPane.setActiveItem(atom.workspace.getTextEditors()[message['tab']]);
            }
        }

        if (message['row'] && message['column']) {
            // this.editors.goTo(message['row'] - 1, message['column'])
            editors.goTo(message['row'] - 1, message['column'])
        }

        // this.tidalRepl.eval(message['type'], false);
        tidalRepl.eval(message['type'], false);

        /* Original upstream version:
        const message = OscServer.asDictionary(args);

        if (message['tab'] !== undefined) {
            atom.workspace.getPanes()[0].setActiveItem(atom.workspace.getTextEditors()[message['tab']])
        }

        if (message['row'] && message['column']) {
            editors.goTo(message['row'] - 1, message['column'])
        }

        tidalRepl.eval(message['type'], false);
        */
    }
}
