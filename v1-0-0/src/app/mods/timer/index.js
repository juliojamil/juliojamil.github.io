"use strict";

const TimerStore = new Array(1);
TimerStore[0] = {test: 1};
Object.freeze(TimerStore);

const modState = {
    running: false,
    stopped: false,
    interval: 5000,
    queue: undefined
};

const state_running_contract = () => {
    const {stopped, running} = modState;
    return (running && !stopped);
};
const state_stopped_contract = () => {
    const {stopped, running} = modState;
    return (!running && stopped);
};

const activeinterface = Object.create(null);

activeinterface.timer_run = () => {
    if(state_stopped_contract() || !modState.queue) return;
    const len = TimerStore.length;
    for(let i = (len - 1); i >=0; i--) {
        const item = TimerStore[i];
        if(item) console.log(item);
    }
    activeinterface.timer_renew();
};

activeinterface.timer_renew = () => {
    if(state_stopped_contract()) return;
    if(modState.queue) {
        clearTimeout(modState.queue);
        modState.queue = undefined;
    }
    modState.queue = setTimeout(() => {
        activeinterface.timer_run();
    }, modState.interval);
};

const modinterface = Object.create(null);
modinterface.start_request = () => {
    if(state_running_contract()) return;
    modState.running = true;
    activeinterface.timer_renew();
};
modinterface.stop_request = () => {
    if(state_stopped_contract()) return;
    modState.running = false;
    modState.stopped = true;
};
Object.freeze(modinterface);

export const timer = modinterface;