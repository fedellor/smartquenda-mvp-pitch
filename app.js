// Generador de Agentes Masivos
const lastNames = ['García', 'Rodríguez', 'López', 'Martínez', 'Sánchez', 'Pérez', 'Gómez', 'Fernández', 'Ruiz', 'Díaz', 'Álvarez', 'Vázquez', 'Castro', 'Iglesias', 'Vidal', 'Blanco', 'Silva'];
const firstInitials = ['A.', 'B.', 'C.', 'D.', 'E.', 'F.', 'G.', 'J.', 'L.', 'M.', 'P.', 'R.', 'S.', 'V.'];
const departments = ['Policía Local', 'Bomberos', 'Protección Civil'];

function generateAgents(count) {
    const agents = [];
    for(let i=0; i<count; i++) {
        const dept = departments[Math.floor(Math.random() * departments.length)];
        const isBombero = dept === 'Bomberos';
        const isPolicia = dept === 'Policía Local';
        
        let rank = 'Agente';
        if (isBombero) rank = Math.random() > 0.8 ? 'Cabo' : 'Bombero';
        if (isPolicia) rank = Math.random() > 0.8 ? 'Oficial' : 'Agente';
        if (dept === 'Protección Civil') rank = 'Voluntario';

        const baseHours = 140;
        const extraHoursNum = Math.floor(Math.random() * 40);
        const totalHours = baseHours + extraHoursNum;
        
        let legalStatus = { class: 'success', text: 'Conforme' };
        let progressW = Math.floor(Math.random() * 30) + 60;
        let progressC = '';

        if (totalHours > 165) {
            legalStatus = { class: 'warning', text: 'Límite Extra' };
            progressC = 'warning';
            progressW = 40;
        }
        if (Math.random() > 0.95) {
            legalStatus = { class: 'danger', text: 'Baja Médica' };
            progressC = 'danger';
            progressW = 20;
        }

        agents.push({
            id: `ID-${1000 + i}`,
            name: `${firstInitials[Math.floor(Math.random() * firstInitials.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
            dept: dept,
            rank: rank,
            baseHours: baseHours,
            extraHours: extraHoursNum,
            hours: totalHours + 'h',
            legal: legalStatus,
            w: progressW + '%',
            c: progressC,
            shifts: Array(7).fill().map(() => {
                const r = Math.random();
                if (r > 0.7) return { class: 'rest', text: 'L' };
                if (r > 0.4) return { class: 'morning', text: 'M' };
                if (r > 0.1) return { class: 'afternoon', text: 'T' };
                return { class: 'night', text: 'N' };
            })
        });
    }
    return agents;
}

// Base de datos de la aplicación
const data = {
    santiago: {
        kpis: { cobertura: '98%', alertas: 3, equidad: '9.4' },
        status: [
            { label: 'Túnel del Hórreo (Policía)', safe: false, text: 'Riesgo Detectado', detail: "Riesgo extremo de colapso de tráfico. Baja repentina del agente de atestados. Resolución: Asignar patrulla del cuadrante norte." },
            { label: 'Centro Histórico (Policía)', safe: true, text: 'Cubierto', detail: "Ruta jacobea controlada. 14 agentes en patrulla a pie activos. 0 alertas." },
            { label: 'Polígono Costa Vella (Bomberos)', safe: false, text: 'Déficit Operativo', detail: "Camión escala inoperativo por revisión. Personal reasignado temporalmente a base sur." }
        ],
        activity: [
            { text: 'Análisis predictivo completado. 3 alertas encontradas.', time: 'Hace 2 min' },
            { text: 'Sincronización masiva de 124 agentes exitosa.', time: 'Hace 5 min' },
            { text: 'Convenio policial validado sin errores lógicos.', time: 'Hace 1 hora' }
        ],
        agents: generateAgents(740),
        alerts: [
            {
                id: 'alerta-1',
                type: 'critical',
                title: '1. Efecto Hórreo: Riesgo Inminente (Policía Local)',
                desc: 'El túnel del Hórreo quedará sin cobertura el Sábado en el turno de mañana debido a una baja médica.',
                solution: 'Asignar a D. Martínez (ID-1045). Cumple con los descansos legales de 14h y tiene el menor índice de horas extra acumuladas.',
                btnText: 'Aplicar Solución Segura'
            },
            {
                id: 'alerta-2',
                type: 'warning',
                title: '2. Alerta de Equidad (Bomberos)',
                desc: 'El bombero con ID-1092 supera la media del parque en horas nocturnas este trimestre.',
                solution: 'Reasignar los próximos 2 turnos de noche al Cabo J. Silva para equilibrar la carga equitativamente.',
                btnText: 'Aprobar Ajuste'
            },
            {
                id: 'alerta-3',
                type: 'critical',
                title: '3. Déficit Operativo Evento Especial',
                desc: 'Faltan 4 voluntarios de Protección Civil para el dispositivo del concierto.',
                solution: 'Activar protocolo P2: Lanzar notificación automatizada de cobertura extra al grupo de reserva.',
                btnText: 'Notificar Reserva'
            }
        ]
    },
    coruna: {
        kpis: { cobertura: '95%', alertas: 1, equidad: '9.1' },
        status: [
            { label: 'Riazor', safe: true, text: 'Cubierto', detail: "Dispositivo de seguridad del estadio completado." },
            { label: 'Paseo Marítimo', safe: false, text: 'Atención Requerida', detail: "Alerta de temporal. Refuerzo de Protección Civil activado." }
        ],
        activity: [ { text: 'Alerta generada por evento deportivo.', time: 'Hace 15 min' } ],
        agents: generateAgents(620),
        alerts: [
            { id: 'alerta-1-coruna', type: 'warning', title: 'Cobertura Riazor', desc: 'Dispositivo especial requerido.', solution: 'Asignar refuerzo de Policía Local sector norte.', btnText: 'Aplicar Refuerzo' }
        ]
    },
    vigo: {
        kpis: { cobertura: '100%', alertas: 0, equidad: '9.8' },
        status: [ { label: 'Zona Centro (Navidad)', safe: true, text: 'Óptimo', detail: "Dispositivo de alumbrado 100% operativo sin incidencias." } ],
        activity: [ { text: 'Sistema operando al máximo rendimiento sin alertas.', time: 'Hace 1 día' } ],
        agents: generateAgents(880),
        alerts: []
    },
    ourense: {
        kpis: { cobertura: '99%', alertas: 0, equidad: '9.5' },
        status: [ { label: 'As Burgas', safe: true, text: 'Cubierto', detail: "Patrullas térmicas operativas." } ],
        activity: [ { text: 'Planificación validada con éxito.', time: 'Hace 10 horas' } ],
        agents: generateAgents(315),
        alerts: []
    }
};

let currentCity = 'santiago';
let currentDeptAgents = 'all';
let currentDeptCal = 'all';

document.addEventListener('DOMContentLoaded', () => {
    if(data.santiago.agents.length > 0) {
        data.santiago.agents[0].shifts[5] = { class: 'alert shift-target-1', text: '!' };
        data.santiago.agents[0].shifts[6] = { class: 'alert shift-target-2', text: '!' };
    }

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            switchView(item.getAttribute('data-target'));
        });
    });

    document.getElementById('city-select').addEventListener('change', (e) => {
        currentCity = e.target.value;
        loadData();
    });

    document.getElementById('dept-filter-agents').addEventListener('change', (e) => {
        currentDeptAgents = e.target.value;
        renderAgents();
    });

    loadData();

    // Auto-arrancar el tour a los 500ms
    setTimeout(() => {
        startTour();
    }, 500);
});

window.switchView = function(targetId) {
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    const targetNav = document.getElementById(`nav-${targetId}`);
    if(targetNav) {
        targetNav.classList.add('active');
        document.getElementById('page-title').innerText = targetNav.querySelector('span').innerText;
    }
    document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
    document.getElementById(`view-${targetId}`).classList.add('active');
}

function loadData() {
    const d = data[currentCity];

    document.getElementById('kpi-cobertura').innerText = d.kpis.cobertura;
    document.getElementById('kpi-alertas').innerText = d.kpis.alertas;
    
    const badge = document.getElementById('alert-badge');
    if(d.kpis.alertas > 0) {
        badge.style.display = 'block';
        badge.innerText = d.kpis.alertas;
    } else {
        badge.style.display = 'none';
    }
    
    document.getElementById('city-status-list').innerHTML = d.status.map(s => `
        <div class="status-item ${s.safe ? 'safe' : 'warning'}" onclick="openSectorDetail('${s.label}', '${s.safe}', '${s.detail}')">
            <span class="status-label">${s.label}</span>
            <span class="status-badge">${s.text}</span>
        </div>
    `).join('');

    if(d.alerts.length > 0) {
        document.getElementById('alerts-container').innerHTML = d.alerts.map(a => `
            <div class="alert-card ${a.type}" id="${a.id}">
                <div class="alert-icon"><i class="fa-solid ${a.type === 'critical' ? 'fa-triangle-exclamation' : 'fa-scale-unbalanced'}"></i></div>
                <div class="alert-content">
                    <h3 class="alert-title">${a.title}</h3>
                    <p class="alert-desc">${a.desc}</p>
                    <div class="alert-ai-solution">
                        <div class="solution-header"><i class="fa-solid fa-wand-magic-sparkles"></i> Solución Sugerida por la IA</div>
                        <p>${a.solution}</p>
                        <div class="solution-actions">
                            <button class="btn btn-primary btn-lg" onclick="resolveAlertBtn(this, '${a.id}')"><i class="fa-solid fa-check"></i> ${a.btnText}</button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    } else {
        document.getElementById('alerts-container').innerHTML = `
            <div class="card" style="padding: 3rem; text-align: center; border-left: 8px solid var(--success);">
                <i class="fa-solid fa-shield-check" style="font-size: 4rem; color: var(--success); margin-bottom: 1rem;"></i>
                <h3 style="font-size: 2rem;">Todo Operativo</h3>
                <p style="color: var(--text-muted); font-size: 1.2rem;">No hay alertas predictivas para esta administración.</p>
            </div>
        `;
    }

    renderAgents();
    renderCalendar();
}

function renderAgents() {
    const allAgents = data[currentCity].agents;
    const filtered = currentDeptAgents === 'all' ? allAgents : allAgents.filter(a => a.dept === currentDeptAgents);
    document.getElementById('agents-count').innerText = filtered.length;

    document.getElementById('agents-body').innerHTML = filtered.slice(0, 100).map(a => `
        <tr class="agent-row">
            <td><strong>${a.id}</strong> <br> <span style="color:var(--text-muted)">${a.name}</span></td>
            <td><span class="dept-badge">${a.dept}</span></td>
            <td>${a.rank}</td>
            <td>${a.hours}</td>
            <td><span class="badge-table badge-${a.legal.class}">${a.legal.text}</span></td>
            <td><div class="progress-bar"><div class="progress ${a.c}" style="width: ${a.w};"></div></div></td>
            <td><button class="btn btn-outline" style="padding: 0.5rem 1rem;" onclick="openAgentProfile('${a.id}')"><i class="fa-solid fa-address-card"></i> Ver Perfil</button></td>
        </tr>
    `).join('');
}

function renderCalendar() {
    const allAgents = data[currentCity].agents;
    const displayAgents = allAgents.slice(0, 50);

    const calBody = document.getElementById('calendar-body');
    if(calBody) {
        calBody.innerHTML = displayAgents.map(a => `
            <tr>
                <td><strong>${a.name}</strong> <br> <small style="color:var(--text-muted)">${a.dept}</small></td>
                ${a.shifts.map((s) => `<td><div class="shift ${s.class}" ${s.class.includes('alert') ? `onclick="switchView('alertas')"` : ''}>${s.text}</div></td>`).join('')}
            </tr>
        `).join('');
    }
}

window.filterAgentsText = function(val) {
    const rows = document.querySelectorAll('.agent-row');
    const lowerVal = val.toLowerCase();
    rows.forEach(r => {
        if(r.innerText.toLowerCase().includes(lowerVal)) { r.style.display = ''; } 
        else { r.style.display = 'none'; }
    });
}

window.simulateAction = function(msg) {
    const toast = document.getElementById('toast-notification');
    document.getElementById('toast-message').innerText = msg;
    toast.style.transform = 'translateY(0)';
    setTimeout(() => { toast.style.transform = 'translateY(150%)'; }, 3000);
}

window.openModal = function(id) { 
    document.getElementById(id).classList.add('active'); 
    
    if(id === 'sync-modal') {
        const term = document.getElementById('terminal-output');
        document.getElementById('btn-sync-close').style.display = 'none';
        term.innerHTML = "> Iniciando protocolo SSL...<br>";
        const lines = [
            "> Conexión establecida [OK]",
            "> Transmitiendo 7245 registros...",
            "> Respuesta de confirmación estatal [OK]",
            "> Sincronización Finalizada."
        ];
        let delay = 600;
        lines.forEach(line => { setTimeout(() => { term.innerHTML += line + "<br>"; }, delay); delay += 600; });
        setTimeout(() => { document.getElementById('btn-sync-close').style.display = 'block'; }, delay);
    }
}

window.showLoaderModal = function(loadText, doneText, iconClass) {
    const loader = document.getElementById('prediction-loader');
    const result = document.getElementById('prediction-result');
    const progress = document.getElementById('pred-progress');
    
    loader.querySelector('h2').innerText = loadText;
    result.querySelector('h2').innerText = doneText;
    loader.querySelector('i').className = iconClass + " animate-pulse";
    
    document.getElementById('prediction-modal').classList.add('active');
    loader.style.display = 'block';
    result.style.display = 'none';
    progress.style.width = '0%';
    
    setTimeout(() => { progress.style.width = '50%'; }, 500);
    setTimeout(() => { progress.style.width = '80%'; }, 1200);
    setTimeout(() => { 
        progress.style.width = '100%'; 
        setTimeout(() => {
            loader.style.display = 'none';
            result.style.display = 'block';
            if (loadText.includes("IA") || loadText.includes("Datos")) {
                document.getElementById('kpi-cobertura').innerText = '99.5%';
            }
        }, 400);
    }, 2000);
}


window.closeModal = function(id) { document.getElementById(id).classList.remove('active'); }

window.openSectorDetail = function(sectorName, isSafe, detailText) {
    document.getElementById('sector-detail-title').innerText = sectorName;
    const isSafeBool = isSafe === 'true';
    const iconHtml = isSafeBool ? '<i class="fa-solid fa-shield-check" style="color:var(--success); font-size:4rem;"></i>' : '<i class="fa-solid fa-triangle-exclamation" style="color:var(--danger); font-size:4rem;"></i>';
    const statusText = isSafeBool ? '<span style="color:var(--success); font-weight:800;">Óptimo</span>' : '<span style="color:var(--danger); font-weight:800;">Riesgo Detectado</span>';
    
    let actionsHtml = isSafeBool ? `<button class="btn btn-outline" onclick="closeModal('sector-detail-modal')">Cerrar</button>` : 
        `<button class="btn btn-primary" onclick="closeModal('sector-detail-modal'); switchView('alertas');"><i class="fa-solid fa-wand-magic-sparkles"></i> Activar IA</button>`;

    document.getElementById('sector-detail-body').innerHTML = `
        <div style="text-align: center; margin-bottom: 2rem;">${iconHtml}<h3 style="font-size: 1.5rem; margin-top: 1rem;">Estado: ${statusText}</h3></div>
        <div style="background: var(--bg-color); padding: 1.5rem; border-left: 4px solid ${isSafeBool ? 'var(--success)' : 'var(--danger)'}; margin-bottom: 2rem;"><p>${detailText}</p></div>
        <div style="text-align: right;">${actionsHtml}</div>
    `;
    openModal('sector-detail-modal');
}

window.openAgentProfile = function(id) {
    const agent = data[currentCity].agents.find(a => a.id === id);
    if(!agent) return;
    
    document.getElementById('agent-profile-content').innerHTML = `
        <div style="display: flex; gap: 2rem; margin-bottom: 2rem; align-items: center;">
            <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--primary); color: white; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; font-weight: bold;">
                ${agent.name.charAt(0)}
            </div>
            <div>
                <h3 style="font-size: 1.5rem; margin-bottom: 0.25rem;">${agent.name}</h3>
                <p style="color: var(--text-muted); font-size: 1.1rem; font-weight: 600;">${agent.dept} - ${agent.rank}</p>
            </div>
        </div>
        <div class="profile-grid">
            <div class="profile-stat"><div class="profile-stat-val text-main">${agent.hours}</div><div class="profile-stat-label">Horas Totales (Mes)</div></div>
            <div class="profile-stat"><div class="profile-stat-val text-success">${agent.baseHours}h</div><div class="profile-stat-label">Horas Base</div></div>
            <div class="profile-stat"><div class="profile-stat-val" style="color: ${agent.extraHours > 20 ? 'var(--danger)' : 'var(--warning)'}">${agent.extraHours}h</div><div class="profile-stat-label">Horas Extra Acumuladas</div></div>
            <div class="profile-stat"><div class="profile-stat-val text-info">100%</div><div class="profile-stat-label">Índice de Asistencia</div></div>
        </div>
        <div style="text-align: right; margin-top: 1rem;">
            <button class="btn btn-outline" onclick="closeModal('agent-profile-modal')">Cerrar Expediente</button>
        </div>
    `;
    openModal('agent-profile-modal');
}

window.processVacations = function() {
    const cards = document.querySelectorAll('.vacation-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = "0";
            card.style.transform = "translateX(50px)";
            setTimeout(() => {
                const statusDiv = card.querySelector('.vacation-status');
                if(card.id === 'vac-3') {
                    statusDiv.className = "vacation-status warning";
                    statusDiv.innerHTML = "<i class='fa-solid fa-hand'></i> Denegado";
                } else {
                    statusDiv.className = "vacation-status success";
                    statusDiv.innerHTML = "<i class='fa-solid fa-check'></i> Aprobado";
                }
                card.style.opacity = "1";
                card.style.transform = "translateX(0)";
            }, 400);
        }, index * 800);
    });
}

