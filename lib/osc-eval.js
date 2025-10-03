'use babel'

import Repl from './repl';
import {Editors} from './editors';
import OscServer from './osc-server';

export function oscEvalSubscriber(tidalRepl: Repl, editors: Editors) {
    return (args: {}): void => {

          const message = OscServer.asDictionary(args);

          if (message['tab'] !== undefined) {
            if (message['pane'] !== undefined) {
              const targetPane = atom.workspace.getPanes()[message['pane']];
              const targetItem = targetPane.getItems()[message['tab']];
              targetPane.activate();
              targetPane.setActiveItem(targetItem);
              /*atom.workspace.getPanes()[message['pane']].activate();
              atom.workspace.getPanes()[message['pane']].setActiveItem(atom.workspace.getPanes()[message['pane']].getItems()[message['tab']])*/
            } else {
              // atom.workspace.getPanes()[0].activate(); // not necessary ? Yes because of getTextEditors

              // Version conditionnelle courte pour rester sur le 1er split
              // pourrait être retiré si sûr que pas de split...
              const p = atom.workspace; const a=p.getActivePane(), b=p.getPanes()[0]; a!==b && b.activate();

              atom.workspace.getPanes()[0].setActiveItem(atom.workspace.getTextEditors()[message['tab']])
            }
          }

          if (message['row'] && message['column']) {
              // this.editors.goTo(message['row'] - 1, message['column'])
              editors.goTo(message['row'] - 1, message['column'])
          }

          // this.tidalRepl.eval(message['type'], false);
          tidalRepl.eval(message['type'], false);
      // }

      /*
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
