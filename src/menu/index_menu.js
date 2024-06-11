import {addToTacZCache} from "./cache_menu";
import {openIndexMenuDialog} from "../dialog/index_dialog";
import {getAllNamespace} from "../utils/index_search";

export var openIndexMenuAction = new Action("action.tacz_utils.index_menu", {
    name: "menu.tacz_utils.index_menu", icon: "create", click: function () {
        let filePaths = electron.dialog.showOpenDialogSync(currentwindow, {
            title: tl("menu.tacz_utils.index_menu"), properties: ["openDirectory"]
        });
        if (!filePaths) {
            return;
        }
        let firstPackDir = filePaths[0];
        let allNamespace = getAllNamespace(firstPackDir);
        if (Object.keys(allNamespace).length > 0) {
            addToTacZCache(firstPackDir)
            openIndexMenuDialog(firstPackDir, allNamespace);
        }
    }
});