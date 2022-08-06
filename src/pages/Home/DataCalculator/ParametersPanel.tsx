

import React, { ChangeEvent, ReactComponentElement, ReactNode, useContext } from "react"
import styled from "styled-components";
import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';


import { ParamsContext } from "./DataCaculatorScreen"
import type { ParamsType } from "../../../lib/search_algo/types";
import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, Switch } from "@mui/material";
import { useStrings } from "../../../lang/useStrings";
import FullPageElement from "../../../lib/my_components/src/FullPageElement";

const StyledParametersPanel = styled.div`
  flex-shrink: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 50px;
`;

const PANEL_DESCRIPTION: Array<{
  type: "number"
  text: string
  param: keyof ParamsType | string
} | {
  type: "toggle",
  text: string,
  param: keyof ParamsType | string
  default?: boolean
} | {
  type: "options",
  text: string,
  param: keyof ParamsType | string,
  default: number | string
  options: Array<number | string | {
    text: string,
    value: number | string,
    default?: boolean
  }>
} | {
  type: "other",
  text: string,
  component: () => JSX.Element
}> = [
  {
    type: "number",
    text: "Weapon Phy",
    param: "weapon_phy",
  }, {
    type: "number",
    text: "Weapon Elem",
    param: "weapon_elem",
  }, {
    type: "other",
    text: "Sharpness",
    component: SharpnessSelector
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


const StyledSharpnessSelect = styled.select`

  & option:hover {
    background: white;
  }
`
const StyledSharpnessOption = styled.option<{ background: string }>`
  background-color: ${ props => props.background };

  &:hover {
    background-color: ${ props => props.background };
  }
`
const SharpnessDescription: [
  string, [number, number], string
][] = [
  [ "#d92c2c", [0.50, 0.25], "Red" ],
  [ "#d9662c", [0.75, 0.50], "Orange" ],
  [ "#d9d12c", [1.00, 0.75], "Yellow" ],
  [ "#70d92c", [1.05, 1.00], "Green" ],
  [ "#2c86d9", [1.20, 1.0625], "Blue" ],
  [ "#ffffff", [1.32, 1.15], "White" ],
  [ "#cc99ff", [1.39, 1.25], "Purple" ],
]
function SharpnessSelector(){
  const [ params, setParams ] = useContext(ParamsContext);

  return (
    <>
      <label htmlFor="sharpness">Sharpness</label>
      <select
        name="sharpness" id="sharpness"
        defaultValue={JSON.stringify(["#ffffff", ...[1.32, 1.15]])}
        onChange={(e) => {
          let [
            background, sharpness_phy, sharpness_elem
          ] = JSON.parse(e.target.value);
          
          e.target.style.background = background;
          setParams({
            ...params,
            sharpness_phy,
            sharpness_elem
          });
        }}
      >
        {SharpnessDescription.map(([
          background,
          value,
          text
        ]) => (
          <StyledSharpnessOption
            key={text}
            background={background as string}
            value={JSON.stringify([background, ...value])}
          >
            {text}
          </StyledSharpnessOption>
        ))}
      </select>
    </>
  )
}


export default function ParametersPanel({
  open
}: {
  open?: boolean
}){
  const [ params, setParams ] = useContext(ParamsContext);
  const strings = useStrings();

  return (
    <Collapse in={open} style={{
      flexShrink: 0
    }}>
      <StyledParametersPanel>
        {PANEL_DESCRIPTION.map(desp => {
          switch(desp.type){
          case "number":
            return (
              <TextField
                key={desp.text}
                variant="outlined"
                label={desp.text}
                onChange={(e) => {
                  let value = parseInt(e.target.value);
                  if(value){
                    setParams({
                      ...params,
                      [desp.param]: value
                    });
                  }
                }}
              />
            );
          case "toggle":
            return (
              <FormControlLabel
                key={desp.text}
                sx={{
                  minWidth: "120px",
                }}
                labelPlacement="start"
                control={
                  <Switch
                    checked={params[desp.param]}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      let checked = event.target.checked;
                      setParams({
                        ...params,
                        [desp.param]: checked,
                      });
                    }}
                  />
                }
                label={desp.text}
              />
            );
          case "options":
            return (
              <FormControl
                key={desp.text}
                sx={{
                  minWidth: "120px",
                }} 
              >
                <InputLabel>{desp.text}</InputLabel>
                <Select
                  label={desp.text}
                  defaultValue={params[desp.param] || desp.default}
                  value={params[desp.param]}
                  onChange={(event: SelectChangeEvent) => {
                    let value = event.target.value;
                    setParams({
                      ...params,
                      [desp.param]: value
                    })
                  }}
                >
                  {desp.options.map(v => {
                    let text, value;
                    if(typeof v === "number"
                    || typeof v === "string"){
                      text = value = v;
                    } else{
                      text = v.text;
                      value = v.value;
                    }

                    return (
                      <MenuItem
                        key={text}
                        value={value}
                      >
                        {text}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            )
          case "other":
            return <desp.component key={desp.text} />
          }
        })}
      </StyledParametersPanel>
    </Collapse>
  )
}


export function EditParametersPanel(){
  return (
    <FullPageElement>

    </FullPageElement>
  )
}
EditParametersPanel.Button = function EditParametersPanelButton(){
  return (
    <>
      <Button>Edit Parameters</Button>
    </>
  )
}