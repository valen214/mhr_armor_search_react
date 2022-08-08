import { ParamsDescriptionType } from "./types";


export const DEFAULT_PARAMS_DESCRIPTIONS: ParamsDescriptionType<true>[] = [
  {
    type: "number",
    text: "Weapon Phy",
    param: "weapon_phy",
  }, {
    type: "number",
    text: "Weapon Elem",
    param: "weapon_elem",
  }, {
    type: "mul-val-options",
    text: "Sharpness",
    params: [ "sharpness_phy", "sharpness_elem" ],
    defaultIndex: 5,
    options: [{
      text: "Red",
      values: [0.50, 0.25],
      style: "background: #d92c2c;"
    }, {
      text: "Orange",
      values: [0.75, 0.50],
      style: "background: #d9662c;"
    }, {
      text: "Yellow",
      values: [1.00, 0.75],
      style: "background: #d9d12c;"
    }, {
      text: "Green",
      values: [1.05, 1.00],
      style: "background: #70d92c;"
    }, {
      text: "Blue",
      values: [1.20, 1.0625],
      style: "background: #2c86d9;"
    }, {
      text: "White",
      values: [1.32, 1.15],
      style: "background: #ffffff;"
    }, {
      text: "Purple",
      values: [1.39, 1.25],
      style: "background: #cc99ff;"
    }]
  }, {
    type: "number",
    text: "motion value (phy)",
    param: "motion_value_phy",
  }, {
    type: "number",
    text: "absorption (phy)",
    param: "absorption_phy",
  }, {
    type: "number",
    text: "motion value (elem)",
    param: "motion_value_elem",
  }, {
    type: "number",
    text: "absorption (elem)",
    param: "absorption_elem",
  }, {
    type: "options",
    text: "Demondrug",
    param: "demondrug",
    default: 0,
    options: [{
      text: "None",
      value: 0,
    }, {
      text: "Demondrug",
      value: 5,
    }, {
      text: "Mega Demondrug",
      value: 7,
    }]
  }, {
    type: "toggle",
    text: "powercharm",
    param: "powercharm",
  }, {
    type: "toggle",
    text: "powertalon",
    param: "powertalon",
  }
]
