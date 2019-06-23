function updateBoardViewBox(opts) {
    let board = document.getElementById("draw_board");
    let viewbox_str_list = board.getAttribute("view_box").split(" ");

    opts = opts || {};
    if (typeof(opts.x) != "undefined")
        viewbox_str_list[0] = String(opts.x);
    if (typeof(opts.y) != "undefined")
        viewbox_str_list[1] = String(opts.y);
    if (typeof(opts.width) != "undefined")
        viewbox_str_list[2] = String(opts.width);
    if (typeof(opts.height) != "undefined")
        viewbox_str_list[3] = String(opts.height);

    let new_viewbox_str = viewbox_str_list.join(" ");
    board.setAttribute("view_box", new_viewbox_str);
}

function updateBoardViewBoxForWindowResize() {
    let board = document.getElementById("draw_board");
    updateBoardViewBox({
        width: board.clientWidth,
        height: board.clientHeight
    })
}