import { Button } from "@mui/material";
import { useState } from "react";
import FullPageElement from "../../../lib/my_components/src/FullPageElement";
import { style } from "../../../lib/my_components/src/util/react_util";



export default function AddColumnPrompt({
  open,
  onClose,
}: {
  open?: boolean
  onClose: Function
}){

  return (
    <FullPageElement
      open={open}
      onClose={onClose}
    >
      <div style={style(`
        width: 500px;
        height: 500px;
        background: white;
      
      `)}>
        
      </div>
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