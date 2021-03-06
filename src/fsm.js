class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (config.states && config.initial) {
            this.states = config.states;
            this.activeState = config.initial;
        }
        else {
            errorFunc();
        }
        this.prevState = null;
        this.nextState = null;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.activeState;
    }
    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (Object.keys(this.states).includes(state)) {
            this.prevState = this.activeState;
            this.activeState = state;
        }
        else {
            errorFunc();
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        this.prevState = this.activeState;
        for ( var x in  this.states) {
            if (x == this.activeState) {
                for (var y in this.states[x].transitions){
                    if (y == event) {
                        this.activeState = this.states[x].transitions[y];
                        return;
                    }
                }
            }
        }
        errorFunc();
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.activeState = 'normal';
        this.prevState = null;
        this.nextState = null;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (event) {
                var arrEvents=[];
                for (var x in  this.states) {
                    if (Object.keys(this.states[x].transitions).includes(event))
                        {
                            arrEvents.push(x);
                        }
                }
                return arrEvents;
                return [];
        }
        else {
            return Object.keys(this.states);
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.prevState) {
            this.nextState = this.activeState;
            this.activeState = this.prevState;
            this.prevState = null;
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.nextState) {
            this.prevState = this.activeState;
            this.activeState = this.nextState;
            this.nextState = null;
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.prevState = null;
        this.nextState = null;
    }
    errorFunc() {
        throw Error;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
