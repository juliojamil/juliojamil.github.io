"use strict";

const modState = {
    running: false,
    stopped: false,
    interval: 5000,
    queue: undefined,
    next: 0,
    created: 0
};
const TIMER_SIZE = 10;
const TimerStore = new Array(TIMER_SIZE).fill(null);
Object.seal(TimerStore);

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
    const now = Date.now();
    for(let i = (len - 1); i >=0; i--) {
        const item = TimerStore[i];
        if(item && now >= item.timeout) {
            try {
                item.callback();
            } catch {}
            TimerStore[i] = null;
            modState.created = (modState.created -1);
        }
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
    TimerStore.fill(null);
};
modinterface.add_request = (context = {}) => {
    try {
        const {next, callback} = context;

        const created = modState.created;
        if(TIMER_SIZE >= created) {
            console.error("TimerStore Error: Datamemory Fully");
            return false;
        }

        const index = modState.next;
        if(TimerStore[index]) {
            console.error("TimerStore Error: Slot busy");
            return false;
        }

        TimerStore[index] = {
            timeout: (Date.now() + next),
            callback
        };
        modState.created = (created +1);
        if(modState.next >= TIMER_SIZE) {
            modState.next = 0;
            return;
        }
        modState.next = (index + 1);

        return true;
    } catch (err) {
        console.error(err.message);
    }
    return false;
};
Object.freeze(modinterface);

export const timer = modinterface;