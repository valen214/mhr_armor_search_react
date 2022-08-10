
import React, { useState } from "react";

import styled from "styled-components";


import { Button, Modal, TextField } from "@mui/material"

import { Skills } from "lib/search_algo"
import strings from "lang";


const StyledImportSkillsPromptBase = styled.div`
  background: white;
  height: 70vh;
  width: 70vw;
  margin-top: 40%;
  margin-left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;

  & input {
    width: 100%;
  }
`
export default function ImportSkillsPrompt({
  open, onClose, onImport
}: {
  open: boolean
  onClose: () => void

  onImport: (skills: Skills) => boolean | void
}){
  const [ input, setInput ] = useState("");


  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <StyledImportSkillsPromptBase>
        <TextField
          value={input}
          onChange={e => {
            setInput(e.target.value);
          }}
        />
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => {
          let url = new URL(input);
          let params = new URLSearchParams(url.hash.slice(1));
          let skillsString = params.get("skills");


          if(!skillsString) return;

          try{
            // 耐力急速回復Lv2,睡眠耐性Lv2,攻擊Lv3
            let skillsPairs: [string, number][] = skillsString.split(","
              ).map(str => str.split("Lv")
              ).map(pair => [pair[0], parseInt(pair[1])]);
            // [ 耐力急速回復,2 ], [ 睡眠耐性,2 ], [ 攻擊,3 ]
            let outSkills: Skills = {}
            for(let i = 0; i < skillsPairs.length; ++i){
              let name = strings.skillToId.get(skillsPairs[i][0]);
              if(name){
                outSkills[String(name)] = skillsPairs[i][1];
              }
            }
            
            onImport(outSkills);
          } catch(e){
            console.error(e);
          }
        }}>Confirm</Button>
      </StyledImportSkillsPromptBase>
    </Modal>
  )
}


ImportSkillsPrompt.Button = function ImportSkillsPromptButton({
  onImport
}: {
  onImport: (skills: Skills) => boolean | void
}){
  const [ open, setOpen ] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Import Skills</Button>
      <ImportSkillsPrompt
        open={open}
        onClose={() => setOpen(false)}
        onImport={skills => {
          try{
            onImport(skills);
            setOpen(false);
          } catch(e){
            console.error(e);
          }
        }}
      />
    </>
  )


}