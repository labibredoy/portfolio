/* ==========================================================================
   Md. Abdulla-Al-Labib - Premium Portfolio Logic Engine
   Features: Particle Network, Interactive Shell, Schema Inspections, Page Toggles
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Global Setup & Real-time Clock ---
    const liveTimeEl = document.getElementById('live-time');
    function updateClock() {
        const now = new Date();
        const timeStr = now.toTimeString().split(' ')[0];
        if (liveTimeEl) {
            liveTimeEl.textContent = `SYS_TIME: ${timeStr}`;
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    // --- 2. Interactive Scrolling Fade-ins (Scroll Reveal) ---
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // If it's a skill category card, animate its progress bars
                if (entry.target.classList.contains('skills-section') || entry.target.contains(document.querySelector('.skill-category-card'))) {
                    animateProgressBars();
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    // Fallback animation for progress bars if scroll reveal is skipped
    function animateProgressBars() {
        const fills = document.querySelectorAll('.progress-fill');
        fills.forEach(fill => {
            const width = fill.style.width;
            fill.style.width = '0';
            setTimeout(() => {
                fill.style.width = width;
            }, 150);
        });
    }

    // --- 3. Mobile Navigation Menu Overlay ---
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            mobileMenu.classList.toggle('open');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                mobileMenu.classList.remove('open');
            });
        });
    }

    // Scroll listener for sticky navigation transparency
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active link tracking
        const scrollPos = window.scrollY + 120;
        document.querySelectorAll('section').forEach(section => {
            if (section.id && scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${section.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // --- 4. Interactive Glass Card Hover Tilt Effect (Parallax) ---
    const tiltCards = document.querySelectorAll('.hover-tilt');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const tiltX = (y - centerY) / 8;
            const tiltY = -(x - centerX) / 8;
            
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'none';
        });
    });

    // --- 5. Interactive Network Node Backbone Monitor ---
    const netNodes = document.querySelectorAll('.net-node');
    const nodeTitle = document.getElementById('node-info-text').querySelector('.node-info-title');
    const nodeBody = document.getElementById('node-info-text').querySelector('.node-info-body');

    const nodeMetadata = {
        bdren: {
            title: "> BDREN_CORE_BACKBONE",
            desc: "Primary educational and research data network of Bangladesh. Integrates public/private universities and research institutes. Handled routing reviews, core port configurations, and bandwidth distribution systems."
        },
        zabbix: {
            title: "> ZABBIX_MONITORING_SUITE",
            desc: "Configured enterprise-class network latency monitors. Aggregated SNMP traps from remote routers and built triggers to signal hardware downtime, optimizing operational speed by 20% across monitored nodes."
        },
        librenms: {
            title: "> LIBRENMS_NETWORK_AUTODISCOVERY",
            desc: "Utilized auto-discovery systems to dynamically map campus topology. Assessed fiber health logs, bandwidth graphs, and port usage flags to deliver technical performance statistics to faculty leads."
        },
        linux: {
            title: "> LINUX_SERVERS_ADMINISTRATION",
            desc: "Managed local Ubuntu Server distribution nodes. Authored bash cronjobs, verified SSH secure keys, configured firewall routing maps, and parsed latency logs to prevent packet buffering spikes."
        },
        cu: {
            title: "> CHITTAGONG_UNIVERSITY_NODE_AUDIT",
            desc: "Conducted physical and digital node audits at the Chittagong University data hub. Investigated latency spikes, calibrated link alignments, and engineered robust backup fiber routes."
        }
    };

    netNodes.forEach(node => {
        node.addEventListener('click', () => {
            netNodes.forEach(n => n.classList.remove('active-node'));
            node.classList.add('active-node');
            
            const target = node.getAttribute('data-node');
            if (nodeMetadata[target]) {
                nodeTitle.textContent = nodeMetadata[target].title;
                nodeBody.textContent = nodeMetadata[target].desc;
                
                // Color highlight changes
                if (target === 'bdren') {
                    nodeTitle.style.color = 'var(--neon-teal)';
                } else {
                    nodeTitle.style.color = 'var(--neon-emerald)';
                }
            }
        });
    });

    // --- 6. Activision: Infrared vs Translated Frame CycleGAN Sandbox ---
    const btnShowIR = document.getElementById('btn-show-ir');
    const btnShowDay = document.getElementById('btn-show-day');
    const irFrame = document.getElementById('ir-frame');
    const dayFrame = document.getElementById('day-frame');
    const sandboxModeTxt = document.getElementById('sandbox-mode-txt');

    if (btnShowIR && btnShowDay && irFrame && dayFrame) {
        btnShowIR.addEventListener('click', () => {
            btnShowIR.classList.add('active');
            btnShowDay.classList.remove('active');
            irFrame.classList.add('active-frame');
            dayFrame.classList.remove('active-frame');
            sandboxModeTxt.textContent = "Mode: INFRARED (INPUT)";
            sandboxModeTxt.style.color = "var(--neon-purple)";
        });

        btnShowDay.addEventListener('click', () => {
            btnShowDay.classList.add('active');
            btnShowIR.classList.remove('active');
            dayFrame.classList.add('active-frame');
            irFrame.classList.remove('active-frame');
            sandboxModeTxt.textContent = "Mode: DAYLIGHT_SYNTH (CycleGAN OUTPUT)";
            sandboxModeTxt.style.color = "var(--neon-teal)";
        });
    }

    // --- 7. Neural Network Particle Background Simulation ---
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    const maxParticles = 65;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.45;
            this.vy = (Math.random() - 0.5) * 0.45;
            this.radius = Math.random() * 2 + 1;
            this.color = Math.random() > 0.55 ? 'rgba(0, 242, 254, 0.4)' : 'rgba(158, 0, 255, 0.3)';
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
                if (dist < 115) {
                    const alpha = (1 - dist / 115) * 0.15;
                    ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Add visual subtle net grid overlay
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.008)';
        ctx.lineWidth = 0.5;
        const gridSize = 40;
        for (let x = 0; x < canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        drawConnections();
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // --- 8. Core Terminal Simulator Engine ---
    const termInput = document.getElementById('terminal-input');
    const termOutput = document.getElementById('terminal-output');
    const termHint = document.getElementById('autocomplete-hint');
    
    let commandHistory = [];
    let historyIdx = -1;

    const availableCommands = [
        'help', 'clear', 'skills', 'experience', 'projects', 
        'education', 'about', 'matrix', 'sunset', 'reset', 'contact'
    ];

    const commandReplies = {
        help: `
<div class="terminal-row neon-teal">==== LABIB_INTERFACE_SHELL HELP ====</div>
<div class="terminal-row">Available commands to query resume datastreams:</div>
<div class="terminal-row">&nbsp;&nbsp;<span class="neon-purple">about</span>       - Brief professional overview</div>
<div class="terminal-row">&nbsp;&nbsp;<span class="neon-purple">skills</span>      - Render interactive competency map</div>
<div class="terminal-row">&nbsp;&nbsp;<span class="neon-purple">experience</span>  - List network engineering internship metrics</div>
<div class="terminal-row">&nbsp;&nbsp;<span class="neon-purple">projects</span>    - Review research paper/application codebases</div>
<div class="terminal-row">&nbsp;&nbsp;<span class="neon-purple">education</span>   - Display academic degrees &amp; milestones</div>
<div class="terminal-row">&nbsp;&nbsp;<span class="neon-purple">contact</span>     - Display direct secure communication links</div>
<div class="terminal-row">&nbsp;&nbsp;<span class="neon-purple">matrix</span>      - Toggle Matrix green interface [EASTER_EGG]</div>
<div class="terminal-row">&nbsp;&nbsp;<span class="neon-purple">sunset</span>      - Toggle synthwave retro aesthetic [EASTER_EGG]</div>
<div class="terminal-row">&nbsp;&nbsp;<span class="neon-purple">reset</span>       - Restore default dark-cyber config</div>
<div class="terminal-row">&nbsp;&nbsp;<span class="neon-purple">clear</span>       - Flush console monitor logs</div>
        `,
        about: `
<div class="terminal-row"><span class="neon-teal">// PROFILE STREAM LOADED</span></div>
<div class="terminal-row">I am a Computer Science &amp; Engineering student at BAUET, focused on the intersection of Artificial Intelligence and network infrastructure. My expertise spans deep learning research, Linux server administration, and innovation management. I thrive in environments requiring technical precision and strategic leadership, aiming to contribute to the global tech landscape through intelligent automation.</div>
        `,
        skills: `
<div class="terminal-row neon-teal">==== SKILL_Competency_MATRIX ====</div>
<div class="terminal-row"><span class="neon-purple">AI &amp; RESEARCH:</span></div>
<div class="terminal-row">&nbsp;&nbsp;Deep Learning (GANs, CNNs) [████████░░] 85%</div>
<div class="terminal-row">&nbsp;&nbsp;Computer Vision (CV)      [████████░░] 80%</div>
<div class="terminal-row">&nbsp;&nbsp;LaTeX, Zotero, Scholar    [█████████░] 90%</div>
<div class="terminal-row"><span class="neon-emerald">SYSTEMS &amp; MONITORING:</span></div>
<div class="terminal-row">&nbsp;&nbsp;Linux (Ubuntu Server)     [████████░░] 85%</div>
<div class="terminal-row">&nbsp;&nbsp;Zabbix &amp; LibreNMS         [████████░░] 80%</div>
<div class="terminal-row">&nbsp;&nbsp;Git Version Control       [████████░░] 85%</div>
<div class="terminal-row"><span class="neon-blue">PROGRAMMING:</span></div>
<div class="terminal-row">&nbsp;&nbsp;Python (PyTorch Stack)    [█████████░] 90%</div>
<div class="terminal-row">&nbsp;&nbsp;C / C++ (Algorithms)      [████████░░] 85%</div>
<div class="terminal-row">&nbsp;&nbsp;Assembly (8086 hardware)  [███████░░░] 70%</div>
        `,
        experience: `
<div class="terminal-row"><span class="neon-teal">// BdREN_INTERNSHIP_METRICS</span></div>
<div class="terminal-row">Role: Network Engineering Intern (2025)</div>
<div class="terminal-row">Key Audits &amp; Optimizations completed:</div>
<div class="terminal-row">&nbsp;&nbsp;• Configured network logs inside <span class="neon-emerald">LibreNMS, Zabbix &amp; Cacti</span> monitors.</div>
<div class="terminal-row">&nbsp;&nbsp;• Engineered SSH security firewalls on target Linux server shells.</div>
<div class="terminal-row">&nbsp;&nbsp;• Audited Chittagong University core data node interfaces.</div>
<div class="terminal-row">&nbsp;&nbsp;• Resolved critical router latency metrics and hardware drops.</div>
        `,
        projects: `
<div class="terminal-row neon-teal">==== PROJECT_REPOSITORIES ====</div>
<div class="terminal-row"><span class="neon-purple">1. ActiVision: Nighttime Action Recognition [Research]</span></div>
<div class="terminal-row">&nbsp;&nbsp;&nbsp;&nbsp;• Core: Nighttime human action translated to daylight frames.</div>
<div class="terminal-row">&nbsp;&nbsp;&nbsp;&nbsp;• Stack: CycleGAN daylight synthesizers + temporal 3D CNNs.</div>
<div class="terminal-row">&nbsp;&nbsp;&nbsp;&nbsp;• Repo status: Research Paper &amp; pipeline documentation locked.</div>
<div class="terminal-row"><span class="neon-blue">2. University Service Management [Software Engineering]</span></div>
<div class="terminal-row">&nbsp;&nbsp;&nbsp;&nbsp;• Core: Digital attendance and student financial audit stream.</div>
<div class="terminal-row">&nbsp;&nbsp;&nbsp;&nbsp;• Stack: Highly concurrent relational database schema design.</div>
        `,
        education: `
<div class="terminal-row neon-teal">==== EDUCATION_MILESTONES ====</div>
<div class="terminal-row">🎓 <span class="neon-purple">B.Sc in Computer Science &amp; Engineering</span></div>
<div class="terminal-row">&nbsp;&nbsp;&nbsp;&nbsp;Bangladesh Army University of Engineering &amp; Technology (BAUET)</div>
<div class="terminal-row">&nbsp;&nbsp;&nbsp;&nbsp;Timeline: 2022 - Present | CGPA: <span class="neon-emerald">3.30 / 4.00</span></div>
<div class="terminal-row">🎓 <span class="neon-purple">Higher Secondary Certificate (HSC)</span></div>
<div class="terminal-row">&nbsp;&nbsp;&nbsp;&nbsp;Shahid A.H.M. Kamaruzzaman Govt. Degree College, Rajshahi</div>
<div class="terminal-row">&nbsp;&nbsp;&nbsp;&nbsp;Year: 2020 | GPA: <span class="neon-emerald">5.00 / 5.00</span></div>
<div class="terminal-row">🎓 <span class="neon-purple">Secondary School Certificate (SSC)</span></div>
<div class="terminal-row">&nbsp;&nbsp;&nbsp;&nbsp;Rajshahi Collegiate School</div>
<div class="terminal-row">&nbsp;&nbsp;&nbsp;&nbsp;Year: 2018 | GPA: <span class="neon-emerald">5.00 / 5.00</span></div>
        `,
        contact: `
<div class="terminal-row"><span class="neon-teal">// ESTABLISHING COMMUNICATIONS SECURE STREAM...</span></div>
<div class="terminal-row">📧 Email  : <a href="mailto:labibredoy@gmail.com" class="neon-purple">labibredoy@gmail.com</a></div>
<div class="terminal-row">📞 Mobile : <span class="neon-purple">+8801521771410</span></div>
<div class="terminal-row">📍 Location: Rajshahi, Bangladesh</div>
<div class="terminal-row">🌐 Web     : labibredoy.com</div>
        `
    };

    function appendTerminalRow(text) {
        const row = document.createElement('div');
        row.innerHTML = text;
        termOutput.appendChild(row);
        termOutput.scrollTop = termOutput.scrollHeight;
    }

    if (termInput) {
        termInput.addEventListener('keydown', (e) => {
            const val = termInput.value.trim().toLowerCase();
            
            // Tab key Autocomplete
            if (e.key === 'Tab') {
                e.preventDefault();
                if (termHint.textContent) {
                    termInput.value = termHint.textContent;
                    termHint.textContent = '';
                }
            }

            // Enter key trigger command
            if (e.key === 'Enter') {
                const cmd = termInput.value.trim();
                if (!cmd) return;

                appendTerminalRow(`<span class="terminal-prompt">guest@labibredoy:~$</span> <span class="text-bright">${cmd}</span>`);
                commandHistory.push(cmd);
                historyIdx = commandHistory.length;

                const parsed = cmd.toLowerCase();

                if (parsed === 'clear') {
                    termOutput.innerHTML = '';
                } else if (parsed === 'matrix') {
                    document.body.className = 'matrix-theme';
                    appendTerminalRow('<div class="terminal-row neon-teal">System aesthetics customized to Matrix terminal.</div>');
                } else if (parsed === 'sunset') {
                    document.body.className = 'cyber-sunset';
                    appendTerminalRow('<div class="terminal-row" style="color: #FF007F;">System aesthetics customized to Retro Sunset.</div>');
                } else if (parsed === 'reset') {
                    document.body.className = 'cyber-theme-dark';
                    appendTerminalRow('<div class="terminal-row text-muted">Aesthetic settings restored.</div>');
                } else if (commandReplies[parsed]) {
                    appendTerminalRow(commandReplies[parsed]);
                } else {
                    appendTerminalRow(`<div class="terminal-row" style="color: #ff5555;">Command not recognized: "${cmd}". Type <span class="neon-teal">help</span> to view interface actions.</div>`);
                }

                termInput.value = '';
                termHint.textContent = '';
            }

            // Arrow Up - traverse history
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (historyIdx > 0) {
                    historyIdx--;
                    termInput.value = commandHistory[historyIdx];
                }
            }

            // Arrow Down - traverse history
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (historyIdx < commandHistory.length - 1) {
                    historyIdx++;
                    termInput.value = commandHistory[historyIdx];
                } else {
                    historyIdx = commandHistory.length;
                    termInput.value = '';
                }
            }
        });

        // Input change listener for autocomplete hint
        termInput.addEventListener('input', () => {
            const val = termInput.value.trim().toLowerCase();
            if (!val) {
                termHint.textContent = '';
                return;
            }

            const match = availableCommands.find(c => c.startsWith(val));
            if (match && match !== val) {
                termHint.textContent = match;
            } else {
                termHint.textContent = '';
            }
        });
    }

    // --- 9. Dynamic Contact Console Form Transmit Engine ---
    const contactForm = document.getElementById('portfolio-contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('sender-name').value;
            const email = document.getElementById('sender-email').value;
            const message = document.getElementById('message-body').value;
            const submitBtn = contactForm.querySelector('.transmit-btn');

            // Visual transmission sequences
            submitBtn.disabled = true;
            submitBtn.querySelector('.btn-text').textContent = "ENCRYPTING_PACKETS...";
            formStatus.className = "form-status-msg font-mono";
            formStatus.textContent = "> INITIALIZING TRANSLATION STREAM...";

            setTimeout(() => {
                formStatus.textContent = "> ENCRYPTING TRANSMISSION NODES...";
                setTimeout(() => {
                    formStatus.textContent = "> INJECTING ENCRYPTED DATA PACKET...";
                    setTimeout(() => {
                        formStatus.className = "form-status-msg success font-mono";
                        formStatus.textContent = "✔ PACKET DELIVERED SUCCESSFULLY. SECURE CALLBACK STREAM LOCKED.";
                        submitBtn.querySelector('.btn-text').textContent = "PACKET_TRANSMITTED";
                        
                        // Fire Mailto callback as backup pre-filled link
                        const subject = encodeURIComponent(`Portfolio Connection from ${name}`);
                        const body = encodeURIComponent(`Hi Abdulla-Al-Labib,\n\n${message}\n\nBest Regards,\n${name}\nEmail: ${email}`);
                        window.location.href = `mailto:labibredoy@gmail.com?subject=${subject}&body=${body}`;

                        // Reset form fields
                        contactForm.reset();
                        setTimeout(() => {
                            submitBtn.disabled = false;
                            submitBtn.querySelector('.btn-text').textContent = "TRANSMIT_PACKET";
                            formStatus.textContent = "";
                        }, 5000);

                    }, 800);
                }, 800);
            }, 800);
        });
    }

});
