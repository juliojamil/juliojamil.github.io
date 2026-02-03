"use strict";

const modState = {
    cloudflare: "https://one.one.one.one/cdn-cgi/trace",
    try: false
};
Object.seal(modState);

const getDateFromCloudflare = () => {
    const url = modState.cloudflare;
    return fetch(url)
        .then(res => {
            if(!res.ok) return undefined;
            return res.text()
                .then(text => {
                    if(!text) return undefined;


                    const timestamp = text
                        .split('\n')[3]
                        .replace("ts=", "");

                    return new Date(Math.trunc(Number(timestamp)) * 1000).getFullYear();
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

const update_copryright = (callback) => {
    let copyrightYear = "2025";
    const content = () => `\u00A9 ${copyrightYear}, Jamil Services.`;
    try {
        modState.try = false;
        getDateFromCloudflare()
            .then(currentYear => {
            if (currentYear) copyrightYear = `2025-${currentYear}`;
            callback(content());
        });
    } catch (err) {
        callback(content());
        throw new Error(err.message);
    }
};

const modInterface = Object.create(null);
modInterface.copyright = (callback, timer) => {
    try {
        update_copryright(callback);
    } catch (err) {
        if(modState.try) return;
        modState.try = true;
        timer.add_request({
            next: 2000,
            callback: () => {
                update_copryright(callback);
            }
        });
    }
};
Object.freeze(modInterface);

export const CopyRightContent = modInterface.copyright;