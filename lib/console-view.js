'use babel';

class ConsoleView {
    constructor(serializeState) {
        this.tidalConsole = null;
        this.log = null;
    }

    initUI() {
        if (this.tidalConsole) return;
        this.tidalConsole = document.createElement('div');
        this.tidalConsole.setAttribute('tabindex', -1);
        this.tidalConsole.classList.add('tidalcycles', 'console', 'native-key-bindings');

        this.log = document.createElement('div');
        this.tidalConsole.appendChild(this.log);

        atom.workspace.addBottomPanel({
            item: this.tidalConsole
        });

        atom.config.onDidChange( 'tidalcycles.onlyLogLastMessage', (data) =>{

          if(data.newValue){
              this.tidalConsole.classList.remove('scroll');
          }else{
            this.tidalConsole.classList.add('scroll');
          }
        });



    }

    serialize() {

    }

    destroy() {
        this.tidalConsole.remove();
    }

    logStdout(text) {
        this.logText(text);
    }

    logStderr(text) {
        this.logText(text, true);
    }

    logText(text, error) {
        if (!text) return;
        var pre = document.createElement("pre");
        if (error) {
            pre.className = "error";
        }

        if (atom.config.get('tidalcycles.onlyLogLastMessage')) {
            this.log.innerHTML = "";
        }
        pre.innerHTML = text;
        this.log.appendChild(pre);

        if (!error && atom.config.get('tidalcycles.onlyShowWhenErrors')) {
            this.tidalConsole.setAttribute('style', 'display:none');
        } else {
            this.tidalConsole.setAttribute('style', '');
        }

        this.tidalConsole.scrollTop = this.tidalConsole.scrollHeight;


    }
}

export default ConsoleView;
