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

// node logic support functions

// node DOM operating functions
function svgCreateElement(tag) {
    return document.createElementNS("http://www.w3.org/2000/svg", tag);
}

function svgAssignAttrsToDOM(DOM, attrs) {
    for (const name of Object.keys(attrs)) {
        if (name == "xlink:href")
            DOM.setAttributeNS("http://www.w3.org/1999/xlink", name, attrs[name]);
        else
            DOM.setAttribute(name, attrs[name]);
    }
}

function createNodeDOM(index) {
    // Only create a Node DOM, not linked with NodeStatus
    let node_DOM = svgCreateElement("g");
    node_DOM.setAttribute("name", index);
    node_DOM.setAttribute("transform", "translate(0, 0)");

    let frame_DOM = svgCreateElement("rect");
    svgAssignAttrsToDOM(frame_DOM, {
        "class": "svg_node_frame",
        "x": "0",
        "y": "0",
        "width": "68",
        "height": "95",
        "rx": "5",
        "fill": "white",
    })
    node_DOM.append(frame_DOM);

    let ins_action_0_DOM = svgCreateElement("image");
    svgAssignAttrsToDOM(ins_action_0_DOM, {
        "name": "ins_action_0",
        "xlink:href": "resource/node_blank_ins.png",
        "x": "2",
        "y": "2",
        "width": "30",
        "height": "30",
    })
    node_DOM.append(ins_action_0_DOM);

    let ins_action_1_DOM = svgCreateElement("image");
    svgAssignAttrsToDOM(ins_action_1_DOM, {
        "name": "ins_action_1",
        "xlink:href": "resource/node_blank_ins.png",
        "x": "36",
        "y": "2",
        "width": "30",
        "height": "30",
    })
    node_DOM.append(ins_action_1_DOM);

    let gcd_action_DOM = svgCreateElement("image");
    svgAssignAttrsToDOM(gcd_action_DOM, {
        "name": "gcd_action",
        "xlink:href": "resource/node_blank_gcd.png",
        "x": "4",
        "y": "33",
        "width": "60",
        "height": "60",
    })
    node_DOM.append(gcd_action_DOM);

    return node_DOM;
}

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