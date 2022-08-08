

import React, { ChangeEvent, CSSProperties, ReactComponentElement, ReactElement, ReactNode, useContext, useEffect, useRef, useState } from "react"
import styled from "styled-components";
import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';

import Modal from '@mui/material/Modal';
// '@mui/base/ModalUnstyled';

import { ParamsContext } from "./DataCaculatorScreen"
import type { ParamsType } from "../../../lib/search_algo/types";
import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, Switch } from "@mui/material";
import { useStrings } from "../../../lang/useStrings";
import { style } from "mylib/util/react_util";
import { ParamsDescriptionType } from "./model/types";
import useOrderedParamsDescriptions from "./hooks/useOrderedParamsDescriptions";
import myMHRCalculator from "./model/App";

const StyledParametersPanel = styled.div`
  flex-shrink: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 50px;
`;
const StyledEditHoverBackdrop = styled.div<{
  top: number
  height: number
}>`

  background: rgba(0, 0, 0, 0.3);
  pointer-events: all;
  position: absolute;
  top: ${props => props.top}px;
  left: 0;
  height: ${props => props.height}px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  & span {
    background: black;
    padding: 12px;
    font-size: 35px;
    font-weight: 1000;
    color: white;
  }
`

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

export default function ParametersPanel({
  open
}: {
  open?: boolean
}){
  const [ params, setParams ] = useContext(ParamsContext);
  const strings = useStrings();
  /*
  using a more complex structure could make the caching works,
  but might as well split each cases into their own components
  */
  const { descs, setDescs } = useOrderedParamsDescriptions();

  const panelRef = useRef<HTMLDivElement | null>(null);
  const [ selecting, setSelecting ] = useState(false);
  const [ selected, setSelected ] = useState<string | null>(null);
  const [ add, setAdd ] = useState(false);
  useEffect(() => {
    setSelecting(false);
    // setAdd(false);
  }, [ selected ])

  const [ panelRect, setPanelRect ] = useState<number[]>([]);
  useEffect(() => {
    let rect = panelRef.current!.getBoundingClientRect();


    setPanelRect([
      rect.top,
      rect.right,
      rect.bottom,
      rect.left,
    ]);
  }, [ selecting ])

  return (
    <Collapse in={open} style={{
      flexShrink: 0
    }}>
      <StyledParametersPanel ref={panelRef}>
        <Modal
          open={selecting}
          onClose={() => setSelecting(false)}
          hideBackdrop
          sx={{
            "pointerEvents": "none",
            "background": "rgba(0, 0, 0, 0)",
          }}
        >
          <>
            <StyledEditHoverBackdrop
              top={0}
              height={panelRect[0] || 0}
              onClick={() => setSelecting(false)}
            >
              <span>Click dark area to close</span>
            </StyledEditHoverBackdrop>
            <StyledEditHoverBackdrop
                top={panelRect[2] || 0}
                height={document.body.clientHeight - (panelRect[2] || 0)}
              onClick={() => setSelecting(false)}
            >
              <span>Click dark area to close</span>
            </StyledEditHoverBackdrop>
          </>
        </Modal>
        <EditParameterPromptButton
          selecting={selecting}
          setSelecting={setSelecting}
        />
        {descs.map(id => {
          let desp = myMHRCalculator.params_desc.get(id);
          if(!desp) return;
          
          let key = JSON.stringify(desp);

          switch(desp.type){
          case "number":
            return (
              <OnEditHoverIndicatorWrapper
                key={key}
                id={id}
                selecting={selecting}
                setSelected={setSelected}
              >
                <TextField
                  variant="outlined"
                  label={desp.text}
                  onChange={(e) => {
                    let value = parseInt(e.target.value);
                    if(value){
                      setParams({
                        ...params,
                        // @ts-ignore
                        [desp.param]: value
                      });
                    }
                  }}
                />
              </OnEditHoverIndicatorWrapper>
            );
          case "toggle":
            return (
              <OnEditHoverIndicatorWrapper
                key={key}
                id={id}
                selecting={selecting}
                setSelected={setSelected}
              >
                <FormControlLabel
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
                          // @ts-ignore
                          [desp.param]: checked,
                        });
                      }}
                    />
                  }
                  label={desp.text}
                />
              </OnEditHoverIndicatorWrapper>
            );
          case "options":
            return (
              <OnEditHoverIndicatorWrapper
                key={key}
                id={id}
                selecting={selecting}
                setSelected={setSelected}
              >
                <FormControl
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
                        // @ts-ignore
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
                
              </OnEditHoverIndicatorWrapper>
            )
          case "mul-val-options":
            return (
              <OnEditHoverIndicatorWrapper
                key={key}
                id={id}
                selecting={selecting}
                setSelected={setSelected}
              >
                <MultiValueOption
                  desp={desp}
                  params={params}
                  setParams={setParams}
                />
              </OnEditHoverIndicatorWrapper>
            );
          case "other":
            return <desp.component key={desp.text} />
          }
        })}
      </StyledParametersPanel>
    </Collapse>
  )
}

function EditParameterPrompt({
  params,
  setParams,
  selected, setSelected,
  add, setAdd,
}: {
  params: Partial<ParamsType>
  setParams: (params: Partial<ParamsType>) => void

  selected?: string
  setSelected?: (id: string) => void

  add?: boolean
  setAdd?: (add: boolean) => void
}){

  return (
    <Modal open={false}>
      <div></div>
    </Modal>
  )
}
/*
There are two approaches:
1) get a click map on prompt open (probably do it on columns)
- cons: couldn't update on resize

2) wrap parameters in another element
-
*/
function EditParameterPromptButton({
  selecting,
  setSelecting
}: {
  selecting: boolean
  setSelecting: (selecting: boolean) => void
}){
  return (
    <Button
      sx={{
        paddingLeft: "35px",
        paddingRight: "35px",
      }}
      onClick={() => {
        setSelecting(!selecting)
      }}
    >
      { selecting ? "Cancel" : "Select & Edit Parameter" }
    </Button>
  )
}

const StyledOnEditHoverIndicatorWrapper = styled.div<{
  selecting?: boolean
}>`
  ${props => props.selecting ? (`
      &:hover {
        background: rgba(128, 255, 128, 0.3);
        cursor: pointer;

        & * {
          pointer-events: none;
        }
      }
    `) : ""
  }
`
function OnEditHoverIndicatorWrapper({
  id,
  selecting,
  setSelected,
  children,
}: {
  id: string
  selecting: boolean
  setSelected: (id: string) => void

  children: ReactElement
}){
  return (
    <StyledOnEditHoverIndicatorWrapper
      selecting={selecting}

      onClick={() => {
        setSelected(id);
      }}
    >
      {children}
    </StyledOnEditHoverIndicatorWrapper>
  )

  // return React.cloneElement(
  //   React.Children.only(children), {
  //     ref: childRef
  //   }
  // )
}


function MultiValueOption({
  desp,
  params,
  setParams
}: {
  desp: ParamsDescriptionType & {
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
    <Modal open={false} >
      <div></div>
    </Modal>
  )
}
EditParametersPanel.Button = function EditParametersPanelButton(){
  return (
    <>
      <Button>Edit Parameters</Button>
    </>
  )
}