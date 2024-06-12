import indexDialogVue from "../vue/index_dialog.vue";
import {getFirstAvailableType} from "../utils/type_check";

export var openIndexMenuDialog = function openIndexMenuDialog(packDir, allNamespace) {
    let indexMenuDialog = new Dialog({
        title: "dialog.tacz_utils.index_menu.title",
        width: 1000,
        singleButton: true,
        cancel_on_click_outside: false,
        onCancel: function () {
        },
        sidebar: {
            pages: allNamespace,
            page: Object.keys(allNamespace)[0],
            actions: [],
            onPageSwitch(page) {
                let child = indexMenuDialog.content_vue.$children[0];
                if (child.namespace !== page) {
                    child.namespace = page;
                    child.type = getFirstAvailableType(`${packDir}/${page}`)
                }
            }
        },
        component: {
            data() {
                return {
                    packDir: packDir,
                    allNamespace: allNamespace,
                    indexMenuDialog: indexMenuDialog
                };
            },
            components: {indexDialogVue},
            template: "<indexDialogVue class='tacz-index-dialog-main' :packDir='packDir' :allNamespace='allNamespace' :indexMenuDialog='indexMenuDialog'/>"
        }
    });
    indexMenuDialog.show();

    // 强制修改其高宽
    if (indexMenuDialog.object && indexMenuDialog.object.style) {
        indexMenuDialog.object.style["max-width"] = "1000px"
        indexMenuDialog.object.style["min-height"] = "600px"
    }
}