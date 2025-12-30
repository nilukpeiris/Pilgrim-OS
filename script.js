// --- DATA & CONFIGURATION ---

// --- PASSWORDS & KEYS (SECRET - DO NOT DISPLAY) ---
const ENGINE_FIX_CODE = "FIXENGINESNOW"; 
const HULL_FIX_CODE = "FIXHULLNOW";       
const ERIDANI_COORDS = "4921";
const EARTH_COORDS = "5067";

const O2_DECAY_RATE_CRITICAL = 0.04; 
const O2_DECAY_RATE_WARNING = 0.02;  
const O2_RECOVERY_RATE = 0.05;      

let shipData = {
    hull: { status: "SEAL BREACH - FORE SECTION", level: 50 },
    engine: { status: "CRITICAL FAILURE" },
    o2: { level: 75.0 }, 
    comms: { status: "OFFLINE" },
    power: { status: "STABLE (RESERVE)" },
    coords: { status: "NAV DATA CORRUPTED" }
};

// FULL CREW DATABASE (Retained for Personnel screen)
const PLAYER_PROFILES = {
     // NOTE: Please ensure these image files (e.g., aronus_zeebal.png) exist in your 'assets/' folder
     1: {Name: "Aronus Zeebal", Expertise: "Ship Captain, Command", Photo: "aronus_zeebal.png", Record: "Fleet Captain C. P. Shepard, age 62, began their exemplary career by graduating at the top of their class from the Mars Naval Space Academy with a focus on Advanced Astrogation. Immediately following graduation, Shepard was recruited by the interplanetary conglomerate, ERIDANUS CORE, preferring the path of corporate logistics and deep-space resource acquisition over traditional military service. Shepard’s ascent through the ranks was swift and steady, a testament to their exceptional command presence and unmatched operational efficiency. Their sustained high performance led to the prestigious command of a Pilgrim-class vessel, a position they have held for 30 consecutive years. This extensive tenure is underscored by an immaculate service record, entirely free of mission failures or disciplinary actions. Shepard embodies the ideal ERIDANUS CORE officer: highly competent, strategically brilliant, and unwaveringly dedicated to the corporation's expansion across the Eridani sector.", Status: "Active"},
     2: {Name: "Robert Slim", Expertise: "First Officer, Astrogation", Photo: "robert_slim.png", Record: "Robert Slim is a distinguished graduate of the SolSys Command School and has served as First Officer on various Pilgrim-class freighters for the past seven years. Known for his exceptional navigational acumen and fastidious adherence to flight protocols, he is considered the model of next-generation corporate efficiency. His primary duties include maintaining all flight logs, validating course trajectories, and serving as Captain Zeebal’s direct operational superior. This mission is crucial for his career advancement, as he is formally positioned as the Captain’s successor upon Zeebal’s scheduled retirement. Slim maintains zero-tolerance for operational anomalies and is committed to ensuring the Pilgrim completes its trajectory to the Eridani sector with maximum efficiency, protecting the integrity of the official mission logs at all costs.", Status: "Active"},
     3: {Name: "Kaatrin Rheema", Expertise: "Ship Engineer", Photo: "kaatrin_rheema.png", Record: "Kaatrin Rheema is the Chief Engine Systems Specialist and has been personally responsible for maintaining the hyperdrive and thermal dynamics of the Pilgrim-class for over five cycles. A technical savant with an engineering background in advanced fluid dynamics, her expertise is considered irreplaceable for this deep-space voyage. Her duties include managing all plasma conduit integrity, monitoring power regulation systems, and ensuring the absolute stability of the hyperdrive synchronization matrix. Rheema is noted for her technical brilliance and objective, results-oriented approach; her loyalty is directed exclusively toward the flawless function of the ship’s complex machinery. Any system failure is considered a professional affront, and she has full command authority over all technical personnel and resources necessary for rapid, on-site diagnostics and repair.", Status: "Active"},
     4: {Name: "Mathias Mendelsonne", Expertise: "Corp. Private Security, Asset Protection", Photo: "mathias_mendelsonne.png", Record: "Agent Mendelsonne is onboard the Pilgrim on a dual-mandate mission. He has twelve years of service in the Corporate Security Force military police, providing a highly disciplined and procedural focus on his duties, despite an early honorable discharge leading to immediate contract renewal with the CPS's Black Ops sector. His primary function is to ensure the secure transit of High-Value Detainee Prisoner and provide Tier-4 asset protection for the ship's engine core and navigation array, designated under Icarus Protocol Compliance. His extensive knowledge of ZDC infiltration tactics is critical for countering potential sabotage. Access to his full CSF and SAD records is strictly controlled by HR Key (Level 9) due to the classified nature of his past operations, and he is fully authorized to use lethal force in defense of corporate assets.", Status: "Active"},
     5: {Name: "Sarooji Arunberg", Expertise: "Police Detective", Photo: "sarooji_arunberg.png", Record: "Detective Sarooji Arunberg is a Detective 1st Grade with the Orbital Police Division (OPD), specializing in complex financial and data crime compliance. Her presence on the Pilgrim is a matter of official mandate: she is assigned as the independent law enforcement auditor for the Eridanus Corporation's high-value resource acquisition mission. Arunberg’s duties are twofold: first, she is responsible for maintaining the security and integrity of the high-profile prisoner transfer involving white-collar criminal Elara Voss, working alongside Corporate Private Security to ensure no unauthorized interference occurs. Second, upon arrival at the Eridani sector, she is tasked with conducting a transparent, government-mandated audit of the newly acquired corporate assets and infrastructure, ensuring full compliance with interplanetary regulatory law and serving as an external check on corporate activities. She operates with full independent authority but is committed to supporting the Captain and crew in the execution of the mission parameters.", Status: "Active"},
     6: {Name: "Clark Stubel", Expertise: "External Compliance Auditor", Photo: "clark_stubel.png", Record: "Clark Stubel is traveling under the authority of the Coalition for Fair Resource Allocation, a non-profit organization dedicated to monitoring deep-space exploratory missions for ethical resource hoarding and regulatory compliance. His extensive knowledge of ZDC infiltration tactics is critical for countering potential sabotage. Access to his full CSF and SAD records is strictly controlled by HR Key (Level 9) due to the classified nature of his past operations, and he is fully authorized to use lethal force in defense of corporate assets.", Status: "Active"},
     7: {Name: "Ren Smith", Expertise: "Communications Technician", Photo: "ren_smith.png", Record: "Ren is a specialized communications technician brought aboard to manage and maintain the Pilgrim’s experimental long-range comms array. His official expertise lies in low-level signal decryption and relay diagnostics. His mission is highly technical and passive, focused solely on ensuring the communication systems remain optimized for mission reports and corporate data transmission. He reports directly to the First Officer on all matters concerning the comms array's functionality. Rix maintains a clean security profile and has no authorization to access core ship operating systems or classified data. He is considered a replaceable, high-skilled laborer, essential for the comms array maintenance but otherwise separate from core crew operations.", Status: "Active"},
     8: {Name: "Sooren Wandara", Expertise: "Experimental Shielding Specialist", Photo: "sooren_wandara.png", Record: "Sooren Wandara is a specialist contracted through the Corporation's Environmental Risk Assessment (ERA) division. His official role is to operate and maintain the Pilgrim's Experimental Adaptive Shielding System (EASS)—a highly volatile, manually operated defense system designed to protect against unexpected micrometeoroid impacts in the deep Eridani sector. Wandara is noted for his physical resilience and specific training in high-G environment stabilization, making him essential for manual recalibrations of the EASS array. He has no authority over personnel but is granted priority access to the hull maintenance bays and specialized tools necessary to execute his technical defense duties. This specialized, high-risk technical expertise ensures his necessary presence on the voyage.", Status: "Active"},
     9: {Name: "Graython Coates", Expertise: "Corporation Boardmember", Photo: "graython_coates.png", Record: "Mr. Graython Coates is a Senior Board Director for the Eridanus Corporation, accompanying the mission as the official representative of the corporate leadership. His duties include certifying the mission's financial and logistical execution, ensuring compliance with shareholder mandates, and providing executive oversight for the transition of the Pilgrim into a permanent corporate asset upon arrival at the Eridani sector. He holds executive-level clearance over all non-operational aspects of the mission and reports directly to the corporate board. His presence ensures maximum accountability and integrity for this high-value endeavor. It is imperative that all crew members treat Mr. Coates with the deference due his rank and cooperate fully with any requests related to mission oversight and compliance.", Status: "Active"},
     10: {Name: "Bela Rovinskaia", Expertise: "Convict", Photo: "bela_rovinskaia.png", Record: "Bela Rovinskaia is currently being transported under maximum security protocols to the Delta-7 Penal Colony to stand trial for egregious acts of deep-space tax evasion and unauthorized corporate data extraction. A former high-ranking financial analyst for the Eridanus Corporation, Rovinskaia was apprehended attempting to liquidate substantial company assets and siphon funds into untraceable orbital accounts. Her containment is mandated by the Orbital Police Division and secured by Corporate Private Security, requiring a Tier-3 security clearance (Agent Mendelsonne is the primary custodian). The official reason for her transfer aboard the Pilgrim is to minimize public exposure of the criminal case and ensure the rapid restitution of stolen funds. Any attempt to communicate with, free, or otherwise interfere with Detainee Rovinskaia is punishable by full corporate law and will be treated as an act of treason and obstruction of justice.", "Status": "Active"},
     11: {Name: "Unassigned", Expertise: "N/A", Photo: "default_profile.png", "Record": "Status Unknown. Cryo-pod 11 life signs flickering.", "Status": "Unknown"},
     12: {Name: "Unassigned", Expertise: "N/A", Photo: "default_profile.png", "Record": "Status Unknown. Cryo-pod 12 breach alarm triggered.", "Status": "Unknown"}
};

