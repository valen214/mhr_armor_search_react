
import { useEffect, useMemo, useRef, useState } from "react";

import styled from "styled-components";

import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';

import FullPageElement from "../../../lib/my_components/src/FullPageElement";
import { style } from "../../../lib/my_components/src/util/react_util";
import { DEFAULT_CALCULATOR } from "../../../lib/search_algo";
import { ColumnDescriptionType } from "./DataCaculatorScreen";


const StyledEditColumnPromptBase = styled.div`
  background: white;
`
const StyledTextarea = styled.textarea`
  width: 50vw;
  height: 50vh;
  background: white;
`


export default function EditColumnPrompt({
  open,
  onClose,
  col,
  edit = false,
}: {
  open?: boolean
  onClose: Function

  col?: ColumnDescriptionType
  edit?: boolean
  onEditDone?: () => void
}){
  const [ columnName, setColumnName ] = useState(edit && col?.headername || "");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if(!textAreaRef.current) return;
    
    console.log("NOT UPDAINTG",
      col?.stat_id &&
      DEFAULT_CALCULATOR.getStatProfile(col.stat_id)?.worker.input_src
    );

    if(edit){
      let id = col?.stat_id;
      if(id){
        let prof = DEFAULT_CALCULATOR.getStatProfile(id);

        let name = col?.headername || prof?.name;
        if(name) setColumnName(name);

        let src = prof?.worker.input_src

        if(src){
          textAreaRef.current.value = src;
          return;
        }
      }
    }

    textAreaRef.current.value = (
`
function func({
  skills,
  params
}){
  
}
`
    );
              
  }, [ open, edit, col ])

  return (
    <FullPageElement
      open={open}
      onClose={onClose}
    >
      <StyledEditColumnPromptBase>
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
              if(edit && col){
                let id = col.stat_id;
                if(id){
                  let prof = DEFAULT_CALCULATOR.getStatProfile(id);
                  if(prof){
                    let success = prof.worker.resetWorker(
                      textAreaRef.current?.value
                    );
                    if(success){
                      col.headername = prof.name = columnName;
                      DEFAULT_CALCULATOR.emit("stat profiles change");
                      onClose();
                      return;
                    }
                  }
                }

                console.error("error in editing column");
              } else{
                DEFAULT_CALCULATOR.addStatProfile(
                  textAreaRef.current?.value || "",
                  columnName
                );
              }
              onClose();
            } catch(e){
              console.error(e);
            }
          }}>{ edit ? "Finish Edit" : "Add" } Column</Button>
          <div style={{
            float: "right"
          }}>
            <Button onClick={() => onClose()}>Close</Button>
          </div>
        </div>
        <StyledTextarea
          ref={textAreaRef}
        />
      </StyledEditColumnPromptBase>
    </FullPageElement>
  )
}


EditColumnPrompt.Button = function EditColumnPromptButton(){
  const [
    openEditColumnPrompt, setOpenEditColumnPrompt
  ] = useState(false);

  return (
    <>
      <EditColumnPrompt
        open={openEditColumnPrompt}
        onClose={() => {
          setOpenEditColumnPrompt(false);
        }}
      />
      <Button onClick={() => {
        setOpenEditColumnPrompt(true);
      }}>Add Column</Button>
    </>
  )
}