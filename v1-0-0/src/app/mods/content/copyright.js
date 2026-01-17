"use strict";

const modState = {
    worldTimeApi: "https://worldtimeapi.org/api/timezone/America/Belem"
};
Object.freeze(modState);

const getDateFromWorldTimeApi = () => {
    const url = modState.worldTimeApi;
    return fetch(url)
        .then(res => {
            if(!res.ok) return undefined;
            return res.json()
                .then(obj => {
                    const {utc_datetime} = obj;
                    if(!utc_datetime) return undefined;
                    return new Date(utc_datetime).getFullYear();
                })
                .catch(err => {
                    if(err) console.error(err.message);
                    return undefined;
                });
        })
        .catch(err => {
            if(err) console.error(err.message);
            return undefined;
        });
};

const modInterface = Object.create(null);
modInterface.copyright = (callback) => {
    let copyrightYear = "2025";
    getDateFromWorldTimeApi().then(currentYear => {
        if(currentYear) {
            copyrightYear = `2025-${currentYear}`;
        }
        const content = `\u00A9 ${copyrightYear}, Jamil Services.`;
        callback(content);
    }).catch(err => {
        if(err) console.error(err.message);
        const content = `\u00A9 ${copyrightYear}, Jamil Services.`;
        callback(content);
    });
};
Object.freeze(modInterface);

export const CopyRightContent = modInterface.copyright;