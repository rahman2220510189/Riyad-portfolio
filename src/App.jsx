import React, { useState, useEffect } from 'react';
import { Camera, Code, Database, Globe, Mail, Phone, MapPin, Download, Github, Linkedin, ExternalLink, Plus, Trash2, Edit, Save, X, Menu, ChevronDown, GraduationCap, BookOpen, Award } from 'lucide-react';
// API Configuration
const API_URL = 'http://localhost:5000/api';

function App() {
  const [projects, setProjects] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  
  // Form states
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    technologies: '',
    image: '',
    liveLink: '',
    githubLink: ''
  });
  const [editingProject, setEditingProject] = useState(null);

  // Fetch projects on load
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_URL}/projects`);
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  const handleAdminLogin = () => {
    if (adminPassword === 'admin123') {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminPassword('');
    } else {
      alert('Invalid password');
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const techArray = projectForm.technologies.split(',').map(t => t.trim());
      const res = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...projectForm, technologies: techArray })
      });
      if (res.ok) {
        fetchProjects();
        setProjectForm({ title: '', description: '', technologies: '', image: '', liveLink: '', githubLink: '' });
      }
    } catch (err) {
      console.error('Error adding project:', err);
    }
    setLoading(false);
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const techArray = projectForm.technologies.split(',').map(t => t.trim());
      const res = await fetch(`${API_URL}/projects/${editingProject}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...projectForm, technologies: techArray })
      });
      if (res.ok) {
        fetchProjects();
        setProjectForm({ title: '', description: '', technologies: '', image: '', liveLink: '', githubLink: '' });
        setEditingProject(null);
      }
    } catch (err) {
      console.error('Error updating project:', err);
    }
    setLoading(false);
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await fetch(`${API_URL}/projects/${id}`, { method: 'DELETE' });
        fetchProjects();
      } catch (err) {
        console.error('Error deleting project:', err);
      }
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project._id);
    setProjectForm({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(', '),
      image: project.image,
      liveLink: project.liveLink,
      githubLink: project.githubLink
    });
    window.scrollTo({ top: document.getElementById('admin-panel').offsetTop, behavior: 'smooth' });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    alert('Message sent! (Connect email service for real sending)');
    setContactForm({ name: '', email: '', message: '' });
  };

  const skills = {
    frontend: ['React', 'Next.js', 'Tailwind CSS', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Redux'],
    backend: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'REST API', 'GraphQL'],
    tools: ['Git', 'GitHub', 'VS Code', 'Postman', 'Figma', 'Docker']
  };

    const education = [
    {
      degree: 'B.Sc in Computer Science',
      institution: 'Daffodil International University',
      period: '2022 - 2026',
      status: 'Ongoing',
      icon: GraduationCap,
      color: 'purple'
    },
    {
      degree: 'Higher Secondary Certificate (HSC)',
      institution: 'Govt. Begum Nurunnahar Tarkabagis Honours College',
      period: '2019 - 2022',
      status: 'Completed',
      icon: BookOpen,
      color: 'pink'
    },
    {
      degree: 'Secondary School Certificate (SSC)',
      institution: 'Baikhtpur ML High School',
      period: 'Completed 2019',
      status: 'Completed',
      icon: BookOpen,
      color: 'blue'
    }
  ];

  const certifications = [
    {
      title: 'Complete Web Development Course',
      provider: 'Programming Hero',
      description: 'Comprehensive full-stack web development training',
      icon: Award
    },
    {
      title: 'Responsive Web Design',
      provider: 'Self-taught & Practice',
      description: 'Expert in creating responsive, mobile-first designs',
      icon: Code
    }
  ];

  const closeMenu = () => setMobileMenuOpen(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-md z-50 border-b border-purple-500/20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Riyad
          </h1>
          <div className="flex gap-6">
            <a href="#home" className="hover:text-purple-400 transition">Home</a>
            <a href="#about" className="hover:text-purple-400 transition">About</a>
            <a href="#education" className="hover:text-purple-400 transition">Education</a>
            <a href="#projects" className="hover:text-purple-400 transition">Projects</a>
            <a href="#skills" className="hover:text-purple-400 transition">Skills</a>
            <a href="#contact" className="hover:text-purple-400 transition">Contact</a>
            <button 
              onClick={() => setShowAdminLogin(!showAdminLogin)}
              className="text-purple-400 hover:text-purple-300 transition"
            >
              Admin
            </button>
          </div>
        </div>
      </nav>

      {/* Admin Login Modal */}
      {showAdminLogin && !isAdmin && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Admin Login</h3>
              <button onClick={() => setShowAdminLogin(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <input
              type="password"
              placeholder="Enter admin password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
              className="w-full p-3 bg-gray-700 rounded-lg mb-4"
            />
            <button
              onClick={handleAdminLogin}
              className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded-lg transition"
            >
              Login
            </button>
            <p className="text-sm text-gray-400 mt-4">Default password: admin123</p>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id='home' className="min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8 animate-float">
            <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1">
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                <Camera className="w-24 h-24 text-purple-400" />
              </div>
            </div>
          </div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            MD. Naymur Rahman
          </h1>
          <p className="text-3xl mb-6 text-gray-300">Full-Stack Web Developer</p>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Crafting beautiful, responsive web applications with modern technologies. 
            Specialized in React, Node.js, and MongoDB.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="#contact" className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg font-semibold transition transform hover:scale-105">
              Hire Me
            </a>
            <a href="#projects" className="border border-purple-500 hover:bg-purple-500/20 px-8 py-3 rounded-lg font-semibold transition transform hover:scale-105">
              View Projects
            </a>
          </div>
          <div className="flex gap-6 justify-center mt-8">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <p className="text-lg text-gray-300 mb-6">
                Hi! I'm <span className="text-purple-400 font-semibold">Riyad</span>, a passionate Full-Stack Web Developer 
                with expertise in building modern, scalable web applications. I specialize in the MERN stack 
                (MongoDB, Express.js, React, Node.js) and love turning ideas into reality through clean, efficient code.
              </p>
              <p className="text-lg text-gray-300 mb-6">
                While I'm early in my professional journey, I've successfully completed numerous projects for clients, 
                delivering high-quality solutions that solve real-world problems. Each project has strengthened my 
                skills in both frontend and backend development.
              </p>
              <p className="text-lg text-gray-300 mb-6">
                I'm dedicated to continuous learning and staying updated with the latest web technologies. 
                My goal is to create seamless user experiences backed by robust, secure backend systems.
              </p>
              <a 
                href="/resume.pdf" 
                download 
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105"
              >
                <Download className="w-5 h-5" />
                Download CV
              </a>
            </div>
            <div className="order-1 md:order-2">
              <div className="w-full h-96 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-1">
                <div className="w-full h-full rounded-lg bg-gray-800 flex items-center justify-center">
                  <Camera className="w-32 h-32 text-purple-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education system */}
           <section id="education" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Education & Certifications
          </h2>
          
          {/* Academic Education */}
          <div className="mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-200">Academic Background</h3>
            <div className="space-y-6">
              {education.map((edu, index) => {
                const Icon = edu.icon;
                const colorClasses = {
                  purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
                  pink: 'from-pink-500/20 to-pink-600/20 border-pink-500/30',
                  blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30'
                };
                const iconColors = {
                  purple: 'text-purple-400',
                  pink: 'text-pink-400',
                  blue: 'text-blue-400'
                };
                
                return (
                  <div 
                    key={index} 
                    className={`bg-gradient-to-r ${colorClasses[edu.color]} border rounded-lg p-6 sm:p-8 transform hover:scale-105 transition-all duration-300`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className={`bg-gray-800/50 p-4 rounded-lg ${iconColors[edu.color]}`}>
                        <Icon className="w-8 h-8 sm:w-10 sm:h-10" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl sm:text-2xl font-bold mb-2">{edu.degree}</h4>
                        <p className="text-gray-300 text-base sm:text-lg mb-1">{edu.institution}</p>
                        <div className="flex flex-wrap gap-3 mt-2">
                          <span className="text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">
                            {edu.period}
                          </span>
                          <span className={`text-sm ${edu.status === 'Ongoing' ? 'text-purple-400 bg-purple-500/20' : 'text-green-400 bg-green-500/20'} px-3 py-1 rounded-full font-semibold`}>
                            {edu.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Certifications & Courses */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-200">Professional Training</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {certifications.map((cert, index) => {
                const Icon = cert.icon;
                return (
                  <div 
                    key={index}
                    className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-purple-500/20 rounded-lg p-6 hover:border-purple-500/50 transition-all transform hover:scale-105"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-purple-600/20 p-3 rounded-lg">
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="text-lg sm:text-xl font-bold mb-1">{cert.title}</h4>
                        <p className="text-purple-400 text-sm sm:text-base">{cert.provider}</p>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm sm:text-base">{cert.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 p-8 rounded-lg border border-purple-500/20 hover:border-purple-500/50 transition">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-8 h-8 text-purple-400" />
                <h3 className="text-2xl font-bold">Frontend</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.frontend.map(skill => (
                  <span key={skill} className="bg-purple-600/20 px-4 py-2 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gray-800/50 p-8 rounded-lg border border-purple-500/20 hover:border-purple-500/50 transition">
              <div className="flex items-center gap-3 mb-6">
                <Database className="w-8 h-8 text-pink-400" />
                <h3 className="text-2xl font-bold">Backend</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.backend.map(skill => (
                  <span key={skill} className="bg-pink-600/20 px-4 py-2 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gray-800/50 p-8 rounded-lg border border-purple-500/20 hover:border-purple-500/50 transition">
              <div className="flex items-center gap-3 mb-6">
                <Code className="w-8 h-8 text-blue-400" />
                <h3 className="text-2xl font-bold">Tools</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map(skill => (
                  <span key={skill} className="bg-blue-600/20 px-4 py-2 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            My Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <div key={project._id} className="bg-gray-800/50 rounded-lg overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition transform hover:scale-105">
                <div className="h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <Code className="w-16 h-16 text-purple-400" />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map(tech => (
                      <span key={tech} className="bg-purple-600/20 px-3 py-1 rounded-full text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm">
                        <ExternalLink className="w-4 h-4" /> Live
                      </a>
                    )}
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm">
                        <Github className="w-4 h-4" /> Code
                      </a>
                    )}
                  </div>
                  {isAdmin && (
                    <div className="flex gap-2 mt-4">
                      <button 
                        onClick={() => handleEditProject(project)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 p-2 rounded flex items-center justify-center gap-1"
                      >
                        <Edit className="w-4 h-4" /> Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteProject(project._id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 p-2 rounded flex items-center justify-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admin Panel */}
      {isAdmin && (
        <section id="admin-panel" className="py-20 px-4 bg-gray-900/50">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h2>
              <button 
                onClick={() => setIsAdmin(false)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg space-y-4">
              <input
                type="text"
                placeholder="Project Title"
                value={projectForm.title}
                onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                className="w-full p-3 bg-gray-700 rounded-lg"
                required
              />
              <textarea
                placeholder="Project Description"
                value={projectForm.description}
                onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                className="w-full p-3 bg-gray-700 rounded-lg h-32"
                required
              />
              <input
                type="text"
                placeholder="Technologies (comma separated: React, Node.js, MongoDB)"
                value={projectForm.technologies}
                onChange={(e) => setProjectForm({...projectForm, technologies: e.target.value})}
                className="w-full p-3 bg-gray-700 rounded-lg"
                required
              />
              <input
                type="url"
                placeholder="Image URL (optional)"
                value={projectForm.image}
                onChange={(e) => setProjectForm({...projectForm, image: e.target.value})}
                className="w-full p-3 bg-gray-700 rounded-lg"
              />
              <input
                type="url"
                placeholder="Live Link (optional)"
                value={projectForm.liveLink}
                onChange={(e) => setProjectForm({...projectForm, liveLink: e.target.value})}
                className="w-full p-3 bg-gray-700 rounded-lg"
              />
              <input
                type="url"
                placeholder="GitHub Link (optional)"
                value={projectForm.githubLink}
                onChange={(e) => setProjectForm({...projectForm, githubLink: e.target.value})}
                className="w-full p-3 bg-gray-700 rounded-lg"
              />
              <div className="flex gap-4">
                <button
                  onClick={editingProject ? handleUpdateProject : handleAddProject}
                  disabled={loading}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 p-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                >
                  {loading ? 'Processing...' : (
                    <>
                      {editingProject ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                      {editingProject ? 'Update Project' : 'Add Project'}
                    </>
                  )}
                </button>
                {editingProject && (
                  <button
                    onClick={() => {
                      setEditingProject(null);
                      setProjectForm({ title: '', description: '', technologies: '', image: '', liveLink: '', githubLink: '' });
                    }}
                    className="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
              <div className="flex items-center gap-4">
                <div className="bg-purple-600/20 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="font-semibold">riyad@example.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-purple-600/20 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <p className="font-semibold">+880 123 456 7890</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-purple-600/20 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="font-semibold">Savar, Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={contactForm.name}
                onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                className="w-full p-3 bg-gray-800 rounded-lg border border-purple-500/20 focus:border-purple-500 outline-none transition"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={contactForm.email}
                onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                className="w-full p-3 bg-gray-800 rounded-lg border border-purple-500/20 focus:border-purple-500 outline-none transition"
                required
              />
              <textarea
                placeholder="Your Message"
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                className="w-full p-3 bg-gray-800 rounded-lg border border-purple-500/20 focus:border-purple-500 outline-none transition h-32"
                required
              />
              <button
                onClick={handleContactSubmit}
                className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded-lg font-semibold transition transform hover:scale-105"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 text-center border-t border-purple-500/20">
        <p className="text-gray-400">
          © 2024 MD. Naymur Rahman (Riyad). All rights reserved.
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Built with React, Tailwind CSS, Node.js & MongoDB
        </p>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default App;