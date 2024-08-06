import { Fragment, useCallback, useMemo } from "react";
import { Components } from "react-markdown";

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
import { Link, linkStyles } from "../common/Link";
import { Headline1, Headline2 } from "../common/text";

import styles from "./cv.module.css";

import "./cv.css";

export default function CVPrintPage() {
  const handleClickPrint = useCallback(() => window.print(), []);
  return (
    <div className={styles.root}>
      <a onClick={handleClickPrint} className={linkStyles.link}>
        Print me!
      </a>
      <header className={styles.header}>
        <div className={styles.name}>{cvData.header.name}</div>
        <div className={styles.title}>{cvData.header.title}</div>
        <div className={styles["header-right"]}>
          <div className={styles.contact}>
            <div>{contactData.labels.phone}:</div>
            <div className={styles["contact-data"]}>
              <Link
                to={`tel:${contactData.phoneNumber.replace(/[ ()\-]/g, "")}`}
              >
                {contactData.phoneNumber}
              </Link>
            </div>
            <div>{contactData.labels.email}:</div>
            <div className={styles["contact-data"]}>
              <Link to={`mailto:${contactData.emailAddress}`}>
                {contactData.emailAddress}
              </Link>
            </div>
            <div>{contactData.labels.website}:</div>
          </div>
        </div>
      </header>
      <section>
        <Headline1 className={styles["section-title"]}>
          {cvData.labels.skills}
        </Headline1>
        <div className={styles["skills-container"]}>
          {SKILL_KINDS.map((kind) => (
            <Fragment key={kind}>
              <div className={styles["skill-kind"]}>
                {skillsData.labels[kind]}
              </div>
              <div>
                {skillsByKinds[kind].map((skill, index) => (
                  <Fragment key={skill.name}>
                    {index === 0 || ", "}
                    <span>{skill.name}</span>
                  </Fragment>
                ))}
              </div>
            </Fragment>
          ))}
          <div className={styles["skill-kind"]}>
            {cvData.labels.certifications}
          </div>
          <div>
            {certificationsData.certifications
              .map(({ name, authority }) => `${name} (by ${authority})`)
              .join(", ")}
          </div>
        </div>
      </section>
      <section>
        <Headline1 className={styles["section-title"]}>
          {cvData.labels.projects}
        </Headline1>
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
          ),
        )}
      </section>
      <section>
        <Headline1 className={styles["section-title"]}>
          {cvData.labels.employments}
        </Headline1>
        {experienceData.employments.map(
          ({ position, employee, startDate, endDate, activities, skills }) => (
            <CVTimelineItem
              key={`${position}–${employee}`}
              headline={position}
              subline={employee}
              activities={activities}
              skills={skills}
              startDate={startDate}
              endDate={endDate}
            />
          ),
        )}
      </section>
      <section>
        <Headline1 className={styles["section-title"]}>
          {cvData.labels.education}
        </Headline1>
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
          ),
        )}
      </section>
    </div>
  );
}

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
    [startDate],
  );
  const formattedEndDate = useMemo(
    () =>
      endDate
        ? new Date(endDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
          })
        : null,
    [endDate],
  );

  return (
    <section className={styles["timeline-item-root"]}>
      <Headline2 enableBackgroundEffect>{headline}</Headline2>
      <em className={styles["timeline-item-time"]}>
        {formattedEndDate
          ? `${formattedStartDate} to ${formattedEndDate}`
          : `since ${formattedStartDate}`}
      </em>
      {subline && (
        <span className={styles["timeline-item-subline"]}>
          <Markdown data={subline} components={printableMarkdownComponents} />
        </span>
      )}
      {activities && (
        <ul className={styles["timeline-item-activities"]}>
          {activities.map((activityMarkdown, index) => (
            <li key={index}>
              <Markdown
                data={activityMarkdown}
                components={printableMarkdownComponents}
              />
            </li>
          ))}
        </ul>
      )}
      {skills && (
        <div className={styles["skills-container"]}>
          <Markdown
            data={skills.join(", ")}
            components={printableMarkdownComponents}
          />
        </div>
      )}
    </section>
  );
}

CVPrintPage.pageStructure = {
  id: "cv",
  omitLayout: true,
  title: "CV",
  renderHeadComponents: () => {
    return (
      <>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </>
    );
  },
};

const printableMarkdownComponents: Components = {
  a: function PrintableMarkdownA({ href }) {
    return (
      <a href={href} className={linkStyles.link}>
        {href ?? ""}
      </a>
    );
  },
};
