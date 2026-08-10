export interface Job {
  company: string;
  position: string;
  location: string;
  from: Date;
  to?: Date;
  description: string;
}

export const jobs: Job[] = [
  {
    company: 'Cisco (Splunk)',
    position: 'Software Engineer',
    location: 'Brno, Czechia',
    from: new Date('01/07/2023'),
    description: `Develop full-stack features for the Synthetic Monitoring module in Splunk
      Observability Cloud, working across the React frontend and the Ruby
      backend. Also serve as an on-call engineer responding to SLA-impacting
      incidents and handling production deployments. The role spans feature
      development, reliability, and release responsibilities.`
  },
  {
    company: 'Smartlook, s.r.o.',
    position: 'Frontend Developer',
    location: 'Brno, Czechia',
    from: new Date('01/05/2022'),
    to: new Date('31/07/2023'),
    description: `Built frontend features in React for Smartlook's behavior-analytics SaaS —
      a real-time user-observability platform for session recordings, heatmaps,
      and event tracking, used by thousands of businesses worldwide. Worked
      across core product areas including the recordings player, conversion
      funnels, and heatmaps. The company was acquired by Cisco during my
      time there and integrated into its AppDynamics observability suite.`
  },
  {
    company: 'QCM, s.r.o.',
    position: 'Frontend Developer',
    location: 'Brno, Czechia',
    from: new Date('01/06/2019'),
    to: new Date('31/03/2022'),
    description: `Developed frontend features for the Portál Dodavatele supplier portal
      (PoDo.cz, React) and the PVU procurement tool (Angular), within QCM's
      suite of public-procurement systems for Czech public-sector institutions.
      Also handled DevOps across our projects: building and maintaining CI/CD
      pipelines, containerizing applications, and managing deployments and
      releases.`
  },
  {
    company: 'Orbinet (OLC Webdesign s.r.o.)',
    position: 'PHP Web Developer',
    location: 'Olomouc, Czechia',
    from: new Date('01/06/2018'),
    to: new Date('30/6/2019'),
    description: `Coded website templates from design into PHP, HTML, CSS, and
      JavaScript for multiple clients across diﬀerent industries, including
      notable Czech companies such as Excalibur Army. Delivered custom
      front-end implementations as part of the agency's project pipeline,
      adapting each build to the client's brand and requirements.`
  },
  {
    company: 'Targito.com s.r.o',
    position: 'Web developer',
    location: 'Prague, Czechia',
    from: new Date('01/03/2017'),
    to: new Date('31/03/2018'),
    description: `Developed front-end features for the newsletter editor — the in-platform
      tool clients use to build their email campaigns — within Targito's
      Drupal-based platform. Implemented a copy/duplicate function for
      newsletter content blocks and integrated the editor's front end with the
      backend API server.`
  }
]
