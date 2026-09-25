import { useEffect, useId, useRef, useState } from 'react';
import { ArrowRight, Braces, Check, Code2, Database, GitBranch, LockKeyhole, Play, RotateCcw, Server } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import '../styles/workbench.css';

const layers = {
  api: { title: 'Agree on the shape of a request.', label: 'REST API', icon: Braces, tag: '01 / THE CONTRACT', tech: 'JSON · REST', copy: 'An endpoint names the operation and defines its input. The caller should know what to send and what to expect back.', event: 'POST /api/projects → request received' },
  security: { title: 'Check who is asking.', label: 'Security', icon: LockKeyhole, tag: '02 / ACCESS', tech: 'JWT · roles', copy: 'A JWT establishes identity. Roles determine whether that person is allowed to perform this operation.', event: 'Security filter → access authorized' },
  service: { title: 'Give business rules a home.', label: 'Java service', icon: Server, tag: '03 / THE LOGIC', tech: 'Spring Boot', copy: 'The service coordinates the operation. Keeping this logic out of controllers makes it easier to test and change.', event: 'Project service → business rules applied' },
  data: { title: 'Keep related writes together.', label: 'PostgreSQL', icon: Database, tag: '04 / THE DATA', tech: 'JPA · SQL', copy: 'The repository saves the result. A transaction keeps related writes together, so partial updates don’t escape.', event: 'Repository → transaction committed' },
};
type Layer = keyof typeof layers;
const sequence: Layer[] = ['api', 'security', 'service', 'data'];

const codeLines = [
  ['annotation', '@RestController'],
  ['annotation', '@RequestMapping("/api/projects")'],
  ['normal', 'class ProjectController {'],
  ['normal', '  private final ProjectService service;'],
  ['muted', '  // Constructor injection omitted'],
  ['normal', ''],
  ['annotation', '  @PostMapping'],
  ['normal', '  ResponseEntity<ProjectResult> create('],
  ['normal', '      @Valid @RequestBody ProjectInput input) {'],
  ['normal', '    var result = service.create(input);'],
  ['normal', '    return ResponseEntity.status(201)'],
  ['normal', '        .body(result);'],
  ['normal', '  }'],
  ['normal', '}'],
];

