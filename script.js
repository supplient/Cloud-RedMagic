
// --------------------------------------------
// Action concerned Class Defination
class Action {
    constructor(icon_path) {
        this.icon_path = icon_path;
    }
}

class TriggerAction extends Action{
}

// Action MACRO
let AC_FIRE = "fire";
let AC_STONE = "stone";

// global action_map declaration and init process
function initTriggerActionMap() {
    let action_map = new Map([
        [AC_FIRE, new TriggerAction("60px-技能图标_赤火炎.png")],
        [AC_STONE, new TriggerAction("60px-技能图标_赤飞石.png")],
    ])
    return action_map;
}
let trigger_action_map = initTriggerActionMap();


// --------------------------------------------
// InitStatus concerned Class Defination
class InitStatus{
    constructor() {
        // magic value status
        this.white_value = 0;
        this.black_value = 0;

        // trigger action status
        let temp_map = new Map();
        for (const ac_name of trigger_action_map.keys()) {
            temp_map.set(ac_name, false);
        }
        this.is_ac_triggered_list = temp_map;
    }
}

// global init_status declaration
let init_status = new InitStatus();


// --------------------------------------------
// DOM event listeners
function onRollBtn(){
    // Update init_status
    // TODO
    switchTriggerAction("stone");
    setMagicValue("black", 20);
}


// --------------------------------------------
// Function supporters
function randomInitStatus(){
    // Assign new random values to init_status
}


// --------------------------------------------
// DOM operate functions
function isActionTriggered(dom_obj) {
    return dom_obj.classList.contains("ac_triggered");
}

function getTriggerActionDOM(ac_name) {
    return document.querySelector("img.ac_item[name=" + ac_name + "]");
}

function switchTriggerAction(ac_name, is_triggered=undefined){
    let ele = getTriggerActionDOM(ac_name);

    let target_status = is_triggered;
    if (typeof(is_triggered) == "undefined") {
        target_status = !isActionTriggered(ele);
    }

    if (target_status)
        ele.classList.add("ac_triggered");
    else
        ele.classList.remove("ac_triggered");
}

function getMagicValueNumDOM(name) {
    return document.querySelector("div.magic_value_num[name=" + name + "]");
}

function setMagicValue(name, value) {
    let ele = getMagicValueNumDOM(name);
    ele.innerText = String(value);
}

// --------------------------------------------
// Global init work after page is load
window.onload = function(){

}
