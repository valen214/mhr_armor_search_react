function crit(arg) {
    var skills = arg.skills; arg.params;
    var crit = 0;
    if (skills) {
        crit += [0, 3, 5, 7, 10, 15][skills[2]] || 0;
        crit += [0, 5, 10, 15, 20, 25, 30, 40][skills[6]] || 0;
        crit += [0, 15, 30, 50][skills[8]] || 0;
        crit += [0, 10, 20, 30, 40, 50][skills[9]] || 0;
        crit += [0, 10, 20, 30][skills[10]] || 0;
        crit += [0, 20, 25, 25][skills[117]] || 0;
        crit += [0, 20, 25, 25][skills[125]] || 0; // 攻勢 ???
    }
    return crit;
}
function status_phy(_a) {
    var skills = _a.skills, params = _a.params;
    var phy = (params === null || params === void 0 ? void 0 : params["weapon_phy"]) || 0;
    switch (skills && skills[1]) { // atk
        case 1:
            phy += 3;
            break;
        case 2:
            phy += 6;
            break;
        case 3:
            phy += 9;
            break;
        case 4:
            phy *= 1.05;
            phy += 7;
            break;
        case 5:
            phy *= 1.06;
            phy += 8;
            break;
        case 6:
            phy *= 1.08;
            phy += 9;
            break;
        case 7:
            phy *= 1.10;
            phy += 10;
            break;
    }
    phy += [0, 4, 8, 12, 16, 20][(skills === null || skills === void 0 ? void 0 : skills[2]) || 0] || 0; // agitator
    phy += [0, 5, 10, 20][(skills === null || skills === void 0 ? void 0 : skills[3]) || 0] || 0; // max performance
    phy += [0, 5, 10, 15, 20, 25][(skills === null || skills === void 0 ? void 0 : skills[4]) || 0] || 0; // resentment
    phy += [0, 5, 10, 20][(skills === null || skills === void 0 ? void 0 : skills[5]) || 0] || 0; // resuscitate
    phy += [0, 10, 15, 25][(skills === null || skills === void 0 ? void 0 : skills[106]) || 0] || 0; // counterstrike
    phy += [0, 0, 0, 0][(skills === null || skills === void 0 ? void 0 : skills[116]) || 0] || 0; // coalescence
    phy += [0, 10, 12, 15][(skills === null || skills === void 0 ? void 0 : skills[131]) || 0] || 0; // chain hit
    phy += (params === null || params === void 0 ? void 0 : params.petalaces) || 0;
    if (params === null || params === void 0 ? void 0 : params.powercharm)
        phy += 6;
    if (params === null || params === void 0 ? void 0 : params.powertalon)
        phy += 9;
    if (params === null || params === void 0 ? void 0 : params.demondrug)
        phy += params.demondrug;
    return phy;
}
function damage_number_phy(arg) {
    arg.skills; var params = arg.params;
    var phy = status_phy(arg);
    for (var _i = 0, _a = [
        "motion_value_phy",
        "sharpness_phy",
        "absorption_phy",
    ]; _i < _a.length; _i++) {
        var req_param = _a[_i];
        if (!(params === null || params === void 0 ? void 0 : params[req_param])) {
            throw new Error("damage_number_phy(): " + req_param +
                "is required but not defined");
        }
    }
    var motion_value_phy = params.motion_value_phy;
    var sharpness_phy = params.sharpness_phy;
    var absorption_phy = params.absorption_phy;
    return (phy * sharpness_phy *
        motion_value_phy / 100 *
        absorption_phy / 100);
}
function status_elem(arg) {
    arg.skills; var params = arg.params;
    var elem = (params === null || params === void 0 ? void 0 : params["weapon_elem"]) || 0;
    return elem;
}
function damage_number_elem(arg) {
    arg.skills; var params = arg.params;
    var elem = status_elem(arg);
    var motion_value_elem = params.motion_value_elem;
    var sharpness_elem = params.sharpness_elem;
    var absorption_elem = params.absorption_elem;
    return (elem * sharpness_elem *
        motion_value_elem *
        absorption_elem / 100);
}
function damage_when_crit(arg) {
    var skills = arg.skills; arg.params;
    var phy = damage_number_phy(arg);
    phy *= [1.25, 1.30, 1.35, 1.40][(skills === null || skills === void 0 ? void 0 : skills[7]) || 0];
    var elem = damage_number_elem(arg);
    elem *= [1.00, 1.05, 1.10, 1.15][(skills === null || skills === void 0 ? void 0 : skills[11]) || 0];
    return phy + elem;
}
// might add negative crit;
function expected_damage_with_crit(arg) {
    arg.skills; arg.params;
    var crit_rate = Math.min(crit(arg), 100) / 100.0;
    var when_crit = damage_when_crit(arg);
    var no_crit = damage_number_phy(arg) + damage_number_elem(arg);
    return (1 - crit_rate) * no_crit + crit_rate * when_crit;
}
var game_related = {
    status_phy: status_phy,
    damage_number_phy: damage_number_phy
};

export { crit, damage_number_elem, damage_number_phy, damage_when_crit, game_related as default, expected_damage_with_crit, status_elem, status_phy };
