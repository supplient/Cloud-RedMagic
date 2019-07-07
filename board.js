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

// svg concered support functions
const NS_SVG = "http://www.w3.org/2000/svg";
const NS_XLINK = "http://www.w3.org/1999/xlink";

function svgCreateElement(tag) {
    return document.createElementNS(NS_SVG, tag);
}

function svgSetAttrsOfDOM(DOM, attrs) {
    for (const name of Object.keys(attrs)) {
        if (name == "xlink:href")
            DOM.setAttributeNS(NS_XLINK, name, attrs[name]);
        else
            DOM.setAttribute(name, attrs[name]);
    }
}


// node DOM namespace(a so-called namespace, actually not)
class NodeDOM {
    constructor() {
        throw "This should never be constructed";
    }

    // node DOM operating functions
    static create(index) {
        // Only create a Node DOM, not linked with NodeStatus

        // DOM itself's creating
        let node_DOM = svgCreateElement("g");
        svgSetAttrsOfDOM(node_DOM, {
            "class": "svg_node",
            "name": index,
            "transform": "translate(0, 0)",
        })

        let frame_DOM = svgCreateElement("rect");
        svgSetAttrsOfDOM(frame_DOM, {
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
        svgSetAttrsOfDOM(ins_action_0_DOM, {
            "name": "ins_action_0",
            "xlink:href": "resource/node_blank_ins.png",
            "x": "2",
            "y": "2",
            "width": "30",
            "height": "30",
        })
        node_DOM.append(ins_action_0_DOM);

        let ins_action_1_DOM = svgCreateElement("image");
        svgSetAttrsOfDOM(ins_action_1_DOM, {
            "name": "ins_action_1",
            "xlink:href": "resource/node_blank_ins.png",
            "x": "36",
            "y": "2",
            "width": "30",
            "height": "30",
        })
        node_DOM.append(ins_action_1_DOM);

        let gcd_action_DOM = svgCreateElement("image");
        svgSetAttrsOfDOM(gcd_action_DOM, {
            "name": "gcd_action",
            "xlink:href": "resource/node_blank_gcd.png",
            "x": "4",
            "y": "33",
            "width": "60",
            "height": "60",
        })
        node_DOM.append(gcd_action_DOM);

        // regist event handlers
        node_DOM.onclick = function(e) {
            onNodeClick(index);
        }
        gcd_action_DOM.onclick = function(e) {
            onGCDClick(index);
        }
        ins_action_0_DOM.onclick = function(e) {
            onIns0Click(index);
        }
        ins_action_1_DOM.onclick = function(e) {
            onIns1Click(index);
        }

        return node_DOM;
    }

    static get(index) {
        return document.querySelector("g.svg_node[name='" + index + "']");
    }

    static moveTo(index, x, y) {
        let dom = NodeDOM.get(index);
        let trans_str = "translate(" + x + ", " + y + ")";
        svgSetAttrsOfDOM(dom, {
            "transform": trans_str,
        });
    }

    static changeImage(index, img_name, img_path) {
        let dom = NodeDOM.get(index);
        let img_dom = dom.querySelector("image[name='" + img_name + "']");
        svgSetAttrsOfDOM(img_dom, {
            "xlink:href": img_path,
        });
    }

    static setSelected(index, is_to_select) {
        let dom = NodeDOM.get(index);
        if (is_to_select) {
            dom.classList.add("svg_node_selected");
        }
        else {
            dom.classList.remove("svg_node_selected");
        }
    }
}


// node DOM event handlers
let now_node_index = null;

function onNodeClick(index) {
    if (index == now_node_index)
        return;
    if (now_node_index) {
        // remove the old select
        NodeDOM.setSelected(now_node_index, false);
    }
    // update the new select
    NodeDOM.setSelected(index, true);
    now_node_index = index;
    console.debug("node");
}

function onGCDClick(index) {
    if (index != now_node_index)
        return;
    console.debug("gcd");
}

function onIns0Click(index) {
    if (index != now_node_index)
        return;
    console.debug("ins0");
}

function onIns1Click(index) {
    if (index != now_node_index)
        return;
    console.debug("ins1");
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