
import { useRef, useState } from "react";

import styled from "styled-components";

import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';

import FullPageElement from "../../../lib/my_components/src/FullPageElement";
import { style } from "../../../lib/my_components/src/util/react_util";
import { DEFAULT_CALCULATOR } from "../../../lib/search_algo";


const StyledAddColumnPromptBase = styled.div`
  background: white;
`
const StyledTextarea = styled.textarea`
  width: 50vw;
  height: 50vh;
  background: white;
`


export default function AddColumnPrompt({
  open,
  onClose,
}: {
  open?: boolean
  onClose: Function
}){
  const [ columnName, setColumnName ] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <FullPageElement
      open={open}
      onClose={onClose}
    >
      <StyledAddColumnPromptBase>
        <div>
          <TextField
            variant="outlined"
            label="Column Name"
            value={columnName}
            onChange={e => {
              setColumnName(e.target.value);
            }}
          />
          <Button onClick={() => {
            try{
              DEFAULT_CALCULATOR.addStatProfile(
                textAreaRef.current?.value || "",
                columnName
              );
              onClose();
            } catch(e){
              console.error(e);
            }
          }}>Import</Button>
          <div style={{
            float: "right"
          }}>
            <Button onClick={() => onClose()}>Close</Button>
          </div>
        </div>
        <StyledTextarea
          ref={textAreaRef}
          defaultValue={
`
function func({
  skills,
  params
}){

}
`
          }
        />
      </StyledAddColumnPromptBase>
    </FullPageElement>
  )
}


AddColumnPrompt.Button = function AddColumnPromptButton(){
  const [
    openAddColumnPrompt, setOpenAddColumnPrompt
  ] = useState(false);

  return (
    <>
      <AddColumnPrompt
        open={openAddColumnPrompt}
        onClose={() => {
          setOpenAddColumnPrompt(false);
        }}
      />
      <Button onClick={() => {
        setOpenAddColumnPrompt(true);
      }}>Add Column</Button>
    </>
  )
}