// FULL NAV PUZZLE DATA (Retained for Nav screen)
const SECTOR_SOLUTION = { 2: "COMET", 6: "GAS CLOUD", 10: "ERIDANI B" };
const POSSIBLE_CONTENTS = [ "EARTH", "COMET x2", "GAS CLOUD x2", "ASTEROID x4", "EMPTY SPACE x2", "ERIDANI B" ];
const SECTOR_SCAN_DATA = { 1: "CORRUPT", 2: "CORRUPT", 3: "NOT EARTH", 4: "NOT EARTH", 5: "CORRUPT", 6: "CORRUPT", 7: "NOT EARTH", 8: "NOT GAS CLOUD", 9: "CORRUPT", 10: "NOT ASTEROID", 11: "NOT GAS CLOUD", 12: "NOT GAS CLOUD" };
const SECTOR_CLUES = [
    "DEFRAG 10%: SECTOR 11 COMET. EARTH is within 3 sectors of a COMET",
    "DEFRAG 20%: SECTOR 3 ASTEROID. EARTH is adjacent to an ASTEROID. ASTEROIDS are adjacent to at least ONE other ASTEROID",
    "DEFRAG 30%: SECTOR 12 ASTEROID. All ASTEROIDS are in a band of 6 sectors or less.",
    "DEFRAG 40%: SECTOR 9 GAS CLOUD. No GAS CLOUD is directly opposite of EARTH. GAS CLOUDS are adjacent to at least ONE EMPTY SPACE ",
    "DEFRAG 50%: SECTOR 8 EMPTY SPACE. No ASTEROID is adjacent to a GAS CLOUD.",
    "DEFRAG 60%: All GAS CLOUDS are in a band of 5 sectors or less",
    "DEFRAG 70%: ERIDANI B is within 2 sectors of an ASTEROID. ERIDANI B is NOT adjacent to EARTH",
];
let currentClueIndex = -1; 
let navUnlocked = false;
let o2DynamicInterval; 
let o2RecoveryStarted = false; 

