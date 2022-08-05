import Button from "@mui/material/Button";
import { useState } from "react";
import FullPageElement from "../../../lib/my_components/src/FullPageElement";
import { ConditionalTypes, ParamsType } from "../../../lib/search_algo/types";


export type CalculatorExportPromptProps = {

  open?: boolean
  onClose?: Function
  params?: ParamsType
  conditionals?: ConditionalTypes
  cols?: any
  // params_panel_description
}

export default function CalculatorExportPrompt({
  open,
  onClose,
  params,
  conditionals,
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
            conditionals,
            cols,
          })
        }
      />
    </FullPageElement>
  )
}

CalculatorExportPrompt.Button = function CalculatorExportPromptButton({
  params,
  conditionals,
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
        conditionals={conditionals}
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