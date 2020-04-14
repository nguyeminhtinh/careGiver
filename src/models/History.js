import {createAtom, autorun} from "mobx";

class History {
    atom;
    constructor() {
        this.atom = createAtom(
            "History", 
            () => this.getHistory()
        );
    }

    getHistory() {

    }
}