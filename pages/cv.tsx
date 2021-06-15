import styled, { createGlobalStyle } from "styled-components";
import { Fragment, HTMLProps, useMemo } from "react";
import { ReactMarkdownProps } from "react-markdown/src/ast-to-react";

import {
  certificationsData,
  contactData,
  cvData,
  experienceData,
  skillsByKinds,
  skillsData,
  SKILL_KINDS,
} from "../common/pageData";
import { Markdown } from "../common/Markdown";
import { Headline1, Headline2 } from "../common/text";
import { SPACE_L, SPACE_M, SPACE_S } from "../common/theme";
import { Link, SAnchor } from "../common/Link";

export default function CVPrintPage() {
  return (
    <>
      <GlobalStylesPrint />
      <SRoot>
        <SHeader>
          <SName>{cvData.header.name}</SName>
          <STitle>{cvData.header.title}</STitle>
          <SHeaderRight>
            <SContact>
              <SContactMethod>{contactData.labels.phone}:</SContactMethod>
              <SContactData>
                <Link
                  to={`tel:${contactData.phoneNumber.replace(/[ ()\-]/g, "")}`}
                >
                  {contactData.phoneNumber}
                </Link>
              </SContactData>
              <SContactMethod>{contactData.labels.email}:</SContactMethod>
              <SContactData>
                <Link to={`mailto:${contactData.emailAddress}`}>
                  {contactData.emailAddress}
                </Link>
              </SContactData>
              <SContactMethod>{contactData.labels.website}:</SContactMethod>
              <SContactData>
                <Link to={contactData.websiteURL}>
                  {contactData.websiteURL}
                </Link>
              </SContactData>
            </SContact>
          </SHeaderRight>
        </SHeader>
        <SSection>
          <SSectionTitle>{cvData.labels.skills}</SSectionTitle>
          <SSkillsContainer>
            {SKILL_KINDS.map((kind) => (
              <Fragment key={kind}>
                <SSkillKind>{skillsData.labels[kind]}</SSkillKind>
                <SSkillList>
                  {skillsByKinds[kind].map((skill, index) => (
                    <Fragment key={skill.name}>
                      {index === 0 || ", "}
                      <span>{skill.name}</span>
                    </Fragment>
                  ))}
                </SSkillList>
              </Fragment>
            ))}
            <SSkillKind>{cvData.labels.certifications}</SSkillKind>
            <SSkillList>
              {certificationsData.certifications
                .map(({ name, authority }) => `${name} (by ${authority})`)
                .join(", ")}
            </SSkillList>
          </SSkillsContainer>
        </SSection>
        <SSection>
          <SSectionTitle>{cvData.labels.projects}</SSectionTitle>
          {experienceData.projects.map(
            ({ client, startDate, endDate, activities, skills }) => (
              <CVTimelineItem
                key={`${client}-${startDate}`}
                headline={client}
                subline={null}
                activities={activities}
                skills={skills}
                startDate={startDate}
                endDate={endDate}
              />
            )
          )}
        </SSection>
        <SSection>
          <SSectionTitle>{cvData.labels.employments}</SSectionTitle>
          {experienceData.employments.map(
            ({
              position,
              employee,
              startDate,
              endDate,
              activities,
              skills,
            }) => (
              <CVTimelineItem
                key={`${position}–${employee}`}
                headline={position}
                subline={employee}
                activities={activities}
                skills={skills}
                startDate={startDate}
                endDate={endDate}
              />
            )
          )}
        </SSection>
        <SSection>
          <SSectionTitle>{cvData.labels.education}</SSectionTitle>
          {experienceData.education.map(
            ({ degree, authority, startDate, endDate }) => (
              <CVTimelineItem
                key={`${degree}-${startDate}`}
                headline={degree}
                subline={authority}
                activities={null}
                skills={null}
                startDate={startDate}
                endDate={endDate}
              />
            )
          )}
        </SSection>
      </SRoot>
    </>
  );
}

const GlobalStylesPrint = createGlobalStyle`
  @page {
    size:  auto;   /* auto is the initial value */
    margin: 10mm;  /* this affects the margin in the printer settings */
  }
  html {
    width: 210mm;
  }

  body {
    font-family: "Open Sans", Helvetica, sans-serif;
    font-size: 4.2mm;
  }

  @media not print {
    body {
      margin: 5mm;
    }
  }
`;

const SHeader = styled.header`
  display: grid;
  grid-template-areas:
    "name contact"
    "title contact";
  grid-template-columns: 1fr auto;
  margin-bottom: ${SPACE_L};
`;

