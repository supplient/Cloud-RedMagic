
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
        [AC_FIRE, new TriggerAction("resource/60px-技能图标_赤火炎.png")],
        [AC_STONE, new TriggerAction("resource/60px-技能图标_赤飞石.png")],
    ])
    return action_map;
}
let trigger_action_map = initTriggerActionMap();