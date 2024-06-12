export var TAC_GUN = "guns"
export var TAC_ATTACHMENT = "attachments"
export var TAC_AMMO = "ammo"

export function getFirstAvailableType(namespacePath) {
    let gunIndex = `${namespacePath}/${TAC_GUN}/index`
    if (fs.existsSync(gunIndex)) {
        return TAC_GUN
    }
    let attachmentIndex = `${namespacePath}/${TAC_ATTACHMENT}/index`
    if (fs.existsSync(attachmentIndex)) {
        return TAC_ATTACHMENT
    }
    let ammoIndex = `${namespacePath}/${TAC_AMMO}/index`
    if (fs.existsSync(ammoIndex)) {
        return TAC_AMMO
    }
}