window.generateFormalReport = function() {
    showLoaderModal("Generando Informe Oficial PDF...", "Descarga Iniciada", "fa-solid fa-file-pdf");
}

window.auditPayroll = function() {
    showLoaderModal("Auditando Nóminas y Fichajes...", "Auditoría Financiera Completada", "fa-solid fa-file-invoice-dollar");
}

window.resolveAlertBtn = function(btn, alertId) {
    btn.innerHTML = '<i class="fa-solid fa-check-double"></i> Solucionado';
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-success');
    btn.disabled = true;
    
    // Decrementar alertas reales
    const d = data[currentCity];
    if (d.kpis.alertas > 0) {
        d.kpis.alertas--;
        document.getElementById('kpi-alertas').innerText = d.kpis.alertas;
        
        const badge = document.getElementById('alert-badge');
        if(d.kpis.alertas > 0) {
            badge.innerText = d.kpis.alertas;
        } else {
            badge.style.display = 'none';
        }
    }
    
    // MAGIA VISUAL: Arreglar el gráfico según la alerta resuelta
    if (alertId === 'alerta-1') {
        // Alerta del sábado (crítica)
        document.querySelectorAll('.chart-bar.danger').forEach(bar => {
            bar.className = 'chart-bar success hover-scale';
            bar.style.height = '100%';
            bar.setAttribute('data-tooltip', 'Sábado: Efectivos reasignados. Cobertura 100%');
        });
        document.querySelectorAll('.text-danger.pulse, .pulse').forEach(el => {
            el.classList.remove('text-danger', 'pulse');
        });
    }
    
    if (alertId === 'alerta-3' || alertId === 'alerta-1-coruna') {
        // Alerta del jueves (warning)
        document.querySelectorAll('.chart-bar.warning').forEach(bar => {
            bar.className = 'chart-bar success hover-scale';
            bar.style.height = '100%';
            bar.setAttribute('data-tooltip', 'Jueves: Refuerzo activado con éxito. Cobertura 100%');
        });
    }
    
    // Si llegamos a 0 alertas, la cobertura global sube al 100%
    if (d.kpis.alertas === 0) {
        document.getElementById('kpi-cobertura').innerText = '100%';
        const trend = document.getElementById('kpi-cobertura').nextElementSibling;
        if(trend) trend.innerHTML = '<i class="fa-solid fa-shield-halved"></i> Riesgo Neutralizado';
    }
    
    simulateAction(`Solución aplicada en el sistema.`);
    
    setTimeout(() => {
        const card = document.getElementById(alertId);
        if(card) {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => card.style.display = 'none', 300);
        }
    }, 1200);
}

