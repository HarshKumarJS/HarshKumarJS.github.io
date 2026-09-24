export interface Project {
  slug: string;
  number: string;
  title: string;
  headline: string;
  description: string;
  company: string;
  period: string;
  role: string;
  status: string;
  tags: string[];
  metrics: { value: string; label: string }[];
  context: string;
  contributions: { title: string; text: string }[];
  outcome: string;
  flow: { name: string; detail: string }[];
}
export const projects: Project[] = [
  {
    slug: 'survey-platform', number: '01', title: 'Survey management platform',
    headline: 'Less setup. More possibility.',
    description: 'A modular backend that turns complex survey operations into faster, repeatable workflows.',
    company: 'Continuum Insights', period: 'July 2024 — April 2026', role: 'Backend Developer', status: 'Professional work',
    tags: ['Java', 'Spring Boot', 'PostgreSQL', 'RESTful APIs'],
    metrics: [{value:'2+ hrs',label:'Previous setup time per project'},{value:'20–25 min',label:'Setup time with templates and automation'},{value:'Multi-country',label:'Survey and vendor workflows'}],
    context: 'Survey operations involved country-specific configurations, client and vendor requirements, quotas, and project status tracking. Setting up a project took approximately two hours or more. The backend needed to support these different workflows while making configuration more repeatable.',
    contributions: [
      {title:'Modular survey workflows',text:'Designed and implemented Spring Boot services for multi-country, multi-vendor, and combined projects, organized through a modular service layer.'},
      {title:'APIs for the operational details',text:'Built PostgreSQL-backed REST APIs for survey setup, client and vendor configuration, quotas, status tracking, and operational controls.'},
      {title:'Reusable configuration',text:'Improved configuration workflows and backend APIs with reusable templates and automation, reducing repeated setup work.'},
      {title:'Faster access to the right data',text:'Addressed dashboard latency through PostgreSQL query tuning, indexed time and status filters, role-based client/vendor access, and efficient pagination.'},
    ],
    outcome: 'Survey setup time fell from approximately 2+ hours per project to 20–25 minutes. Reusable templates and automation made the configuration workflow faster, while query and pagination improvements addressed dashboard latency.',
    flow: [{name:'Configure',detail:'Clients, vendors, countries'},{name:'Reuse',detail:'Templates and business rules'},{name:'Manage',detail:'Quotas, status, controls'},{name:'Persist',detail:'PostgreSQL data layer'}],
  },
  {
    slug: 'enterprise-crm', number: '02', title: 'Enterprise CRM',
    headline: 'Many franchises. One connected operation.',
    description: 'Java services for multi-tenant operations, order lifecycles, and business analytics across a franchise network.',
    company: 'Continuum Insights', period: 'July 2024 — April 2026', role: 'Backend Developer', status: 'Professional work',
    tags: ['Java', 'Spring Boot', 'Spring MVC', 'PostgreSQL'],
    metrics: [{value:'20+',label:'Franchises supported'},{value:'500+',label:'Orders handled per day'},{value:'End to end',label:'Placement through fulfillment and invoicing'}],
    context: 'A franchise network needed backend services to support multi-tenant operations, manage the order lifecycle, and give teams a useful view of daily performance. The work brought order management and operational analytics into a consistent set of services and APIs.',
    contributions: [
      {title:'Services across the franchise network',text:'Designed Java Spring Boot services and REST APIs supporting multi-tenant operations across more than 20 franchises.'},
      {title:'The complete order lifecycle',text:'Developed order-management modules using Spring MVC, covering placement, fulfillment, invoicing, and real-time status updates.'},
      {title:'Operational visibility',text:'Built daily, weekly, monthly, and all-time analytics using optimized PostgreSQL queries and API-level aggregation.'},
      {title:'Reliability in the details',text:'Improved SQL queries, filtering, and pagination, alongside centralized exception handling, structured logging, validation, and unit testing.'},
    ],
    outcome: 'The backend supported operations across 20+ franchises and order-management modules handling 500+ orders per day. Analytics APIs gave teams visibility across time periods, while validation, error handling, and testing supported reliability.',
    flow: [{name:'Place',detail:'Order creation and validation'},{name:'Fulfill',detail:'Operational status updates'},{name:'Invoice',detail:'Order-to-invoice workflow'},{name:'Analyze',detail:'Aggregated operational data'}],
  },
  {
    slug: 'energy-communication', number: '03', title: 'Energy-market communication',
    headline: 'Complex rules. Clear communication.',
    description: 'Microservices and rule-driven EDIFACT validation for regulated energy-market workflows, with an AI sidecar in development.',
    company: 'Leitnetz UG', period: 'May 2026 — Present', role: 'Software Engineer', status: 'Ongoing work',
    tags: ['Java', 'Spring Boot', 'PostgreSQL', 'Liquibase', 'EDIFACT'],
    metrics: [{value:'3 formats',label:'UTILMD, MSCONS, and INVOIC'},{value:'AHB / MIG',label:'Compliance-focused validation'},{value:'AI sidecar',label:'Validation and error analysis integration'}],
    context: 'Regulated energy-market communication requires precise business rules, valid message structures, and auditable data. At Leitnetz, my current work focuses on translating these requirements into maintainable microservices and backend workflows.',
    contributions: [
      {title:'Services around business rules',text:'Designing Java Spring Boot microservices and REST APIs for regulated energy-market communication.'},
      {title:'Rule-driven message validation',text:'Building EDIFACT processing and validation flows for UTILMD, MSCONS, and INVOIC messages, with a focus on AHB/MIG compliance and data integrity.'},
      {title:'Traceable workflow state',text:'Implementing persistence with PostgreSQL and JPA/Hibernate, with Liquibase-managed schema changes for reliable workflow state tracking.'},
      {title:'AI-assisted analysis',text:'Integrating an LLM/agentic AI sidecar for message validation and error analysis, while contributing to API contracts, authentication, authorization, and service integration.'},
    ],
    outcome: 'This work is ongoing. The focus is maintainable message-processing workflows, reliable state tracking, and AI-assisted validation and error analysis. No quantified outcome is claimed for the ongoing AI integration.',
    flow: [{name:'Receive',detail:'Structured EDIFACT messages'},{name:'Validate',detail:'Business and compliance rules'},{name:'Track',detail:'Persistent workflow state'},{name:'Analyze',detail:'AI-assisted error analysis'}],
  },
];
