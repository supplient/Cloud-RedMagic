// These code now not being used
// ***  // work buff class defination
// ***  class WorkBuff {
// ***      constructor(buff_obj, rest_time) {
// ***          this.buff_obj = buff_obj;
// ***          this.rest_time = rest_time;
// ***      }
// ***  }

// ***  // node concerned class defination
// ***  class NodeStatus {
// ***      constructor(prev, 
// ***          white_magic, black_magic, work_buff_list
// ***          ) {
// ***          this.prev = prev;
// ***          this.white_magic = white_magic;
// ***          this.black_magic = black_magic;
// ***          this.work_buff_list = work_buff_list;

// ***          this.gcd_action = null;
// ***          this.ins_action_0 = null;
// ***          this.ins_action_1 = null;
// ***      }
// ***  }

// ***  // g_node_status_map declaration
// ***  // id => object
// ***  // e.g. "0_2" => object
// ***  //      means the 1st gcd's 3rd branch's node status.
// ***  let g_node_status_map = new Map();

// ***  // node logic support functions





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

function svgGetAttrOfDOM(DOM, name) {
    if (name == "xlink:href")
        return DOM.getAttributeNS(NS_XLINK, name);
    else
        return DOM.getAttribute(name);
}


// node DOM namespace(a so-called namespace, actually not)
class NodeDOM_meta {
    constructor() {}

    // node DOM operating functions
    create(index) {
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

    get(index) {
        return document.querySelector("g.svg_node[name='" + index + "']");
    }

    getX(index) {
        let dom = NodeDOM.get(index);
        let trans_str = svgGetAttrOfDOM(dom, "transform");
        trans_str = trans_str.substring(10, trans_str.length-1);
        let coord = trans_str.split(",");
        return parseInt(coord[0]);
    }

    getY(index) {
        let dom = NodeDOM.get(index);
        let trans_str = svgGetAttrOfDOM(dom, "transform");
        trans_str = trans_str.substring(10, trans_str.length-1);
        let coord = trans_str.split(",");
        return parseInt(coord[1]);
    }

    moveTo(index, x, y) {
        let dom = NodeDOM.get(index);
        let trans_str = "translate(" + x + ", " + y + ")";
        svgSetAttrsOfDOM(dom, {
            "transform": trans_str,
        });
    }

    changeImage(index, img_name, img_path) {
        let dom = NodeDOM.get(index);
        let img_dom = dom.querySelector("image[name='" + img_name + "']");
        svgSetAttrsOfDOM(img_dom, {
            "xlink:href": img_path,
        });
    }

    setSelected(index, is_to_select) {
        let dom = NodeDOM.get(index);
        if (is_to_select) {
            dom.classList.add("svg_node_selected");
        }
        else {
            dom.classList.remove("svg_node_selected");
        }
    }
}
let NodeDOM = new NodeDOM_meta();

// node DOM event handlers
let now_node_index = null;

function onNodeClick(index) {
    updateNowNode(index);
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

// g_node_status_map declaration
// id => object
// e.g. "1_2" => object
//      means the 2nd gcd's 3rd branch's node status.
let g_node_map = new Map();

// node class defination
// Note: we cannot call it 'Node' because of the name conflict
class GCDNode {
    constructor(parent, index) {
        // init status
        this.parent = parent;
        this.index = index;
        
        this.children = [];
        this.tree_width = 1; // count in node num

        // create DOM itself first
        let node_DOM = NodeDOM.create(index);
        document.getElementById("draw_board").appendChild(node_DOM);

        // update g_node_map
        g_node_map.set(index, this);
    }

    getGCDNO() {
        let split_index = this.index.split("_");
        return parseInt(split_index[0]);
    }

    getBranchNO() {
        let split_index = this.index.split("_");
        return parseInt(split_index[1]);
    }

    updateTreeWidth() {
        let new_width = 0;
        for(const child of this.children) {
            new_width += child.tree_width;
        }

        if(new_width <= 1) {
            if(this.tree_width != 1) {
                this.tree_width = 1;
                if(this.parent)
                    this.parent.updateTreeWidth();
            }
        }
        else if(new_width != this.tree_width){
            this.tree_width = new_width;
            // Recursive upwards
            if(this.parent)
                this.parent.updateTreeWidth();
        }
    }

    createChild() {
        // Determine child's index
        let child_gcd_no = this.getGCDNO() + 1;
        let child_branch_no = 0;

        let child_index = child_gcd_no + "_" + child_branch_no;
        while(g_node_map.get(child_index)) {
            child_branch_no++;
            child_index = child_gcd_no + "_" + child_branch_no;
        }

        // Create child Node & Update this's children
        let child_node = new GCDNode(this, child_index);
        this.children.push(child_node);

        // Update tree width
        this.updateTreeWidth();

        // Rearrange the tree
        rearrangeTree(getRootNode());
    }
}

// node high logic functions
function createRootNode() {
    // create root node according to the init_status
    // TODO: here we have not fill init_status
    const root_index = "0_0";

    let root_node = new GCDNode(null, root_index);
}

function getRootNode() {
    const root_index = "0_0";
    return g_node_map.get(root_index);
}

function GoToSucceedNode(is_reverse) {
    let now_node = g_node_map.get(now_node_index);
    if (!now_node){
        console.error("now_node is null when GoToSucceedNode");
        return;
    }

    if (now_node.children.length == 0) {
        // has no children, so we create a child first
        now_node.createChild();

        if (now_node.children.length == 0) {
            console.error("create children with no result.");
            return;
        }
    }

    let child = null;
    if (is_reverse)
        child = now_node.children[now_node.children.length - 1];
    else
        child = now_node.children[0];
    updateNowNode(child.index);

    console.debug("node tab");
}

function updateNowNode(new_index) {
    if (new_index == now_node_index)
        return;
    if (now_node_index) {
        // remove the old select
        NodeDOM.setSelected(now_node_index, false);
    }
    // update the new select
    NodeDOM.setSelected(new_index, true);
    now_node_index = new_index;
}

const NODE_WIDTH = 68;
const NODE_HEIGHT = 95;
const NODE_X_MARGIN = 20;
const NODE_Y_MARGIN = 10;
function rearrangeTree(root) {
    let init_x = NodeDOM.getX(root.index);
    let init_y = NodeDOM.getY(root.index);

    let x = init_x + NODE_WIDTH + NODE_X_MARGIN;
    let per_y = NODE_HEIGHT + NODE_Y_MARGIN;
    let total_y = per_y * root.tree_width - NODE_Y_MARGIN;
    let y = init_y - total_y/2;

    for(const child of root.children) {
        let total_child_y = per_y * child.tree_width - NODE_Y_MARGIN;
        let child_y = y + total_child_y/2;
        NodeDOM.moveTo(child.index, x, child_y);

        y = y + total_child_y + NODE_Y_MARGIN;
    }

    for(const child of root.children) {
        rearrangeTree(child);
    }
}



// ----------------------------------------------------------------------------

// SVG view event handlers
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