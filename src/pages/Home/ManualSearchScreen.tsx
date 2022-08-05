
import React, {
  useCallback,
  useEffect, useMemo, useReducer, useRef, useState
} from "react";
import { createContext, useContextSelector } from 'use-context-selector';

import styled from "styled-components";


import strings from "../../lang";
import { useStrings } from "../../lang/useStrings";
import { Button } from "../../lib/my_components";
import { style } from "../../lib/my_components/src/util/react_util";
import {
  addSkillsProfile, getSkillsProfiles
} from "../../lib/search_algo";
import CategorizedSkillContainer from "./CategorizedSkillContainer";
import ContextedCategorizedSkillPanel from "./ContextedCategorizedSkillPanel";
import SkillSelector from "./SkillSelector";


type Skills = { [skillId: number]: number }

type setSkill = (id: number, lv: number) => void;

type SkillsContextType = {
  skills: Skills
}
export const SkillsContext = createContext<[
  Skills,
  setSkill
]>([
  {}, () => {}
]);

const StyledManualSearchScreenRoot = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const StyledTopBar = styled.div`
  height: 80px;
  flex-shrink: 0;
  box-shadow: 0 2px 6px 0px rgba(0, 0, 0, 0.2);
`;
const StyledBottomBar = styled.div`
  height: 80px;
  flex-shrink: 0;
  box-shadow: 0 -2px 6px 0px rgba(0, 0, 0, 0.2);
`;

const CategorizedSkillPanelGenerator = ({
  title, skillIds, skills
}: {
  title: string, skillIds: Array<number>, skills: Skills
}) => {
  return (
    <ContextedCategorizedSkillPanel
      title={title}
      skillIds={skillIds}
    />
  )
};

function reducer(
  state: Skills,
  action: {
    type: "update", id: number, lv: number
  } | {
    type: "reset"
  }
){
  switch(action.type){
  case "reset": state = {}; break;
  case "update":
    state = {
      ...state,
      [action.id]: action.lv
    };
    break;
  }
  return state;
}

export type ManualSearchScreenProps = {
  
}
export default function ManualSearchScreen({
  
}: ManualSearchScreenProps){

  const [ skills, dispatch ] = useReducer(reducer, {} as Skills);
  const setSkill = useCallback((id: number, lv: number) => {
    dispatch({ type: "update", id, lv });
  }, [ dispatch ]);

  const strings = useStrings();

  const [ collapseAll, setCollapseAll ] = useState(false);


  return (
    <StyledManualSearchScreenRoot>
      <StyledTopBar>
        <Button>Set Charms</Button>
        <Button onClick={() => {
          setCollapseAll(!collapseAll);
        }}>{ collapseAll ? "Expand" : "Collapse" } All</Button>
        <Button onClick={() => {
          dispatch({ type: "reset" })
        }}>Reset Skills</Button>
      </StyledTopBar>
      <CategorizedSkillContainer
        skills={skills}
        setSkill={setSkill}
        collapseAll={collapseAll}        
      />
      <StyledBottomBar>
        <Button>Perform Search</Button>
        <Button onClick={() => {
          addSkillsProfile(skills);
        }}>Add Skills to Data Calculator</Button>
      </StyledBottomBar>
    </StyledManualSearchScreenRoot>
  );
}