
import styled, { css } from 'styled-components'
import React, {
  useContext,
  useEffect, useMemo, useState
} from "react";
import SkillSelector from "./SkillSelector";
import { Collapse } from '@mui/material';

let StyledH3 = styled.h3`
  cursor: pointer;
  margin: 0;
  height: 62px;

  display: flex;
  justify-content: center;
  align-items: center;

  user-select: none;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;
let StyledSkillSelectorContainer = styled.div`
  transition: max-height 0.5s;

  // transform: scaleY(100%);
  // height: auto;
  max-height: 500px;
  overflow: hidden auto;


  &.collapse {
    // transform: scaleY(0);
    max-height: 0;
  }
`;

export type ContextedCategorizedSkillPanelProps = {
  title?: string
  skillIds: Array<number>
  collapseAll?: boolean
}
export default function ContextedCategorizedSkillPanel({
  title,
  skillIds,
  collapseAll,
}: ContextedCategorizedSkillPanelProps){
  const [ collapse, setCollapse ] = useState(false);

  useEffect(() => {
    setCollapse(!!collapseAll);
  }, [ collapseAll ])

  return useMemo(() => (
    <div style={{ overflow: "hidden" }}>
      <StyledH3
        onClick={() => {
          setCollapse(!collapse);
        }}
        >
        {title}
      </StyledH3>
      <Collapse in={collapse}>
        {skillIds.map((id, i) => (
          <SkillSelector
            key={id}
            skillId={id}
            contexted
          />
        ))}
      </Collapse>
    </div>
  ), [ title, skillIds.join(" "), collapse ]);
}