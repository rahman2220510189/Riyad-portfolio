import React, { useState, useEffect } from 'react';
import { 
    Camera, Code, Database, Globe, Mail, Phone, MapPin, Download, Github, 
    Linkedin, ExternalLink, Plus, Trash2, Edit, Save, X, Menu, Sun, Moon, 
    ChevronDown, GraduationCap, BookOpen, Award, Server, Briefcase, Send, ChevronLeft, ChevronRight 
} from 'lucide-react';
import img from '../src/assets/riyad.jpg'
import img1 from '../src/assets/riyad1.jpg'


const API_URL = 'https://my-portfolio-server-j9ag.onrender.com/api';

// Reusable Component for Navigation Link
const NavLink = ({ href, children, activeSection, scrollToSection, isDarkMode }) => (
    <button
        onClick={() => scrollToSection(href)}
        className={`transition-colors duration-300 font-semibold ${
            activeSection === href
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500' // Active Gradient
                : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
        }`}
    >
        {children}
    </button>
);

function App() {
    // States Preserved from Code-2
    const [projects, setProjects] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminPassword, setAdminPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showAdminLogin, setShowAdminLogin] = useState(false);
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

    // States Added from Code-1 for UI/UX
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true); // Default to Dark Mode
    const [activeSection, setActiveSection] = useState('home');
    const [formStatus, setFormStatus] = useState(''); 

    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 6;

    const skills = {
        frontend: ['React', 'Next.js', 'Tailwind CSS', 'JavaScript', 'TypeScript','Python', 'C', 'HTML5', 'CSS3', ], 
        backend: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'REST API', 'GraphQL', 'Authentication & Authorization'],
        database: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'], 
        tools: ['Git', 'GitHub', 'VS Code', 'Postman', 'Figma', 'Docker', 'AWS', 'Vercel']
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


    // Function to fetch projects (Preserved from Code-2)
    const fetchProjects = async () => {
        try {
            const res = await fetch(`${API_URL}/projects`);
            const data = await res.json();
            // Add a gradient property for better styling (Code-1 feature)
            const styledProjects = data.map((p, i) => ({
                ...p,
                gradient: i % 3 === 0 ? 'from-purple-500 to-pink-500' : 
                          i % 3 === 1 ? 'from-blue-500 to-cyan-500' : 
                          'from-green-500 to-emerald-500'
            }));
            setProjects(styledProjects);
        } catch (err) {
            console.error('Error fetching projects:', err);
        }
    };

    // Function to handle scroll and set active section (Added from Code-1)
    useEffect(() => {
        fetchProjects(); // Initial fetch
        
        const handleScroll = () => {
            // Merged section IDs from both codes
            const sections = ['home', 'about', 'education', 'skills', 'projects', 'admin-panel', 'contact']; 
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element && window.getComputedStyle(element).display !== 'none') { // Check if element exists and is visible
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Function to scroll to section (Added from Code-1)
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false);
        }
    };

    // Admin and CRUD Handlers (Preserved/Refined from Code-2)
    const handleAdminLogin = () => {
        if (adminPassword === 'admin123') {
            setIsAdmin(true);
            setShowAdminLogin(false);
            setAdminPassword('');
        } else {
            alert('Invalid password');
        }
    };

    const handleProjectFormChange = (e) => {
        setProjectForm({...projectForm, [e.target.name]: e.target.value});
    };

    const handleContactFormChange = (e) => {
        setContactForm({...contactForm, [e.target.name]: e.target.value});
    };

    const handleAddProject = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const techArray = projectForm.technologies.split(',').map(t => t.trim()).filter(t => t);
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
            const techArray = projectForm.technologies.split(',').map(t => t.trim()).filter(t => t);
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
        // Scroll to admin panel for editing
        window.scrollTo({ top: document.getElementById('admin-panel').offsetTop, behavior: 'smooth' });
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        if (!contactForm.name || !contactForm.email || !contactForm.message) return;

        setFormStatus('sending');
        
        // Simulating API call for form submission (Code-1 idea)
        setTimeout(() => {
            setFormStatus('success');
            setContactForm({ name: '', email: '', message: '' });
            setTimeout(() => setFormStatus(''), 3000);
        }, 1500);

    };
    
    // Theme classes
    const themeClasses = isDarkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-gray-50 text-gray-900';
    
    const sectionBgClass = isDarkMode 
        ? 'bg-gray-800' 
        : 'bg-white';
        
    const contactFormBg = isDarkMode 
        ? 'bg-gray-900' 
        : 'bg-gray-100';

    
    const totalPages = Math.ceil(projects.length / projectsPerPage);
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

    const paginate = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            // Scroll to the top of the projects section when paginating
            scrollToSection('projects');
        }
    };

    const renderPaginationButtons = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }

        return (
            <div className="flex justify-center items-center space-x-2 mt-8">
                {/* Previous Button */}
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-full transition-all duration-300 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 disabled:opacity-50' : 'bg-gray-200 hover:bg-gray-300 disabled:opacity-50'}`}
                >
                    <ChevronLeft size={20} />
                </button>

                {/* Page Numbers */}
                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm ${
                            number === currentPage
                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                                : isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                    >
                        {number}
                    </button>
                ))}

                {/* Next Button */}
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-full transition-all duration-300 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 disabled:opacity-50' : 'bg-gray-200 hover:bg-gray-300 disabled:opacity-50'}`}
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        );
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${themeClasses}`}>
            
            <nav className={`fixed w-full z-50 transition-all duration-300 ${isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-sm shadow-xl`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                            Riyad
                        </div>
                        
                        {/* Desktop Navigation */}
                        <div className="hidden md:flex space-x-8 items-center">
                            <NavLink href="home" activeSection={activeSection} scrollToSection={scrollToSection} isDarkMode={isDarkMode}>Home</NavLink>
                            <NavLink href="about" activeSection={activeSection} scrollToSection={scrollToSection} isDarkMode={isDarkMode}>About</NavLink>
                            <NavLink href="education" activeSection={activeSection} scrollToSection={scrollToSection} isDarkMode={isDarkMode}>Education</NavLink>
                            <NavLink href="skills" activeSection={activeSection} scrollToSection={scrollToSection} isDarkMode={isDarkMode}>Skills</NavLink>
                            <NavLink href="projects" activeSection={activeSection} scrollToSection={scrollToSection} isDarkMode={isDarkMode}>Projects</NavLink>
                            <NavLink href="contact" activeSection={activeSection} scrollToSection={scrollToSection} isDarkMode={isDarkMode}>Contact</NavLink>
                            
{/*                             <button 
                                onClick={() => setShowAdminLogin(!showAdminLogin)}
                                className={`ml-4 px-3 py-1 rounded-full text-sm font-semibold transition ${isDarkMode ? 'bg-purple-600 hover:bg-purple-500 text-white' : 'bg-purple-100 hover:bg-purple-200 text-purple-700'}`}
                            >
                                Admin
                            </button> */}
                        </div>
                        
                        <div className="flex items-center space-x-4">
                           
                            <button
                                onClick={() => setIsDarkMode(!isDarkMode)}
                                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                            >
                                {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-900" />}
                            </button>
                            
                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="md:hidden p-2"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
                
                {isMenuOpen && (
                    <div className={`md:hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                        <div className="px-4 py-3 space-y-3 flex flex-col"> 
                            {['home', 'about', 'education', 'skills', 'projects', 'contact'].map(section => (
                                <NavLink 
                                    key={section}
                                    href={section} 
                                    activeSection={activeSection} 
                                    scrollToSection={scrollToSection} 
                                    isDarkMode={isDarkMode}
                                >
                                    {section.charAt(0).toUpperCase() + section.slice(1)}
                                </NavLink>
                            ))}
{/*                             <button 
                                onClick={() => { setShowAdminLogin(!showAdminLogin); setIsMenuOpen(false); }}
                                className={`block w-full text-left py-2 px-0 font-semibold transition ${isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-700 hover:text-purple-900'}`}
                            >
                                Admin Login
                            </button> */}
                        </div>
                    </div>
                )}
            </nav>
            
            {showAdminLogin && !isAdmin && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60]">
                    <div className={`p-8 rounded-xl max-w-md w-full mx-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl transition-colors duration-300`}>
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
                            className={`w-full p-3 rounded-lg mb-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200 text-gray-900'}`}
                        />
                        <button
                            onClick={handleAdminLogin}
                            className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded-lg transition transform hover:scale-[1.02]"
                        >
                            Login
                        </button>
                        <p className={`text-sm mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Default password: admin123</p>
                    </div>
                </div>
            )}
            
            <section id='home' className="min-h-screen flex items-center justify-center pt-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="animate-fade-in">
                    <div className="mb-8 animate-float">
                <div className="w-60 h-60 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1 shadow-2xl">
                    <div 
                        className={`w-full h-full rounded-full ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
                        style={{
                            backgroundImage: `url(${img1})`,
                            backgroundSize: 'cover',        
                            backgroundPosition: 'center',   
                            backgroundRepeat: 'no-repeat'
                        }}>
                        
                    </div>
                </div>
            </div>
                        
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                            MD. Naymur Rahman
                        </h1>
                        <h2 className="text-2xl md:text-4xl font-semibold mb-4 text-gray-400">
                            Full Stack Web Developer
                        </h2>
                        <p className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                            Crafting scalable web applications with modern technologies. 
                            Passionate about creating elegant solutions to complex problems.
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                            >
                                Hire Me
                            </button>
                            <button
                                onClick={() => scrollToSection('projects')}
                                className={`px-8 py-3 border-2 ${isDarkMode ? 'border-white hover:bg-white hover:text-gray-900' : 'border-gray-900 hover:bg-gray-900 hover:text-white'} rounded-full font-semibold transition-all duration-300`}
                            >
                                View Projects
                            </button>
                            <a
                                href="/src/assets/MD. Naymur rahman.pdf"
                                download
                                className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <Download size={20} />
                                Download CV
                            </a>
                        </div>
                        
                        <div className="flex justify-center gap-6 mb-5">
                            <a href="https://github.com/rahman2220510189" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                                <Github size={28} />
                            </a>
                            <a href="www.linkedin.com/in/md-naymur-rahman-08300834b" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                                <Linkedin size={28} />
                            </a>
                            <a href="rahman22205101894@diu.edu.bd" className="hover:text-blue-500 transition-colors">
                                <Mail size={28} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section id="about" className={`py-20 px-4 ${sectionBgClass}`}>
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                        About Me
                    </h2>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1 space-y-6">
                            <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Hi! I'm <span className="text-purple-400 font-semibold">Riyad</span>, a passionate Full-Stack Web Developer 
                                with expertise in building modern, scalable web applications. I specialize in the MERN stack 
                                (MongoDB, Express.js, React, Node.js) and love turning ideas into reality through clean, efficient code.
                            </p>
                            <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                While I'm early in my professional journey, I've successfully completed numerous projects for clients, 
                                delivering high-quality solutions that solve real-world problems. Each project has strengthened my 
                                skills in both frontend and backend development.
                            </p>
                            <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                I'm dedicated to continuous learning and staying updated with the latest web technologies. 
                                My goal is to create seamless user experiences backed by robust, secure backend systems.
                            </p>
                            
                            <div className="grid grid-cols-2 gap-6 pt-4">
                                <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}>
                                    <Code size={40} className="text-blue-500 mb-4" />
                                    <h3 className="text-2xl font-bold mb-2">50+</h3>
                                    <p className="text-gray-400">Projects Completed</p>
                                </div>
                                <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}>
                                    <Server size={40} className="text-purple-500 mb-4" />
                                    <h3 className="text-2xl font-bold mb-2">2+</h3>
                                    <p className="text-gray-400">Years Experience</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="order-1 md:order-2">
                            <div className={`w-full h-96 rounded-xl mb-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-1 shadow-2xl`}>
                                <div className={`w-full h-full rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
                                   style={{
                                    backgroundImage: `url(${img})`,
                                    backgroundSize: 'cover',        
                                    backgroundPosition: 'center',   
                                    backgroundRepeat: 'no-repeat'
                                }}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="education" className={`py-16 sm:py-20 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-900/50' : 'bg-gray-100'}`}>
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                        Education & Certifications
                    </h2>
                    
                    <div className="mb-12">
                        <h3 className={`text-2xl sm:text-3xl font-bold mb-6 text-center ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Academic Background</h3>
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
                                        className={`bg-gradient-to-r ${colorClasses[edu.color]} border rounded-xl p-6 sm:p-8 transform hover:-translate-y-1 transition-all duration-300 ${isDarkMode ? 'shadow-xl' : 'shadow-md'}`}
                                    >
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-200/50'} ${iconColors[edu.color]}`}>
                                                <Icon className="w-8 h-8 sm:w-10 sm:h-10" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-xl sm:text-2xl font-bold mb-2">{edu.degree}</h4>
                                                <p className={`text-base sm:text-lg mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{edu.institution}</p>
                                                <div className="flex flex-wrap gap-3 mt-2">
                                                    <span className={`text-sm ${isDarkMode ? 'text-gray-400 bg-gray-800/50' : 'text-gray-600 bg-gray-200/50'} px-3 py-1 rounded-full`}>
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
                        <h3 className={`text-2xl sm:text-3xl font-bold mb-6 text-center ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Professional Training</h3>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {certifications.map((cert, index) => {
                                const Icon = cert.icon;
                                return (
                                    <div 
                                        key={index}
                                        className={`bg-gradient-to-br border border-blue-500/20 rounded-xl p-6 transition-all transform hover:-translate-y-1 ${isDarkMode ? 'from-gray-800/50 to-gray-700/50 hover:border-blue-500/50 shadow-xl' : 'from-gray-100/50 to-gray-200/50 hover:border-blue-500/50 shadow-md'}`}
                                    >
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="bg-blue-600/20 p-3 rounded-lg">
                                                <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" />
                                            </div>
                                            <div>
                                                <h4 className="text-lg sm:text-xl font-bold mb-1">{cert.title}</h4>
                                                <p className="text-blue-400 text-sm sm:text-base">{cert.provider}</p>
                                            </div>
                                        </div>
                                        <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{cert.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <section id="skills" className={`py-20 px-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                        Skills & Technologies
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Frontend */}
                        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}>
                            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                <Code size={24} className="text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Frontend</h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.frontend.map((skill, index) => (
                                    <span key={index} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}>
                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                <Server size={24} className="text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Backend</h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.backend.map((skill, index) => (
                                    <span key={index} className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}>
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                <Database size={24} className="text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Database</h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.database.map((skill, index) => (
                                    <span key={index} className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {/* Tools */}
                        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}>
                            <div className="bg-gradient-to-r from-orange-500 to-red-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                <Briefcase size={24} className="text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Tools & Others</h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.tools.map((skill, index) => (
                                    <span key={index} className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="projects" className={`py-20 px-4 ${isDarkMode ? 'bg-gray-900/50' : 'bg-gray-200'}`}>
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                        Featured Projects
                    </h2>
                    
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {currentProjects.map(project => (
                            <div 
                                key={project._id} 
                                className={`rounded-xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}
                            >
                                <div className={`h-48 bg-gradient-to-r ${project.gradient} flex items-center justify-center`}>
                                    {project.image ? (
                                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <Code size={64} className="text-white opacity-50" />
                                    )}
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                                    <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{project.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-4">
                                        {project.liveLink && (
                                            <a
                                                href={project.liveLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-blue-500 hover:text-blue-400 transition-colors"
                                            >
                                                <ExternalLink size={18} />
                                                Live Demo
                                            </a>
                                        )}
                                        {project.githubLink && (
                                            <a
                                                href={project.githubLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-purple-500 hover:text-purple-400 transition-colors"
                                            >
                                                <Github size={18} />
                                                Source Code
                                            </a>
                                        )}
                                    </div>
                                    {isAdmin && (
                                        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-700/50">
                                            <button 
                                                onClick={() => handleEditProject(project)}
                                                className="flex-1 bg-blue-600 hover:bg-blue-700 p-2 rounded flex items-center justify-center gap-1 text-sm font-semibold"
                                            >
                                                <Edit className="w-4 h-4" /> Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteProject(project._id)}
                                                className="flex-1 bg-red-600 hover:bg-red-700 p-2 rounded flex items-center justify-center gap-1 text-sm font-semibold"
                                            >
                                                <Trash2 className="w-4 h-4" /> Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && renderPaginationButtons()}

                </div>
            </section>

            {isAdmin && (
                <section id="admin-panel" className={`py-20 px-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="max-w-4xl mx-auto">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                                {editingProject ? 'Edit Project' : 'Add New Project'}
                            </h2>
                            <button 
                                onClick={() => { setIsAdmin(false); setEditingProject(null); }}
                                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition font-semibold"
                            >
                                Logout
                            </button>
                        </div>
                        <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} p-8 rounded-xl shadow-xl space-y-4`}>
                            <input
                                type="text"
                                name="title"
                                placeholder="Project Title"
                                value={projectForm.title}
                                onChange={handleProjectFormChange}
                                className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border focus:outline-none focus:border-blue-500 transition-colors`}
                                required
                            />
                            <textarea
                                name="description"
                                placeholder="Project Description"
                                value={projectForm.description}
                                onChange={handleProjectFormChange}
                                className={`w-full p-3 rounded-lg h-32 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border focus:outline-none focus:border-blue-500 transition-colors`}
                                required
                            />
                            <input
                                type="text"
                                name="technologies"
                                placeholder="Technologies (comma separated: React, Node.js, MongoDB)"
                                value={projectForm.technologies}
                                onChange={handleProjectFormChange}
                                className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border focus:outline-none focus:border-blue-500 transition-colors`}
                                required
                            />
                            <input
                                type="url"
                                name="image"
                                placeholder="Image URL (optional)"
                                value={projectForm.image}
                                onChange={handleProjectFormChange}
                                className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border focus:outline-none focus:border-blue-500 transition-colors`}
                                />
                            <input
                                type="url"
                                name="liveLink"
                                placeholder="Live Link (optional)"
                                value={projectForm.liveLink}
                                onChange={handleProjectFormChange}
                                className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border focus:outline-none focus:border-blue-500 transition-colors`}
                            />
                            <input
                                type="url"
                                name="githubLink"
                                placeholder="GitHub Link (optional)"
                                value={projectForm.githubLink}
                                onChange={handleProjectFormChange}
                                className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border focus:outline-none focus:border-blue-500 transition-colors`}
                            />
                            <div className="flex gap-4">
                                <button
                                    onClick={editingProject ? handleUpdateProject : handleAddProject}
                                    disabled={loading}
                                    className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
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

            <section id="contact" className={`py-20 px-4 ${isDarkMode ? 'bg-gray-900/50' : 'bg-gray-100'}`}>
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                        Get In Touch
                    </h2>
                    <div className={`p-8 rounded-xl shadow-xl ${contactFormBg}`}>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Contact Information</h3>
                                <div className="flex items-center gap-4">
                                    <div className="bg-purple-600/20 p-3 rounded-lg">
                                        <Mail className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div>
                                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Email</p>
                                        <p className="font-semibold">rahman22205101894@diu.edu.bd</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="bg-purple-600/20 p-3 rounded-lg">
                                        <Phone className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div>
                                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Phone</p>
                                        <p className="font-semibold">+880 1749455326</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="bg-purple-600/20 p-3 rounded-lg">
                                        <MapPin className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div>
                                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Location</p>
                                        <p className="font-semibold">Savar, Dhaka, Bangladesh</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={contactForm.name}
                                    onChange={handleContactFormChange}
                                    className={`w-full p-3 rounded-lg border focus:outline-none focus:border-blue-500 transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300 text-gray-900'}`}
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={contactForm.email}
                                    onChange={handleContactFormChange}
                                    className={`w-full p-3 rounded-lg border focus:outline-none focus:border-blue-500 transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300 text-gray-900'}`}
                                    required
                                />
                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    value={contactForm.message}
                                    onChange={handleContactFormChange}
                                    className={`w-full p-3 rounded-lg border h-32 focus:outline-none focus:border-blue-500 transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300 text-gray-900'}`}
                                    required
                                />
                                <button
                                    onClick={handleContactSubmit}
                                    disabled={formStatus === 'sending'}
                                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {formStatus === 'sending' ? (
                                        'Sending...'
                                    ) : (
                                        <>
                                            <Send size={20} />
                                            Send Message
                                        </>
                                    )}
                                </button>
                                {formStatus === 'success' && (
                                    <p className="text-center text-green-500">Message sent successfully!</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className={`py-8 px-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'} text-center border-t ${isDarkMode ? 'border-purple-500/20' : 'border-gray-300'}`}>
                <div className="max-w-7xl mx-auto">
                    <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                        © 2024 MD. Naymur Rahman (Riyad). All rights reserved.
                    </p>
                    <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                        Built with React, Tailwind CSS, Node.js & MongoDB
                    </p>
                    <div className="flex justify-center gap-6 mt-4">
                        <a href="https://github.com/rahman2220510189" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                            <Github size={24} />
                        </a>
                        <a href="www.linkedin.com/in/md-naymur-rahman-08300834b" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                            <Linkedin size={24} />
                        </a>
                        <a href="rahman22205101894@diu.edu.bd" className="hover:text-blue-500 transition-colors">
                            <Mail size={24} />
                        </a>
                    </div>
                </div>
            </footer>
            
            <style jsx>{`
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite;
                }
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    animation: fade-in 1s ease-out;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
export default App; 