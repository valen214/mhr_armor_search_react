

import React, { ReactComponentElement, ReactNode, useContext } from "react"
import styled from "styled-components";


import { ConditionalsContext, ParamsContext } from "./DataCaculatorScreen"



const StyledParametersPanel = styled.div`
  height: 300px;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const PANEL_DESCRIPTION: Array<{
  type: "number"
  text: string
  param: string
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
  },
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
      <select name="sharpness" id="sharpness"
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


export default function ParametersPanel(){
  const [ conditionals, setConditionals ] = useContext(ConditionalsContext);
  const [ params, setParams ] = useContext(ParamsContext);

  return (
    <StyledParametersPanel>
      {PANEL_DESCRIPTION.map(desp => {
        switch(desp.type){
        case "number":
          return <React.Fragment key={desp.text}>
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
        case "other":
          return <desp.component key={desp.text} />
        }
      })}
    </StyledParametersPanel>
  )
}