// --- NAVIGATION LOGIC ---
function switchScreen(screenName) {
    document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));

    document.getElementById('screen-' + screenName).classList.add('active');

    const buttons = document.querySelectorAll('.nav-btn');
    if(screenName === 'dashboard') buttons[0].classList.add('active');
    if(screenName === 'nav') buttons[1].classList.add('active');
    if(screenName === 'personnel') buttons[2].classList.add('active');
    if(screenName === 'engineering') buttons[3].classList.add('active');
    
    // Auto-focus on command input when returning to dashboard
    if (screenName === 'dashboard') {
        commandInputEl.focus();
    }
}

// --- LOGGING ---
const logEl = document.getElementById('terminalLog'); 
const commandInputEl = document.getElementById('commandInput'); 

function appendToLog(text) {
    const time = new Date().toLocaleTimeString();
    const newEntry = `\n[${time}] ${text}`;
    logEl.innerText += newEntry;
    logEl.scrollTop = logEl.scrollHeight; 
}

function clearLog() {
    logEl.innerText = '// LOG CLEARED.';
}

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

async function typeText(text, delay) {
    appendToLog(text); 
    await sleep(delay * 300); 
}

// --- GLITCH EFFECT LOGIC ---
/**
 * Applies a visual glitch/seizure effect to the whole page and recovers.
 * @param {number} duration - The duration in milliseconds the main effect lasts.
 */
