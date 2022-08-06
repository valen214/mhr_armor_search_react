

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
import type { ParamsType } from "../../../lib/search_algo/types";
import ParametersPanel from "./ParametersPanel";
import FullPageElement from "../../../lib/my_components/src/FullPageElement";
import { style } from "../../../lib/my_components/src/util/react_util";
import CalculatorExportPrompt from "./CalculatorExportPrompt";
import AddColumnPrompt from "./AddColumnPrompt";

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


    powercharm: true,
    powertalon: true,
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

  const [ openParamsPanel, setOpenParamsPanel ] = useState(true);
  

  return (
    <>
      <ParamsContext.Provider value={[ params, setParams ]}>

        <StyledDataCalcScreenRoot>
          <StyledTopBar>
            <Button onClick={() => {
              setOpenParamsPanel(!openParamsPanel);
              console.log("???"); 
            }}>{ openParamsPanel ? "Collapse" : "Open"} Parameters</Button>
            <Button>Import Skills</Button>
            <AddColumnPrompt.Button />
            <Button onClick={() => {
              for(let prof of
                DEFAULT_CALCULATOR.stat_profiles.values()
              ){
                prof.resetWorker();
              }
              setTimeout(() => {
                DEFAULT_CALCULATOR.emit("profiles change");
              }, 1000);
            }}>Refresh workers</Button>
            <Button>Import Stat(s)</Button>
            <CalculatorExportPrompt.Button
              params={params}
              cols={cols}
            />
          </StyledTopBar>
          <ParametersPanel open={openParamsPanel}/>
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
      </ParamsContext.Provider>
    </>
  )
}

addEventListener