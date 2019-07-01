// work buff class defination
class WorkBuff {
    constructor(buff_obj, rest_time) {
        this.buff_obj = buff_obj;
        this.rest_time = rest_time;
    }
}

// node concerned class defination
class NodeStatus {
    constructor(prev, 
        white_magic, black_magic, work_buff_list
        ) {
        this.prev = prev;
        this.white_magic = white_magic;
        this.black_magic = black_magic;
        this.work_buff_list = work_buff_list;

        this.gcd_action = null;
        this.ins_action_0 = null;
        this.ins_action_1 = null;
    }
}

// g_node_status_map declaration
// id => object
// e.g. "0_2" => object
//      means the 1st gcd's 3rd branch's node status.
let g_node_status_map = new Map();


// view drag functions
let drag_switch = false;
let drag_viewbox_offset = {x: 0, y: 0};
function SVG_onMouseDown(event) {
    drag_switch = true;
}

function SVG_onMouseMove(event) {
    if (drag_switch) {
        drag_viewbox_offset.x = -event.movementX;
        drag_viewbox_offset.y = -event.movementY;
        updateBoardViewBoxForDrag();
    }
}

function SVG_onMouseUp(event) {
    drag_switch = false;
}

// SVG element itself's control functions
function updateBoardViewBox(opts) {
    let board = document.getElementById("draw_board");
    let viewbox_str_list = board.getAttribute("viewBox").split(" ");

    opts = opts || {};
    if (typeof(opts.x) != "undefined")
        viewbox_str_list[0] = String(opts.x);
    if (typeof(opts.y) != "undefined")
        viewbox_str_list[1] = String(opts.y);
    if (typeof(opts.width) != "undefined")
        viewbox_str_list[2] = String(opts.width);
    if (typeof(opts.height) != "undefined")
        viewbox_str_list[3] = String(opts.height);

    viewbox_str_list[0] = String(parseInt(viewbox_str_list[0]) + drag_viewbox_offset.x);
    viewbox_str_list[1] = String(parseInt(viewbox_str_list[1]) + drag_viewbox_offset.y);

    let new_viewbox_str = viewbox_str_list.join(" ");
    board.setAttribute("viewBox", new_viewbox_str);
}

function updateBoardViewBoxForWindowResize() {
    let board = document.getElementById("draw_board");
    updateBoardViewBox({
        width: board.clientWidth,
        height: board.clientHeight
    })
}

function updateBoardViewBoxForDrag() {
    updateBoardViewBox();
}