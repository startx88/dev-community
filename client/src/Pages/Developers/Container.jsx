import React from "react";
import Title from "../../Widgets/Title/Title";
import Section from "../../UI/Layout/Section";
const Container = props => {
  return (
    <Section>
      {user => {
        return (
          <>
            <Section.LeftCol>
              <Title type="page" />
            </Section.LeftCol>
            <Section.RightCol>hello</Section.RightCol>
          </>
        );
      }}
    </Section>
  );
};
export default Container;