async function glitchEffect(duration = 200) {
    const body = document.body;
    
    // 1. Apply the seizure class immediately
    body.classList.remove('glitch-transition');
    body.classList.add('glitch-active');

    // 2. Wait for the main duration of the effect
    await sleep(duration);
    
    // 3. Start the smooth transition back
    body.classList.add('glitch-transition');
    body.classList.remove('glitch-active');
    
    // 4. Wait for the transition to finish before cleaning up
    await sleep(200); 
    body.classList.remove('glitch-transition');
}


// --- COMMAND PROMPT LOGIC ---
async function executeCommand() {
    
    const input = commandInputEl.value.trim().toUpperCase();
    commandInputEl.value = '';
    
    const parts = input.split(' ');
    const command = parts[0];
    
    // --- CONDITIONAL GLITCH CHECK ---
    const glitchCommands = ['HELP', 'REBOOT', 'DIAGNOSTICS'];
    
    if (glitchCommands.includes(command)) {
        // Wait for the visual effect to complete before proceeding
        await glitchEffect(150); 
    }
    // ------------------------------------

    if (input) {
         appendToLog(`> ${input}`); 
    }

    let response = "";
    
    const code = parts[1]; 

    switch (command) {
        case 'HELP':
            response = "// AVAILABLE COMMANDS:\n// HELP: Display this list.\n// STATUS: Display current ship systems report.\n// CLEAR: Clear the terminal output.\n// DIAGNOSTICS: Run full systems diagnostic.\n// NAVLOG: Display current navigation clues.\n// CREW: List active crew IDs.\n// O2 LEVEL: Detailed life support reading.\n// COMMS: Check communication link status.\n// REBOOT: Attempt system soft-reboot.\n// EXECUTE <code>: Initiates repair/jump protocols (See Engineering Manuals for repair codes).";
            break;
        case 'STATUS':
            response = "// SYSTEM STATUS REPORT:\n" +
                       `// HULL: ${shipData.hull.status}\n` +
                       `// ENGINE: ${shipData.engine.status}\n` +
                       `// O2 LEVEL: ${shipData.o2.level.toFixed(1)}%\n` +
                       `// COMMS: ${shipData.comms.status}\n` +
                       `// COORDINATES: ${shipData.coords.status}`;
            break;
        
        // --- EXECUTE COMMAND LOGIC ---
        case 'EXECUTE':
             if (!code) {
                 response = "// ERROR: EXECUTE COMMAND REQUIRES A CODE (e.g., [CODE] or JUMP).";
             } else if (code === ENGINE_FIX_CODE) {
                 await applyEngineFixLogic(); 
                 return; 
             } else if (code === HULL_FIX_CODE) {
                 await applyHullFixLogic(); 
                 return; 
             } else if (code === 'JUMP') {
                 response = "// ERROR: JUMP PROTOCOL MUST BE INITIATED VIA NAV CORE AND REQUIRES 4-DIGIT COORDINATE INPUT.";
             } else {
                 response = `// ERROR: UNKNOWN EXECUTE CODE '${code}'. ACCESS DENIED. CHECK MANUALS.`;
             }
             break;
        
        // --- INFORMATION & UTILITY COMMANDS (Retained) ---
        case 'NAVLOG':
            if (currentClueIndex === -1) {
                response = "// NAV CORE LOGIC IS OFFLINE. NO CLUES ACQUIRED YET. TRY THE NAV CORE CONSOLE.";
            } else {
                response = "// NAVIGATION DEFRAG CLUES:\n// " + SECTOR_CLUES.slice(0, currentClueIndex + 1).join('\n// ');
            }
            break;
        case 'CREW':
            let crewList = "// ACTIVE ROSTER (ID: Name):\n";
            for(let i=1; i<=12; i++) {
                crewList += `// ID ${i.toString().padStart(2, '0')}: ${PLAYER_PROFILES[i].Name}\n`;
            }
            response = crewList;
            break;
        case 'O2': 
        case 'O2 LEVEL':
            const o2Rate = (shipData.engine.status.includes("ONLINE") && shipData.hull.status.includes("NOMINAL")) ? 
                           "RECOVERING (+0.05%/s)" : 
                           (shipData.engine.status.includes("FAILURE") && shipData.hull.status.includes("BREACH")) ? 
                           "CRITICAL DECAY (-0.04%/s)" : 
                           "WARNING DECAY (-0.02%/s)";
            response = `// OXYGEN LEVEL: ${shipData.o2.level.toFixed(1)}%\n// CURRENT RATE: ${o2Rate}`;
            break;
        case 'COMMS':
            if (shipData.comms.status.includes("ONLINE")) {
                response = "// Active connection to Corporate Relay 49. Status: Normal. Bandwidth: 98.7%.\n// COMMS READY.";
            } else {
                response = "// COMMUNICATION ARRAY OFFLINE. NO SIGNAL DETECTED. CHECK ENGINEERING CONSOLE FOR POWER/RELAY STATUS.";
            }
            break;
        case 'REBOOT':
            response = "// Initiating system soft-reboot sequence...\n// Core OS online. Warning: Critical ship systems remain degraded. Check diagnostics.";
            break;
        case 'PULL': 
        case 'PULL HULL DATA':
             response = `// HULL INTEGRITY: ${shipData.hull.status}\n// LAST KNOWN BREACH: Fore-Section, Sector Gamma-14. Use 'EXECUTE [CODE]' to seal.`;
             break;
        case 'SECURITY':
            response = "// SECURITY PROTOCOL ACTIVE. Tier 3 Access granted.\n// All operational attempts logged. Agent Mendelsonne notified of command input.";
            break;
        case 'DIAGNOSTICS':
            response = "// SCANNING SHIP SYSTEMS...\n// NO IMMEDIATE THREATS DETECTED BEYOND KNOWN CRITICAL FAILURES. CHECK ENGINEERING CONSOLE.";
            break;
        case 'LOG': 
             logEl.scrollTop = logEl.scrollHeight; 
             response = "// SCROLL TO LATEST LOG ENTRY.";
             break;
        case 'TIME':
             response = `// CURRENT OS TIME: ${new Date().toLocaleTimeString()}`;
             break;
        case 'CLEAR':
            clearLog();
            response = "// READY.";
            break;
        default:
            response = `// ERROR: UNKNOWN COMMAND '${input}'. TYPE 'HELP' FOR ASSISTANCE.`;
            break;
    }

    if (response) {
        appendToLog(response);
    }
}

