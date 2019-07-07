
// buff DOM operating functions
class NowStatusBuffDOM_meta {
    constructor() {}

    createBuff(buff_name, rest_time) {
        let buff_obj = g_buff_map.get(buff_name);

        let buff_time_DOM = document.createElement("span");
        buff_time_DOM.setAttribute("class", "buff_time");
        buff_time_DOM.innerText = String(rest_time);

        let buff_icon_DOM = document.createElement("img");
        buff_icon_DOM.setAttribute("class", "buff_icon");
        buff_icon_DOM.setAttribute("src", buff_obj.icon_path);

        let buff_item_DOM = document.createElement("div");
        buff_item_DOM.setAttribute("class", "buff_item");
        buff_item_DOM.setAttribute("name", buff_name);
        buff_item_DOM.append(buff_time_DOM);
        buff_item_DOM.append(buff_icon_DOM);

        return buff_item_DOM;
    }

    insertBuff(buff_item_DOM) {
        document.getElementById("buff_bar").append(buff_item_DOM);
    }

    createAndInsert(buff_name, rest_time) {
        this.insertBuff(this.createBuff(buff_name, rest_time));
    }

    getBuffItemDOM(buff_name) {
        let buff_bar = document.getElementById("buff_bar");
        return buff_bar.querySelector("div.buff_item[name=" + buff_name + "]");
    }

    remove(buff_name) {
        this.getBuffItemDOM(buff_name).remove();
    }

    changeTime(buff_name, rest_time) {
        let buff_item_DOM = this.getBuffItemDOM(buff_name);
        let buff_time_DOM = buff_item_DOM.getElementsByTagName("span").item(0);
        buff_time_DOM.innerText = String(rest_time);
    }
}

let NowStatusBuffDOM = new NowStatusBuffDOM_meta();