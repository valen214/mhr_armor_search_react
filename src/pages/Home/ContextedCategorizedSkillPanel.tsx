
import styled, { css } from 'styled-components'
import React, {
  useContext,
  useEffect, useMemo, useState
} from "react";
import SkillSelector from "./SkillSelector";

let StyledH3 = styled.h3`
  cursor: pointer;
  margin: 0;
  height: 62px;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;
let StyledSkillSelectorContainer = styled.div`
  transition: max-height 0.5s;

  // transform: scaleY(100%);
  // height: auto;
  max-height: 500px;
  overflow: auto;


  &.collapse {
    // transform: scaleY(0);
    max-height: 0;
  }
`;

export type ContextedCategorizedSkillPanelProps = {
  title?: string
  skillIds: Array<number>
}
export default function ContextedCategorizedSkillPanel({
  title,
  skillIds,
}: ContextedCategorizedSkillPanelProps){
  const [ collapse, setCollapse ] = useState(false);

  return (
    <div style={{ overflow: "hidden" }}>
      <StyledH3
        onClick={() => {
          setCollapse(!collapse);
        }}
      >
        {title}
      </StyledH3>
      <StyledSkillSelectorContainer
        className={`${collapse || "collapse"}`}
      >
        {skillIds.map((id, i) => (
          <SkillSelector
            key={id}
            skillId={id}
            contexted
          />
        ))}
      </StyledSkillSelectorContainer>
    </div>
  );
}