// --- ASYNC REPAIR LOGIC FUNCTIONS ---

async function applyEngineFixLogic() {
    if (shipData.engine.status.includes("FAILURE")) {
        appendToLog("[SYS] ENGINE CODE ACCEPTED. INITIATING REBOOT...");
        
        await typeText("CALIBRATING INJECTORS...... [OK]", 0.5);
        await typeText("ALIGNING CORES............. [OK]", 0.5);
        await typeText("IGNITION SEQUENCE.......... [COMPLETE]", 0.5);
        
        shipData.engine.status = "ONLINE / STANDBY";
        
        const engineImage = document.getElementById('engineStatusImage');
        if (engineImage) {
            engineImage.src = "assets/shipenginesfixed.png"; 
            engineImage.style.borderColor = "var(--primary-color)"; 
        }
        appendToLog("[ENGINE] ARRAY ONLINE. STABILITY 99.8%.");
    } else {
        appendToLog("[ENGINE] STATUS IS NOMINAL. NO REPAIR NEEDED.");
    }
    updateDashboard();
}

async function applyHullFixLogic() {
    if (shipData.hull.status.includes("BREACH")) {
        appendToLog("[SYS] HULL CODE ACCEPTED. INITIATING SEALING SEQUENCE...");
        
        await typeText("PRESSURIZING FIELD......... [OK]", 0.5);
        await typeText("APPLYING PATCH............. [OK]", 0.5);
        
        shipData.hull.status = "NOMINAL (SEALED)";
        
        const hullImage = document.getElementById('hullStatusImage');
        if (hullImage) {
            hullImage.src = "assets/shipimage2.png";
            hullImage.style.borderColor = "var(--primary-color)"; 
        }
        appendToLog("[HULL] BREACH SEALED. INTEGRITY 100%.");
    } else {
        appendToLog("[HULL] STATUS IS NOMINAL. NO REPAIR NEEDED.");
    }
    updateDashboard();
}


