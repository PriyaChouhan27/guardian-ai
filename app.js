/**
 * Guardian AI - Splash Screen & Central App Systems
 * High-performance background constellation canvas & premium button interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    initConstellationBackground();
    initButtonInteractions();
    
    // Check if current context is the dashboard view layout workspace
    if (document.getElementById('route-origin')) {
        initDashboardLogicPipeline();
    }
});

/**
 * Renders a premium interactive particle network on canvas
 */
function initConstellationBackground() {
    const canvas = document.getElementById('constellation-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;
    
    // Interaction state
    const mouse = {
        x: null,
        y: null,
        radius: 120, // Interaction radius
        active: false
    };

    // Responsive setup
    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.scale(dpr, dpr);
        
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        
        initParticles();
    }

    // Particle class definition
    class Particle {
        constructor() {
            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * window.innerHeight;
            // Extremely slow, elegant floating speed
            this.vx = (Math.random() - 0.5) * 0.25;
            this.vy = (Math.random() - 0.5) * 0.25;
            this.radius = Math.random() * 2 + 0.5;
            this.alpha = Math.random() * 0.4 + 0.1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce boundary checks
            if (this.x < 0 || this.x > window.innerWidth) this.vx *= -1;
            if (this.y < 0 || this.y > window.innerHeight) this.vy *= -1;

            // Mouse interaction push / fade effect
            if (mouse.active && mouse.x && mouse.y) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    this.x += (dx / dist) * force * 0.8;
                    this.y += (dy / dist) * force * 0.8;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(56, 189, 248, ${this.alpha})`;
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const count = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 9000), 120);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 110) {
                    const alpha = (110 - dist) / 110 * 0.08;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
                    ctx.lineWidth = 0.75;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        drawLines();
        animationFrameId = requestAnimationFrame(animate);
    }

    // Set up listeners
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.active = true;
    });
    window.addEventListener('mouseleave', () => {
        mouse.active = false;
    });

    resizeCanvas();
    animate();
}

/**
 * Handles elegant unified premium micro-interaction page transitions exits
 */
function transitionToPage(url) {
    document.body.classList.remove('page-entry-active');
    document.body.classList.add('page-exit-active');
    setTimeout(() => {
        window.location.href = url;
    }, 450);
}

/**
 * Binds ripple glow styling handlers to specific buttons
 */
function bindRippleEffect(btn, callback) {
    if (!btn) return;
    btn.addEventListener('click', (e) => {
        const glow = btn.querySelector('.btn-glow');
        if (glow) {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            glow.style.left = `${x}px`;
            glow.style.top = `${y}px`;
            glow.style.transform = 'translate(-50%, -50%) scale(1)';
            glow.style.opacity = '1';

            setTimeout(() => {
                glow.style.transform = 'translate(-50%, -50%) scale(0)';
                glow.style.opacity = '0';
            }, 400);
        }
        if (callback) callback(e);
    });
}

/**
 * Attaches event actions to simple navigation selectors
 */
function initButtonInteractions() {
    const getStartedBtn = document.getElementById('btn-get-started');
    if (getStartedBtn) {
        bindRippleEffect(getStartedBtn, () => {
            setTimeout(() => {
                transitionToPage('login.html');
            }, 300);
        });
    }

    const loginSubmitBtn = document.getElementById('btn-login-submit');
    if (loginSubmitBtn) {
        bindRippleEffect(loginSubmitBtn, (e) => {
            e.preventDefault();
            // FIXED: Updated selectors to match HTML exact IDs ("email" and "password")
            const email = document.getElementById('email')?.value;
            const password = document.getElementById('password')?.value;
            
            if (email && password) {
                setTimeout(() => {
                    transitionToPage('dashboard.html');
                }, 350);
            } else {
                console.log('%cGuardian AI: Simulating login...', 'color: #10b981; font-weight: bold;');
            }
        });
    }

    const googleAuthBtn = document.getElementById('btn-google-auth');
    if (googleAuthBtn) {
        bindRippleEffect(googleAuthBtn, () => {
            console.log('%cGuardian AI: Triggering Google OAuth popup flow...', 'color: #3b82f6; font-weight: bold;');
        });
    }

    const signupBackBtn = document.getElementById('btn-signup-back');
    if (signupBackBtn) {
        bindRippleEffect(signupBackBtn, (e) => {
            e.preventDefault();
            setTimeout(() => {
                transitionToPage('login.html');
            }, 250);
        });
    }

    const logoLinks = document.querySelectorAll('.logo-link');
    logoLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            transitionToPage('index.html');
        });
    });

    const signupLink = document.getElementById('link-signup');
    if (signupLink) {
        signupLink.addEventListener('click', (e) => {
            e.preventDefault();
            transitionToPage('signup.html');
        });
    }

    const loginLink = document.getElementById('link-login');
    if (loginLink) {
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            transitionToPage('login.html');
        });
    }
}

/**
 * Dashboard Central Logic Engine Integration Block
 */
function initDashboardLogicPipeline() {
    const originInput = document.getElementById('route-origin');
    const destInput = document.getElementById('route-destination');
    const transportInput = document.getElementById('route-transport');
    const startJourneyBtn = document.getElementById('btn-start-journey');

    const summaryRoute = document.getElementById('summary-route');
    const summaryEta = document.getElementById('summary-eta');
    const summaryContacts = document.getElementById('summary-contacts');

    const contactNameInput = document.getElementById('contact-name');
    const contactRelInput = document.getElementById('contact-relationship');
    const contactPhoneInput = document.getElementById('contact-phone');
    const saveContactBtn = document.getElementById('btn-save-contact');
    const saveContactText = document.getElementById('save-contact-text');
    const editIndexHidden = document.getElementById('contact-edit-index');
    const contactsContainer = document.getElementById('contacts-list-container');

    if (!originInput || !destInput || !transportInput || !startJourneyBtn) return;

    let contactsArray = JSON.parse(localStorage.getItem('guardian_contacts')) || [];
    let selectedContactIds = []; 
    let computedDepTime = "";
    let computedEtaTime = "";

    function renderContactCards() {
        if (!contactsContainer) return;
        
        if (contactsArray.length === 0) {
            contactsContainer.innerHTML = `<span class="summary-meta" style="font-style: italic;">No emergency contacts added yet.</span>`;
            updateValidationSummary();
            return;
        }

        contactsContainer.innerHTML = contactsArray.map((c, index) => {
            const isChecked = selectedContactIds.includes(index) ? 'checked' : '';
            return `
                <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); padding: 0.75rem; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; backdrop-filter: blur(5px);">
                    <div style="display: flex; align-items: center; gap: 0.65rem; width: 70%;">
                        <input type="checkbox" data-index="${index}" class="contact-select-checkbox" ${isChecked} style="accent-color: #38bdf8; cursor: pointer; transform: scale(1.1);">
                        <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                            <div style="font-size: 0.85rem; font-weight: 600; color: #ffffff;">${c.name} <span style="font-size: 0.75rem; color: #38bdf8; font-weight: 400; background: rgba(56,189,248,0.1); padding: 0.1rem 0.35rem; border-radius: 4px; margin-left: 0.25rem;">${c.relationship}</span></div>
                            <div style="font-size: 0.75rem; color: #94a3b8;">${c.phone}</div>
                        </div>
                    </div>
                    <div style="display: flex; gap: 0.4rem;">
                        <button type="button" class="btn-edit-contact" data-index="${index}" style="background: transparent; border: 1px solid rgba(56,189,248,0.3); color: #38bdf8; padding: 0.2rem 0.5rem; font-size: 0.75rem; border-radius: 4px; cursor: pointer;">Edit</button>
                        <button type="button" class="btn-delete-contact" data-index="${index}" style="background: transparent; border: 1px solid rgba(239,68,68,0.3); color: #f87171; padding: 0.2rem 0.5rem; font-size: 0.75rem; border-radius: 4px; cursor: pointer;">Del</button>
                    </div>
                </div>
            `;
        }).join('');

        document.querySelectorAll('.contact-select-checkbox').forEach(box => {
            box.addEventListener('change', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                if (e.target.checked) {
                    if (!selectedContactIds.includes(index)) selectedContactIds.push(index);
                } else {
                    selectedContactIds = selectedContactIds.filter(id => id !== index);
                }
                updateValidationSummary();
            });
        });

        document.querySelectorAll('.btn-edit-contact').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                loadContactToEditor(index);
            });
        });

        document.querySelectorAll('.btn-delete-contact').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                deleteContact(index);
            });
        });

        updateValidationSummary();
    }

    if (saveContactBtn) {
        saveContactBtn.addEventListener('click', () => {
            const name = contactNameInput.value.trim();
            const relationship = contactRelInput.value;
            const phone = contactPhoneInput.value.trim();
            const editIndex = parseInt(editIndexHidden.value);

            if (!name || !relationship || !phone) {
                alert('Please populate name, relationship type, and phone parameters.');
                return;
            }

            const contactData = { name, relationship, phone };

            if (editIndex > -1) {
                contactsArray[editIndex] = contactData;
                editIndexHidden.value = "-1";
                if (saveContactText) saveContactText.textContent = "Add Contact";
            } else {
                contactsArray.push(contactData);
                selectedContactIds.push(contactsArray.length - 1);
            }

            localStorage.setItem('guardian_contacts', JSON.stringify(contactsArray));
            
            contactNameInput.value = "";
            contactRelInput.value = "";
            contactPhoneInput.value = "";
            
            renderContactCards();
        });
    }

    function loadContactToEditor(index) {
        const c = contactsArray[index];
        contactNameInput.value = c.name;
        contactRelInput.value = c.relationship;
        contactPhoneInput.value = c.phone;
        editIndexHidden.value = index;
        if (saveContactText) saveContactText.textContent = "Update Contact";
    }

    function deleteContact(index) {
        contactsArray.splice(index, 1);
        selectedContactIds = selectedContactIds
            .filter(id => id !== index)
            .map(id => id > index ? id - 1 : id);

        localStorage.setItem('guardian_contacts', JSON.stringify(contactsArray));
        renderContactCards();
    }

    function updateValidationSummary() {
        const origin = originInput.value.trim();
        const destination = destInput.value.trim();
        const transport = transportInput.value;

        if (origin || destination) {
            summaryRoute.textContent = `${origin || '???'} → ${destination || '???'}`;
            summaryRoute.style.color = '#ffffff';
        } else {
            summaryRoute.textContent = "Not Configured";
            summaryRoute.style.color = '#94a3b8';
        }

        if (origin && destination && transport) {
            let averageDurationMins = 45;
            if (transport === 'Bike') averageDurationMins = 30;
            if (transport === 'Bus') averageDurationMins = 90;
            if (transport === 'Train') averageDurationMins = 180;
            if (transport === 'Flight') averageDurationMins = 60;

            const now = new Date();
            const eta = new Date(now.getTime() + averageDurationMins * 60000);

            computedDepTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            computedEtaTime = eta.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            summaryEta.innerHTML = `
                <div style="color: #ffffff; font-weight: 600;">${transport} Mode Matrix Locked</div>
                <div style="font-size: 0.75rem; color: #38bdf8; margin-top: 0.15rem;">DEP: ${computedDepTime} | ETA: ${computedEtaTime} (~${averageDurationMins}m)</div>
            `;
        } else {
            summaryEta.textContent = "Awaiting Data Parameters";
        }

        if (selectedContactIds.length > 0) {
            const selectedNames = selectedContactIds.map(id => contactsArray[id].name).join(', ');
            summaryContacts.textContent = `${selectedContactIds.length} Nodes Enabled (${selectedNames})`;
            summaryContacts.style.color = '#10b981';
        } else {
            summaryContacts.textContent = "No safety contacts selected";
            summaryContacts.style.color = '#94a3b8';
        }

        if (origin && destination && transport && selectedContactIds.length > 0) {
            startJourneyBtn.removeAttribute('disabled');
        } else {
            startJourneyBtn.setAttribute('disabled', 'true');
        }
    }

    [originInput, destInput, transportInput].forEach(elem => {
        elem.addEventListener('input', updateValidationSummary);
        elem.addEventListener('change', updateValidationSummary);
    });

   bindRippleEffect(startJourneyBtn, () => {

    const selectedContactsObjects = selectedContactIds.map(id => contactsArray[id]);

    const activeRoutePayload = {
        origin: originInput.value.trim(),
        destination: destInput.value.trim(),
        mode: transportInput.value,
        depTime: computedDepTime,
        etaTime: computedEtaTime,
        activeSafeguards: selectedContactsObjects
    };

    localStorage.setItem('guardian_active_route', JSON.stringify(activeRoutePayload));

    // SAVE JOURNEY HISTORY
    let history = JSON.parse(localStorage.getItem('guardian_travel_history')) || [];

    history.unshift({
        date: new Date().toLocaleDateString(),
        startLocation: originInput.value.trim(),
        destination: destInput.value.trim(),
        transportMode: transportInput.value,
        departureTime: computedDepTime,
        estimatedArrivalTime: computedEtaTime,
        status: "Safe",
        aiAction: "Journey Started Successfully"
    });

    localStorage.setItem(
        'guardian_travel_history',
        JSON.stringify(history)
    );

    transitionToPage('journey.html');
});

    renderContactCards();
}