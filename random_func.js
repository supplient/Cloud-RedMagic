
// --------------------------------------------
// Random concerned Function supporters
function getRandomMagicValue() {
    let value = Math.round(Math.random() * 101);
    while (value > 100) {
        value = Math.round(Math.random() * 101);
    }
    return value;
}

function getRandomTrueFalse() {
    let value = Math.round(Math.random() * 10);
    if (value % 2)
        return true;
    else
        return false;
}

function randomInitStatus() {
    // Assign new random values to init_status
    init_status.white_value = getRandomMagicValue();
    init_status.black_value = getRandomMagicValue();

    for (const ac_name of init_status.ac_triggered_map.keys()) {
        let is_triggered = getRandomTrueFalse();
        init_status.ac_triggered_map.set(ac_name, is_triggered);
    }
}