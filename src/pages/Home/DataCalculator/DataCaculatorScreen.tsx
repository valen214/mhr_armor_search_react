

import React, {
  createContext,
  useCallback,
  useEffect, useMemo, useReducer, useRef, useState, useSyncExternalStore
} from "react";


import styled from "styled-components";
import SkillsProfileRow from "./SkillsProfileRow";
import { useSkillsProfiles, useStatProfiles } from "./useProfiles";
import { useStrings } from "../../../lang/useStrings";
import { translateSkills } from "../../../lang/translateSkills";
import { Button } from "../../../lib/my_components";

const StyledDataCalcScreenRoot = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const StyledTopBar = styled.div`
  height: 60px;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
const StyledSkillsProfilesHeader = styled.div`
  height: 60px;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  box-shadow: 0 2px 6px 0px rgba(0, 0, 0, 0.2);
`;
const StyledSkillsProfilesContainer = styled.div`
  overflow: auto;
  flex-grow: 1;
`;
const StyledBottomBar = styled.div`
  height: 80px;
  flex-shrink: 0;
  box-shadow: 0 -2px 6px 0px rgba(0, 0, 0, 0.2);
`;

// https://styled-components.com/docs/api#using-custom-props
const StyledSkillsProfilesHeaderCell = styled.div<{
  width: number
}>`
  width: ${props => props.width}px
`;
const StyledSkillsProfile = styled.div``;


/*
really don't want to use MUI but I need to get it up quick
https://mui.com/material-ui/react-table/#collapsible-table
*/
export default function DataCaculatorScreen(){
  const skillsProfiles = useSkillsProfiles();
  const statProfiles = useStatProfiles();
  const strings = useStrings();



  const [ rows, setRows ] = useState([] as any);
  const [ cols, setCols ] = useState(() => [
    { field: "profileName", headername: "Profile Name", width: 140 },
    { field: "skills", headername: "Skills", width: 300 },
    {
      field: "stat", headername: "Crit%",
      width: 80,
      // @ts-ignore
      stat_id: [...statProfiles.keys()]?.[0]
    }, {
      field: "stat", headername: "Dmg (elem)",
      width: 200,
      // @ts-ignore
      stat_id: [...statProfiles.keys()]?.[1]
    },
  ]);

  useEffect(() => {
    setRows(skillsProfiles.map(prof => {
      return {
        id: prof.id,
        col1: prof.name,
        col2: JSON.stringify(prof.skills)
      };
    }))
  }, [ skillsProfiles ]);
  
  return (
    <StyledDataCalcScreenRoot>
      <StyledTopBar>
        <Button>Import Skills</Button>
        <Button>Add Stat (?)</Button>
        <Button>Import Stat(s)</Button>
        <Button>Export All Stats</Button>
      </StyledTopBar>
      <StyledSkillsProfilesHeader>
        {cols.map(col => (
          <StyledSkillsProfilesHeaderCell
            key={col.stat_id || col.field}
            width={col.width}
          >
            { col.headername }
          </StyledSkillsProfilesHeaderCell>
        ))}
      </StyledSkillsProfilesHeader>
      <StyledSkillsProfilesContainer>
        {skillsProfiles.map((prof, i) => (
          <SkillsProfileRow
            key={prof.id}
            profile={prof}
            cols={cols}
          />
        ))}
      </StyledSkillsProfilesContainer>
      <StyledBottomBar>
        BOTTOM BAR
      </StyledBottomBar>
    </StyledDataCalcScreenRoot>
  )
}

addEventListener