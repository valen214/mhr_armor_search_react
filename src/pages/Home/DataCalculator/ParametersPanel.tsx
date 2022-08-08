

import React, { ChangeEvent, CSSProperties, ReactComponentElement, ReactNode, useContext, useState } from "react"
import styled from "styled-components";
import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';


import { ParamsContext } from "./DataCaculatorScreen"
import type { ParamsType } from "../../../lib/search_algo/types";
import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, Switch } from "@mui/material";
import { useStrings } from "../../../lang/useStrings";
import FullPageElement from "mylib/src/FullPageElement";
import { style } from "mylib/src/util/react_util";
import { ParamsDescriptionType } from "./model/types";

const StyledParametersPanel = styled.div`
  flex-shrink: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 50px;
`;

const PARAMS_PANEL_DESCRIPTION: Array<ParamsDescriptionType<true>> = [
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
        {PARAMS_PANEL_DESCRIPTION.map(desp => {
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
                  value={params[desp.param] || desp.default}
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
          case "mul-val-options":
            return (
              <MultiValueOption
                key={desp.text}
                desp={desp}
                params={params}
                setParams={setParams}
              />
            );
          case "other":
            return <desp.component key={desp.text} />
          }
        })}
      </StyledParametersPanel>
    </Collapse>
  )
}


function MultiValueOption({
  desp,
  params,
  setParams
}: {
  desp: typeof PARAMS_PANEL_DESCRIPTION[number] & {
    type: "mul-val-options",
  }
  params: Partial<ParamsType>
  setParams: (params: Partial<ParamsType>) => void
}){
  let {
    text, width, params: paramNames,
    defaultIndex, options
  } = desp;

  let currentValues = paramNames.map(n => params[n]);
  let selectedValue = currentValues.every(v => !!v) ? (
    JSON.stringify(currentValues)
  ) : JSON.stringify(options[defaultIndex].values);

  const [ selectedIndex, setSelectedIndex ] = useState(-1);

  return (
    <FormControl
      key={text}
      sx={{
        minWidth: width || "120px",
        ...(s => {
          if(typeof s === "string") return style(s);
          if(typeof s === "object") return s;
          return;
        })(options[selectedIndex]?.style),
      }} 
    >
      <InputLabel>{text}</InputLabel>
      <Select
        label={text}
        value={selectedValue}
        onChange={(event: SelectChangeEvent) => {
          ((target: HTMLElement) => {
            if(!target) return;
            let v = target.getAttribute("data-index");
            if(!v) return;
            let i = parseInt(v);
            if(!i && (i !== 0)) return;
            setSelectedIndex(i)
          // @ts-ignore
          })(event.explicitOriginalTarget)

          let values = JSON.parse(event.target.value);
          let newParams = { ...params };
          for(let i = 0; i < paramNames.length; ++i){
            newParams[paramNames[i]] = values[i];
          }                    
          setParams(newParams);
        }}
      >
        {desp.options.map(({
          text, values, style: _style
        }, i) => {
          if(typeof _style === "string"){
            _style = style(_style);
          }

          return (
            <MenuItem
              key={text}
              value={JSON.stringify(values)}
              style={_style}
              data-name={i}
              data-index={i}
            >
              {text}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
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