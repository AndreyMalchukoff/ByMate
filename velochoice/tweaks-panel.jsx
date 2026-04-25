// Minimal tweaks panel for Velochoice design
const { useState, useContext, createContext } = React;

const TweaksContext = createContext(null);

function useTweaks(defaults) {
  const [tweaks, setTweaks] = useState(defaults);
  return { tweaks, setTweaks };
}

function TweaksPanel({ tweaks, setTweaks, children }) {
  const [open, setOpen] = useState(false);
  return (
    <TweaksContext.Provider value={{ tweaks, setTweaks }}>
      <div style={{position:'fixed', bottom:20, right:20, zIndex:1000}}>
        <button onClick={() => setOpen(o => !o)} style={{
          background:'var(--ink)', color:'var(--bg)', border:'none',
          padding:'10px 18px', borderRadius:'100px', cursor:'pointer',
          fontFamily:'var(--font-body)', fontSize:'13px', fontWeight:600,
          boxShadow:'0 4px 16px rgba(0,0,0,.3)'
        }}>
          {open ? '✕ Закрыть' : '⚙ Tweaks'}
        </button>
        {open && (
          <div style={{
            position:'absolute', bottom:'52px', right:0,
            background:'#1a1a1a', border:'1px solid rgba(255,255,255,.1)',
            borderRadius:'16px', padding:'20px', width:'280px',
            maxHeight:'80vh', overflowY:'auto',
            boxShadow:'0 16px 48px rgba(0,0,0,.5)'
          }}>
            {children}
          </div>
        )}
      </div>
    </TweaksContext.Provider>
  );
}

function TweakSection({ title, children }) {
  return (
    <div style={{marginBottom:'20px'}}>
      <div style={{
        fontSize:'11px', fontWeight:700, letterSpacing:'.1em',
        textTransform:'uppercase', color:'rgba(246,245,241,.35)', marginBottom:'12px'
      }}>{title}</div>
      {children}
    </div>
  );
}

function TweakText({ id, label }) {
  const { tweaks, setTweaks } = useContext(TweaksContext);
  return (
    <div style={{marginBottom:'12px'}}>
      <label style={{display:'block', fontSize:'12px', color:'rgba(246,245,241,.5)', marginBottom:'4px'}}>{label}</label>
      <input
        value={tweaks[id] || ''}
        onChange={e => setTweaks(t => ({...t, [id]: e.target.value}))}
        style={{
          width:'100%', background:'rgba(255,255,255,.06)',
          border:'1.5px solid rgba(255,255,255,.1)', borderRadius:'8px',
          padding:'8px 12px', color:'#F6F5F1',
          fontFamily:'Inter, sans-serif', fontSize:'13px', outline:'none',
          boxSizing:'border-box'
        }}
      />
    </div>
  );
}

function TweakRadio({ id, label, options }) {
  const { tweaks, setTweaks } = useContext(TweaksContext);
  return (
    <div style={{marginBottom:'12px'}}>
      <label style={{display:'block', fontSize:'12px', color:'rgba(246,245,241,.5)', marginBottom:'8px'}}>{label}</label>
      <div style={{display:'flex', gap:'8px', flexWrap:'wrap'}}>
        {options.map(o => (
          <button key={o.value} type="button"
            onClick={() => setTweaks(t => ({...t, [id]: o.value}))}
            style={{
              padding:'6px 12px', borderRadius:'100px', border:'1.5px solid',
              borderColor: tweaks[id] === o.value ? 'var(--accent)' : 'rgba(255,255,255,.12)',
              background: tweaks[id] === o.value ? 'rgba(198,242,78,.12)' : 'transparent',
              color: tweaks[id] === o.value ? 'var(--accent)' : 'rgba(246,245,241,.6)',
              fontSize:'12px', cursor:'pointer', fontFamily:'Inter, sans-serif'
            }}
          >{o.label}</button>
        ))}
      </div>
    </div>
  );
}

function TweakColor({ id, label }) {
  const { tweaks, setTweaks } = useContext(TweaksContext);
  return (
    <div style={{marginBottom:'12px', display:'flex', alignItems:'center', gap:'10px'}}>
      <label style={{fontSize:'12px', color:'rgba(246,245,241,.5)', flex:1}}>{label}</label>
      <input type="color"
        value={tweaks[id] || '#C6F24E'}
        onChange={e => setTweaks(t => ({...t, [id]: e.target.value}))}
        style={{width:'36px', height:'28px', border:'none', background:'none', cursor:'pointer', borderRadius:'4px'}}
      />
    </div>
  );
}

function TweakToggle({ id, label }) {
  const { tweaks, setTweaks } = useContext(TweaksContext);
  const on = !!tweaks[id];
  return (
    <div style={{marginBottom:'12px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
      <label style={{fontSize:'12px', color:'rgba(246,245,241,.5)'}}>{label}</label>
      <button type="button"
        onClick={() => setTweaks(t => ({...t, [id]: !t[id]}))}
        style={{
          width:'40px', height:'22px', borderRadius:'11px', border:'none',
          background: on ? 'var(--accent)' : 'rgba(255,255,255,.15)',
          cursor:'pointer', position:'relative', transition:'background .2s'
        }}
      >
        <span style={{
          position:'absolute', top:'3px',
          left: on ? '21px' : '3px',
          width:'16px', height:'16px', borderRadius:'50%',
          background: on ? 'var(--ink)' : 'rgba(255,255,255,.5)',
          transition:'left .2s', display:'block'
        }}/>
      </button>
    </div>
  );
}
