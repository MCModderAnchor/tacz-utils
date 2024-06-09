import {loadTACZLanguage} from "./utils/i18nloader";
import TACZ from "../package.json";

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
            new BarMenu("tacz_utils", []);
            MenuBar.update();
        },
        onunload() {
            delete MenuBar.menues["tacz_utils"];
            MenuBar.update();
        }
    });
})();