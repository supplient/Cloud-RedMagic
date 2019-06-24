
// --------------------------------------------
// AC Macro
let AC_FIRE = "fire";
let AC_STONE = "stone";

// Action concerned Class Defination
class Action {
    constructor(icon_path) {
        this.icon_path = icon_path;
    }
}

class GCDAction extends Action{
}

// global_action_map init process
function initGlobalActionMap() {
    let action_map = new Map([
        [AC_FIRE, new GCDAction("resource/60px-技能图标_赤火炎.png")],
        [AC_STONE, new GCDAction("resource/60px-技能图标_赤飞石.png")],
    ])
    return action_map;
}
let g_action_map = initGlobalActionMap();