/* =========================================
   TOUR GUIADO (ONBOARDING)
   ========================================= */

const tourSteps = [
    {
        target: '.tour-step-1',
        title: "Elige tu Ayuntamiento",
        desc: "Selecciona tu ciudad aquí. El sistema cargará al instante a todo el personal y sus turnos actuales."
    },
    {
        target: '.tour-step-2',
        title: "Resumen de tu Ciudad",
        desc: "Aquí ves lo importante: cuántos turnos de la ciudad están cubiertos y si hay alertas activas que requieran tu atención."
    },
    {
        target: '.tour-step-3',
        title: "Previsión de Problemas",
        desc: "Esta gráfica te avisa si va a faltar personal algún día de la semana. Así puedes solucionarlo antes de que ocurra."
    },
    {
        target: '.tour-step-4',
        title: "Cuadrante Automático",
        desc: "Aquí puedes ver todos los turnos. El sistema respeta los convenios laborales automáticamente para que no haya errores ni denuncias."
    },
    {
        target: '.tour-step-5',
        title: "Soluciones con 1 Clic",
        desc: "Cuando falte personal, entra aquí. El sistema te propondrá a la persona ideal para cubrir el puesto respetando sus descansos. ¡Haz clic para probarlo!"
    }
];

let currentTourStep = 0;

