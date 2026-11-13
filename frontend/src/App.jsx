import { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import api from './api';

const groups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

function App() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('bd-user')) } catch { return null }
  });
  const logout = () => { localStorage.removeItem('bd-user'); setUser(null); };
  return <><header><Link className="brand" to="/">🩸 LifeDrop</Link><nav>
    <NavLink to="/">Home</NavLink><NavLink to="/donors">Find Donors</NavLink><NavLink to="/register-donor">Become a Donor</NavLink><NavLink to="/requests">Blood Requests</NavLink>
    {user ? <button className="navbutton" onClick={logout}>Logout</button> : <NavLink to="/login">Login</NavLink>}
  </nav></header><main><Routes>
    <Route path="/" element={<Home/>}/><Route path="/login" element={<Auth mode="login" onAuth={setUser}/>}/>
    <Route path="/signup" element={<Auth mode="register" onAuth={setUser}/>}/>
    <Route path="/donors" element={<Donors/>}/><Route path="/register-donor" element={<DonorForm/>}/>
    <Route path="/requests" element={<Requests/>}/><Route path="*" element={<Home/>}/>
  </Routes></main><footer>LifeDrop • Donate blood, share life</footer></>;
}
function Home(){return <section className="hero"><div className="hero-copy"><span className="eyebrow">BE SOMEONE'S LIFELINE</span><h1>Your blood can<br/><em>give life.</em></h1><p>Connect blood donors with people who need help. A small act of kindness can make a lifetime of difference.</p><div className="actions"><Link className="primary" to="/register-donor">Become a donor</Link><Link className="secondary" to="/donors">Find a donor</Link></div></div><div className="hero-art"><div className="drop">♥</div><div className="art-note"><strong>1 donation</strong><br/>can help save lives</div></div><div className="stats"><div><b>8</b><span>Blood groups</span></div><div><b>1 act</b><span>Can make a difference</span></div><div><b>Be a hero</b><span>Donate when eligible</span></div></div></section>}
function Auth({mode,onAuth}) {
 const nav=useNavigate(); const [form,setForm]=useState({name:'',email:'',password:''}); const [error,setError]=useState('');
 const submit=async e=>{e.preventDefault();setError('');try{const {data}=await api.post('/auth/'+mode,form);localStorage.setItem('bd-user',JSON.stringify(data));onAuth(data);nav('/');}catch(err){setError(err.response?.data?.message||'Could not connect. Is the backend running?')}};
 return <section className="panel narrow"><span className="eyebrow">WELCOME TO LIFEDROP</span><h2>{mode==='login'?'Login':'Create account'}</h2><form onSubmit={submit}>{mode==='register'&&<input placeholder="Full name" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>}<input type="email" placeholder="Email address" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/><input type="password" placeholder="Password" minLength="4" required value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/><button className="primary full">{mode==='login'?'Login':'Register'}</button></form>{error&&<p className="error">{error}</p>}<p className="muted">{mode==='login'?<>New here? <Link to="/signup">Create an account</Link></>:<>Already registered? <Link to="/login">Login</Link></>}</p></section>
}
function Donors(){
 const [items,setItems]=useState([]),[bloodGroup,setBlood]=useState(''),[city,setCity]=useState(''),[error,setError]=useState('');
 const load=async()=>{try{const {data}=await api.get('/donors/search',{params:{bloodGroup,city}});setItems(data);setError('')}catch{setError('Unable to load donors. Check backend and MongoDB.')}};
 useEffect(()=>{load()},[]);
 return <section><div className="section-head"><div><span className="eyebrow">COMMUNITY OF HEROES</span><h2>Find blood donors</h2></div><Link className="primary" to="/register-donor">Register as donor</Link></div><div className="filters"><select value={bloodGroup} onChange={e=>setBlood(e.target.value)}><option value="">All blood groups</option>{groups.map(g=><option key={g}>{g}</option>)}</select><input placeholder="Search city" value={city} onChange={e=>setCity(e.target.value)}/><button className="primary" onClick={load}>Search</button></div>{error&&<p className="error">{error}</p>}<div className="cards">{items.map(d=><article className="donor-card" key={d.id}><span className="blood">{d.bloodGroup}</span><h3>{d.fullName}</h3><p>📍 {d.city}</p><p>Age: {d.age}</p><p>Contact: {d.phone}</p><span className="available">● Available</span></article>)}</div>{!items.length&&!error&&<p className="empty">No donors found. Be the first to register!</p>}</section>
}
function DonorForm(){
 const [form,setForm]=useState({fullName:'',bloodGroup:'O+',city:'',phone:'',age:''}),[message,setMessage]=useState('');
 const submit=async e=>{e.preventDefault();try{await api.post('/donors',{...form,age:Number(form.age)});setMessage('Donor profile registered successfully!');setForm({fullName:'',bloodGroup:'O+',city:'',phone:'',age:''})}catch{setMessage('Could not save donor. Check backend and MongoDB.')}};
 return <section className="panel narrow"><span className="eyebrow">MAKE A DIFFERENCE</span><h2>Become a donor</h2><form onSubmit={submit}><input placeholder="Full name" required value={form.fullName} onChange={e=>setForm({...form,fullName:e.target.value})}/><select value={form.bloodGroup} onChange={e=>setForm({...form,bloodGroup:e.target.value})}>{groups.map(g=><option key={g}>{g}</option>)}</select><input placeholder="City" required value={form.city} onChange={e=>setForm({...form,city:e.target.value})}/><input placeholder="Phone number" required pattern="[0-9+ -]{8,15}" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/><input type="number" min="18" max="65" placeholder="Age" required value={form.age} onChange={e=>setForm({...form,age:e.target.value})}/><button className="primary full">Submit donor profile</button></form>{message&&<p className="success">{message}</p>}</section>
}
function Requests(){
 const [items,setItems]=useState([]),[message,setMessage]=useState('');
 const [form,setForm]=useState({patientName:'',bloodGroup:'O+',city:'',hospital:'',contact:''});
 const load=()=>api.get('/requests').then(r=>setItems(r.data)).catch(()=>setMessage('Unable to load requests. Check backend and MongoDB.'));
 useEffect(()=>{load()},[]);
 const submit=async e=>{e.preventDefault();try{await api.post('/requests',form);setMessage('Blood request submitted.');setForm({patientName:'',bloodGroup:'O+',city:'',hospital:'',contact:''});load()}catch{setMessage('Could not submit request.')}};
 return <section><div className="section-head"><div><span className="eyebrow">ASK THE COMMUNITY</span><h2>Blood requests</h2></div></div><div className="request-layout"><div className="panel"><h3>Post a blood request</h3><form onSubmit={submit}><input placeholder="Patient name" required value={form.patientName} onChange={e=>setForm({...form,patientName:e.target.value})}/><select value={form.bloodGroup} onChange={e=>setForm({...form,bloodGroup:e.target.value})}>{groups.map(g=><option key={g}>{g}</option>)}</select><input placeholder="City" required value={form.city} onChange={e=>setForm({...form,city:e.target.value})}/><input placeholder="Hospital" required value={form.hospital} onChange={e=>setForm({...form,hospital:e.target.value})}/><input placeholder="Contact number" required value={form.contact} onChange={e=>setForm({...form,contact:e.target.value})}/><button className="primary full">Submit request</button></form>{message&&<p className="success">{message}</p>}</div><div><h3>Recent requests</h3>{items.map(r=><article className="request-card" key={r.id}><span className="blood">{r.bloodGroup}</span><h3>{r.patientName}</h3><p>{r.hospital} • {r.city}</p><p>Contact: {r.contact}</p><small>{r.status}</small></article>)}{!items.length&&<p className="muted">No requests posted yet.</p>}</div></div></section>
}
export default App;
