
import React, {
  ChangeEvent,
  useContext,
  useEffect, useMemo, useState
} from "react";
import { useContextSelector } from 'use-context-selector';

import { styled } from "@mui/system";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import NativeSelect from "@mui/material/NativeSelect";


import { style } from "../../lib/my_components/src/util/react_util";
import strings, { addLoadedListener, getSkillMaxLevel } from "../../lang";
import { SkillsContext } from "./ManualSearchScreen";
import { useControlled } from "../../lib/my_components";


const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  fontSize: "100%",
  pointerEvents: "none",
  transform: "none",
  paddingBottom: "8px",
  paddingLeft: "5px",
}))


export type SkillSelectorProps = {
  skillId: number
  lv?: number
  maxLv?: number
  setLv?: (lv: number) => void
  contexted?: boolean
}
export default function SkillSelector({
  skillId,
  lv,
  maxLv,
  setLv,
  contexted,
}: SkillSelectorProps){
  
  const ctxLv = useContextSelector(SkillsContext, v => v[0][skillId]);
  const setSkill = useContextSelector(SkillsContext, v => v[1]);
  /*
  https://github.com/mui/material-ui/blob/master/
packages/mui-utils/src/useControlled.js
  */
  const [ internalLv, _setinternalLv ] = useControlled({
    controlled: contexted ? ctxLv || 0 : lv,
    default: 0,
    name: "SkillSelector"
  });
  const setinternalLv = (lv: number) => {
    _setinternalLv(lv);
    if(setLv){
      setLv(lv);
    }
    if(contexted){
      setSkill(skillId, lv);
    }
  }

  const [ _skillName, _setSkillName ] = useState(() =>
    strings.getSkill(skillId)
  );
  const [ _maxLv, setMaxLv ] = useState(() => 
    maxLv || getSkillMaxLevel(skillId) || 1
  );
  useEffect(() => {
    if(!maxLv){
      addLoadedListener(() => {
        setMaxLv(getSkillMaxLevel(skillId) || 1)
        _setSkillName(strings.getSkill(skillId));
      })
    }
  }, [ maxLv, skillId ])


  useEffect(() => {
    setinternalLv(lv || 0);
  }, [ lv ]);
  useEffect(() => {
    if(contexted){
      _setinternalLv(ctxLv || 0);
    }
  }, [ ctxLv ]);

  const handleChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    let value = event.target.value;
    if(typeof value === "string"){
      let lv = parseInt(value);
      setinternalLv(lv);
    }
    console.log(skillId, _skillName, value);
  };

// https://stackoverflow.com/a/62897933/3142238
  return (
    <FormControl
      variant="filled"
      margin="dense"
      sx={{
        m: 1,
        minWidth: 120,
      }}
      style={{
        background: internalLv === 0 ? "" : "rgba(255, 255, 204, 0.8)",
      }}
      data-skill-id={skillId}
    >
      <StyledInputLabel
        className="skill-label"
        htmlFor="uncontrolled-native"
      >
        {_skillName}
      </StyledInputLabel>
      <NativeSelect
        id="select-filled"
        value={internalLv}
        onChange={handleChange}
        size="small"
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0)",
          height: "100%",
          "&:after": style(`
            margin-left: 5px;
            width: calc(100% - 10px);
          `),
          "&::before": style(`
            margin-left: 5px;
            width: calc(100% - 10px);
          `),
        }}
        inputProps={{
          style: style(`
            background-color: rgba(0, 0, 0, 0);
            height: 100%;
            font-size: 93%;
            padding-top: 21px;
            padding-left: 8px;
            height: 19px;
            margin-top: -18px;
            border: 1px solid;
            border-radius: 5px;
          `),
        }}

      >
        <option value={0}>
          --
        </option>
        {
          Array(_maxLv).fill(0).map((_, i) => (
            <option key={i} value={i+1}>Lv{i+1}</option>
          ))
        }
      </NativeSelect>
    </FormControl>
  );
}