
import { useEffect, useMemo, useRef, useState } from "react";

import styled from "styled-components";

import Button from "@mui/material/Button";
import Modal from '@mui/material/Modal';


import { ParamsType } from "../../../lib/search_algo/types";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { DEFAULT_CALCULATOR } from "../../../lib/search_algo";
import { Snackbar } from "@mui/material";


const StyledExportPromptBase = styled.div`
  width: 80vw;
  height: 80vh;
`

export type CalculatorExportPromptProps = {

  open?: boolean
  onClose?: () => void
  params?: ParamsType
  setParams: (params: ParamsType) => void
  cols?: any
  setCols: (cols: any) => void
  // params_panel_description
}

export default function CalculatorExportPrompt({
  open,
  onClose,
  params,
  setParams,
  cols,
  setCols,
}: CalculatorExportPromptProps){
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const exportJson = useMemo(() => {

  }, [ params, cols ]);

  useEffect(() => {
    if(!textAreaRef.current) return;
    if(!open) return;
    textAreaRef.current.value = JSON.stringify({
      params,
      cols,
      calculator: DEFAULT_CALCULATOR.export(),
    })
  }, [ exportJson, open ]);

  const [ {
    open: openSnackBar,
    message: snackBarMessage
  }, setSnackBarState ] = useState({
    open: false,
    message: ""
  })
  const closeSnackBar = (
    event?: React.SyntheticEvent | Event, reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarState({
      open: false,
      message: snackBarMessage,
    })
  }

  return (
    <Modal
      open={!!open}
      onClose={onClose}
    >
      <StyledExportPromptBase>
        <Snackbar
          autoHideDuration={3000}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={openSnackBar}
          onClose={closeSnackBar}
          message={snackBarMessage}
        />
        <div style={{
          background: "white",
          padding: 15,
        }}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Include Skill Profiles"
          />
          <Button onClick={() => {
            try{
              if(!textAreaRef.current) return;
              let imported = JSON.parse(textAreaRef.current.value);

              let inParams = imported.params;
              setParams(inParams);

              let inCols = imported.cols;
              setCols(inCols);

              let inCalculator = imported.calculator;
              DEFAULT_CALCULATOR.importFrom(inCalculator);

              // onClose?.()
            } catch(e){
              console.error(e);
            }

          }}>
            Import
          </Button>
          <Button onClick={() => {
            if(textAreaRef.current){
              navigator.clipboard.writeText(textAreaRef.current.value)
              setSnackBarState({
                open: true,
                message: "copied to clipboard"
              })
            }
          }}>
            Copy to Clipboard
          </Button>
          <Button onClick={() => {
            navigator.permissions.query({
              // @ts-ignore
              name: "clipboard-read"
            }).then(status => {
              if(status.state !== "denied"){
                navigator.clipboard?.readText().then(
                  (clipText) => {
                    if(textAreaRef.current){
                      textAreaRef.current.value = clipText;
                      setSnackBarState({
                        open: true,
                        message: "pasted from clipboard"
                      })
                    }
                  }
                );
              }
            }).catch((e) => {
              console.error(e);
              setSnackBarState({
                open: true,
                message: "pasted from clipboard is not supported yet"
              })
            });
          }}>
            Paste from Clipboard
          </Button>
          <Button onClick={() => {
            onClose?.()
          }}>
            Close
          </Button>
        </div>
        <textarea
          style={{
            "height": "calc(100% - 80px)",
            "width": "100%"
          }}
          spellCheck={false}
          ref={textAreaRef}
        />

      </StyledExportPromptBase>
    </Modal>
  )
}

CalculatorExportPrompt.Button = function CalculatorExportPromptButton(
  props: CalculatorExportPromptProps
){
  const [
    openCalculatorExportPrompt,
    setOpenCalculatorExportPrompt
  ] = useState(false);

  
  return (
    <>
      <CalculatorExportPrompt
        open={openCalculatorExportPrompt}
        onClose={() => setOpenCalculatorExportPrompt(false)}
        { ...props }
      />
      <Button onClick={() => {
        setOpenCalculatorExportPrompt(true);
      }}>
        Import/Export Calculator
      </Button>

    </>
  )
}