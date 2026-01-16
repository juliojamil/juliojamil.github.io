"use strict";

import {ElementStore} from "@components/container/store/element/index.js";
import {EventStore} from "@components/container/store/event/index.js";

const eventSyncElementAdd = (eventId, elementId, eventName, functionCallback) =>{
  return EventStore.attach(
      [eventId, eventName, functionCallback],
      [elementId, ElementStore]);
}
const eventSyncElementRemove = (eventId) => {
    return EventStore.detach(eventId, ElementStore);
}

const modInterface = Object.create(null);
modInterface.start_request = () => {
    ElementStore.start_request();
    EventStore.start_request();
}
modInterface.stop_request = () => {
    ElementStore.stop_request();
    EventStore.stop_request();
}
modInterface.element = ElementStore;
modInterface.event = {
    attach: eventSyncElementAdd,
    detach: eventSyncElementRemove
};
Object.freeze(modInterface);

export const Store = modInterface;
