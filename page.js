
// --------------------------------------------
// InitStatus concerned Class Defination
class InitStatus{
    constructor() {
        // magic value status
        this.white_value = 0;
        this.black_value = 0;

        // trigger action status
        let temp_map = new Map();
        for (const ac_name of g_action_map.keys()) {
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
    InitStatusDOM.refreshInitStatus();
}


// --------------------------------------------
// DOM operate functions

// TODO: This namespace seems not good, since now it not only works for initStatus.
class InitStatusDOM_meta {
    constructor() {}

    isActionTriggered(dom_obj) {
        return dom_obj.classList.contains("ac_triggered");
    }

    getTriggerActionDOM(ac_name) {
        return document.querySelector("img.ac_item[name=" + ac_name + "]");
    }

    switchTriggerAction(ac_name, is_triggered=undefined){
        let ele = InitStatusDOM.getTriggerActionDOM(ac_name);

        let target_status = is_triggered;
        if (typeof(is_triggered) == "undefined") {
            target_status = !InitStatusDOM.isActionTriggered(ele);
        }

        if (target_status)
            ele.classList.add("ac_triggered");
        else
            ele.classList.remove("ac_triggered");
    }

    getMagicValueNumDOM(box_name, magic_name) {
        let box = document.querySelector("div.magic_value_box[name=" + box_name + "]");
        return box.querySelector("div.magic_value_num[name=" + magic_name + "]");
    }

    setMagicValue(box_name, magic_name, value) {
        let ele = InitStatusDOM.getMagicValueNumDOM(box_name, magic_name);
        ele.innerText = String(value);
    }

    refresh() {
        InitStatusDOM.setMagicValue("init", "white", init_status.white_value);
        InitStatusDOM.setMagicValue("init", "black", init_status.black_value);
        for (const [ac_name, is_triggered] of init_status.ac_triggered_map) {
            InitStatusDOM.switchTriggerAction(ac_name, is_triggered);
        }
    }
}
let InitStatusDOM = new InitStatusDOM_meta();


// --------------------------------------------
// Global window events
document.onkeydown = function(event) {
    // Block default behaviors for such as TAB, SPACE...
    event.preventDefault();
}

document.onkeyup = function(event) {
    if (event.key == "Tab") {
        if (now_node_index) // if no now_node, we do nothing.
            GoToSucceedNode(event.shiftKey);
        event.preventDefault();
    }
}

window.onload = function(){
    // regist elements' event listeners
    document.getElementById("draw_board").onmousedown = SVG_onMouseDown;
    document.getElementById("draw_board").onmousemove = SVG_onMouseMove;
    document.getElementById("draw_board").onmouseup   = SVG_onMouseUp;

    updateBoardViewBoxForWindowResize();

    // DEBUG:
    NowStatusBuffDOM.createAndInsert("stone", 22);
    InitStatusDOM.setMagicValue("now", "white", 28);
    InitStatusDOM.setMagicValue("now", "black", 88);

    // let ele = document.querySelector("g[name='0_0']");
    // console.debug(ele);
    document.getElementById("draw_board").appendChild(NodeDOM.create("3_3"));
    // document.getElementById("draw_board").appendChild(NodeDOM.create("3_4"));
    // NodeDOM.moveTo("3_4", 0, 100);
}

window.onresize = function(){
    updateBoardViewBoxForWindowResize();
}