const SName = styled.div`
  grid-area: name;

  color: ${({ theme }) => theme.colors.interactive};
  font-size: 4rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const STitle = styled.div`
  grid-area: title;

  font-size: 1.6rem;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.interactive};
`;

const SHeaderRight = styled.div`
  grid-area: contact;
  border-left: 0.125rem solid ${({ theme }) => theme.colors.interactive};
  padding-left: ${SPACE_M};

  display: flex;
  align-items: center;
`;

const SContact = styled.div`
  display: grid;
  grid-template-columns: min-content min-content;
  grid-template-rows: min-content min-content;
  grid-auto-flow: row;
  grid-column-gap: ${SPACE_M};
  align-items: center;
`;

const SContactMethod = styled.div``;

const SContactData = styled.div`
  font-weight: 600;
`;

const SSection = styled.section`
  & + & {
    margin-top: ${SPACE_L};
  }
`;

const SSectionTitle = styled(Headline1).attrs(() => ({
  enableBackgroundEffect: false,
}))`
  color: ${({ theme }) => theme.colors.interactive};
  background-color: transparent;
  text-transform: uppercase;
  border-bottom: 0.125rem solid ${({ theme }) => theme.colors.interactive};
  margin-bottom: ${SPACE_L};
  font-size: 1.8rem;
`;

const SSkillsContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: auto 1fr;
  grid-column-gap: ${SPACE_M};
  grid-row-gap: ${SPACE_M};
`;

const SSkillKind = styled.div`
  font-weight: 600;
`;

const SSkillList = styled.div``;

type TTimelineItemProps = {
  headline: string;
  subline: string | null;
  startDate: string;
  endDate: string;
  activities: string[] | null;
  skills: string[] | null;
};

function CVTimelineItem({
  headline,
  subline,
  startDate,
  endDate,
  activities,
  skills,
}: TTimelineItemProps) {
  const formattedStartDate = useMemo(
    () =>
      new Date(startDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
      }),
    [startDate]
  );
  const formattedEndDate = useMemo(
    () =>
      endDate
        ? new Date(endDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
          })
        : null,
    [endDate]
  );

  return (
    <STimelineItemRoot>
      <STimelineItemTitle>{headline}</STimelineItemTitle>
      <STimelineItemTime>
        {formattedEndDate
          ? `${formattedStartDate} to ${formattedEndDate}`
          : `since ${formattedStartDate}`}
      </STimelineItemTime>
      {subline && (
        <STimelineItemSubline>
          <Markdown data={subline} components={printableMarkdownComponents} />
        </STimelineItemSubline>
      )}
      {activities && (
        <STimelineItemActivities>
          {activities.map((activityMarkdown, index) => (
            <STimelineItemActivity key={index}>
              <Markdown
                data={activityMarkdown}
                components={printableMarkdownComponents}
              />
            </STimelineItemActivity>
          ))}
        </STimelineItemActivities>
      )}
      {skills && (
        <STimelineItemSkills>
          <Markdown
            data={skills.join(", ")}
            components={printableMarkdownComponents}
          />
        </STimelineItemSkills>
      )}
    </STimelineItemRoot>
  );
}

const printableMarkdownComponents = {
  a: function PrintableMarkdownA({
    href,
  }: ReactMarkdownProps & HTMLProps<"a">) {
    return <SAnchor href="">{href ?? ""}</SAnchor>;
  },
};

const STimelineItemActivities = styled.ul`
  grid-area: activities;
  margin: ${SPACE_M} 0 ${SPACE_S};
  list-style-type: circle;
`;

const STimelineItemRoot = styled.section`
  display: grid;
  grid-template-areas:
    "title time"
    "subline ."
    "activities activities"
    "skills skills";
  grid-template-columns: 1fr auto;

  & + & {
    margin-top: ${SPACE_L};
  }

  *:not(${STimelineItemActivities}) {
    page-break-before: avoid;
    page-break-inside: avoid;
    page-break-after: avoid;
  }
`;

const STimelineItemTitle = styled(Headline2).attrs(() => ({
  enableBackgroundEffect: false,
}))`
  color: ${({ theme }) => theme.colors.dark};
  background-color: transparent;

  grid-area: title;
  font-size: 1.2rem;
`;

const STimelineItemTime = styled.em`
  grid-area: time;
`;

const STimelineItemSubline = styled.span`
  grid-area: subline;
  margin-top: ${SPACE_S};
`;

const STimelineItemActivity = styled.li``;

const STimelineItemSkills = styled.div`
  grid-area: skills;
`;

const SRoot = styled.div``;

CVPrintPage.pageStructure = {
  id: "cv",
  omitLayout: true,
  title: "CV",
  renderHeadComponents: () => {
    return (
      <>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </>
    );
  },
};
