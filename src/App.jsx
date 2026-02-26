import React, { useState, useEffect, useRef } from 'react';
import {
  Code, Database, Globe, Mail, Phone, MapPin, Download,
  Github, Linkedin, ExternalLink, Plus, Trash2, Edit, Save, X,
  Menu, Sun, Moon, GraduationCap, BookOpen, Award, Server,
  Briefcase, Send, ChevronLeft, ChevronRight, Brain, ArrowRight,
  Code2,
} from 'lucide-react';
import img from '../src/assets/riyad.jpg';
import img1 from '../src/assets/riyad1.jpg';

const API_URL = 'https://my-portfolio-server-j9ag.onrender.com/api';

//  Fonts 
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { font-family: 'DM Sans', sans-serif; }
    .font-syne { font-family: 'Syne', sans-serif; }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #0a0f1e; }
    ::-webkit-scrollbar-thumb { background: #6366f1; border-radius: 3px; }

    /* Animations */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(30px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50%       { transform: translateY(-10px); }
    }
    @keyframes gradientShift {
      0%,100% { background-position: 0% 50%; }
      50%      { background-position: 100% 50%; }
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes pulse-ring {
      0%   { transform: scale(1);   opacity: 0.6; }
      100% { transform: scale(1.5); opacity: 0; }
    }
    @keyframes typewriter-blink {
      0%,100% { opacity: 1; }
      50%      { opacity: 0; }
    }

    .animate-fadeUp  { animation: fadeUp  0.7s ease both; }
    .animate-fadeIn  { animation: fadeIn  0.7s ease both; }
    .animate-float   { animation: float 3s ease-in-out infinite; }
    .animate-gradient {
      background-size: 200% 200%;
      animation: gradientShift 3s ease infinite;
    }
    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-300 { animation-delay: 0.3s; }
    .delay-400 { animation-delay: 0.4s; }
    .delay-500 { animation-delay: 0.5s; }
    .delay-600 { animation-delay: 0.6s; }

    /* Glow ring around avatar */
    .glow-ring {
      position: relative;
      border-radius: 50%;
    }
    .glow-ring::before {
      content: '';
      position: absolute;
      inset: -3px;
      border-radius: 50%;
      background: conic-gradient(from 0deg, #22d3ee, #6366f1, #ec4899, #22d3ee);
      animation: spin 4s linear infinite;
      z-index: 0;
    }
    .glow-ring > * { position: relative; z-index: 1; }

    /* Pulse rings */
    .pulse-ring::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 2px solid rgba(34,211,238,0.4);
      animation: pulse-ring 2s ease-out infinite;
    }

    /* Chip */
    .chip {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 5px 14px; border-radius: 999px;
      font-size: 0.75rem; font-weight: 500; letter-spacing: 0.04em;
      border: 1px solid rgba(34,211,238,0.25);
      background: rgba(34,211,238,0.07); color: #67e8f9;
    }

    /* Buttons */
    .btn-primary {
      background: linear-gradient(135deg, #0ea5e9, #6366f1);
      color: #fff; border-radius: 999px; padding: 12px 28px;
      font-weight: 600; font-size: 0.95rem; cursor: pointer; border: none;
      transition: transform 0.2s, box-shadow 0.2s;
      display: inline-flex; align-items: center; gap: 8px;
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(99,102,241,0.45); }

    .btn-outline {
      border: 1.5px solid rgba(255,255,255,0.2); background: transparent;
      color: #e2e8f0; border-radius: 999px; padding: 12px 28px;
      font-weight: 600; font-size: 0.95rem; cursor: pointer;
      transition: border-color 0.2s, background 0.2s;
      display: inline-flex; align-items: center; gap: 8px;
    }
    .btn-outline:hover { border-color: #22d3ee; background: rgba(34,211,238,0.07); }

    .btn-green {
      background: linear-gradient(135deg, #10b981, #059669);
      color: #fff; border-radius: 999px; padding: 12px 28px;
      font-weight: 600; font-size: 0.95rem; cursor: pointer; border: none;
      transition: transform 0.2s, box-shadow 0.2s;
      display: inline-flex; align-items: center; gap: 8px; text-decoration: none;
    }
    .btn-green:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(16,185,129,0.4); }

    /* Social buttons */
    .social-btn {
      width: 44px; height: 44px; border-radius: 50%;
      border: 1px solid rgba(255,255,255,0.12);
      display: flex; align-items: center; justify-content: center;
      color: #94a3b8; background: rgba(255,255,255,0.03);
      transition: all 0.2s; text-decoration: none;
    }
    .social-btn:hover { border-color: #22d3ee; color: #22d3ee; background: rgba(34,211,238,0.08); transform: translateY(-2px); }

    /* Stat card */
    .stat-card {
      text-align: center; padding: 16px 24px;
      border: 1px solid rgba(255,255,255,0.07); border-radius: 14px;
      background: rgba(255,255,255,0.03); backdrop-filter: blur(8px);
    }
    .stat-num { font-family: 'Syne', sans-serif; font-size: 1.6rem; font-weight: 800; color: #22d3ee; }
    .stat-label { font-size: 0.72rem; color: #64748b; letter-spacing: 0.08em; text-transform: uppercase; margin-top: 2px; }

    /* Section reveal */
    .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }

    /* Skill tag hover */
    .skill-tag { transition: transform 0.15s, box-shadow 0.15s; }
    .skill-tag:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.3); }

    /* Card hover */
    .card-hover { transition: transform 0.3s, box-shadow 0.3s; }
    .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }

    /* Typewriter cursor */
    .tw-cursor { animation: typewriter-blink 1s step-end infinite; }
  `}</style>
);

//Particle Canvas
function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3, dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.4 + 0.1,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34,211,238,${p.alpha})`; ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(34,211,238,${0.06 * (1 - dist / 100)})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />;
}

// Typewriter 
function Typewriter({ words }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[index % words.length];
    const speed = deleting ? 40 : 80;
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) setTimeout(() => setDeleting(true), 1800);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length === 0) { setDeleting(false); setIndex(i => i + 1); }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words]);
  return <span style={{ color: '#22d3ee' }}>{text}<span className="tw-cursor">|</span></span>;
}