// --- O2, DASHBOARD, NAV, PERSONNEL LOGIC ---

function startO2LogicLoop() {
    if (o2DynamicInterval) return;
    appendToLog("[ALERT] O2 DECAY DETECTED. APPROXIMATE DEPLETION OF O2 IN 30 MINS. CHECK ENGINES. CHECK HULL.");
    
    o2DynamicInterval = setInterval(() => {
        const engineFixed = shipData.engine.status.includes("ONLINE");
        const hullFixed = shipData.hull.status.includes("NOMINAL");
        
        let change = 0;

        if (engineFixed && hullFixed) {
            change = O2_RECOVERY_RATE;
            if(!o2RecoveryStarted) { 
                appendToLog("[SYS] O2 RECOVERY PROTOCOL STARTED."); 
                o2RecoveryStarted = true; 
            }
        } else if (engineFixed || hullFixed) {
            change = -O2_DECAY_RATE_WARNING;
        } else {
            change = -O2_DECAY_RATE_CRITICAL;
        }
        
        shipData.o2.level += change;
        
        // Clamp
        if(shipData.o2.level > 100) shipData.o2.level = 100;
        if(shipData.o2.level < 0) {
            shipData.o2.level = 0;
            clearInterval(o2DynamicInterval);
            alert("CRITICAL FAILURE: LIFE SUPPORT OFFLINE.");
        }

        // Periodic warning
        if(shipData.o2.level < 15 && Math.random() < 0.05) { 
            appendToLog(`[WARNING] O2 CRITICAL: ${shipData.o2.level.toFixed(1)}%`);
        }
        
        updateDashboard();
    }, 1000);
}

