// v1-0-0/src/app/mods/content/page/home/streams.js
"use strict";

const modState = {
    items: {
        twitch: {
            name: "twitch",
            link: "https://www.twitch.tv/juliojamil",
            desc: "desenvolvimento web e desktop, e casualmente fa\u00E7o algumas gameplays."
        },
        trovo: {
            name: "trovo",
            link: "https://trovo.live/juliojamil",
            desc: "minigame da trovo com intera\u00E7\u00E3o entre contas, com gameplay de desktop game, e casualmente vetoriza\u00E7\u00E3o de imagens."
        },
        kick: {
            name: "kick",
            link: "https://kick.com/juliojamil",
            desc: "ainda n\u00E3o est\u00E1 definido ent\u00E3o fa\u00E7o lives diversas casualmente."
        }
    }
};
Object.freeze(modState);

const line_build = (container, stream) => {
    if(stream && !modState.items[stream]) return undefined;

    const line = container.element.listLi();

    const {name, link, desc} = modState.items[stream]

    const target = container.element.a();
    target.setAttribute("href", link);
    target.setAttribute("target", "_blank");
    target.setAttribute("rel", "nofollow");

    const title = container.element.span();
    title.setAttribute("class", `stream-source ${name}`);
    title.innerText = name;
    target.appendChild(title);

    const content = container.element.span();
    content.setAttribute("class", "stream-desc");
    content.innerText = desc;
    target.appendChild(content);

    line.appendChild(target);
    line.appendChild(content);

    return line;
};

const modInterface = Object.create(null);
modInterface.content = (container) => {
    if(!container) return undefined;
    const section = container.element.listUl();
    section.setAttribute("class", "streams-list");

    const twitch_line = line_build(container, "twitch");
    const trovo_line = line_build(container, "trovo");
    const kick_line = line_build(container, "kick");

    if(twitch_line) section.appendChild(twitch_line);
    if(trovo_line) section.appendChild(trovo_line);
    if(kick_line) section.appendChild(kick_line);

    return section;
};
Object.freeze(modInterface);

export const streamsHomeContent = modInterface.content;