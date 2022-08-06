import Button from "@mui/material/Button";
import { useState } from "react";
import FullPageElement from "../../../lib/my_components/src/FullPageElement";
import { ParamsType } from "../../../lib/search_algo/types";


export type CalculatorExportPromptProps = {

  open?: boolean
  onClose?: Function
  params?: ParamsType
  cols?: any
  // params_panel_description
}

export default function CalculatorExportPrompt({
  open,
  onClose,
  params,
  cols,
}: CalculatorExportPromptProps){


  return (
    <FullPageElement
      open={open}
      onClose={onClose}
    >
      <textarea
        style={{
          "height": "80%",
          "width": "80%"
        }}
        defaultValue={
          JSON.stringify({
            params,
            cols,
          })
        }
      />
    </FullPageElement>
  )
}

CalculatorExportPrompt.Button = function CalculatorExportPromptButton({
  params,
  cols,
}: CalculatorExportPromptProps){
  const [
    openCalculatorExportPrompt,
    setOpenCalculatorExportPrompt
  ] = useState(false);

  
  return (
    <>
      <CalculatorExportPrompt
        open={openCalculatorExportPrompt}
        onClose={() => setOpenCalculatorExportPrompt(false)}
        params={params}
        cols={cols}
      />
      <Button onClick={() => {
        setOpenCalculatorExportPrompt(true);
      }}>
        Import/Export Calculator
      </Button>

    </>
  )
}