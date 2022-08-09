import {
  ReactNode, useRef, useState
} from "react";

import styled from "styled-components";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Pagination from "@mui/material/Pagination";
import myMHRCalculator from "../../model/App";
import { ParamsDescriptionType } from "../../model/types";



const StyledEditParameterPromptTab = styled.div`
  height: 100%;
  width: 100%;
`
export function EditParameterPromptTab({
  value, index, ...props
}: {
  value: number
  index: number

  selected?: string
  setSelected?: (id: string) => void

  add?: boolean
  setAdd?: (add: boolean) => void
}){

  return (
    <StyledEditParameterPromptTab
      hidden={value !== index}
    >
      {value === index && (
        index === 0 ? (
          <EditParameterPromptTab_Number
            { ...props }
          />
        ) : index === 1 ? (
          <EditParameterPromptTab_Toggle { ...props } />
        ) : index === 2 ? (
          <EditParameterPromptTab_Options { ...props } />
        ) : index === 3 ? (
          <EditParameterPromptTab_MultiOptions { ...props } />
        ) : (
          <div> error </div>
        )
      )}
    </StyledEditParameterPromptTab>
  );
}


const StyledEditParameterPromptTabBottomBar = styled.div`
  align-self: flex-end;
  width: 100%;
  margin-top: auto;
  flex: 0 0 fit-content;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  padding: 10px;


  & button {
    padding: 8px 15px;
    border: 1px solid rgba(0, 0, 0, 0.05);
  }
`
function EditParameterPromptTabBottomBar({
  onConfirm, setSelected, setAdd,
}: {
  onConfirm: () => void

  setSelected?: (id: string) => void

  setAdd?: (add: boolean) => void
}){
  return (
    <StyledEditParameterPromptTabBottomBar>
      <Button onClick={() => {
        setSelected?.("");
        setAdd?.(false);
      }}>
        Cancel
      </Button>
      <Button
      sx={{ float: "right" }}
      onClick={() => {
        onConfirm();
        setSelected?.("");
        setAdd?.(false);
      }}>
        Confirm
      </Button>
    </StyledEditParameterPromptTabBottomBar>
  )
}

const StyledEditParameterPromptTab_Number = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  & ${StyledEditParameterPromptTabBottomBar} {

  }
