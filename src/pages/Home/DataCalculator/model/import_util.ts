import { DEFAULT_CALCULATOR } from "lib/search_algo";
import type { ParamsType } from "lib/search_algo/types";
import myMHRCalculator from "./App";



export function importFromString(src: string, {
  setParams, setCols
}: {
  
  setParams: (params: ParamsType) => void
  setCols: (cols: any) => void
}){
  let imported = JSON.parse(src);

  let inParams = imported.params;
  setParams(inParams);

  let inCols = imported.cols;
  setCols(inCols);

  let inCalculator = imported.calculator;
  DEFAULT_CALCULATOR.importFrom(inCalculator);

  let in_params_desc = imported.params_desc;
  myMHRCalculator.params_desc.reset(in_params_desc);
}