
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
        this.ac_triggered_map = temp_map;
    }
}

// global init_status declaration
let init_status = new InitStatus();


// --------------------------------------------
// DOM event listeners
function onRollBtn(){
    // Update init_status
    randomInitStatus();
    refreshInitStatus();
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

function refreshInitStatus() {
    setMagicValue("white", init_status.white_value);
    setMagicValue("black", init_status.black_value);
    for (const [ac_name, is_triggered] of init_status.ac_triggered_map) {
        switchTriggerAction(ac_name, is_triggered);
    }
}

// --------------------------------------------
// Global window events
window.onload = function(){
    updateBoardViewBoxForWindowResize();
}

window.onresize = function(){
    updateBoardViewBoxForWindowResize();
}
