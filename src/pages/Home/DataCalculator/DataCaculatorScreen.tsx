

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
import { DEFAULT_CALCULATOR } from "../../../lib/search_algo";
import type { ConditionalTypes, ParamsType } from "../../../lib/search_algo/types";
import ParametersPanel from "./ParametersPanel";

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

export const ConditionalsContext = (
  createContext<[ ConditionalTypes, (c: ConditionalTypes) => void ]>([ {}, () => {} ])
);
export const ParamsContext = (
  createContext<[ ParamsType, (c: ParamsType) => void ]>([ {}, () => {} ])
);

/*
really don't want to use MUI but I need to get it up quick
https://mui.com/material-ui/react-table/#collapsible-table
*/
export default function DataCaculatorScreen(){
  const skillsProfiles = useSkillsProfiles();
  const strings = useStrings();

  const [ conditionals, setConditionals ] = useState<ConditionalTypes>({});
  const [ params, setParams ] = useState<ParamsType>({
    weapon_phy: 330,

    petalaces: 20,

    motion_value_phy: 10,
    sharpness_phy: 1.32,
    absorption_phy: 60,

    
    weapon_elem: 52,
    motion_value_elem: 1,
    sharpness_elem: 1.15,
    absorption_elem: 20,
  });


  const [ cols, setCols ] = useState(() => [
    { field: "profileName", headername: "Profile Name", width: 140 },
    { field: "skills", headername: "Skills", width: 300 },
    {
      field: "stat", headername: "Crit%",
      width: 80,
      // @ts-ignore
      stat_id: DEFAULT_CALCULATOR.getStatProfileByName("Crit")?.id
    }, {
      field: "stat", headername: "Total Damage",
      width: 200,
      // @ts-ignore
      stat_id: DEFAULT_CALCULATOR.getStatProfileByName("Total Damage")?.id
    },
  ]);

  
  return (
    <ParamsContext.Provider value={[ params, setParams ]}>
      <ConditionalsContext.Provider value={[ conditionals, setConditionals ]}>

        <StyledDataCalcScreenRoot>
          <StyledTopBar>
            <Button>Import Skills</Button>
            <Button>Add Stat (?)</Button>
            <Button>Import Stat(s)</Button>
            <Button>Export All Stats</Button>
          </StyledTopBar>
          <ParametersPanel />
          <StyledSkillsProfilesHeader>
            {cols.map(col => (
              <StyledSkillsProfilesHeaderCell
                // @ts-ignore
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
      </ConditionalsContext.Provider>
    </ParamsContext.Provider>
  )
}

addEventListener