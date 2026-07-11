/**
 * Guardian AI - Active Route Safety Monitoring Engine
 * Integrates directly with base app.js canvas environment and core premium actions.
 */

document.addEventListener('DOMContentLoaded', () => {
    initJourneyMonitoringPipeline();
});

function initJourneyMonitoringPipeline() {
    // Pipeline UI Handles
    const timerDisplay = document.getElementById('countdown-timer');
    const checkInBtn = document.getElementById('btn-check-in');
    const panicBtn = document.getElementById('btn-panic-escalate');
    const endJourneyBtn = document.getElementById('btn-end-journey-safely');
    const threatBadge = document.getElementById('journey-threat-badge');
    const logStream = document.getElementById('escalation-log-stream');
    
    // Core Dynamic Structural Workspace Views
    const activeMonitoringView = document.getElementById('active-monitoring-view');
    const emergencyReportView = document.getElementById('emergency-report-view');
    const returnDashboardBtn = document.getElementById('btn-return-dashboard');

    // Live Report Metric Nodes
    const statusVal = document.getElementById('status-val');
    const contactVal = document.getElementById('contact-val');
    const vaultVal = document.getElementById('vault-val');

    if (!timerDisplay) return;

    // Operational System State Configuration
    let countdownSeconds = 15;
    let currentLevel = 1; 
    let trackingIntervalId = null;

    // Escalation Matrix Properties
    const tiers = {
        1: { name: 'Level 1: Normal Monitoring', class: 'threat-low', color: '#10b981' },
        2: { name: 'Level 2: Missing Check-In Warning', class: 'threat-warning', color: '#f59e0b' },
        3: { name: 'Level 3: Critical Alert - Alerting Contacts', class: 'threat-high', color: '#ef4444' },
        4: { name: 'Level 4: Critical Escalation Standard Triggered', class: 'threat-high', color: '#dc2626' }
    };

    /**
     * Adds styled system telemetry message markers directly to tracking display panel
     */
    function postLogEvent(msg, customColor = '') {
        if (!logStream) return;
        const entry = document.createElement('div');
        entry.className = 'summary-meta';
        if (customColor) entry.style.color = customColor;
        entry.textContent = `• ${msg}`;
        logStream.appendChild(entry);
        logStream.scrollTop = logStream.scrollHeight;
    }

    /**
     * Updates badge visualization to cleanly reflect current escalating infrastructure states
     */
    function transitThreatLevel(targetTier) {
        currentLevel = targetTier;
        const meta = tiers[currentLevel];
        
        if (threatBadge) {
            threatBadge.className = `threat-badge ${meta.class}`;
            threatBadge.innerHTML = `<span class="tag-dot"></span> ${meta.name}`;
        }
    }

    /**
     * Replaces standard dashboard monitoring workspace with premium emergency record matrix closure interface
     * and sequentially runs simulation timelines for notifying trusted contacts.
     */
    function structuralTransitionToReportView() {
        clearInterval(trackingIntervalId);
        
        if (activeMonitoringView && emergencyReportView) {
            // Apply quick visual transition out sequence
            activeMonitoringView.style.opacity = '0';
            
            setTimeout(() => {
                activeMonitoringView.style.display = 'none';
                emergencyReportView.style.display = 'flex';
                emergencyReportView.style.opacity = '1';
                emergencyReportView.classList.add('animate-fade-in');
                
                // Begin Simulation Chain Sequence Flow
                executeEmergencySimulationSequence();
            }, 200);
        }
    }

    /**
     * Handles sequential simulated workflow notifications to trusted network contacts
     */
    function executeEmergencySimulationSequence() {
        // Step 1: Initialize Outgoing Signals (0 - 1.5 seconds)
        setTimeout(() => {
            if (contactVal) {
                contactVal.textContent = 'Sending SMS / Email...';
                contactVal.style.color = '#f59e0b';
            }
        }, 1000);

        // Step 2: Confirm Notification Receipt & Update Status Parameters (1.5 - 3.5 seconds)
        setTimeout(() => {
            if (contactVal) {
                contactVal.textContent = 'Notified';
                contactVal.style.color = '#38bdf8';
            }
            if (statusVal) {
                statusVal.textContent = 'Emergency Escalated';
                statusVal.style.color = '#f87171';
            }
            if (vaultVal) {
                vaultVal.textContent = '✓ Incident Safely Saved to Local Vault Ledger';
                vaultVal.style.color = '#10b981';
            }
        }, 2500);

        // Step 3: Complete Simulation & Display Dashboard Return Controller (3.5 - 4 seconds)
       setTimeout(() => {

    const history = JSON.parse(localStorage.getItem("guardian_travel_history")) || [];

    history.unshift({
        date: new Date().toLocaleString(),
        startLocation: "Current Location",
        destination: "Destination",
        transportMode: "Bus",
        departureTime: "09:00 AM",
        estimatedArrivalTime: "09:30 AM",
        status: "Emergency",
        aiAction: "Emergency alert sent to trusted contacts."
    });

    localStorage.setItem(
        "guardian_travel_history",
        JSON.stringify(history)
    );

    window.location.href = "travel-history.html";

}, 4000);
    }

    /**
     * Core Timer Intermittent Loop Event Logic Strategy Block
     */
    function triggerTick() {
        countdownSeconds--;

        // Standard Zero Check Boundary Handler
        if (countdownSeconds <= 0) {
            if (currentLevel < 3) {
                // Progressively advance through sequential hazard stages
                countdownSeconds = 10; 
                const nextTier = currentLevel + 1;
                transitThreatLevel(nextTier);
                
                if (nextTier === 2) {
                    postLogEvent('[WARNING] Missed scheduled milestone. Dispatching ping request confirmation token.', tiers[2].color);
                } else if (nextTier === 3) {
                    postLogEvent('[ALERT] Secondary check-in verification failed. Transmitting encrypted telemetry data packets directly to safety contacts.', tiers[3].color);
                }
            } else {
                // Terminal State Matrix Progression (Transitions instantly over to Emergency Close-Out Layout)
                countdownSeconds = 0;
                timerDisplay.textContent = '00:00';
                transitThreatLevel(4);
                postLogEvent('[CRITICAL] Terminal countdown zero state achieved. Launching autonomous incident mitigation sequences...', tiers[4].color);
                
                structuralTransitionToReportView();
            }
        }

        // Format dynamic countdown timer representation cleanly
        if (countdownSeconds >= 0) {
            const displayMin = String(Math.floor(countdownSeconds / 60)).padStart(2, '0');
            const displaySec = String(countdownSeconds % 60).padStart(2, '0');
            timerDisplay.textContent = `${displayMin}:${displaySec}`;
        }
    }

    // Initialize Timer Loop Interval Hook
    trackingIntervalId = setInterval(triggerTick, 1000);

    /**
     * Action Handler Bindings (Leverages custom app.js premium components)
     */
    if (typeof bindRippleEffect === 'function') {
        // Standard user safe check-in reset hook click handler
        bindRippleEffect(checkInBtn, () => {
            countdownSeconds = 15;
            timerDisplay.textContent = '00:15';
            transitThreatLevel(1);
            postLogEvent('[SYSTEM] User check-in verified. Active corridor status metrics reset to normal baseline tracking templates.', '#10b981');
        });

        // Instant manual panic button workflow escalation override sequence hook 
        bindRippleEffect(panicBtn, () => {
            countdownSeconds = 0;
            timerDisplay.textContent = '00:00';
            transitThreatLevel(4);
            postLogEvent('[MANUAL PANIC] Emergency manual override activated by user. Deploying live coordinates network wide...', '#f87171');
            
            setTimeout(() => {
                structuralTransitionToReportView();
            }, 600);
        });

        // Early manual standard cancellation safety pathway routing event logic closure
        bindRippleEffect(endJourneyBtn, () => {
            postLogEvent('[SYSTEM] Closing user routing pipeline safely...', '#60a5fa');
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 400);
        });

        // Final Report Redirect Workspace Return Navigation CTA Integration Button Click Action Hook
        bindRippleEffect(returnDashboardBtn, () => {
            window.location.href = "dashboard.html";
        });
    } else {
        // Fallback interface bindings execution configuration map safely if system triggers standalone environments
        checkInBtn?.addEventListener('click', () => {
            countdownSeconds = 15;
            timerDisplay.textContent = '00:15';
            transitThreatLevel(1);
        });
        
        panicBtn?.addEventListener('click', () => {
            structuralTransitionToReportView();
        });

        endJourneyBtn?.addEventListener('click', () => {
            window.location.href = "dashboard.html";
        });

        returnDashboardBtn?.addEventListener('click', () => {
            window.location.href = "dashboard.html";
        });
    }
}