function updateDashboard() {
    // Clock
    document.getElementById('time').textContent = new Date().toLocaleTimeString();
    
    // --- HULL ---
    const hullCard = document.getElementById('hullIconCard');
    hullCard.classList.remove('critical', 'nominal');
    if (shipData.hull.status.includes("BREACH")) {
        hullCard.classList.add('critical');
        document.getElementById('hullIconCard').querySelector('.icon-symbol').innerHTML = '&#9876;'; 
    } else {
        hullCard.classList.add('nominal');
        document.getElementById('hullIconCard').querySelector('.icon-symbol').innerHTML = '&#9937;'; 
    }
    document.getElementById('hullStatus').textContent = shipData.hull.status;
    // Update Engineering text displays
    const hullDisplay = document.getElementById('hull-status-display');
    if (hullDisplay) hullDisplay.textContent = shipData.hull.status; 
    
    // --- ENGINE ---
    const engineCard = document.getElementById('engineIconCard');
    engineCard.classList.remove('critical', 'nominal');
    if (shipData.engine.status.includes("FAILURE")) {
        engineCard.classList.add('critical');
        document.getElementById('engineIconCard').querySelector('.icon-symbol').innerHTML = '&#9888;'; 
    } else {
        engineCard.classList.add('nominal');
        document.getElementById('engineIconCard').querySelector('.icon-symbol').innerHTML = '&#9881;'; 
    }
    document.getElementById('engineStatus').textContent = shipData.engine.status;
    // Update Engineering text displays
    const engDisplay = document.getElementById('eng-status-display');
    if (engDisplay) engDisplay.textContent = shipData.engine.status; 

    // --- COMMS ---
    const commsCard = document.getElementById('commsIconCard');
    commsCard.classList.remove('warning', 'nominal');
    if (shipData.comms.status.includes("OFFLINE")) {
        commsCard.classList.add('warning');
        document.getElementById('commsIconCard').querySelector('.icon-symbol').innerHTML = '&#9992;'; 
    } else {
        commsCard.classList.add('nominal');
        document.getElementById('commsIconCard').querySelector('.icon-symbol').innerHTML = '&#9741;'; 
    }
    document.getElementById('commsStatus').textContent = shipData.comms.status;

    // --- COORDS ---
    const coordCard = document.getElementById('coordIconCard');
    coordCard.classList.remove('warning', 'nominal');
    if (shipData.coords.status.includes("CORRUPTED")) {
        coordCard.classList.add('warning');
        document.getElementById('coordIconCard').querySelector('.icon-symbol').innerHTML = '&#9734;'; 
    } else {
        coordCard.classList.add('nominal');
        document.getElementById('coordIconCard').querySelector('.icon-symbol').innerHTML = '&#9733;'; 
    }
    document.getElementById('coordStatus').textContent = shipData.coords.status;

    // --- O2 GAUGE & CARD COLOR ---
    const o2Card = document.getElementById('o2IconCard');
    o2Card.classList.remove('critical', 'warning', 'nominal');
    
    if(shipData.o2.level < 20) o2Card.classList.add('critical');
    else if(shipData.o2.level < 50) o2Card.classList.add('warning');
    else o2Card.classList.add('nominal');

    document.getElementById('o2Value').textContent = shipData.o2.level.toFixed(1) + "%";
    
    const gauge = document.getElementById('o2Gauge');
    gauge.style.width = shipData.o2.level + "%";
    if(shipData.o2.level < 20) gauge.style.background = "red";
    else if(shipData.o2.level < 50) gauge.style.background = "orange";
    else gauge.style.background = "var(--primary-color)";
}

function displaySectorScan() {
    let output = "--- SECTOR SCAN DATA (1-12) ---\n";
    let keys = Object.keys(SECTOR_SCAN_DATA);
    for (let i = 0; i < keys.length; i += 2) {
        let row = "";
        for (let j = 0; j < 2; j++) {
            if (keys[i + j]) {
                const sector = keys[i + j].padStart(2, '0');
                const content = SECTOR_SCAN_DATA[keys[i + j]]; 
                row += `[Sect ${sector}: ${content.padEnd(14)}] `;
            }
        }
        output += row + "\n";
    }
    document.getElementById('navScanOutput').innerText = output;
    displayCurrentClues();
}

function displayCurrentClues() {
    const list = document.getElementById('navClues');
    list.innerHTML = '';
    if (currentClueIndex === -1) {
        list.innerHTML = '<li>-- NO DEFRAG CLUES AVAILABLE --</li>';
        return;
    }
    for (let i = 0; i <= currentClueIndex; i++) {
        if (i < SECTOR_CLUES.length) {
            const li = document.createElement('li');
            li.textContent = SECTOR_CLUES[i];
            list.appendChild(li);
        }
    }
}

function sectorLogicGame() {
    const s2 = document.getElementById('sector2').value.toUpperCase().trim();
    const s6 = document.getElementById('sector6').value.toUpperCase().trim();
    const s10 = document.getElementById('sector10').value.toUpperCase().trim();

    if (!s2 || !s6 || !s10) {
         appendToLog("[NAV] ERROR: Input all fields.");
         return;
    }

    if(s2 === SECTOR_SOLUTION[2] && s6 === SECTOR_SOLUTION[6] && s10 === SECTOR_SOLUTION[10]) {
        appendToLog("[NAV] CONFIG VERIFIED. UNLOCKING CORE.");
        document.getElementById('navLogicPanel').style.display = 'none';
        document.getElementById('navFinalPanel').style.display = 'block';
        navUnlocked = true;
        shipData.coords.status = "READY FOR INPUT";
    } else {
        appendToLog("[NAV] VERIFICATION FAILED.");
        if (currentClueIndex < SECTOR_CLUES.length - 1) { 
            currentClueIndex++;
            appendToLog(`[NAV] NEW CLUE FOUND.`);
            displayCurrentClues();
        }
    }
    updateDashboard();
}

