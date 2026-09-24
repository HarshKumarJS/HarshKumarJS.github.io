import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { localPath } from '@/lib/links';

const links = [['Work', 'work'], ['Experience', 'experience'], ['Toolkit', 'skills'], ['About', 'about']] as const;

export default function Header() {
  const home = localPath();
  const [active, setActive] = useState('');
  const progress = useRef<HTMLDivElement>(null);
  const mobileDestination = useRef<string | null>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const maximum = document.documentElement.scrollHeight - window.innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${maximum > 0 ? window.scrollY / maximum : 0})`;
      const section = [...links, ['Contact', 'contact']].map(([,id])=>document.getElementById(id)).filter(Boolean).reverse().find(el=>el!.getBoundingClientRect().top <= 180);
      setActive(section?.id ?? '');
      frame = 0;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll);
    return () => { window.removeEventListener('scroll',onScroll); window.removeEventListener('resize',onScroll); cancelAnimationFrame(frame); };
  },[]);
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <div className="reading-progress" ref={progress} aria-hidden="true"/>
        <a className="wordmark" href={home} aria-label="Harsh Kumar — home"><span className="brand-mark">hk<span>.</span></span><span className="wordmark-text">harsh kumar<span className="wordmark-dot">.</span><small>SOFTWARE ENGINEER</small></span></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, id]) => <a key={id} href={`${home}#${id}`} aria-current={active===id?'location':undefined} className={active===id?'nav-active':''}>{label}</a>)}
        </nav>
        <a className="desktop-contact" href={`${home}#contact`}>Let’s talk <ArrowUpRight size={16} aria-hidden="true" /></a>
        <div className="mobile-nav">
          <Sheet>
            <SheetTrigger asChild><Button variant="outline" size="icon" aria-label="Open navigation"><Menu size={20}/></Button></SheetTrigger>
            <SheetContent side="right" className="mobile-sheet" onCloseAutoFocus={event => {
              const section = mobileDestination.current ? document.getElementById(mobileDestination.current) : null;
              mobileDestination.current = null;
              if (!section) return;
              event.preventDefault();
              section.scrollIntoView({ block: 'start' });
              const heading = section.querySelector('h2');
              if (heading) {
                heading.tabIndex = -1;
                heading.focus({ preventScroll: true });
              }
            }}>
              <SheetHeader><SheetTitle>Explore</SheetTitle><SheetDescription>The work and the person behind it.</SheetDescription></SheetHeader>
              <nav aria-label="Mobile navigation">
                {[...links, ['Contact', 'contact']].map(([label,id],i) => <SheetClose asChild key={id}><a href={`${home}#${id}`} onClick={() => { mobileDestination.current = id; }}><span>0{i+1}</span>{label}<ArrowUpRight size={20}/></a></SheetClose>)}
              </nav>
              <p className="mobile-signature">Harsh Kumar<span>Software engineer, based in Haryana.</span></p>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