window.startTour = function() {
    currentTourStep = 0;
    document.getElementById('tour-overlay').classList.add('active');
    switchView('dashboard');
    showTourStep(0);
}

window.nextTourStep = function() {
    if(currentTourStep < tourSteps.length - 1) {
        currentTourStep++;
        showTourStep(currentTourStep);
    } else {
        endTour();
    }
}

window.endTour = function() {
    document.getElementById('tour-overlay').classList.remove('active');
    document.getElementById('tour-box').classList.remove('active');
    document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));
}

function showTourStep(index) {
    const step = tourSteps[index];
    
    // Quitar highlight anterior
    document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));
    
    // Poner highlight nuevo
    const targetEl = document.querySelector(step.target);
    if(targetEl) {
        targetEl.classList.add('tour-highlight');
        
        const rect = targetEl.getBoundingClientRect();
        const box = document.getElementById('tour-box');
        
        document.getElementById('tour-title').innerText = step.title;
        document.getElementById('tour-desc').innerText = step.desc;
        document.getElementById('tour-step-count').innerText = `Paso ${index + 1} de ${tourSteps.length}`;
        
        box.classList.add('active');
        
        if(rect.right + 380 < window.innerWidth) {
            box.style.left = (rect.right + 30) + 'px';
            box.style.top = Math.max(20, rect.top) + 'px';
        } else {
            box.style.left = Math.max(20, rect.left) + 'px';
            box.style.top = (rect.bottom + 30) + 'px';
        }
    }
}