export default function SystemExplorer() {
  const [active, setActive] = useState<Layer>('service');
  const [tab, setTab] = useState('architecture');
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const detailId = useId();
  const detail = layers[active];
  const complete = step === sequence.length;

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function runRequest() {
    if (running) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setTab('architecture');
    setRunning(true);
    setHasRun(true);
    setStep(0);
    setActive('api');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reducedMotion ? 450 : 800;
    sequence.slice(1).forEach((layer, index) => {
      timers.current.push(setTimeout(() => {
        setActive(layer);
        setStep(index + 1);
      }, duration * (index + 1)));
    });
    timers.current.push(setTimeout(() => {
      setStep(sequence.length);
      setRunning(false);
    }, duration * sequence.length));
  }

  return <section className="workbench" aria-label="Illustrative backend request lifecycle">
    <div className="wb-chrome">
      <span className="wb-chrome-title"><GitBranch size={14} aria-hidden="true"/>Request lifecycle</span>
      <span className="wb-chrome-end">JAVA / SPRING</span>
    </div>
    <Tabs value={tab} onValueChange={setTab} className="wb-tabs">
      <div className="wb-toolbar">
        <TabsList className="wb-tablist" aria-label="Workbench view">
          <TabsTrigger value="architecture" className="wb-tab"><GitBranch size={15} aria-hidden="true"/> Architecture</TabsTrigger>
          <TabsTrigger value="source" className="wb-tab"><Code2 size={15} aria-hidden="true"/> Java</TabsTrigger>
        </TabsList>
        <Button className="wb-run" size="sm" onClick={runRequest} disabled={running} aria-label={running ? 'Request simulation is running' : hasRun ? 'Replay request simulation' : 'Run request simulation'}>
          {complete ? <RotateCcw size={13} aria-hidden="true"/> : <Play size={13} aria-hidden="true"/>}
          <span>{running ? 'Running' : complete ? 'Replay' : 'Run request'}</span>
        </Button>
      </div>
      <TabsContent value="architecture" className="wb-content">
        <div className="wb-canvas">
          <svg className="wb-connections" viewBox="0 0 500 240" preserveAspectRatio="none" fill="none" aria-hidden="true">
            <path className={`wb-line ${step > 0 ? 'wb-line-done' : ''}`} d="M128 56H372"/>
            <path className={`wb-line ${step > 1 ? 'wb-line-done' : ''}`} d="M372 56V158"/>
            <path className={`wb-line ${step > 2 ? 'wb-line-done' : ''}`} d="M372 158H128"/>
            <path className={`wb-line wb-line-return ${complete ? 'wb-line-done' : ''}`} d="M128 158V214H239"/>
            <path className="wb-arrow" d="M249 52l5 4-5 4M368 103l4 5 4-5M251 154l-5 4 5 4"/>
          </svg>
          {sequence.map((key, index) => {
            const item = layers[key];
            const Icon = item.icon;
            const isDone = step > index;
            return <button key={key} className={`wb-node wb-node-${key} ${active === key ? 'wb-node-selected' : ''} ${running && step === index ? 'wb-node-running' : ''}`} onClick={() => setActive(key)} aria-pressed={active === key} aria-controls={detailId} disabled={running}>
              <span className="wb-node-icon"><Icon size={20} strokeWidth={1.6} aria-hidden="true"/></span>
              <span className="wb-node-text"><strong>{item.label}</strong><small>{item.tech}</small></span>
              <span className={`wb-node-state ${isDone ? 'wb-state-done' : ''}`} aria-hidden="true">{isDone ? <Check size={11}/> : `0${index + 1}`}</span>
            </button>;
          })}
          <div className={`wb-response ${complete ? 'wb-response-done' : ''}`}><span/>{complete ? '201 Created' : 'response'}{complete && <Check size={13} aria-hidden="true"/>}</div>
        </div>
        <div className="wb-detail" id={detailId} aria-live={running ? 'off' : 'polite'} aria-atomic="true">
          <span className="wb-detail-tag">{detail.tag}</span>
          <h3>{detail.title}</h3>
          <p>{detail.copy}</p>
        </div>
      </TabsContent>
      <TabsContent value="source" className="wb-content wb-source">
        <div className="wb-file"><span><span className="wb-java-dot"/> ProjectController.java</span><span>JAVA</span></div>
        <div className="wb-code-scroll" tabIndex={0} role="region" aria-label="Illustrative Java controller code, scroll to explore">
          <pre className="wb-code"><code>{codeLines.map(([kind, line], index) => <span className={`wb-code-line wb-code-${kind}`} key={index}><span className="wb-line-number" aria-hidden="true">{index + 1}</span>{line || ' '}<br/></span>)}</code></pre>
        </div>
        <div className="wb-code-note"><Braces size={17} aria-hidden="true"/><p>A controller with one job.<br/><span>Illustrative code; the service handles the rules.</span></p></div>
      </TabsContent>
    </Tabs>
    <div className={`wb-console ${complete ? 'wb-console-complete' : ''}`} role="status" aria-live="polite" aria-atomic="true">
      <span className="wb-console-prompt" aria-hidden="true">›</span>
      <span>{complete ? '201 Created → request complete' : running ? layers[sequence[step]].event : 'Press run to follow a request through the layers.'}</span>
      {complete && <Check size={14} aria-hidden="true"/>}
    </div>
    <div className="wb-footer"><span>INTERACTIVE EXAMPLE</span><span className="wb-footer-hint">Select a layer to inspect <ArrowRight size={12} aria-hidden="true"/></span></div>
  </section>;
}
