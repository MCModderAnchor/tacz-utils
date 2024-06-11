export var getAllNamespace = function (dirPath) {
    let allNamespace = {}
    let allFolder = fs.readdirSync(dirPath);
    for (let subFolder of allFolder) {
        let subFolderPath = `${dirPath}/${subFolder}`;
        let subFolderStat = fs.statSync(subFolderPath);
        if (subFolderStat.isDirectory() && fs.existsSync(`${subFolderPath}/pack.json`)) {
            allNamespace[subFolder] = subFolder
        }
    }

    if (Object.keys(allNamespace).length === 0) {
        Blockbench.showMessageBox({
            title: "message.tacz_utils.index_menu.namespace_not_exist.title",
            message: "message.tacz_utils.index_menu.namespace_not_exist",
            icon: "warning"
        }, function (result) {
        });
    }
    return allNamespace;
}