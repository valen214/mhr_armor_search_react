

import React, {
  createContext,
  useCallback,
  useEffect, useMemo, useReducer, useRef, useState, useSyncExternalStore
} from "react";
import styled from "styled-components";


import type { SkillsProfile } from "../../../lib/search_algo/calculator";
import { useStrings } from "../../../lang/useStrings";
import { translateSkills } from "../../../lang/translateSkills";
import { useStatProfiles } from "./useProfiles";
import PromiseChild from "../../../lib/my_components/src/PromiseChild";

const StyledSkillsProfileRow = styled.div`
  height: 80px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: row;

  &:first-child {
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    margin-top: 15px;
  }
`;
const StyledSkillsProfilesRowCell = styled.div<{
  width: number
}>`
  width: ${props => props.width}px;
  overflow: hidden;

  &:hover {
    position: relative;
    overflow: visible;
    box-shadow:
         0px 2px 6px 0px rgba(0,0,0,0.2),
         2px 0px 6px 0px rgba(0,0,0,0.2),
        -2px 0px 6px 0px rgba(0,0,0,0.2);

  }
`;
export default function SkillsProfileRow({
  profile,
  cols
}: {
  profile: SkillsProfile
  cols: Array<{ field: string, headername: string, width: number }>
}){
  const strings = useStrings();
  const statProfiles = useStatProfiles();
  

  // rendered 4 times
  return (
    <StyledSkillsProfileRow>
      <StyledSkillsProfilesRowCell width={cols[0].width}>
        {profile.name}
      </StyledSkillsProfilesRowCell>
      <StyledSkillsProfilesRowCell
          width={cols[1].width}
          onClick={() => {

          }}
      >
        {JSON.stringify(translateSkills(strings, profile.skills))}
      </StyledSkillsProfilesRowCell>
      {cols.slice(2).map(col => {
        if("stat_id" in col){
          // @ts-ignore
          let prof = statProfiles.get(col.stat_id);
          return (
            <StyledSkillsProfilesRowCell 
            // @ts-ignore
              key={col.stat_id}
              width={col.width}
            >
              <PromiseChild>
                { prof?.worker.postMessage(profile.skills) }
              </PromiseChild>
            </StyledSkillsProfilesRowCell>
          );
        }
      })}
    </StyledSkillsProfileRow>
  );
}