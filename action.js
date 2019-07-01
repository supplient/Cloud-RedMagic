// --------------------------------------------
// Buff Macro
let BUFF_FIRE = "fire";
let BUFF_STONE = "stone";

// Buff concerned Class Defination
class Buff {
    constructor(name, icon_path) {
        this.name = name;
        this.icon_path = icon_path;
    }
}

// g_buff_map init process
function initGlobalBuffMap() {
    let buff_map = new Map([
        [BUFF_FIRE, new Buff(
            "赤火炎预备",
            "resource/buff_赤火炎.png",
        )],
        [BUFF_STONE, new Buff(
            "赤飞石预备",
            "resource/buff_赤飞石.png",
        )],
    ]);
    return buff_map;
}
let g_buff_map = initGlobalBuffMap();

// --------------------------------------------
// AC Macro
let AC_FIRE = "fire";
let AC_STONE = "stone";

// Action concerned Class Defination
class Action {
    constructor(name, icon_path) {
        this.name = name;
        this.icon_path = icon_path;
    }
}

class GCDAction extends Action{
    constructor(name, icon_path, spell_time, 
        white_change, black_change, buff_opts
        ) {
        super(name, icon_path);
        this.spell_time = spell_time;
        this.white_change = white_change;
        this.black_change = black_change;
        
        buff_opts = buff_opts || {};
        this.need_buff = buff_opts.need_buff || undefined;
        this.cause_buff = buff_opts.cause_buff || undefined;
        this.cause_rate = buff_opts.cause_rate || undefined;
        this.cause_buff_time = buff_opts.cause_buff_time || undefined;
    }
}

// g_action_map init process
function initGlobalActionMap() {
    let action_map = new Map([
        [AC_FIRE, new GCDAction(
            "赤火炎",
            "resource/60px-技能图标_赤火炎.png",
            1,
            0, 9,
            {
                need_buff: BUFF_FIRE,
            },
        )],
        [AC_STONE, new GCDAction(
            "赤飞石",
            "resource/60px-技能图标_赤飞石.png",
            1,
            9, 0,
            {
                need_buff: BUFF_STONE,
            },
        )],
    ])
    return action_map;
}
let g_action_map = initGlobalActionMap();
