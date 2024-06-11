import {loadTACZLanguage} from "./utils/i18n_loader";
import TACZ from "../package.json";
import {openIndexMenuAction} from "./menu/index_menu";
import {initCacheTacZPackAction, taczCacheMenuAction} from "./menu/cache_menu";

(function () {
    Plugin.register(TACZ.name, {
        title: tl("info.tacz_utils.name"),
        author: TACZ.author,
        description: tl("info.tacz_utils.description"),
        version: TACZ.version,
        icon: "fa-gun",
        variant: "desktop",
        tags: ["Minecraft: Java Edition"],
        min_version: "4.0.0",
        await_loading: true,
        onload() {
            loadTACZLanguage();
            initCacheTacZPackAction();
            new BarMenu("tacz_utils", [
                "action.tacz_utils.index_menu",
                taczCacheMenuAction
            ]);
            MenuBar.update();
        },
        onunload() {
            delete MenuBar.menues["tacz_utils"];
            MenuBar.update();

            openIndexMenuAction.delete();
        }
    });
})();