`
export function EditParameterPromptTab_Number({
  selected, setSelected, add, setAdd,
}: {
  selected?: string
  setSelected?: (id: string) => void

  add?: boolean
  setAdd?: (add: boolean) => void
}){
  return (
    <StyledEditParameterPromptTab_Number>
      <TextField
        label="Name"
        variant="outlined" 
      />
      <TextField
        label="Parameter"
        variant="outlined" 
      />
      <TextField
        label="Default Value"
        variant="outlined" 
      />
      <EditParameterPromptTabBottomBar
        onConfirm={() => {

        }}
        setSelected={setSelected}
        setAdd={setAdd}
      />
    </StyledEditParameterPromptTab_Number>
  )
}



const StyledEditParameterPromptTab_Toggle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
export function EditParameterPromptTab_Toggle({
  selected, setSelected, add, setAdd,
}: {
  selected?: string
  setSelected?: (id: string) => void

  add?: boolean
  setAdd?: (add: boolean) => void
}){
  return (
    <StyledEditParameterPromptTab_Toggle>
      <TextField
        label="Name"
        variant="outlined" 
      />
      <TextField
        label="Parameter"
        variant="outlined" 
      />
      <TextField
        label="OFF Value"
        variant="outlined"
        disabled
      />
      <TextField
        label="ON Value"
        variant="outlined" 
        disabled
      />
      <EditParameterPromptTabBottomBar
        onConfirm={() => {

        }}
        setSelected={setSelected}
        setAdd={setAdd}
      />
    </StyledEditParameterPromptTab_Toggle>
  )
}


const StyledEditParameterPromptTab_Options = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
export function EditParameterPromptTab_Options({
  selected, setSelected, add, setAdd,
}: {
  selected?: string
  setSelected?: (id: string) => void

  add?: boolean
  setAdd?: (add: boolean) => void
}){
  return (
    <StyledEditParameterPromptTab_Options>
      <TextField
        label="Name"
        variant="outlined" 
      />
      <TextField
        label="Parameter"
        variant="outlined" 
      />
      <TextField
        label="OFF Value"
        variant="outlined"
        disabled
      />
      <TextField
        label="ON Value"
        variant="outlined" 
        disabled
      />
      <EditParameterPromptTabBottomBar
        onConfirm={() => {

        }}
        setSelected={setSelected}
        setAdd={setAdd}
      />
    </StyledEditParameterPromptTab_Options>
  )
}



const StyledEditParameterPromptTab_MultiOptions = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  & .option-container {
    flex: 1 1 auto;
    min-height: 0;
  }

  & div.sep {
    height: 3px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
`
export function EditParameterPromptTab_MultiOptions({
  selected, setSelected, add, setAdd,
}: {
  selected?: string
  setSelected?: (id: string) => void

  add?: boolean
  setAdd?: (add: boolean) => void
}){
  const [ desc ] = useState(() => {
    if(selected){
      let desc = myMHRCalculator.params_desc.get(selected)
      if(!desc){
        console.error("selected parameter description doesn't exist");
        return null;
      }

      if(desc.type !== "mul-val-options"){
        console.error("selected parameter description is not multivalued");
        return null;
      }

      return desc
    }

    return null;
  })

  const [ params, setParams ] = useState<Array<string | number>>(() => {
    return desc ? [ ...desc.params ] : [];
  })
  const [ optionNames, setOptionNames ] = useState<string[]>(() => {
    if(desc){
      return desc.options.map(obj => obj.text);
    }
    return [ "New Option 1" ]
  })
  const [ values, setValues ] = useState<(number | string)[][]>(() => {
    if(desc){
      return desc.options.map(obj => obj.values.slice());
    }
    return [ Array(params.length).fill(0) ]
  });

  const [ page, setPage ] = useState(() => {
    let page = 1;
    if(desc){
      page = [
        "number", "toggle", "options", "mul-val-options"
      ].indexOf(desc.type) + 1;
    }
    return page >= 1 ? page : 1;
  });

  const [ name, setName ] = useState(() => desc ? desc.text : "New Parameter");

  return (
    <StyledEditParameterPromptTab_MultiOptions>
      <TextField
        label="Name of the Parameter (won't show in code)"
        variant="outlined"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <div className="sep" />
      <TextField
        label="Name of the Option (won't show in code)"
        variant="outlined"
        value={optionNames[page-1]}
        onChange={(e) => {
          let newNames = optionNames.slice();
          newNames[page-1] = e.target.value;
          setOptionNames(newNames);
        }}
      />
      <div className="option-container">
        { params.map((param, i) => {
          if(!values[page-1]){
            values.push([]);
          }


          if(values[page-1].length <= i){
            values[page-1].push(0)
          }
          return (
            <div key={i}>
              <TextField
                value={param}
                onChange={(e) => {
                  let newParams = params.slice();
                  newParams[i] = e.target.value;
                  setParams(newParams);
                }}
              />
              <TextField
                value={values[page-1][i]}
                onChange={(e) => {
                  let newValues = values.slice();
                  values[page-1][i] = e.target.value;
                  setValues(newValues);
                }}
              />
            </div>
          )
        })}
        <div>
          <Button
          onClick={() => {
            setParams(params.slice(0, -1));
          }}>
            Delete Last Parameter
          </Button>
          <Button
            sx={{
              float: "right"
            }}
            onClick={() => {
              setParams([ ...params, "" ])
            }}
          >
            Add Parameter
          </Button>
        </div>
      </div>
      <div className="option-bottom-bar">
        <Pagination
          count={values.length}
          onChange={(event, _page) => {
            console.log("page:", _page);
            setPage(_page);
          }}
          page={page}
        />
        <Button onClick={() => {
          if(values.length === 1) return;
          if(page === values.length){
            setPage(page-1);
          }
          setOptionNames(optionNames.filter((v, i) => i !== page-1))
          setValues(values.filter((v, i) => i !== page-1))
        }}>
          Delete Current Option
        </Button>
        <Button onClick={() => {
          setPage(optionNames.length+1);
          setOptionNames([
            ...optionNames,
            "New Option " + optionNames.length
          ])
          setValues([ ...values, [] ])
        }}>
          Add Option
        </Button>
      </div>
      <EditParameterPromptTabBottomBar
        onConfirm={() => {
          let options: (ParamsDescriptionType<true> & {
            type: "mul-val-options"
          })["options"] = [];
          console.assert(optionNames.length === values.length);
          for(let i = 0; i < optionNames.length; ++i){
            options.push({
              text: optionNames[i],
              values: values[i],
            })
          }

          let obj: ParamsDescriptionType<true> = {
            "type": "mul-val-options",
            "text": name,
            "params": params,
            "defaultIndex": 0,
            "options": options
          }

          if(desc){
            myMHRCalculator.params_desc.set({
              ...desc,
              ...obj
            })

          } else{
            myMHRCalculator.params_desc.add(obj)
          }
        }}
        setSelected={setSelected}
        setAdd={setAdd}
      />
    </StyledEditParameterPromptTab_MultiOptions>
  )
}