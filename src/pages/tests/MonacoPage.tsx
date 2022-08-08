import { useEffect, useState } from "react";
import MonacoEditor from '@monaco-editor/react';
import FullPageElement from "mylib/FullPageElement";

import styled from "styled-components";
import { Button } from "@mui/material";

const StyledEditorContainer = styled.div`

  width: 800px;
  height: 600px;
  position: absolute;
  display: flex;
  justifyContent: center;
  alignItems: center;

`


export default function MonacoPage(){

  const [ show, setShow ] = useState(false);

  return (
    <div>
      <Button onClick={() => setShow(!show)}>
        SHOW
      </Button>
      <FullPageElement open={show}>
        <Inner />
      </FullPageElement>
    </div>
  )
}

function Inner(){
  const [ value, setValue ] = useState("");
  const [ mounted, setMounted ] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [])
  return (
    <StyledEditorContainer style={{
    }}>
      { mounted && <MonacoEditor
        width="800px"
        height="600px"
        language="javascript"
        value={value}
        onChange={(_val, e) => {
          setValue(_val || "");
          console.log(e);
        }}
      /> }

    </StyledEditorContainer>
  )
}