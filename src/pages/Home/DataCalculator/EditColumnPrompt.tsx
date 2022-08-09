
import { useEffect, useMemo, useRef, useState } from "react";

import styled from "styled-components";

import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';

import Editor, {
  loader
} from '@monaco-editor/react';

import { style } from "mylib/util/react_util";
import { DEFAULT_CALCULATOR } from "../../../lib/search_algo";
import { ColumnDescriptionType } from "./DataCaculatorScreen";


const StyledEditColumnPromptBase = styled.div`
  background: white;
  position: relative;
`
const StyledPromptTopPanel = styled.div`

position: relative;

`;
const StyledEditorContainer = styled.div`
  width: 50vw;
  height: 70vh;
  background: white;
  position: relative;
  display: flex;
  jusify-content: center;
  align-items: center;
`

const DEFAULT_FUNC_SRC = `
/**
 * @param {WorkerArgType} arg
 * @param {Skills} arg.skills
 * @param {ParamsType} arg.params
 * 
 * don't put anything (other than comments) before function func(),
 * you can otherwise put anything after or inside func()
 */
function func({
  skills,
  params
}){
  
}
`;

/*
https://microsoft.github.io/monaco-editor/
playground.html#extending-language-services-configure-javascript-defaults

extra libraries

*/
var libSource = `

type Skills = { [skillId: number | string]: number }

type ParamsType = Partial<{
  "weapon_phy": number
  "petalaces": number
  "motion_value_phy": number
  "absorption_phy": number
  "sharpness_phy": number

  "weapon_elem": number
  "motion_value_elem": number
  "absorption_elem": number
  "sharpness_elem": number

  "powercharm": boolean
  "powertalon": boolean
  [ param: string ]: any
}>

type WorkerArgType = {
  skills?: Skills,
  params?: ParamsType;
}

`;
var libUri = 'ts:search_algo/types.d.ts';
loader.init().then(monaco => {
  monaco.languages.typescript.javascriptDefaults.addExtraLib(libSource, libUri);
  // When resolving definitions and references, the editor will try to use created models.
  // Creating a model for the library allows "peek definition/references" commands to work with the library.
  monaco.editor.createModel(libSource, 'typescript', monaco.Uri.parse(libUri));
}).catch(e => {

});


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
  const [ mounted, setMounted ] = useState(false);
  const editorRef = useRef<typeof Editor | null>(null);
  const [ value, setValue ] = useState<string>(DEFAULT_FUNC_SRC);

  useEffect(() => {
    console.log(editorRef.current);
    setMounted(true);

    return () => {
      // editorRef.current?.;
    }

  }, []);

  useEffect(() => {
    if(!mounted) return;

    let src = DEFAULT_FUNC_SRC;
    
    if(edit){
      let id = col?.stat_id;
      if(id){
        let prof = DEFAULT_CALCULATOR.getStatProfile(id);

        let name = col?.headername || prof?.name;
        if(name) setColumnName(name);

        src = prof?.worker.input_src || src
      }
    }

    setValue(src);
              
  }, [ mounted, open, edit, col ])

  return (
    <Modal
      open={!!open}
      onClose={() => onClose()}
    >
      <StyledEditColumnPromptBase>
        <StyledPromptTopPanel>
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
                      value
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
                  value || "",
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
            { edit && <Button onClick={() => {
              let id = col!.stat_id!
              DEFAULT_CALCULATOR.removeStatProfile(id);
              onClose();
            }}>Delete</Button>}
            <Button onClick={() => onClose()}>Close</Button>
          </div>
        </StyledPromptTopPanel>
        <StyledEditorContainer>
          {mounted && <Editor
            language="javascript"
            value={value}
            onChange={(_val, e) => {
              setValue(_val || "");
            }}
          />}
        </StyledEditorContainer>
      </StyledEditColumnPromptBase>
    </Modal>
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