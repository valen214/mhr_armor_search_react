

import React, { ReactComponentElement, ReactNode, useContext } from "react"
import styled from "styled-components";
import Collapse from '@mui/material/Collapse';


import { ParamsContext } from "./DataCaculatorScreen"
import type { ParamsType } from "../../../lib/search_algo/types";


const StyledParametersPanel = styled.div`
  height: 300px;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const PANEL_DESCRIPTION: Array<{
  type: "number"
  text: string
  param: keyof ParamsType | string
} | {
  type: "toggle",
  text: string,
  param: keyof ParamsType | string
} | {
  type: "options",
  text: string,
  param: keyof ParamsType | string,
  options: Array<number | string>
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
    type: "toggle",
    text: "powercharm",
    param: "powercharm",
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

  return (
    <Collapse in={open}>
      <StyledParametersPanel>
        {PANEL_DESCRIPTION.map(desp => {
          switch(desp.type){
          case "number":
            return (
              <span style={{
                padding: "10px 15px",
                whiteSpace: "nowrap",
              }} key={desp.text}>
                <React.Fragment>
                  { desp.text }
                  <input type="number"
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
                </React.Fragment>
              </span>
            );
          case "other":
            return <desp.component key={desp.text} />
          }
        })}
      </StyledParametersPanel>
    </Collapse>
  )
}