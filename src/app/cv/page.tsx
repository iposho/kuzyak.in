'use client';

import styles from './page.module.scss';
import { useEffect } from 'react';

export default function CVPage() {
  useEffect(() => {
    document.body.setAttribute('data-page', 'cv');
    return () => {
      document.body.removeAttribute('data-page');
    };
  }, []);

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.name}>Pavel Kuzyakin</h1>
        <p className={styles.location}>Yerevan, Armenia</p>
        <p className={styles.contacts}>
          <a href="tel:+37455795993">+374 55 79 59 93</a> |{' '}
          <a href="mailto:pavel@kuzyak.in">pavel@kuzyak.in</a> |{' '}
          <a
            href="https://linkedin.com/in/pavelkuzyakin"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>{' '}
          |{' '}
          <a href="https://github.com/iposho" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </p>
      </header>

      <section>
        <h2 className={styles.sectionTitle}>Technical Skills</h2>
        <ul className={styles.list}>
          <li>
            <strong>Languages:</strong> JavaScript, TypeScript, HTML/CSS, PHP
          </li>
          <li>
            <strong>Frameworks:</strong> React, Next.js, Node.js, WordPress,
            Material-UI
          </li>
          <li>
            <strong>Developer Tools:</strong> Git, Docker, Vercel, Webpack, NPM,
            IntelliJ, GraphQL
          </li>
          <li>
            <strong>Libraries:</strong> Redux, Luxon, Underscore
          </li>
        </ul>
      </section>

      <section>
        <h2 className={styles.sectionTitle}>Experience</h2>

        <div className={styles.job}>
          <h3>Frontend Team Lead</h3>
          <p className={styles.meta}>
            Graphlogic.ai | Apr. 2024 – Present | Serbia
          </p>
          <ul className={styles.list}>
            <li>Leading a team of 3 frontend developers</li>
            <li>Designed and implemented reusable platform components</li>
            <li>
              Built technical roadmaps and decomposed features into actionable
              tasks
            </li>
            <li>
              Facilitated solution design from concept through implementation
            </li>
            <li>
              Resolved blockers, escalated risks, and secured additional
              resources
            </li>
            <li>
              Improved scalability, performance, and reliability of the platform
            </li>
            <li>
              Partnered with PMs and designers to enhance UX and business
              functionality
            </li>
          </ul>
        </div>

        <div className={styles.job}>
          <h3>Frontend Core Team Lead</h3>
          <p className={styles.meta}>Eapteka | Feb. 2022 – Jan. 2024</p>
          <ul className={styles.list}>
            <li>Introduced and enforced frontend development standards</li>
            <li>
              Led architectural migration from monolith to micro-frontends
            </li>
            <li>Optimized team workflows and code review practices</li>
          </ul>
        </div>

        <div className={styles.job}>
          <h3>Lead of Frontend</h3>
          <p className={styles.meta}>Eapteka | Mar. 2021 – Jan. 2024</p>
          <ul className={styles.list}>
            <li>Scaled the team from 1 to 15 developers through hiring</li>
            <li>
              Implemented a maturity matrix and performance evaluation framework
            </li>
            <li>Developed and executed long-term frontend strategy</li>
            <li>
              Established communication tools improving collaboration and speed
            </li>
          </ul>
        </div>

        <div className={styles.job}>
          <h3>Senior Frontend Developer</h3>
          <p className={styles.meta}>Eapteka | Sep. 2019 – Feb. 2021</p>
          <ul className={styles.list}>
            <li>Migrated legacy codebase to React + Redux</li>
            <li>Launched loyalty program using modern stack</li>
            <li>Initiated hiring and onboarding of frontend developers</li>
          </ul>
        </div>

        <div className={styles.job}>
          <h3>Frontend Developer</h3>
          <p className={styles.meta}>GOST Group | Sep. 2016 – Aug. 2019</p>
          <ul className={styles.list}>
            <li>Delivered operator dashboard modules for Safe City project</li>
            <li>
              Built digital platform for Russian Football Union (profiles,
              search, content creation)
            </li>
            <li>Developed commercial websites (frontend + backend)</li>
          </ul>
        </div>

        <div className={styles.job}>
          <h3>Fullstack Developer</h3>
          <p className={styles.meta}>
            Federal Children’s Ecology and Biology Centre | Dec. 2014 – Aug. 2016
          </p>
          <ul className={styles.list}>
            <li>
              Built 6 contest websites, reducing application processing time
              from 3 months to 1
            </li>
            <li>Recruited and managed a team of 3 developers</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className={styles.sectionTitle}>Projects</h2>
        <ul className={styles.list}>
          <li>
            <strong>holidays-calendar-ru</strong> (2023 – present) — API for
            Russian public holidays & work calendar (Node.js, Express)
          </li>
          <li>
            <strong>Avtozak LIVE</strong> (2023 – present) — Web projects for
            civil rights organization (PHP, WordPress, JS)
          </li>
        </ul>
      </section>

      <section>
        <h2 className={styles.sectionTitle}>Education</h2>
        <p className={styles.sectionText}>
          Moscow City Teachers&apos; Training University (MGPU) <br />
          Master&apos;s in Philology | Sep. 2006 – Jun. 2011
        </p>
      </section>
    </main>
  );
}