// useReveal hook 
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// NavLink
const NavLink = ({ href, children, activeSection, scrollToSection, isDarkMode }) => (
  <button
    onClick={() => scrollToSection(href)}
    style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem', padding: '4px 0' }}
    className={`transition-colors duration-300 ${
      activeSection === href
        ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400'
        : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
    }`}
  >
    {children}
  </button>
);

// Main App 
function App() {
  const [projects, setProjects] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [projectForm, setProjectForm] = useState({ title: '', description: '', technologies: '', image: '', liveLink: '', githubLink: '' });
  const [editingProject, setEditingProject] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [formStatus, setFormStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [heroVisible, setHeroVisible] = useState(false);
  const projectsPerPage = 6;

  useReveal();

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const skills = {
    frontend: ['React', 'Next.js', 'Tailwind CSS', 'JavaScript', 'HTML5', 'CSS3'],
    backend: ['Node.js', 'Express.js', 'FastAPI', 'REST API', 'GraphQL', 'Auth & Authorization'],
    ai_ml: ['Machine Learning', 'NLP', 'Computer Vision', 'Image Recognition', 'Data Analysis', 'Python', 'scikit-learn'],
    database: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
    tools: ['Git', 'GitHub', 'Docker', 'AWS', 'Vercel', 'Postman', 'Figma', 'VS Code'],
  };

  const education = [
    { degree: 'B.Sc in Computer Science', institution: 'Daffodil International University', period: '2022 – 2026', status: 'Ongoing', icon: GraduationCap, color: 'purple' },
    { degree: 'Higher Secondary Certificate (HSC)', institution: 'Govt. Begum Nurunnahar Tarkabagis Honours College', period: '2019 – 2022', status: 'Completed', icon: BookOpen, color: 'pink' },
    { degree: 'Secondary School Certificate (SSC)', institution: 'Baikhtpur ML High School', period: 'Completed 2019', status: 'Completed', icon: BookOpen, color: 'blue' },
  ];

  const certifications = [
    { title: 'Complete Web Development Course', provider: 'Programming Hero', description: 'Comprehensive full-stack web development training covering MERN stack and modern web practices.', icon: Award },
    { title: 'Responsive Web Design', provider: 'Self-taught & Practice', description: 'Expert in creating responsive, mobile-first designs using modern CSS and Tailwind.', icon: Code },
  ];

const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/projects`);
      console.log('Response status:', res.status); // ← add
      if (!res.ok) { 
        console.log('Response not ok!'); // ← add
        setProjects([]); 
        return; 
      }
      const data = await res.json();
      console.log('Data received:', data); //
      console.log('Is array:', Array.isArray(data)); // 
      const gradients = ['from-purple-500 to-pink-500', 'from-blue-500 to-cyan-500', 'from-green-500 to-emerald-500'];
      setProjects(Array.isArray(data) ? data.map((p, i) => ({ ...p, gradient: gradients[i % 3] })) : []);
    } catch(err) { 
      console.log('Fetch error:', err); // 
      setProjects([]); 
    }
    finally { setLoading(false); }
};

  useEffect(() => {
    fetchProjects();
    const handleScroll = () => {
      const sections = ['home', 'about', 'education', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) { setActiveSection(section); break; }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setIsMenuOpen(false); };

  const handleAdminLogin = () => {
    if (adminPassword === 'admin123') { setIsAdmin(true); setShowAdminLogin(false); setAdminPassword(''); }
    else alert('Invalid password');
  };

  const handleProjectFormChange = e => setProjectForm({ ...projectForm, [e.target.name]: e.target.value });
  const handleContactFormChange = e => setContactForm({ ...contactForm, [e.target.name]: e.target.value });

  const handleAddProject = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      const techArray = projectForm.technologies.split(',').map(t => t.trim()).filter(Boolean);
      const res = await fetch(`${API_URL}/projects`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...projectForm, technologies: techArray }) });
      if (res.ok) { fetchProjects(); setProjectForm({ title: '', description: '', technologies: '', image: '', liveLink: '', githubLink: '' }); }
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      const techArray = projectForm.technologies.split(',').map(t => t.trim()).filter(Boolean);
      const res = await fetch(`${API_URL}/projects/${editingProject}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...projectForm, technologies: techArray }) });
      if (res.ok) { fetchProjects(); setProjectForm({ title: '', description: '', technologies: '', image: '', liveLink: '', githubLink: '' }); setEditingProject(null); }
    } catch (err) { console.error(err); }
    setLoading(false);
  };
  const handleDeleteProject = async (id) => {
    if (window.confirm('Delete this project?')) {
      try { await fetch(`${API_URL}/projects/${id}`, { method: 'DELETE' }); fetchProjects(); } catch (err) { console.error(err); }
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project._id);
    setProjectForm({ title: project.title, description: project.description, technologies: project.technologies.join(', '), image: project.image, liveLink: project.liveLink, githubLink: project.githubLink });
    document.getElementById('admin-panel')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) { setFormStatus('error'); return; }
    setFormStatus('sending');
    try {
      const res = await fetch(`${API_URL}/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(contactForm) });
      if (res.ok) { setFormStatus('success'); setContactForm({ name: '', email: '', message: '' }); }
      else setFormStatus('error');
    } catch { setFormStatus('error'); }
    finally { setTimeout(() => setFormStatus(''), 3000); }
  };

  // Hero fade helper
  const fu = (delay) => ({
    opacity: heroVisible ? 1 : 0,
    transform: heroVisible ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  const dark = isDarkMode;
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const currentProjects = projects.slice((currentPage - 1) * projectsPerPage, currentPage * projectsPerPage);

  const colorMap = {
    purple: { card: 'from-purple-500/20 to-purple-600/20 border-purple-500/30', icon: 'text-purple-400' },
    pink:   { card: 'from-pink-500/20 to-pink-600/20 border-pink-500/30',       icon: 'text-pink-400' },
    blue:   { card: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',       icon: 'text-blue-400' },
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${dark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <GlobalStyles />

      {/* NAV*/}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${dark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <span className="font-syne text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">NR.</span>
            <div className="hidden md:flex space-x-8 items-center">
              {['home','about','education','skills','projects','contact'].map(s => (
                <NavLink key={s} href={s} activeSection={activeSection} scrollToSection={scrollToSection} isDarkMode={dark}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </NavLink>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setIsDarkMode(!dark)} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                {dark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-700" />}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className={`md:hidden ${dark ? 'bg-gray-800' : 'bg-white'} shadow-xl border-t ${dark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="px-6 py-4 space-y-4 flex flex-col">
              {['home','about','education','skills','projects','contact'].map(s => (
                <NavLink key={s} href={s} activeSection={activeSection} scrollToSection={scrollToSection} isDarkMode={dark}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ADMIN LOGIN MODAL  */}
      {showAdminLogin && !isAdmin && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] backdrop-blur-sm">
          <div className={`p-8 rounded-2xl max-w-md w-full mx-4 ${dark ? 'bg-gray-800' : 'bg-white'} shadow-2xl`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-syne text-2xl font-bold">Admin Login</h3>
              <button onClick={() => setShowAdminLogin(false)} className="hover:text-red-400 transition-colors"><X size={22} /></button>
            </div>
            <input type="password" placeholder="Enter admin password" value={adminPassword}
              onChange={e => setAdminPassword(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleAdminLogin()}
              className={`w-full p-3 rounded-xl mb-4 border focus:outline-none focus:border-blue-500 transition-colors ${dark ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300 text-gray-900'}`}
            />
            <button onClick={handleAdminLogin} className="w-full btn-primary justify-center">Login</button>
          </div>
        </div>
      )}

      {/*HERO */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #020817 0%, #0a0f1e 50%, #060d1a 100%)' }}>
        {/* Ambient glows */}
        <div style={{ position:'absolute', top:'8%', left:'3%', width:420, height:420, borderRadius:'50%', background:'radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'8%', right:'3%', width:360, height:360, borderRadius:'50%', background:'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)', pointerEvents:'none' }} />
        <ParticleCanvas />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Status */}
          <div style={fu(0)} className="mb-6 flex justify-center">
            <span className="chip">
              <span style={{ width:7, height:7, borderRadius:'50%', background:'#4ade80', display:'inline-block', boxShadow:'0 0 6px #4ade80' }} />
              Available for Remote Work & Partnerships
            </span>
          </div>

          {/* Avatar */}
          <div style={{ ...fu(0.1), display:'flex', justifyContent:'center', marginBottom:28 }}>
            <div className="glow-ring pulse-ring animate-float" style={{ width:140, height:140 }}>
              <div style={{
                width:140, height:140, borderRadius:'50%',
                backgroundImage:`url(${img1})`,
                backgroundSize:'cover', backgroundPosition:'center',
                border:'3px solid #0a0f1e',
              }} />
            </div>
          </div>

          {/* Name */}
          <h1 className="font-syne" style={{ ...fu(0.2), fontSize:'clamp(2.4rem,7vw,4.5rem)', fontWeight:800, lineHeight:1.05, marginBottom:12, letterSpacing:'-0.02em', color:'#f8fafc' }}>
            MD. Naymur Rahman
          </h1>

          {/* Typewriter */}
          <h2 style={{ ...fu(0.3), fontSize:'clamp(1.1rem,3vw,1.5rem)', fontWeight:400, marginBottom:20, color:'#94a3b8', minHeight:'2rem' }}>
            <Typewriter words={['Full Stack Developer', 'AI & ML Engineer', 'FastAPI Specialist', 'React Developer']} />
          </h2>

          {/* Bio */}
          <p style={{ ...fu(0.4), fontSize:'1.05rem', color:'#64748b', maxWidth:540, margin:'0 auto 32px', lineHeight:1.75 }}>
            Building intelligent, scalable web applications — from sleek React interfaces
            to ML-powered backends with FastAPI. I turn complex problems into production-ready solutions.
          </p>

          {/* Stats */}
          <div style={{ ...fu(0.45), display:'flex', justifyContent:'center', gap:16, marginBottom:36, flexWrap:'wrap' }}>
            {[{ num:'10+', label:'Projects Built' }, { num:'3+', label:'Technologies' }, { num:'ML', label:'AI Capable' }].map(s => (
              <div key={s.label} className="stat-card">
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ ...fu(0.5), display:'flex', flexWrap:'wrap', justifyContent:'center', gap:12, marginBottom:32 }}>
            <button onClick={() => scrollToSection('contact')} className="btn-primary">Hire Me <ArrowRight size={16} /></button>
            <button onClick={() => scrollToSection('projects')} className="btn-outline"><Code2 size={16} /> View Projects</button>
            <a href="/MD.Naymur Rahman.pdf" download className="btn-green"><Download size={16} /> Download CV</a>
          </div>

          {/* Socials */}
          <div style={{ ...fu(0.6), display:'flex', justifyContent:'center', gap:12 }}>
            <a href="https://github.com/rahman2220510189" target="_blank" rel="noopener noreferrer" className="social-btn"><Github size={20} /></a>
            <a href="https://www.linkedin.com/in/md-naymur-rahman-08300834b" target="_blank" rel="noopener noreferrer" className="social-btn"><Linkedin size={20} /></a>
            <a href="mailto:rahman22205101894@diu.edu.bd" className="social-btn"><Mail size={20} /></a>
          </div>
        </div>
      </section>

      {/* ABOUT  */}
      <section id="about" className={`py-20 px-4 ${dark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="reveal font-syne text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 space-y-6">
              <p className={`reveal text-lg leading-relaxed ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                Hi! I'm <span className="text-purple-400 font-semibold">Naymur</span>, a passionate Full-Stack & AI Developer
                building modern, scalable web applications. I specialise in the MERN stack and Python-powered ML backends.
              </p>
              <p className={`reveal text-lg leading-relaxed delay-100 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                I've built numerous self-driven projects spanning web development and machine learning — from NLP systems
                to computer vision pipelines. Every project sharpens my skills in both frontend craft and backend architecture.
              </p>
              <p className={`reveal text-lg leading-relaxed delay-200 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                I'm actively seeking international remote opportunities and agency partnerships where I can deliver intelligent,
                production-grade solutions and keep growing as an engineer.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                {[{ Icon: Code, color: 'text-blue-500', num: '10+', label: 'Projects Built' },
                  { Icon: Server, color: 'text-purple-500', num: '2+', label: 'Years Learning' }].map(({ Icon, color, num, label }) => (
                  <div key={label} className={`reveal card-hover p-6 rounded-xl ${dark ? 'bg-gray-900' : 'bg-gray-100'}`}>
                    <Icon size={36} className={`${color} mb-4`} />
                    <h3 className="font-syne text-2xl font-bold mb-1">{num}</h3>
                    <p className="text-gray-400">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2 reveal">
              <div className="w-full h-96 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-1 shadow-2xl">
                <div className="w-full h-full rounded-2xl" style={{ backgroundImage:`url(${img})`, backgroundSize:'cover', backgroundPosition:'center' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION  */}
      <section id="education" className={`py-20 px-4 ${dark ? 'bg-gray-900/60' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="reveal font-syne text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Education & Certifications
          </h2>

          <h3 className={`reveal text-2xl font-bold mb-6 text-center ${dark ? 'text-gray-200' : 'text-gray-800'}`}>Academic Background</h3>
          <div className="space-y-5 mb-14">
            {education.map((edu, i) => {
              const Icon = edu.icon;
              const c = colorMap[edu.color];
              return (
                <div key={i} className={`reveal card-hover bg-gradient-to-r ${c.card} border rounded-2xl p-6 sm:p-8`} style={{ animationDelay:`${i*0.1}s` }}>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className={`p-4 rounded-xl ${dark ? 'bg-gray-800/60' : 'bg-gray-200/60'} ${c.icon}`}>
                      <Icon size={32} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold mb-1">{edu.degree}</h4>
                      <p className={`mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{edu.institution}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className={`text-sm px-3 py-1 rounded-full ${dark ? 'text-gray-400 bg-gray-800/50' : 'text-gray-600 bg-gray-200'}`}>{edu.period}</span>
                        <span className={`text-sm px-3 py-1 rounded-full font-semibold ${edu.status === 'Ongoing' ? 'text-purple-400 bg-purple-500/20' : 'text-green-400 bg-green-500/20'}`}>{edu.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <h3 className={`reveal text-2xl font-bold mb-6 text-center ${dark ? 'text-gray-200' : 'text-gray-800'}`}>Professional Training</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {certifications.map((cert, i) => {
              const Icon = cert.icon;
              return (
                <div key={i} className={`reveal card-hover border border-blue-500/20 rounded-2xl p-6 ${dark ? 'bg-gray-800/50' : 'bg-white'}`}>
                  <div className="flex items-start gap-4 mb-3">
                    <div className="bg-blue-600/20 p-3 rounded-xl"><Icon size={24} className="text-blue-400" /></div>
                    <div>
                      <h4 className="text-lg font-bold mb-1">{cert.title}</h4>
                      <p className="text-blue-400 text-sm">{cert.provider}</p>
                    </div>
                  </div>
                  <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{cert.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SKILLS*/}
      <section id="skills" className={`py-20 px-4 ${dark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="reveal font-syne text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {[
              { key:'frontend', label:'Frontend', Icon:Code,     grad:'from-blue-500 to-cyan-500',    tagColor:'text-blue-400 bg-blue-500/20' },
              { key:'backend',  label:'Backend',  Icon:Server,   grad:'from-green-500 to-emerald-500', tagColor:'text-green-400 bg-green-500/20' },
              { key:'database', label:'Database', Icon:Database, grad:'from-purple-500 to-pink-500',   tagColor:'text-purple-400 bg-purple-500/20' },
              { key:'tools',    label:'Tools & DevOps', Icon:Briefcase, grad:'from-orange-500 to-red-500', tagColor:'text-orange-400 bg-orange-500/20' },
            ].map(({ key, label, Icon, grad, tagColor }, i) => (
              <div key={key} className={`reveal card-hover p-6 rounded-2xl ${dark ? 'bg-gray-900' : 'bg-gray-100'} shadow-xl`} style={{ animationDelay:`${i*0.08}s` }}>
                <div className={`bg-gradient-to-r ${grad} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">{label}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills[key].map((s, j) => (
                    <span key={j} className={`skill-tag px-3 py-1 ${tagColor} rounded-full text-sm cursor-default`}>{s}</span>
                  ))}
                </div>
              </div>
            ))}

            {/* AI/ML — highlighted */}
            <div className={`reveal card-hover p-6 rounded-2xl ${dark ? 'bg-gray-900' : 'bg-gray-100'} shadow-xl relative overflow-hidden`}>
              <div className="absolute -top-6 -right-6 w-28 h-28 bg-yellow-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-orange-500/10 rounded-full blur-xl pointer-events-none" />
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Brain size={22} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-1">AI & Machine Learning</h3>
              <p className="text-xs text-yellow-500 mb-4 font-semibold tracking-wide">★ HIGHLIGHT SKILL · LEARNING & BUILDING</p>
              <div className="flex flex-wrap gap-2">
                {skills.ai_ml.map((s, j) => (
                  <span key={j} className="skill-tag px-3 py-1 text-yellow-400 bg-yellow-500/20 rounded-full text-sm cursor-default">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ────────────────────────────────────────────────────── */}
   
          <section id="projects" className={`py-20 px-4 ${dark ? 'bg-gray-900/60' : 'bg-gray-200'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="reveal font-syne text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Featured Projects
          </h2>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1,2,3,4,5,6].map(n => (
                <div key={n} className={`rounded-2xl overflow-hidden ${dark ? 'bg-gray-800' : 'bg-white'} animate-pulse`}>
                  <div className={`h-48 ${dark ? 'bg-gray-700' : 'bg-gray-300'}`} />
                  <div className="p-6 space-y-3">
                    <div className={`h-5 w-3/4 rounded ${dark ? 'bg-gray-700' : 'bg-gray-300'}`} />
                    <div className={`h-4 rounded ${dark ? 'bg-gray-700' : 'bg-gray-300'}`} />
                    <div className={`h-4 w-5/6 rounded ${dark ? 'bg-gray-700' : 'bg-gray-300'}`} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
             
              <div key={currentPage} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentProjects.map((project, i) => (
                  <div
                    key={project._id}
                    className={`card-hover rounded-2xl overflow-hidden ${dark ? 'bg-gray-800' : 'bg-white'}`}
                    style={{
                      opacity: 0,
                      animation: `fadeUp 0.5s ease forwards`,
                      animationDelay: `${i * 0.08}s`,
                    }}
                  >
                    <div className={`h-48 bg-gradient-to-r ${project.gradient} flex items-center justify-center overflow-hidden`}>
                      {project.image
                        ? <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                        : <Code size={56} className="text-white opacity-40" />}
                    </div>
                    <div className="p-6">
                      <h3 className="font-syne text-xl font-bold mb-2">{project.title}</h3>
                      <p className={`text-sm mb-4 leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, j) => (
                          <span key={j} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        {project.liveLink && (
                          <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm transition-colors">
                            <ExternalLink size={15} /> Live Demo
                          </a>
                        )}
                        {project.githubLink && (
                          <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm transition-colors">
                            <Github size={15} /> Source
                          </a>
                        )}
                      </div>
                      {isAdmin && (
                        <div className={`flex gap-2 mt-4 pt-4 border-t ${dark ? 'border-gray-700' : 'border-gray-200'}`}>
                          <button onClick={() => handleEditProject(project)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 p-2 rounded-lg flex items-center justify-center gap-1 text-sm font-semibold transition-colors">
                            <Edit size={14} /> Edit
                          </button>
                          <button onClick={() => handleDeleteProject(project._id)}
                            className="flex-1 bg-red-600 hover:bg-red-700 p-2 rounded-lg flex items-center justify-center gap-1 text-sm font-semibold transition-colors">
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-10">
                  <button
                    onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); scrollToSection('projects'); }}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-full transition-all ${dark ? 'bg-gray-700 hover:bg-gray-600 disabled:opacity-40' : 'bg-gray-200 hover:bg-gray-300 disabled:opacity-40'}`}>
                    <ChevronLeft size={20} />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                    <button key={n}
                      onClick={() => { setCurrentPage(n); scrollToSection('projects'); }}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                        n === currentPage
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                          : dark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                      }`}>
                      {n}
                    </button>
                  ))}

                  <button
                    onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); scrollToSection('projects'); }}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-full transition-all ${dark ? 'bg-gray-700 hover:bg-gray-600 disabled:opacity-40' : 'bg-gray-200 hover:bg-gray-300 disabled:opacity-40'}`}>
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ADMIN PANEL  */}
      {isAdmin && (
        <section id="admin-panel" className={`py-20 px-4 ${dark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-syne text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h2>
              <button onClick={() => { setIsAdmin(false); setEditingProject(null); }} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl transition font-semibold text-white text-sm">Logout</button>
            </div>
            <div className={`${dark ? 'bg-gray-900' : 'bg-gray-100'} p-8 rounded-2xl shadow-xl space-y-4`}>
              {['title','description','technologies','image','liveLink','githubLink'].map(field => (
                field === 'description'
                  ? <textarea key={field} name={field} placeholder={field.charAt(0).toUpperCase()+field.slice(1)} value={projectForm[field]} onChange={handleProjectFormChange}
                      className={`w-full p-3 rounded-xl h-32 border focus:outline-none focus:border-blue-500 transition-colors resize-none ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />
                  : <input key={field} type={['image','liveLink','githubLink'].includes(field) ? 'url' : 'text'} name={field}
                      placeholder={{ title:'Project Title', technologies:'Technologies (comma separated)', image:'Image URL (optional)', liveLink:'Live Link (optional)', githubLink:'GitHub Link (optional)' }[field]}
                      value={projectForm[field]} onChange={handleProjectFormChange}
                      className={`w-full p-3 rounded-xl border focus:outline-none focus:border-blue-500 transition-colors ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />
              ))}
              <div className="flex gap-3">
                <button onClick={editingProject ? handleUpdateProject : handleAddProject} disabled={loading}
                  className="btn-primary flex-1 justify-center disabled:opacity-50">
                  {loading ? 'Processing...' : editingProject ? <><Save size={16}/> Update</> : <><Plus size={16}/> Add Project</>}
                </button>
                {editingProject && (
                  <button onClick={() => { setEditingProject(null); setProjectForm({ title:'',description:'',technologies:'',image:'',liveLink:'',githubLink:'' }); }}
                    className={`px-6 py-3 rounded-full font-semibold transition ${dark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'}`}>Cancel</button>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/*  CONTACT */}
      <section id="contact" className={`py-20 px-4 ${dark ? 'bg-gray-900/60' : 'bg-gray-100'}`}>
        <div className="max-w-4xl mx-auto">
          <h2 className="reveal font-syne text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className={`reveal p-8 rounded-2xl shadow-2xl ${dark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <h3 className="font-syne text-2xl font-bold mb-2">Contact Information</h3>
                {[
                  { Icon: Mail, label:'Email', value:'rahman22205101894@diu.edu.bd' },
                  { Icon: Phone, label:'Phone', value:'+880 1749455326' },
                  { Icon: MapPin, label:'Location', value:'Savar, Dhaka, Bangladesh' },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="bg-purple-600/20 p-3 rounded-xl"><Icon size={22} className="text-purple-400" /></div>
                    <div>
                      <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
                      <p className="font-semibold text-sm">{value}</p>
                    </div>
                  </div>
                ))}
                <div className="flex gap-3 pt-2">
                  <a href="https://github.com/rahman2220510189" target="_blank" rel="noopener noreferrer" className="social-btn"><Github size={20} /></a>
                  <a href="https://www.linkedin.com/in/md-naymur-rahman-08300834b" target="_blank" rel="noopener noreferrer" className="social-btn"><Linkedin size={20} /></a>
                  <a href="mailto:rahman22205101894@diu.edu.bd" className="social-btn"><Mail size={20} /></a>
                </div>
              </div>

              <div className="space-y-4">
                {['name','email','message'].map(field => (
                  field === 'message'
                    ? <textarea key={field} name={field} placeholder="Your Message" value={contactForm[field]} onChange={handleContactFormChange}
                        className={`w-full p-3 rounded-xl border h-36 focus:outline-none focus:border-blue-500 transition-colors resize-none ${dark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-gray-100 border-gray-300 text-gray-900'}`} />
                    : <input key={field} type={field==='email'?'email':'text'} name={field} placeholder={field.charAt(0).toUpperCase()+field.slice(1)} value={contactForm[field]} onChange={handleContactFormChange}
                        className={`w-full p-3 rounded-xl border focus:outline-none focus:border-blue-500 transition-colors ${dark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-gray-100 border-gray-300 text-gray-900'}`} />
                ))}
                <button onClick={handleContactSubmit} disabled={formStatus==='sending'} className="btn-primary w-full justify-center disabled:opacity-50">
                  {formStatus==='sending' ? 'Sending...' : <><Send size={18}/> Send Message</>}
                </button>
                {formStatus==='success' && <p className="text-center text-green-400 text-sm font-semibold">✓ Message sent successfully!</p>}
                {formStatus==='error'   && <p className="text-center text-red-400 text-sm">Please fill in all fields.</p>}
              </div>
            </div>
          </div>
        </div>
      </section>

     
      <footer className={`py-10 px-4 text-center border-t ${dark ? 'bg-gray-900 border-purple-500/20' : 'bg-gray-200 border-gray-300'}`}>
        <div className="max-w-7xl mx-auto">
          <p className="font-syne text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">NR.</p>
          <p className={`text-sm mb-1 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>© 2024 MD. Naymur Rahman. All rights reserved.</p>
          <p className={`text-xs mt-1 ${dark ? 'text-gray-600' : 'text-gray-500'}`}>Built with React · Tailwind CSS · Node.js · MongoDB</p>
          <div className="flex justify-center gap-4 mt-5">
            <a href="https://github.com/rahman2220510189" target="_blank" rel="noopener noreferrer" className="social-btn"><Github size={20} /></a>
            <a href="https://www.linkedin.com/in/md-naymur-rahman-08300834b" target="_blank" rel="noopener noreferrer" className="social-btn"><Linkedin size={20} /></a>
            <a href="mailto:rahman22205101894@diu.edu.bd" className="social-btn"><Mail size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;