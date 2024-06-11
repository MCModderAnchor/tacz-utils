import {openIndexMenuDialog} from "../dialog/index_dialog";
import {isEmpty} from "../utils/string";
import {getAllNamespace} from "../utils/index_search";

var CACHE_TACZ_PACK = [];

export var taczCacheMenuAction = {
    name: "menu.tacz_utils.cache_menu",
    id: "action.tacz_utils.cache_menu",
    icon: "fa-history",
    children: function () {
        let arr = [...CACHE_TACZ_PACK].reverse();
        if (arr.length) {
            arr.push("_", {
                name: "menu.tacz_utils.cache_menu.clear",
                icon: "clear",
                click: function () {
                    localStorage.removeItem("cacheTacZPacks");
                    CACHE_TACZ_PACK.length = 0;
                }
            });
        }
        return arr;
    }
};

export var addToTacZCache = function addToCache(path) {
    let cacheTacZPacks = localStorage.getItem("cacheTacZPacks");
    if (isEmpty(cacheTacZPacks)) {
        cacheTacZPacks = {};
    } else {
        cacheTacZPacks = JSON.parse(cacheTacZPacks);
    }
    let name = pathToName(path, true);
    cacheTacZPacks[name] = path;
    localStorage.setItem("cacheTacZPacks", JSON.stringify(cacheTacZPacks));

    CACHE_TACZ_PACK.push({
        id: name,
        name: name,
        description: path,
        icon: "fa-folder",
        click: function () {
            let cacheTacZPacks = localStorage.getItem("cacheTacZPacks");
            if (isEmpty(cacheTacZPacks)) {
                return;
            }
            cacheTacZPacks = JSON.parse(cacheTacZPacks);
            let cacheTacZPack = cacheTacZPacks[this.id];
            if (cacheTacZPack) {
                let allNamespace = getAllNamespace(cacheTacZPack);
                if (Object.keys(allNamespace).length > 0) {
                    openIndexMenuDialog(cacheTacZPack, allNamespace);
                }
            }
        }
    });
}

export function initCacheTacZPackAction() {
    let cacheTacZPacks = localStorage.getItem("cacheTacZPacks");
    if (isEmpty(cacheTacZPacks)) {
        return;
    }
    cacheTacZPacks = JSON.parse(cacheTacZPacks);
    if (cacheTacZPacks) {
        for (let name of Object.keys(cacheTacZPacks)) {
            let path = cacheTacZPacks[name];
            if (fs.existsSync(path)) {
                addToTacZCache(path);
            } else {
                delete cacheTacZPacks[name];
            }
        }
    }
    localStorage.setItem("cacheTacZPacks", JSON.stringify(cacheTacZPacks));
}