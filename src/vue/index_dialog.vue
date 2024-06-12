<script>
import {TAC_AMMO, TAC_ATTACHMENT, TAC_GUN} from "../utils/type_check";
import JSON5 from "json5";

export default {
    props: {
        packDir: {
            type: String,
            required: true
        },
        allNamespace: {
            type: Object,
            required: true
        },
        indexMenuDialog: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            TAC_GUN: TAC_GUN,
            TAC_ATTACHMENT: TAC_ATTACHMENT,
            TAC_AMMO: TAC_AMMO,
            namespace: Object.keys(this.allNamespace)[0],
            type: TAC_GUN
        };
    },
    methods: {
        tl: tl,
        getAllIndex: function () {
            let folder = `${this.packDir}/${this.namespace}/${this.type}/index`
            if (fs.existsSync(folder)) {
                return fs.readdirSync(folder)
            }
            return []
        },
        readIndex: function (fileName) {
            let file = `${this.packDir}/${this.namespace}/${this.type}/index/${fileName}`
            let text = fs.readFileSync(file, "utf8");
            if (text.charCodeAt(0) === 0xFEFF) {
                text = text.substring(1);
            }
            return JSON5.parse(text);
        },
        getIndexName: function (fileName) {
            let indexData = this.readIndex(fileName)
            let indexNameKey = indexData["name"];
            if (indexNameKey && this.languageData[indexNameKey]) {
                return this.languageData[indexNameKey];
            }
            return ""
        },
        hasType: function (typeName) {
            let folder = `${this.packDir}/${this.namespace}/${typeName}/index`
            return fs.existsSync(folder);
        },
        setType: function (typeName) {
            this.type = typeName;
        }
    },
    computed: {
        languageData: function () {
            let file = `${this.packDir}/${this.namespace}/lang/zh_cn.json`
            let text = fs.readFileSync(file, "utf8");
            if (text.charCodeAt(0) === 0xFEFF) {
                text = text.substring(1);
            }
            return JSON5.parse(text);
        }
    },
}
</script>

<template>
    <div>
        <div style="display: flex;">
            <button :class="{'inactive':!hasType(TAC_GUN)}" class="left-button" :disabled="!hasType(TAC_GUN)"
                    @click="setType(TAC_GUN)">
                {{ tl("button.tacz_utils.index_menu.guns") }}
            </button>
            <button :class="{'inactive':!hasType(TAC_ATTACHMENT)}" class="right-button"
                    :disabled="!hasType(TAC_ATTACHMENT)"
                    @click="setType(TAC_ATTACHMENT)">
                {{ tl("button.tacz_utils.index_menu.attachments") }}
            </button>
            <button :class="{'inactive':!hasType(TAC_AMMO)}" class="right-button" :disabled="!hasType(TAC_AMMO)"
                    @click="setType(TAC_AMMO)">
                {{ tl("button.tacz_utils.index_menu.ammo") }}
            </button>
        </div>
        <div style="margin-top: 20px">
            <div v-for="fileName in getAllIndex()" class="tacz-index">
                <div style="width: 84%; margin-top: 5px; margin-left: 10px">{{ getIndexName(fileName) }}</div>
                <button style="width: 15%">
                    <li class="fa fa-edit"></li>
                    {{ tl("button.tacz_utils.index_menu.edit")}}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.tacz-index {
    margin-bottom: 5px;
    padding: 5px;
    background-color: #21252b;
    display: flex;
}

.inactive {
    background-color: #21252b;
    pointer-events: none;
}

.left-button {
    width: 48%;
    height: 30px
}

.right-button {
    width: 48%;
    height: 30px;
    margin-left: 2%
}
</style>