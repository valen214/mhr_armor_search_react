
import React, {
  createContext,
  useCallback,
  useEffect, useMemo, useReducer, useRef, useState
} from "react";

import styled from "styled-components";

import strings from "../../lang";
import { useStrings } from "../../lang/useStrings";
import { Button } from "../../lib/my_components";
import { style } from "../../lib/my_components/src/util/react_util";
import {
  addSkillsProfile, getSkillsProfiles
} from "../../lib/search_algo";
import CategorizedSkillPanel from "./CategorizedSkillPanel";
import ContextedCategorizedSkillPanel from "./ContextedCategorizedSkillPanel";
import SkillSelector from "./SkillSelector";


type Skills = { [skillId: number]: number }

type setSkill = (id: number, lv: number) => void;

type SkillsContextType = {
  skills: Skills
}
export const SkillsContext = createContext<[ Skills, setSkill ]>([
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
const StyledCategorizedSkillContainer = styled.div`
  overflow: auto;
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


// from https://mhrise.wiki-db.com/sim/?hl=en
const DEFAULT_SKILLS_CATEGORIES = {
  quest: [
    34, 94, 32, 104, 105, 33, 80, 79,
    43, 96, 95, 83, 84, 82, 123, 129
  ],
  item: [ 60, 58, 88, 87, 90, 89, 86 ],
  battle_survival: [
    64, 65, 66, 97, 35, 36, 57, 40,
    93, 59, 112, 122, 114
  ],
  resistance: [
    61, 62, 63, 76, 74, 73, 75, 77, 78, 72, 108, 133
  ],
  parameter_change: [
    1, 56, 67, 68, 69, 70, 71
  ],
  battle_elem_special: [
    13, 14, 15, 16, 17, 18, 21, 20, 19, 41, 81, 42, 99, 98, 124
  ],
  battle_attack: [
    6, 8, 10, 38, 39, 7, 11, 37, 91, 103, 4, 106, 5, 92, 3, 9,
    2, 28, 30, 31, 45, 113, 115, 116, 117, 125, 127, 128, 131
  ],
  battle_swordsman: [
    22, 23, 12, 26, 85, 25, 107, 46, 44
  ],
  battle_gunner: [
    48, 50, 49, 24, 27, 47, 53, 52, 51, 54, 55, 29, 126
  ],
  set_skill: [
    110, 109, 100, 101, 102, 111
  ],
  // general_purpose: [],
}

export type ManualSearchScreenProps = {
  
}
export default function ManualSearchScreen({
  
}: ManualSearchScreenProps){

  const [ skills, dispatch ] = useReducer(
    function reducer(state: Skills, action: { type: "update", id: number, lv: number }){
      switch(action.type){
      case "update":
        state = {
          ...state,
          [action.id]: action.lv
        };
        break;
      }
      return state;
    },
    {} as Skills);
  const setSkill = useCallback((id: number, lv: number) => {
    dispatch({ type: "update", id, lv });
  }, [ dispatch ]);

  const strings = useStrings();

  const [ collapseAll, setCollapseAll ] = useState(false);

  const DefaultCategorizedSkills = useMemo(() => (
    <>
      {Object.entries(DEFAULT_SKILLS_CATEGORIES).map((
        [ category, skillIds ]
      ) => (
        <ContextedCategorizedSkillPanel
          // @ts-ignore
          key={category}
          // @ts-ignore
          title={strings[category]}
          skillIds={skillIds}
          collapseAll={collapseAll}
        />
      ))}
    </>
  ), [ collapseAll, strings, strings.getLanguage() ]);

  return (
    <StyledManualSearchScreenRoot>
      <StyledTopBar>
        <Button>Set Charms</Button>
        <Button onClick={() => {
          setCollapseAll(!collapseAll);
        }}>Collapse All</Button>
        <Button>Reset Skills</Button>
      </StyledTopBar>
      <StyledCategorizedSkillContainer>
        <SkillsContext.Provider value={[ skills, setSkill ]}>
          { DefaultCategorizedSkills }
          <ContextedCategorizedSkillPanel
            title={strings.quest}
            skillIds={[ 1, 2, 3, 4, 5, 6 ]}
            collapseAll={collapseAll}
          />
          <ContextedCategorizedSkillPanel
            title={strings.battle_survival}
            skillIds={[ 2, 4, 6, 8, 5, 10 ]}
            collapseAll={collapseAll}
          />
          <ContextedCategorizedSkillPanel
            title={strings.item}
            skillIds={[ 2, 4, 6, 8, 5, 10 ]}
            collapseAll={collapseAll}
          />
        </SkillsContext.Provider>
      </StyledCategorizedSkillContainer>
      <StyledBottomBar>
        <Button>Perform Search</Button>
        <Button onClick={() => {
          addSkillsProfile(skills);
        }}>Add Skills to Data Calculator</Button>
      </StyledBottomBar>
    </StyledManualSearchScreenRoot>
  );
}