function accessNav(coords) {
    if(!navUnlocked) return;
    
    if(shipData.engine.status.includes("FAILURE")) {
        appendToLog("[ERR] ENGINES OFFLINE. CANNOT CALCULATE.");
        return;
    }

    if(coords.trim() === ERIDANI_COORDS) {
        shipData.coords.status = "LOCKED: EPSILON ERIDANI";
        appendToLog("!!! JUMP COORDINATES LOCKED. MISSION ACCOMPLISHED. !!!");
        alert("MISSION ACCOMPLISHED: JUMP INITIATED TO ERIDANI");
    } else if (coords.trim() === EARTH_COORDS) {
         shipData.coords.status = "LOCKED: EARTH";
         appendToLog("!!! JUMP COORDINATES LOCKED. MISSION ACCOMPLISHED. !!!");
         alert("MISSION ACCOMPLISHED: JUMP INITIATED TO EARTH");
    } else {
        appendToLog("[ERR] INVALID COORDINATES.");
    }
    updateDashboard();
}

function displayCrewList() {
    const list = document.getElementById('crewList');
    list.innerHTML = '';
    for(let i=1; i<=12; i++) {
        let li = document.createElement('li');
        li.innerText = `ID ${i.toString().padStart(2, '0')}: ${PLAYER_PROFILES[i].Name}`;
        list.appendChild(li);
    }
}

function getPersonnelFile(idStr) {
    const id = parseInt(idStr.trim());
    const display = document.getElementById('personnelFileDisplay');
    const photoEl = document.getElementById('personnelPhoto'); 
    
    if(isNaN(id) || id < 1 || id > 12) {
        display.innerText = "// ERROR: INVALID ID";
        photoEl.src = "assets/default_profile.png"; 
        return;
    }

    const p = PLAYER_PROFILES[id];

    photoEl.src = p.Photo || "assets/default_profile.png"; 
    
    let content = `ID: ${id}\nNAME: ${p.Name}\nSTATUS: ${p.Status}\nEXPERT: ${p.Expertise}\n`;
    
    let granted = true; 
    
    if(granted) {
        content += `\nRECORD:\n${p.Record}`;
        appendToLog(`[SYS] ACCESSED FILE ID ${id}`);
    } else {
        content += "\n[ACCESS DENIED: CONTACT ADMIN]";
        appendToLog(`[SEC] ACCESS DENIED ID ${id}`);
    }

    display.innerText = content;
}

// --- MOBILE ACCESS RESTRICTION LOGIC ---
function isMobileDevice() {
    // Basic check for common mobile device width/user agents
    return window.matchMedia("(max-width: 768px)").matches || 
           /Mobi|Android/i.test(navigator.userAgent);
}

function restrictMobileNav() {
    if (isMobileDevice()) {
        // Switch to the Personnel screen immediately
        switchScreen('personnel');

        const navButtons = document.querySelectorAll('.nav-btn');
        // The buttons are: [0] Status, [1] Nav Core, [2] Personnel, [3] Engineering
        
        // Disable all buttons except Personnel (index 2)
        navButtons.forEach((button, index) => {
            if (index !== 2) { 
                button.disabled = true;
                button.style.opacity = 0.4;
                button.style.cursor = 'not-allowed';
                button.setAttribute('title', 'Access Restricted on Mobile Device');
            } else {
                // Ensure Personnel button is functional and active
                button.disabled = false;
                button.classList.add('active');
            }
        });

        appendToLog("[SECURITY] MOBILE ACCESS DETECTED. ALL CONSOLES EXCEPT PERSONNEL ARE RESTRICTED.");
    }
}

// --- INIT ---
window.onload = function() {
    startO2LogicLoop();
    displayCrewList();
    displaySectorScan();
    updateDashboard();
    
    // NEW: Check and restrict navigation for mobile users
    restrictMobileNav();

    appendToLog("PILGRIM OS v1.2 // SYSTEM ONLINE. TYPE 'HELP' FOR ASSISTANCE."); 
    commandInputEl.focus(); 
};
