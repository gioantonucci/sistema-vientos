const STORAGE_KEY = "vientos-del-sur-mvp";
const AUTH_KEY = "vientos-del-sur-auth";
const REMOTE_READY_KEY = "vientos-del-sur-remote-ready";

const disciplines = ["Psicología", "Psicopedagogía", "Fonoaudiología", "Terapia ocupacional", "Nutrición", "Orientación familiar"];
const patientStates = ["activo", "en_evaluacion", "pausado", "alta", "inactivo"];
const professionalStates = ["activo", "inactivo", "externo"];
const appointmentStates = ["programado", "confirmado", "asistio", "cancelado", "ausente", "reprogramado"];
const paymentStates = ["pendiente", "pagado", "bonificado", "cancelado"];
const paymentMethods = ["efectivo", "transferencia", "mercado_pago", "otro"];
const noteTypes = ["evolucion", "evaluacion", "entrevista", "reunion_familia", "reunion_escuela", "observacion"];
const noteVisibility = ["privada", "equipo", "administracion"];
const documentTypes = ["informe", "evaluacion", "certificado", "consentimiento", "autorizacion", "escolar", "derivacion", "otro"];
const roleLabels = {
  admin: "Administración",
  profesional: "Profesional",
};

const today = new Date();
const todayIso = toIsoDate(today);
const currentMonth = todayIso.slice(0, 7);

const defaultProfessionals = [
  {
    id: "pro-valeria-molina",
    nombre: "Valeria",
    apellido: "Molina",
    disciplina: "Psicología",
    matricula: "MP 48122",
    telefono: "221 548 1290",
    email: "valeria@vientos.local",
    especialidades: ["Niñeces", "Entrevistas familiares"],
    obrasSociales: ["Particular", "OSDE", "Swiss Medical"],
    diasAtencion: "Lunes, miércoles y viernes",
    horariosAtencion: "09:00 a 15:00",
    estado: "activo",
    observaciones: "Coordina admisiones clínicas.",
    color: "#2f6f6a",
  },
  {
    id: "pro-tomas-paz",
    nombre: "Tomás",
    apellido: "Paz",
    disciplina: "Psicopedagogía",
    matricula: "MP 32761",
    telefono: "221 603 7714",
    email: "tomas@vientos.local",
    especialidades: ["Aprendizaje", "Trayectorias escolares"],
    obrasSociales: ["Particular", "IOMA"],
    diasAtencion: "Martes y jueves",
    horariosAtencion: "10:00 a 18:00",
    estado: "activo",
    observaciones: "",
    color: "#3f6ea8",
  },
  {
    id: "pro-camila-rivas",
    nombre: "Camila",
    apellido: "Rivas",
    disciplina: "Fonoaudiología",
    matricula: "MP 59210",
    telefono: "221 440 8811",
    email: "camila@vientos.local",
    especialidades: ["Lenguaje", "Comunicación"],
    obrasSociales: ["Particular", "IOMA", "OSDE"],
    diasAtencion: "Lunes y jueves",
    horariosAtencion: "13:00 a 19:00",
    estado: "activo",
    observaciones: "",
    color: "#6d8f5f",
  },
];

const defaultPatients = [
  {
    id: "pac-lucia-mendez",
    nombre: "Lucía",
    apellido: "Méndez",
    fechaNacimiento: "2016-05-14",
    dni: "52.114.880",
    telefono: "221 440 2109",
    email: "",
    direccion: "City Bell",
    responsableNombre: "Mariana Mendez",
    responsableVinculo: "Madre",
    responsableTelefono: "221 440 2110",
    motivoConsulta: "Consulta inicial por dificultades de lenguaje.",
    disciplinaPrincipal: "Fonoaudiología",
    profesionalesAsignados: ["pro-camila-rivas", "pro-valeria-molina"],
    estado: "en_evaluacion",
    observaciones: "Trae informe escolar.",
    fechaCreacion: todayIso,
    fechaActualizacion: todayIso,
  },
  {
    id: "pac-federico-suarez",
    nombre: "Federico",
    apellido: "Suárez",
    fechaNacimiento: "2012-09-22",
    dni: "49.772.041",
    telefono: "221 603 9912",
    email: "",
    direccion: "Gonnet",
    responsableNombre: "Pablo Suarez",
    responsableVinculo: "Padre",
    responsableTelefono: "221 603 7714",
    motivoConsulta: "Acompañamiento psicopedagógico.",
    disciplinaPrincipal: "Psicopedagogía",
    profesionalesAsignados: ["pro-tomas-paz"],
    estado: "activo",
    observaciones: "",
    fechaCreacion: todayIso,
    fechaActualizacion: todayIso,
  },
  {
    id: "pac-maria-lopez",
    nombre: "María",
    apellido: "López",
    fechaNacimiento: "1988-03-10",
    dni: "32.421.902",
    telefono: "221 548 1290",
    email: "maria@email.local",
    direccion: "Villa Elisa",
    responsableNombre: "",
    responsableVinculo: "",
    responsableTelefono: "",
    motivoConsulta: "Espacio terapéutico individual.",
    disciplinaPrincipal: "Psicología",
    profesionalesAsignados: ["pro-valeria-molina"],
    estado: "activo",
    observaciones: "",
    fechaCreacion: todayIso,
    fechaActualizacion: todayIso,
  },
];

const defaultAppointments = [
  {
    id: "tur-1",
    pacienteId: "pac-maria-lopez",
    profesionalId: "pro-valeria-molina",
    fecha: todayIso,
    horaInicio: "09:00",
    horaFin: "09:45",
    disciplina: "Psicología",
    estado: "confirmado",
    estadoPago: "pagado",
    observaciones: "Sesión semanal.",
  },
  {
    id: "tur-2",
    pacienteId: "pac-federico-suarez",
    profesionalId: "pro-tomas-paz",
    fecha: todayIso,
    horaInicio: "11:00",
    horaFin: "11:45",
    disciplina: "Psicopedagogía",
    estado: "programado",
    estadoPago: "pendiente",
    observaciones: "",
  },
  {
    id: "tur-3",
    pacienteId: "pac-lucia-mendez",
    profesionalId: "pro-camila-rivas",
    fecha: toIsoDate(addDays(today, 1)),
    horaInicio: "14:00",
    horaFin: "14:45",
    disciplina: "Fonoaudiología",
    estado: "confirmado",
    estadoPago: "pendiente",
    observaciones: "Traer carpeta escolar.",
  },
];

const defaultPayments = [
  {
    id: "pag-1",
    pacienteId: "pac-maria-lopez",
    profesionalId: "pro-valeria-molina",
    turnoId: "tur-1",
    fechaSesion: todayIso,
    monto: 30000,
    obraSocial: "Particular",
    importeCubierto: 0,
    estado: "pagado",
    medioPago: "transferencia",
    fechaPago: todayIso,
    observaciones: "",
  },
  {
    id: "pag-2",
    pacienteId: "pac-federico-suarez",
    profesionalId: "pro-tomas-paz",
    turnoId: "tur-2",
    fechaSesion: todayIso,
    monto: 28000,
    obraSocial: "Particular",
    importeCubierto: 0,
    estado: "pendiente",
    medioPago: "otro",
    fechaPago: "",
    observaciones: "Pendiente de confirmar.",
  },
];

const defaultNotes = [
  {
    id: "seg-1",
    pacienteId: "pac-lucia-mendez",
    profesionalId: "pro-camila-rivas",
    fecha: todayIso,
    tipo: "evaluacion",
    nota: "Se inicia evaluación del lenguaje. Se acuerda pedir informe escolar actualizado.",
    visibilidad: "equipo",
    archivosAdjuntos: [],
    fechaCreacion: todayIso,
    fechaActualizacion: todayIso,
    creadoPor: "camila",
  },
];

const defaultDocuments = [
  {
    id: "doc-1",
    pacienteId: "pac-lucia-mendez",
    nombre: "Informe escolar inicial",
    tipo: "escolar",
    rutaArchivo: "pendiente/informe-escolar-lucia.pdf",
    fechaCarga: todayIso,
    cargadoPor: "coordinacion",
  },
];

const defaultUsers = [
  { username: "admin", password: "admin123", role: "admin", name: "Admin Vientos", professionalId: null },
  { username: "molina", password: "pro123", role: "profesional", name: "Valeria Molina", professionalId: "pro-valeria-molina" },
];

let state = loadState();
state.currentUser = loadSession();
normalizeState();

const els = {
  loginScreen: qs("#loginScreen"),
  appShell: qs("#appShell"),
  loginForm: qs("#loginForm"),
  loginUser: qs("#loginUser"),
  loginPassword: qs("#loginPassword"),
  loginError: qs("#loginError"),
  menuToggle: qs("#menuToggle"),
  sessionName: qs("#sessionName"),
  sessionRole: qs("#sessionRole"),
  mobileSessionRole: qs("#mobileSessionRole"),
  sectionTitle: qs("#sectionTitle"),
  sectionEyebrow: qs("#sectionEyebrow"),
  topActions: qs("#topActions"),
  dashboardPage: qs("#dashboardPage"),
  agendaPage: qs("#agendaPage"),
  patientsPage: qs("#patientsPage"),
  professionalsPage: qs("#professionalsPage"),
  paymentsPage: qs("#paymentsPage"),
  usersPage: qs("#usersPage"),
  agendaDate: qs("#agendaDate"),
  agendaProfessionalFilter: qs("#agendaProfessionalFilter"),
  agendaDisciplineFilter: qs("#agendaDisciplineFilter"),
  agendaMonthLabel: qs("#agendaMonthLabel"),
  agendaCalendarGrid: qs("#agendaCalendarGrid"),
  agendaBoard: qs("#agendaBoard"),
  patientSearch: qs("#patientSearch"),
  patientStatusFilter: qs("#patientStatusFilter"),
  patientDisciplineFilter: qs("#patientDisciplineFilter"),
  patientProfessionalFilter: qs("#patientProfessionalFilter"),
  patientStateSummary: qs("#patientStateSummary"),
  patientsTable: qs("#patientsTable"),
  professionalSearch: qs("#professionalSearch"),
  professionalStatusFilter: qs("#professionalStatusFilter"),
  professionalDisciplineFilter: qs("#professionalDisciplineFilter"),
  professionalInsuranceFilter: qs("#professionalInsuranceFilter"),
  professionalsGrid: qs("#professionalsGrid"),
  paymentSearch: qs("#paymentSearch"),
  paymentStatusFilter: qs("#paymentStatusFilter"),
  paymentProfessionalFilter: qs("#paymentProfessionalFilter"),
  paymentMonthFilter: qs("#paymentMonthFilter"),
  paymentSummary: qs("#paymentSummary"),
  paymentsTable: qs("#paymentsTable"),
};

bindEvents();
bindSupabaseSessionBridge();
renderAuth();

function loadState() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  return {
    section: "dashboard",
    selectedDate: todayIso,
    agendaMonth: currentMonth,
    patients: localStorage.getItem(REMOTE_READY_KEY) ? [] : structuredClone(defaultPatients),
    professionals: localStorage.getItem(REMOTE_READY_KEY) ? [] : structuredClone(defaultProfessionals),
    appointments: structuredClone(defaultAppointments),
    payments: structuredClone(defaultPayments),
    notes: structuredClone(defaultNotes),
    documents: structuredClone(defaultDocuments),
    users: structuredClone(defaultUsers),
  };
}

function saveState() {
  const { currentUser, ...persisted } = state;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
}

function loadSession() {
  const stored = localStorage.getItem(AUTH_KEY);
  if (!stored) return null;
  try {
    const { username } = JSON.parse(stored);
    return state.users.find((user) => user.username === username) || null;
  } catch {
    localStorage.removeItem(AUTH_KEY);
    return null;
  }
}

function saveSession(user) {
  if (!user) {
    localStorage.removeItem(AUTH_KEY);
    return;
  }
  localStorage.setItem(AUTH_KEY, JSON.stringify({ username: user.username }));
}

function normalizeState() {
  state.section ||= "dashboard";
  state.selectedDate ||= todayIso;
  state.agendaMonth ||= state.selectedDate.slice(0, 7);
  state.professionals ||= structuredClone(defaultProfessionals);
  state.patients ||= structuredClone(defaultPatients);
  state.appointments ||= [];
  state.payments ||= [];
  state.notes ||= [];
  state.documents ||= [];
  state.users ||= structuredClone(defaultUsers);

  state.professionals = state.professionals.map((professional) => ({
    ...professional,
    nombre: professional.nombre || splitName(professional.name).first,
    apellido: professional.apellido || splitName(professional.name).last,
    disciplina: professional.disciplina || professional.role || "Psicología",
    estado: professional.estado || (professional.active === false ? "inactivo" : "activo"),
    especialidades: Array.isArray(professional.especialidades) ? professional.especialidades : [],
    obrasSociales: Array.isArray(professional.obrasSociales) && professional.obrasSociales.length
      ? professional.obrasSociales
      : defaultProfessionals.find((item) => item.id === professional.id)?.obrasSociales || [],
    color: professional.color || "#2f6f6a",
  }));

  state.patients = state.patients.map((patient) => {
    const split = splitName(patient.name);
    return {
      ...patient,
      nombre: patient.nombre || split.first,
      apellido: patient.apellido || split.last,
      dni: patient.dni || patient.document || "",
      telefono: patient.telefono || patient.phone || "",
      responsableNombre: patient.responsableNombre || "",
      responsableVinculo: patient.responsableVinculo || "",
      responsableTelefono: patient.responsableTelefono || "",
      motivoConsulta: patient.motivoConsulta || patient.notes || "",
      disciplinaPrincipal: patient.disciplinaPrincipal || getProfessional(patient.professionalId)?.disciplina || disciplines[0],
      profesionalesAsignados: patient.profesionalesAsignados || [patient.professionalId].filter(Boolean),
      estado: normalizePatientState(patient.estado || patient.status),
      observaciones: patient.observaciones || "",
      fechaCreacion: patient.fechaCreacion || todayIso,
      fechaActualizacion: patient.fechaActualizacion || todayIso,
    };
  });

  state.appointments = state.appointments.map((appointment) => ({
    id: appointment.id || createId(),
    pacienteId: appointment.pacienteId || appointment.patientId,
    profesionalId: appointment.profesionalId || appointment.professionalId,
    fecha: appointment.fecha || appointment.date || todayIso,
    horaInicio: appointment.horaInicio || appointment.time || "09:00",
    horaFin: appointment.horaFin || addMinutes(appointment.time || "09:00", appointment.duration || 45),
    disciplina: appointment.disciplina || getProfessional(appointment.professionalId || appointment.profesionalId)?.disciplina || disciplines[0],
    modalidad: "presencial",
    estado: normalizeAppointmentState(appointment.estado || appointment.status),
    estadoPago: appointment.estadoPago || "pendiente",
    observaciones: appointment.observaciones || appointment.notes || appointment.reason || "",
  })).filter((appointment) => appointment.pacienteId && appointment.profesionalId);

  state.payments = state.payments.map((payment) => ({
    ...payment,
    id: payment.id || createId(),
    pacienteId: payment.pacienteId || payment.patientId,
    profesionalId: payment.profesionalId || payment.professionalId,
    turnoId: payment.turnoId || payment.appointmentId || "",
    fechaSesion: payment.fechaSesion || payment.sessionDate || todayIso,
    monto: Number(payment.monto || payment.amount || 0),
    obraSocial: payment.obraSocial || payment.insurance || "Particular",
    importeCubierto: Number(payment.importeCubierto || payment.coveredAmount || 0),
    estado: payment.estado || "pendiente",
    medioPago: payment.medioPago || "otro",
    fechaPago: payment.fechaPago || "",
    observaciones: payment.observaciones || payment.notes || "",
  }));

  syncPaymentsFromAppointments();
  saveState();
}

function bindEvents() {
  els.loginForm.addEventListener("submit", handleLogin);
  els.menuToggle.addEventListener("click", toggleMobileMenu);
  qs("#logoutButton").addEventListener("click", () => {
    closeMobileMenu();
    logout();
  });
  qsa("[data-section]").forEach((button) => button.addEventListener("click", () => setSection(button.dataset.section)));
  qsa("[data-action]").forEach((button) => button.addEventListener("click", () => handleAction(button.dataset.action)));
  qsa("[data-close]").forEach((button) => button.addEventListener("click", () => qs(`#${button.dataset.close}`).close()));

  [els.agendaDate, els.agendaProfessionalFilter, els.agendaDisciplineFilter].forEach((control) => control.addEventListener("change", () => {
    state.selectedDate = els.agendaDate.value || todayIso;
    state.agendaMonth = state.selectedDate.slice(0, 7);
    saveState();
    renderAgenda();
  }));
  qs("#prevAgendaMonth").addEventListener("click", () => changeAgendaMonth(-1));
  qs("#nextAgendaMonth").addEventListener("click", () => changeAgendaMonth(1));
  [els.patientSearch, els.patientStatusFilter, els.patientDisciplineFilter, els.patientProfessionalFilter].forEach((control) => control.addEventListener("input", renderPatients));
  [els.patientStatusFilter, els.patientDisciplineFilter, els.patientProfessionalFilter].forEach((control) => control.addEventListener("change", renderPatients));
  [els.professionalSearch, els.professionalStatusFilter, els.professionalDisciplineFilter, els.professionalInsuranceFilter].forEach((control) => control.addEventListener("input", renderProfessionals));
  [els.professionalStatusFilter, els.professionalDisciplineFilter, els.professionalInsuranceFilter].forEach((control) => control.addEventListener("change", renderProfessionals));
  [els.paymentSearch, els.paymentStatusFilter, els.paymentProfessionalFilter, els.paymentMonthFilter].forEach((control) => control.addEventListener("input", renderPayments));
  [els.paymentStatusFilter, els.paymentProfessionalFilter, els.paymentMonthFilter].forEach((control) => control.addEventListener("change", renderPayments));

  qs("#patientForm").addEventListener("submit", savePatient);
  qs("#professionalForm").addEventListener("submit", saveProfessional);
  qs("#appointmentForm").addEventListener("submit", saveAppointment);
  qs("#paymentForm").addEventListener("submit", savePayment);
  qs("#noteForm").addEventListener("submit", saveNote);
  qs("#documentForm").addEventListener("submit", saveDocument);
  qs("#deletePatientButton").addEventListener("click", deletePatient);
  qs("#deleteProfessionalButton").addEventListener("click", deleteProfessional);
  qs("#cancelAppointmentButton").addEventListener("click", cancelAppointment);
  qs("#deletePaymentButton").addEventListener("click", deletePayment);
  qs("#deleteDocumentButton").addEventListener("click", deleteDocument);
  qs("#paymentPatient").addEventListener("change", fillPaymentAppointmentOptions);
  qs("#paymentProfessional").addEventListener("change", fillPaymentAppointmentOptions);
}

function handleLogin(event) {
  event.preventDefault();
  const username = els.loginUser.value.trim().toLowerCase();
  const password = els.loginPassword.value;
  const user = state.users.find((item) => item.username === username && item.password === password);
  if (!user) {
    els.loginError.textContent = "Usuario o contraseña incorrectos.";
    return;
  }
  state.currentUser = user;
  saveSession(user);
  els.loginForm.reset();
  els.loginError.textContent = "";
  renderAuth();
}

function logout() {
  state.currentUser = null;
  saveSession(null);
  window.parent?.postMessage({ type: "vientos:logout" }, window.location.origin);
  renderAuth();
}

function bindSupabaseSessionBridge() {
  window.addEventListener("message", (event) => {
    if (event.origin !== window.location.origin) return;
    if (event.data?.type !== "vientos:supabase-session") return;
    applySupabaseSession(event.data.user);
  });
}

function applySupabaseSession(sessionUser) {
  if (!sessionUser?.email) return;
  const user = {
    username: sessionUser.email.toLowerCase(),
    password: "",
    role: sessionUser.role === "profesional" ? "profesional" : "admin",
    name: sessionUser.name || sessionUser.email,
    professionalId: sessionUser.professionalId || null,
  };

  state.users = [
    ...state.users.filter((item) => item.username !== user.username),
    user,
  ];
  state.currentUser = user;
  saveSession(user);
  saveState();
  renderAuth();
  loadRemoteDirectoryData();
}

async function loadRemoteDirectoryData() {
  try {
    const [professionalsResult, patientsResult] = await Promise.all([
      apiRequest("/api/legacy/professionals"),
      apiRequest("/api/legacy/patients"),
    ]);

    state.professionals = professionalsResult.professionals || [];
    state.patients = patientsResult.patients || [];
    localStorage.setItem(REMOTE_READY_KEY, "true");
    normalizeState();
    render();
  } catch (error) {
    console.error(error);
    showSystemError("No se pudieron cargar profesionales y pacientes desde Supabase.");
  }
}

async function apiRequest(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || "Error de conexión con Supabase");
  return payload;
}

function showSystemError(message) {
  if (els.loginError && !state.currentUser) els.loginError.textContent = message;
  else alert(message);
}

function renderAuth() {
  const logged = Boolean(state.currentUser);
  els.loginScreen.classList.toggle("hidden", logged);
  els.appShell.classList.toggle("hidden", !logged);
  if (!logged) {
    els.loginUser.focus();
    return;
  }
  els.sessionName.textContent = state.currentUser.name;
  els.sessionRole.textContent = roleLabels[state.currentUser.role] || state.currentUser.role;
  els.mobileSessionRole.textContent = roleLabels[state.currentUser.role] || state.currentUser.role;
  if (!canViewSection(state.section)) state.section = "dashboard";
  render();
}

function render() {
  fillStaticSelects();
  setSection(state.section, { silent: true });
  renderDashboard();
  renderAgenda();
  renderPatients();
  renderProfessionals();
  renderPayments();
  renderUsers();
}

function setSection(section, options = {}) {
  if (!canViewSection(section)) section = "dashboard";
  state.section = section;
  closeMobileMenu();
  if (!options.silent) saveState();
  qsa("[data-section]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.section === section);
    button.classList.toggle("hidden", !canViewSection(button.dataset.section));
  });
  qsa("[data-page]").forEach((page) => page.classList.toggle("hidden", page.dataset.page !== section));

  const titles = {
    dashboard: ["Gestión interna", "Dashboard"],
    agenda: ["Agenda y turnos", "Agenda"],
    patients: ["Gestión de pacientes", "Pacientes"],
    professionals: ["Equipo interdisciplinario", "Profesionales"],
    payments: ["Pagos básicos", "Pagos"],
    users: ["Roles y permisos", "Usuarios"],
  };
  els.sectionEyebrow.textContent = titles[section][0];
  els.sectionTitle.textContent = titles[section][1];
  renderTopActions(section);
}

function toggleMobileMenu() {
  const isOpen = els.appShell.classList.toggle("is-menu-open");
  els.menuToggle.setAttribute("aria-expanded", String(isOpen));
  els.menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
}

function closeMobileMenu() {
  els.appShell.classList.remove("is-menu-open");
  els.menuToggle.setAttribute("aria-expanded", "false");
  els.menuToggle.setAttribute("aria-label", "Abrir menú");
}

function renderTopActions(section) {
  const actions = [];
  if (canEdit("patients")) actions.push(["new-patient", "Crear paciente", "primary-button"]);
  if (canEdit("appointments")) actions.push(["new-appointment", "Crear turno", section === "agenda" ? "primary-button" : "secondary-button"]);
  if (canEdit("payments")) actions.push(["new-payment", "Registrar pago", section === "payments" ? "primary-button" : "secondary-button"]);
  if (section === "professionals" && canEdit("professionals")) actions.unshift(["new-professional", "Crear profesional", "primary-button"]);
  if (section === "payments" && canEdit("payments")) actions.push(["export-payments", "Exportar Excel", "secondary-button"]);

  els.topActions.innerHTML = actions.map(([action, label, klass]) => `<button class="${klass}" data-action="${action}" type="button">${label}</button>`).join("");
  qsa("[data-action]", els.topActions).forEach((button) => button.addEventListener("click", () => handleAction(button.dataset.action)));
}

function handleAction(action) {
  if (action === "new-patient") openPatientDialog();
  if (action === "new-professional") openProfessionalDialog();
  if (action === "new-appointment") openAppointmentDialog();
  if (action === "new-payment") openPaymentDialog();
  if (action === "export-payments") exportPaymentsSpreadsheet();
}

function renderDashboard() {
  const visibleAppointments = getVisibleAppointments();
  const todayAppointments = visibleAppointments.filter((appointment) => appointment.fecha === todayIso && appointment.estado !== "cancelado");
  const visiblePatients = getVisiblePatients();
  const todayProfessionalIds = new Set(todayAppointments.map((appointment) => appointment.profesionalId));
  const todayProfessionals = getVisibleProfessionals()
    .filter((professional) => todayProfessionalIds.has(professional.id))
    .sort((a, b) => professionalName(a).localeCompare(professionalName(b), "es"));
  const pendingPayments = getVisiblePayments().filter((payment) => payment.estado === "pendiente");
  const canSeePaymentSummary = canViewSection("payments");

  els.dashboardPage.innerHTML = `
    <section class="summary-grid">
      ${metric("Turnos hoy", todayAppointments.length)}
      ${metric("Profesionales hoy", todayProfessionals.length)}
      ${metric("Pacientes activos", visiblePatients.filter((patient) => patient.estado === "activo").length)}
      ${canSeePaymentSummary ? metric("Pagos pendientes", pendingPayments.length) : ""}
      ${canSeePaymentSummary ? metric("Deuda registrada", formatCurrency(pendingPayments.reduce((sum, payment) => sum + Number(payment.monto || 0), 0))) : ""}
    </section>
    <section class="dashboard-grid">
      <article class="panel">
        <header class="panel-header"><h3>Turnos del día</h3></header>
        <div class="stack-list">${todayAppointments.length ? todayAppointments.sort(sortByAppointment).map(appointmentMiniCard).join("") : empty("No hay turnos para hoy")}</div>
      </article>
      <article class="panel">
        <header class="panel-header"><h3>Profesionales que atienden hoy</h3></header>
        <div class="stack-list">${todayProfessionals.length ? todayProfessionals.map((professional) => professionalTodayCard(professional, todayAppointments)).join("") : empty("Sin profesionales con turnos hoy")}</div>
      </article>
    </section>
  `;
  qsa("[data-open-appointment]", els.dashboardPage).forEach((button) => button.addEventListener("click", () => openAppointmentDialog(button.dataset.openAppointment)));
}

function renderAgenda() {
  els.agendaDate.value = state.selectedDate;
  renderAgendaCalendar();
  const range = [state.selectedDate];
  const selectedProfessional = els.agendaProfessionalFilter.value || "all";
  const selectedDiscipline = els.agendaDisciplineFilter.value || "all";
  const professionals = getVisibleProfessionals().filter((professional) => {
    return (selectedProfessional === "all" || professional.id === selectedProfessional)
      && (selectedDiscipline === "all" || professional.disciplina === selectedDiscipline);
  });
  const appointments = getVisibleAppointments().filter((appointment) => {
    return range.includes(appointment.fecha)
      && (selectedProfessional === "all" || appointment.profesionalId === selectedProfessional)
      && (selectedDiscipline === "all" || appointment.disciplina === selectedDiscipline);
  });

  const professionalsWithAppointments = professionals.filter((professional) => {
    return appointments.some((appointment) => appointment.profesionalId === professional.id);
  });

  els.agendaBoard.innerHTML = professionalsWithAppointments.map((professional) => {
    const ownAppointments = appointments.filter((appointment) => appointment.profesionalId === professional.id).sort(sortByAppointment);
    return `
      <article class="agenda-column">
        <header class="column-header">
          <span class="swatch" style="background:${professional.color}"></span>
          <div><h3>${professionalName(professional)}</h3><span>${escapeHtml(professional.disciplina)}</span></div>
        </header>
        <div class="stack-list">${ownAppointments.map(appointmentMiniCard).join("")}</div>
      </article>
    `;
  }).join("") || empty("No hay turnos para el día seleccionado");

  qsa("[data-open-appointment]", els.agendaBoard).forEach((button) => button.addEventListener("click", () => openAppointmentDialog(button.dataset.openAppointment)));
}

function renderAgendaCalendar() {
  const [year, month] = state.agendaMonth.split("-").map(Number);
  const firstDay = new Date(year, month - 1, 1);
  const calendarStart = addDays(firstDay, -((firstDay.getDay() + 6) % 7));
  const selectedRange = new Set([state.selectedDate]);
  const appointmentCounts = getCalendarAppointmentCounts();

  els.agendaMonthLabel.textContent = firstDay.toLocaleDateString("es-AR", { month: "long", year: "numeric" });
  els.agendaCalendarGrid.innerHTML = "";

  for (let index = 0; index < 42; index += 1) {
    const date = addDays(calendarStart, index);
    const iso = toIsoDate(date);
    const count = appointmentCounts[iso] || 0;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "calendar-day";
    button.classList.toggle("is-muted", date.getMonth() !== firstDay.getMonth());
    button.classList.toggle("is-today", iso === todayIso);
    button.classList.toggle("is-selected", selectedRange.has(iso));
    button.setAttribute("aria-label", `${date.toLocaleDateString("es-AR", { dateStyle: "full" })}${count ? `, ${count} turnos` : ""}`);
    button.innerHTML = `
      <span>${date.getDate()}</span>
      ${count ? `<strong>${count}</strong>` : ""}
    `;
    button.addEventListener("click", () => selectAgendaDate(iso));
    els.agendaCalendarGrid.append(button);
  }
}

function getCalendarAppointmentCounts() {
  const selectedProfessional = els.agendaProfessionalFilter.value || "all";
  const selectedDiscipline = els.agendaDisciplineFilter.value || "all";
  return getVisibleAppointments().reduce((counts, appointment) => {
    if ((selectedProfessional === "all" || appointment.profesionalId === selectedProfessional)
      && (selectedDiscipline === "all" || appointment.disciplina === selectedDiscipline)
      && appointment.estado !== "cancelado") {
      counts[appointment.fecha] = (counts[appointment.fecha] || 0) + 1;
    }
    return counts;
  }, {});
}

function selectAgendaDate(iso) {
  state.selectedDate = iso;
  state.agendaMonth = iso.slice(0, 7);
  saveState();
  renderAgenda();
}

function changeAgendaMonth(delta) {
  const [year, month] = state.agendaMonth.split("-").map(Number);
  const next = new Date(year, month - 1 + delta, 1);
  state.agendaMonth = toIsoDate(next).slice(0, 7);
  saveState();
  renderAgenda();
}

function renderPatients() {
  const query = normalizeText(els.patientSearch.value);
  const selectedState = els.patientStatusFilter.value || "all";
  const selectedDiscipline = els.patientDisciplineFilter.value || "all";
  const selectedProfessional = els.patientProfessionalFilter.value || "all";
  const patients = getVisiblePatients().filter((patient) => {
    const haystack = normalizeText(`${patient.nombre} ${patient.apellido} ${patient.dni} ${patient.responsableNombre} ${patient.disciplinaPrincipal} ${patient.observaciones}`);
    return (!query || haystack.includes(query))
      && (selectedState === "all" || patient.estado === selectedState)
      && (selectedDiscipline === "all" || patient.disciplinaPrincipal === selectedDiscipline)
      && (selectedProfessional === "all" || patient.profesionalesAsignados.includes(selectedProfessional));
  }).sort((a, b) => patientName(a).localeCompare(patientName(b), "es"));

  const stateCounts = patients.reduce((counts, patient) => {
    counts[patient.estado] = (counts[patient.estado] || 0) + 1;
    return counts;
  }, {});
  els.patientStateSummary.innerHTML = [
    metric("Total", patients.length),
    ...patientStates.map((stateName) => metric(labelize(stateName), stateCounts[stateName] || 0)),
  ].join("");

  els.patientsTable.innerHTML = `
    <table>
      <thead><tr><th>Paciente</th><th>DNI</th><th>Responsable</th><th>Disciplina</th><th>Profesionales</th><th>Estado</th><th></th></tr></thead>
      <tbody>
        ${patients.map((patient) => `
          <tr>
            <td><strong>${patientName(patient)}</strong><span>${escapeHtml(patient.telefono || "Sin teléfono")}</span></td>
            <td>${escapeHtml(patient.dni || "-")}</td>
            <td>${escapeHtml(patient.responsableNombre || "-")}</td>
            <td>${escapeHtml(patient.disciplinaPrincipal)}</td>
            <td>${patient.profesionalesAsignados.map((id) => escapeHtml(professionalName(getProfessional(id)))).filter(Boolean).join(", ") || "-"}</td>
            <td>${badge(patient.estado)}</td>
            <td><button class="small-button" data-open-patient="${patient.id}" type="button">Ficha</button></td>
          </tr>
        `).join("")}
      </tbody>
    </table>
    ${patients.length ? "" : empty("No se encontraron pacientes")}
  `;
  qsa("[data-open-patient]", els.patientsTable).forEach((button) => button.addEventListener("click", () => openPatientFile(button.dataset.openPatient)));
}

function renderProfessionals() {
  const query = normalizeText(els.professionalSearch.value);
  const selectedState = els.professionalStatusFilter.value || "all";
  const selectedDiscipline = els.professionalDisciplineFilter.value || "all";
  const selectedInsurance = els.professionalInsuranceFilter.value || "all";
  const professionals = getVisibleProfessionals().filter((professional) => {
    const haystack = normalizeText(`${professionalName(professional)} ${professional.disciplina} ${professional.matricula} ${professional.email} ${professional.especialidades?.join(" ")} ${professional.obrasSociales?.join(" ")}`);
    return (!query || haystack.includes(query))
      && (selectedState === "all" || professional.estado === selectedState)
      && (selectedDiscipline === "all" || professional.disciplina === selectedDiscipline)
      && (selectedInsurance === "all" || professional.obrasSociales?.includes(selectedInsurance));
  }).sort((a, b) => professionalName(a).localeCompare(professionalName(b), "es"));

  els.professionalsGrid.innerHTML = professionals.map((professional) => {
    const ownAppointments = getVisibleAppointments().filter((appointment) => appointment.profesionalId === professional.id);
    return `
      <article class="info-card">
        <div class="card-top">
          <span class="swatch" style="background:${professional.color}"></span>
          ${badge(professional.estado)}
        </div>
        <h3>${professionalName(professional)}</h3>
        <p>${escapeHtml(professional.disciplina)}</p>
        <div class="meta-grid">
          <span>Matrícula: ${escapeHtml(professional.matricula || "-")}</span>
          <span>Obras sociales: ${escapeHtml(professional.obrasSociales?.join(", ") || "Sin cargar")}</span>
          <span>${escapeHtml(professional.diasAtencion || "Días sin cargar")}</span>
          <span>${escapeHtml(professional.horariosAtencion || "Horarios sin cargar")}</span>
          <span>${ownAppointments.length} turnos registrados</span>
        </div>
        <div class="card-actions">
          <button class="small-button" data-open-professional="${professional.id}" type="button">Editar</button>
          <button class="small-button" data-filter-agenda="${professional.id}" type="button">Ver agenda</button>
        </div>
      </article>
    `;
  }).join("") || empty("No se encontraron profesionales");

  qsa("[data-open-professional]", els.professionalsGrid).forEach((button) => button.addEventListener("click", () => openProfessionalDialog(button.dataset.openProfessional)));
  qsa("[data-filter-agenda]", els.professionalsGrid).forEach((button) => button.addEventListener("click", () => {
    setSection("agenda");
    els.agendaProfessionalFilter.value = button.dataset.filterAgenda;
    renderAgenda();
  }));
}

function renderPayments() {
  const rows = getFilteredPayments();
  const paid = rows.filter((payment) => payment.estado === "pagado").reduce((sum, payment) => sum + getPaymentTotal(payment), 0);
  const pending = rows.filter((payment) => payment.estado === "pendiente").reduce((sum, payment) => sum + getPaymentTotal(payment), 0);
  const bonified = rows.filter((payment) => payment.estado === "bonificado").reduce((sum, payment) => sum + getPaymentTotal(payment), 0);
  els.paymentSummary.innerHTML = [
    metric("Total pagado", formatCurrency(paid)),
    metric("Total pendiente", formatCurrency(pending)),
    metric("Bonificado", formatCurrency(bonified)),
    metric("Registros", rows.length),
  ].join("");

  els.paymentsTable.innerHTML = `
    <table>
      <thead><tr><th>Fecha</th><th>Paciente</th><th>Profesional</th><th>Diferencial</th><th>Obra social</th><th>OS paga profesional</th><th>Total</th><th>Profesional 40%</th><th>Vientos 60%</th><th>Medio</th><th>Estado</th><th></th></tr></thead>
      <tbody>
        ${rows.map((payment) => `
          <tr>
            <td>${formatShortDate(payment.fechaSesion)}</td>
            <td>${escapeHtml(patientName(getPatient(payment.pacienteId)))}</td>
            <td>${escapeHtml(professionalName(getProfessional(payment.profesionalId)))}</td>
            <td><strong>${formatCurrency(payment.monto)}</strong></td>
            <td>${escapeHtml(payment.obraSocial || "-")}</td>
            <td>${formatCurrency(payment.importeCubierto)}</td>
            <td><strong>${formatCurrency(getPaymentTotal(payment))}</strong></td>
            <td>${formatCurrency(getProfessionalSettlement(payment))}</td>
            <td>${formatCurrency(getCenterSettlement(payment))}</td>
            <td>${escapeHtml(labelize(payment.medioPago))}</td>
            <td>${badge(payment.estado)}</td>
            <td>${canEdit("payments") ? `<button class="small-button" data-open-payment="${payment.id}" type="button">Editar</button>` : ""}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
    ${rows.length ? "" : empty("No hay pagos para los filtros seleccionados")}
  `;
  qsa("[data-open-payment]", els.paymentsTable).forEach((button) => button.addEventListener("click", () => openPaymentDialog(button.dataset.openPayment)));
}

function renderUsers() {
  els.usersPage.innerHTML = `
    <section class="panel permissions-panel">
      <header class="panel-header"><h3>Roles básicos</h3></header>
      <div class="role-grid">
        ${["admin", "profesional"].map((role) => `
          <article class="role-card">
            <h3>${roleLabels[role]}</h3>
            <p>${roleDescription(role)}</p>
          </article>
        `).join("")}
      </div>
    </section>
    <section class="table-card">
      <table>
        <thead><tr><th>Usuario</th><th>Nombre</th><th>Rol</th><th>Profesional vinculado</th></tr></thead>
        <tbody>
          ${state.users.map((user) => `
            <tr>
              <td>${escapeHtml(user.username)}</td>
              <td>${escapeHtml(user.name)}</td>
              <td>${badge(user.role)}</td>
              <td>${escapeHtml(user.professionalId ? professionalName(getProfessional(user.professionalId)) : "-")}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </section>
  `;
}

function fillStaticSelects() {
  fillSelect(els.agendaProfessionalFilter, professionalOptions(true), els.agendaProfessionalFilter.value || "all");
  fillSelect(els.agendaDisciplineFilter, optionList(disciplines, true), els.agendaDisciplineFilter.value || "all");
  fillSelect(els.patientStatusFilter, optionList(patientStates, true), els.patientStatusFilter.value || "all");
  fillSelect(els.patientDisciplineFilter, optionList(disciplines, true), els.patientDisciplineFilter.value || "all");
  fillSelect(els.patientProfessionalFilter, professionalOptions(true), els.patientProfessionalFilter.value || "all");
  fillSelect(els.professionalStatusFilter, optionList(professionalStates, true), els.professionalStatusFilter.value || "all");
  fillSelect(els.professionalDisciplineFilter, optionList(disciplines, true), els.professionalDisciplineFilter.value || "all");
  fillSelect(els.professionalInsuranceFilter, insuranceOptions(true), els.professionalInsuranceFilter.value || "all");
  fillSelect(els.paymentStatusFilter, optionList(paymentStates, true), els.paymentStatusFilter.value || "all");
  fillSelect(els.paymentProfessionalFilter, professionalOptions(true), els.paymentProfessionalFilter.value || "all");
  els.paymentMonthFilter.value ||= currentMonth;

  fillSelect(qs("#patientMainDiscipline"), optionList(disciplines), disciplines[0]);
  fillSelect(qs("#patientState"), optionList(patientStates), "activo");
  fillSelect(qs("#professionalDiscipline"), optionList(disciplines), disciplines[0]);
  fillSelect(qs("#professionalState"), optionList(professionalStates), "activo");
  fillSelect(qs("#appointmentDiscipline"), optionList(disciplines), disciplines[0]);
  fillSelect(qs("#appointmentState"), optionList(appointmentStates), "programado");
  fillSelect(qs("#appointmentPaymentState"), optionList(paymentStates), "pendiente");
  fillSelect(qs("#paymentState"), optionList(paymentStates), "pendiente");
  fillSelect(qs("#paymentMethod"), optionList(paymentMethods), "efectivo");
  fillSelect(qs("#noteType"), optionList(noteTypes), "evolucion");
  fillSelect(qs("#noteVisibility"), optionList(noteVisibility), "equipo");
  fillSelect(qs("#documentType"), optionList(documentTypes), "informe");
}

function openPatientDialog(id) {
  if (!canEdit("patients")) return;
  const patient = getPatient(id);
  fillSelect(qs("#patientAssignedProfessionals"), professionalOptions(false), "");
  qs("#patientId").value = patient?.id || "";
  qs("#patientFirstName").value = patient?.nombre || "";
  qs("#patientLastName").value = patient?.apellido || "";
  qs("#patientBirthDate").value = patient?.fechaNacimiento || "";
  qs("#patientDni").value = patient?.dni || "";
  qs("#patientPhone").value = patient?.telefono || "";
  qs("#patientEmail").value = patient?.email || "";
  qs("#patientAddress").value = patient?.direccion || "";
  qs("#patientResponsibleName").value = patient?.responsableNombre || "";
  qs("#patientResponsibleLink").value = patient?.responsableVinculo || "";
  qs("#patientResponsiblePhone").value = patient?.responsableTelefono || "";
  qs("#patientMainDiscipline").value = patient?.disciplinaPrincipal || disciplines[0];
  qs("#patientState").value = patient?.estado || "activo";
  qs("#patientReason").value = patient?.motivoConsulta || "";
  qs("#patientObservations").value = patient?.observaciones || "";
  setMultiValue(qs("#patientAssignedProfessionals"), patient?.profesionalesAsignados || defaultAssignedProfessionals());
  qs("#patientDialogTitle").textContent = patient ? "Editar paciente" : "Nuevo paciente";
  qs("#deletePatientButton").hidden = !patient;
  qs("#patientDialog").showModal();
}

async function savePatient(event) {
  event.preventDefault();
  if (!canEdit("patients")) return;
  const id = qs("#patientId").value || createId();
  const assigned = getMultiValue(qs("#patientAssignedProfessionals"));
  const next = {
    id,
    nombre: qs("#patientFirstName").value.trim(),
    apellido: qs("#patientLastName").value.trim(),
    fechaNacimiento: qs("#patientBirthDate").value,
    dni: qs("#patientDni").value.trim(),
    telefono: qs("#patientPhone").value.trim(),
    email: qs("#patientEmail").value.trim(),
    direccion: qs("#patientAddress").value.trim(),
    responsableNombre: qs("#patientResponsibleName").value.trim(),
    responsableVinculo: qs("#patientResponsibleLink").value.trim(),
    responsableTelefono: qs("#patientResponsiblePhone").value.trim(),
    motivoConsulta: qs("#patientReason").value.trim(),
    disciplinaPrincipal: qs("#patientMainDiscipline").value,
    profesionalesAsignados: assigned.length ? assigned : defaultAssignedProfessionals(),
    estado: qs("#patientState").value,
    observaciones: qs("#patientObservations").value.trim(),
    fechaCreacion: getPatient(id)?.fechaCreacion || todayIso,
    fechaActualizacion: todayIso,
  };
  try {
    const saved = await apiRequest("/api/legacy/patients", {
      method: "POST",
      body: JSON.stringify(next),
    });
    upsert(state.patients, saved.patient || next);
    qs("#patientDialog").close();
    saveState();
    render();
  } catch (error) {
    console.error(error);
    showSystemError(error.message || "No se pudo guardar el paciente.");
  }
}

async function deletePatient() {
  const id = qs("#patientId").value;
  if (!id || !canEdit("patients")) return;
  if (state.appointments.some((appointment) => appointment.pacienteId === id)) {
    alert("No se puede eliminar un paciente con turnos asociados.");
    return;
  }
  try {
    await apiRequest(`/api/legacy/patients?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    state.patients = state.patients.filter((patient) => patient.id !== id);
    state.notes = state.notes.filter((note) => note.pacienteId !== id);
    state.documents = state.documents.filter((document) => document.pacienteId !== id);
    state.payments = state.payments.filter((payment) => payment.pacienteId !== id);
    qs("#patientDialog").close();
    saveState();
    render();
  } catch (error) {
    console.error(error);
    showSystemError(error.message || "No se pudo eliminar el paciente.");
  }
}

function openPatientFile(id) {
  const patient = getPatient(id);
  if (!patient || !canAccessPatient(patient)) return;
  const appointments = getVisibleAppointments().filter((appointment) => appointment.pacienteId === id).sort(sortByAppointment);
  const payments = getVisiblePayments().filter((payment) => payment.pacienteId === id).sort((a, b) => b.fechaSesion.localeCompare(a.fechaSesion));
  const notes = getVisibleNotes(id).sort((a, b) => b.fecha.localeCompare(a.fecha));
  const documents = getVisibleDocuments(id).sort((a, b) => b.fechaCarga.localeCompare(a.fechaCarga));
  const debt = payments.filter((payment) => payment.estado === "pendiente").reduce((sum, payment) => sum + Number(payment.monto || 0), 0);

  qs("#patientFileContent").innerHTML = `
    <header class="modal-header">
      <div>
        <p class="eyebrow">Ficha de paciente</p>
        <h2>${patientName(patient)}</h2>
      </div>
      <button class="icon-button" data-close-file type="button" aria-label="Cerrar">×</button>
    </header>
    <section class="patient-file-grid">
      <article class="file-summary">
        ${badge(patient.estado)}
        <p><strong>DNI</strong><span>${escapeHtml(patient.dni || "-")}</span></p>
        <p><strong>Teléfono</strong><span>${escapeHtml(patient.telefono || "-")}</span></p>
        <p><strong>Responsable</strong><span>${escapeHtml(patient.responsableNombre || "-")}</span></p>
        <p><strong>Disciplina</strong><span>${escapeHtml(patient.disciplinaPrincipal)}</span></p>
        <p><strong>Deuda</strong><span>${formatCurrency(debt)}</span></p>
        <div class="action-row">${canEdit("patients") ? `<button class="small-button" data-edit-patient="${patient.id}" type="button">Editar datos</button>` : ""}</div>
      </article>
      <article class="file-section">
        <header class="panel-header"><h3>Seguimiento</h3>${canEditNotes(patient) ? `<button class="small-button" data-new-note="${patient.id}" type="button">Agregar nota</button>` : ""}</header>
        <div class="timeline">${notes.length ? notes.map(noteCard).join("") : empty("Sin registros de seguimiento")}</div>
      </article>
      <article class="file-section">
        <header class="panel-header"><h3>Documentación</h3>${canEdit("documents") ? `<button class="small-button" data-new-document="${patient.id}" type="button">Cargar documento</button>` : ""}</header>
        <div class="stack-list">${documents.length ? documents.map(documentCard).join("") : empty("Sin documentos cargados")}</div>
      </article>
      <article class="file-section">
        <header class="panel-header"><h3>Turnos</h3></header>
        <div class="stack-list">${appointments.length ? appointments.map(appointmentMiniCard).join("") : empty("Sin turnos registrados")}</div>
      </article>
      <article class="file-section">
        <header class="panel-header"><h3>Pagos</h3></header>
        <div class="stack-list">${payments.length ? payments.map(paymentMiniCard).join("") : empty("Sin pagos registrados")}</div>
      </article>
    </section>
  `;
  qs("[data-close-file]").addEventListener("click", () => qs("#patientFileDialog").close());
  qsa("[data-edit-patient]").forEach((button) => button.addEventListener("click", () => openPatientDialog(button.dataset.editPatient)));
  qsa("[data-new-note]").forEach((button) => button.addEventListener("click", () => openNoteDialog(button.dataset.newNote)));
  qsa("[data-open-note]").forEach((button) => button.addEventListener("click", () => openNoteDialog(button.dataset.patientId, button.dataset.openNote)));
  qsa("[data-new-document]").forEach((button) => button.addEventListener("click", () => openDocumentDialog(button.dataset.newDocument)));
  qsa("[data-open-appointment]", qs("#patientFileContent")).forEach((button) => button.addEventListener("click", () => openAppointmentDialog(button.dataset.openAppointment)));
  qsa("[data-open-payment]", qs("#patientFileContent")).forEach((button) => button.addEventListener("click", () => openPaymentDialog(button.dataset.openPayment)));
  qsa("[data-open-document]", qs("#patientFileContent")).forEach((button) => button.addEventListener("click", () => openDocumentDialog(button.dataset.patientId, button.dataset.openDocument)));
  const patientFileDialog = qs("#patientFileDialog");
  if (!patientFileDialog.open) patientFileDialog.showModal();
}

function openProfessionalDialog(id) {
  if (!canEdit("professionals")) return;
  const professional = getProfessional(id);
  qs("#professionalId").value = professional?.id || "";
  qs("#professionalFirstName").value = professional?.nombre || "";
  qs("#professionalLastName").value = professional?.apellido || "";
  qs("#professionalDiscipline").value = professional?.disciplina || disciplines[0];
  qs("#professionalLicense").value = professional?.matricula || "";
  qs("#professionalPhone").value = professional?.telefono || "";
  qs("#professionalEmail").value = professional?.email || "";
  qs("#professionalState").value = professional?.estado || "activo";
  qs("#professionalSpecialties").value = professional?.especialidades?.join(", ") || "";
  qs("#professionalInsurances").value = professional?.obrasSociales?.join(", ") || "";
  qs("#professionalDays").value = professional?.diasAtencion || "";
  qs("#professionalHours").value = professional?.horariosAtencion || "";
  qs("#professionalColor").value = professional?.color || "#2f6f6a";
  qs("#professionalObservations").value = professional?.observaciones || "";
  qs("#professionalDialogTitle").textContent = professional ? "Editar profesional" : "Nuevo profesional";
  qs("#deleteProfessionalButton").hidden = !professional;
  qs("#professionalDialog").showModal();
}

async function saveProfessional(event) {
  event.preventDefault();
  if (!canEdit("professionals")) return;
  const id = qs("#professionalId").value || createId();
  const next = {
    id,
    nombre: qs("#professionalFirstName").value.trim(),
    apellido: qs("#professionalLastName").value.trim(),
    disciplina: qs("#professionalDiscipline").value,
    matricula: qs("#professionalLicense").value.trim(),
    telefono: qs("#professionalPhone").value.trim(),
    email: qs("#professionalEmail").value.trim(),
    especialidades: qs("#professionalSpecialties").value.split(",").map((item) => item.trim()).filter(Boolean),
    obrasSociales: qs("#professionalInsurances").value.split(",").map((item) => item.trim()).filter(Boolean),
    diasAtencion: qs("#professionalDays").value.trim(),
    horariosAtencion: qs("#professionalHours").value.trim(),
    estado: qs("#professionalState").value,
    observaciones: qs("#professionalObservations").value.trim(),
    color: qs("#professionalColor").value,
  };
  try {
    const saved = await apiRequest("/api/legacy/professionals", {
      method: "POST",
      body: JSON.stringify(next),
    });
    upsert(state.professionals, saved.professional || next);
    qs("#professionalDialog").close();
    saveState();
    render();
  } catch (error) {
    console.error(error);
    showSystemError(error.message || "No se pudo guardar el profesional.");
  }
}

async function deleteProfessional() {
  const id = qs("#professionalId").value;
  if (!id || !canEdit("professionals")) return;
  if (state.appointments.some((appointment) => appointment.profesionalId === id) || state.patients.some((patient) => patient.profesionalesAsignados.includes(id))) {
    alert("No se puede eliminar un profesional vinculado a pacientes o turnos.");
    return;
  }
  try {
    await apiRequest(`/api/legacy/professionals?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    state.professionals = state.professionals.filter((professional) => professional.id !== id);
    qs("#professionalDialog").close();
    saveState();
    render();
  } catch (error) {
    console.error(error);
    showSystemError(error.message || "No se pudo eliminar el profesional.");
  }
}

function openAppointmentDialog(id) {
  if (!canEdit("appointments")) return;
  const appointment = state.appointments.find((item) => item.id === id);
  if (appointment && !canAccessAppointment(appointment)) return;
  fillSelect(qs("#appointmentPatient"), patientOptions(), appointment?.pacienteId || getVisiblePatients()[0]?.id || "");
  fillSelect(qs("#appointmentProfessional"), professionalOptions(false), appointment?.profesionalId || getVisibleProfessionals()[0]?.id || "");
  qs("#appointmentId").value = appointment?.id || "";
  qs("#appointmentDate").value = appointment?.fecha || state.selectedDate;
  qs("#appointmentStart").value = appointment?.horaInicio || "09:00";
  qs("#appointmentEnd").value = appointment?.horaFin || "09:45";
  qs("#appointmentDiscipline").value = appointment?.disciplina || disciplines[0];
  qs("#appointmentState").value = appointment?.estado || "programado";
  qs("#appointmentPaymentState").value = appointment?.estadoPago || "pendiente";
  qs("#appointmentObservations").value = appointment?.observaciones || "";
  qs("#appointmentError").textContent = "";
  qs("#appointmentDialogTitle").textContent = appointment ? "Editar turno" : "Nuevo turno";
  qs("#cancelAppointmentButton").hidden = !appointment || appointment.estado === "cancelado";
  qs("#appointmentDialog").showModal();
}

function saveAppointment(event) {
  event.preventDefault();
  if (!canEdit("appointments")) return;
  const id = qs("#appointmentId").value || createId();
  const next = {
    id,
    pacienteId: qs("#appointmentPatient").value,
    profesionalId: qs("#appointmentProfessional").value,
    fecha: qs("#appointmentDate").value,
    horaInicio: qs("#appointmentStart").value,
    horaFin: qs("#appointmentEnd").value,
    disciplina: qs("#appointmentDiscipline").value,
    modalidad: "presencial",
    estado: qs("#appointmentState").value,
    estadoPago: qs("#appointmentPaymentState").value,
    observaciones: qs("#appointmentObservations").value.trim(),
  };
  const patient = getPatient(next.pacienteId);
  if (!patient || !canAccessPatient(patient)) return;
  if (next.horaFin <= next.horaInicio) {
    qs("#appointmentError").textContent = "La hora de fin debe ser posterior al inicio.";
    return;
  }
  if (hasOverlap(next)) {
    qs("#appointmentError").textContent = "Ese profesional ya tiene un turno superpuesto.";
    return;
  }
  upsert(state.appointments, next);
  syncPaymentForAppointment(next);
  state.selectedDate = next.fecha;
  state.agendaMonth = next.fecha.slice(0, 7);
  qs("#appointmentDialog").close();
  saveState();
  render();
}

function cancelAppointment() {
  const id = qs("#appointmentId").value;
  const appointment = state.appointments.find((item) => item.id === id);
  if (!appointment || !canEdit("appointments")) return;
  appointment.estado = "cancelado";
  appointment.estadoPago = "cancelado";
  state.payments.filter((payment) => payment.turnoId === id).forEach((payment) => {
    payment.estado = "cancelado";
  });
  qs("#appointmentDialog").close();
  saveState();
  render();
}

function openPaymentDialog(id) {
  if (!canEdit("payments")) return;
  const payment = state.payments.find((item) => item.id === id);
  fillSelect(qs("#paymentPatient"), patientOptions(), payment?.pacienteId || getVisiblePatients()[0]?.id || "");
  fillSelect(qs("#paymentProfessional"), professionalOptions(false), payment?.profesionalId || getVisibleProfessionals()[0]?.id || "");
  qs("#paymentId").value = payment?.id || "";
  qs("#paymentSessionDate").value = payment?.fechaSesion || state.selectedDate || todayIso;
  qs("#paymentAmount").value = payment?.monto || 30000;
  qs("#paymentInsurance").value = payment?.obraSocial || "Particular";
  qs("#paymentCoveredAmount").value = payment?.importeCubierto || 0;
  qs("#paymentState").value = payment?.estado || "pendiente";
  qs("#paymentMethod").value = payment?.medioPago || "efectivo";
  qs("#paymentDate").value = payment?.fechaPago || "";
  qs("#paymentObservations").value = payment?.observaciones || "";
  fillPaymentAppointmentOptions(payment?.turnoId);
  qs("#paymentDialogTitle").textContent = payment ? "Editar pago" : "Registrar pago";
  qs("#deletePaymentButton").hidden = !payment;
  qs("#paymentDialog").showModal();
}

function fillPaymentAppointmentOptions(selectedId = "") {
  const patientId = qs("#paymentPatient").value;
  const professionalId = qs("#paymentProfessional").value;
  const appointments = getVisibleAppointments().filter((appointment) => {
    return (!patientId || appointment.pacienteId === patientId)
      && (!professionalId || appointment.profesionalId === professionalId);
  }).sort(sortByAppointment);
  fillSelect(qs("#paymentAppointment"), [
    ["", "Sin turno asociado"],
    ...appointments.map((appointment) => [appointment.id, `${formatShortDate(appointment.fecha)} ${appointment.horaInicio} - ${patientName(getPatient(appointment.pacienteId))}`]),
  ], selectedId || "");
}

function savePayment(event) {
  event.preventDefault();
  if (!canEdit("payments")) return;
  const id = qs("#paymentId").value || createId();
  const next = {
    id,
    pacienteId: qs("#paymentPatient").value,
    profesionalId: qs("#paymentProfessional").value,
    turnoId: qs("#paymentAppointment").value,
    fechaSesion: qs("#paymentSessionDate").value,
    monto: Number(qs("#paymentAmount").value || 0),
    obraSocial: qs("#paymentInsurance").value.trim() || "Particular",
    importeCubierto: Number(qs("#paymentCoveredAmount").value || 0),
    estado: qs("#paymentState").value,
    medioPago: qs("#paymentMethod").value,
    fechaPago: qs("#paymentDate").value,
    observaciones: qs("#paymentObservations").value.trim(),
  };
  upsert(state.payments, next);
  const appointment = state.appointments.find((item) => item.id === next.turnoId);
  if (appointment) appointment.estadoPago = next.estado;
  qs("#paymentDialog").close();
  saveState();
  render();
}

function deletePayment() {
  const id = qs("#paymentId").value;
  if (!id || !canEdit("payments")) return;
  state.payments = state.payments.filter((payment) => payment.id !== id);
  qs("#paymentDialog").close();
  saveState();
  render();
}

function openNoteDialog(patientId, noteId = "") {
  const patient = getPatient(patientId);
  if (!patient || !canEditNotes(patient)) return;
  const note = state.notes.find((item) => item.id === noteId);
  if (note && !canEditNote(note)) return;
  fillSelect(qs("#noteProfessional"), professionalOptions(false), note?.profesionalId || state.currentUser.professionalId || patient.profesionalesAsignados[0] || "");
  qs("#noteId").value = note?.id || "";
  qs("#notePatientId").value = patientId;
  qs("#noteDate").value = note?.fecha || todayIso;
  qs("#noteType").value = note?.tipo || "evolucion";
  qs("#noteVisibility").value = note?.visibilidad || "equipo";
  qs("#noteText").value = note?.nota || "";
  qs("#noteFiles").value = note?.archivosAdjuntos?.join(", ") || "";
  qs("#noteDialogTitle").textContent = note ? "Editar nota" : "Nueva nota";
  qs("#noteDialog").showModal();
}

function saveNote(event) {
  event.preventDefault();
  const patient = getPatient(qs("#notePatientId").value);
  if (!patient || !canEditNotes(patient)) return;
  const id = qs("#noteId").value || createId();
  const now = todayIso;
  const existing = state.notes.find((note) => note.id === id);
  if (existing && !canEditNote(existing)) return;
  const next = {
    id,
    pacienteId: patient.id,
    profesionalId: qs("#noteProfessional").value,
    fecha: qs("#noteDate").value,
    tipo: qs("#noteType").value,
    nota: qs("#noteText").value.trim(),
    visibilidad: qs("#noteVisibility").value,
    archivosAdjuntos: qs("#noteFiles").value.split(",").map((item) => item.trim()).filter(Boolean),
    fechaCreacion: existing?.fechaCreacion || now,
    fechaActualizacion: now,
    creadoPor: existing?.creadoPor || state.currentUser.username,
  };
  upsert(state.notes, next);
  qs("#noteDialog").close();
  saveState();
  openPatientFile(patient.id);
  render();
}

function openDocumentDialog(patientId, documentId = "") {
  if (!canEdit("documents")) return;
  const document = state.documents.find((item) => item.id === documentId);
  qs("#documentId").value = document?.id || "";
  qs("#documentPatientId").value = patientId;
  qs("#documentName").value = document?.nombre || "";
  qs("#documentType").value = document?.tipo || "informe";
  qs("#documentPath").value = document?.rutaArchivo || "";
  qs("#documentDialogTitle").textContent = document ? "Editar documento" : "Nuevo documento";
  qs("#deleteDocumentButton").hidden = !document;
  qs("#documentDialog").showModal();
}

function saveDocument(event) {
  event.preventDefault();
  if (!canEdit("documents")) return;
  const id = qs("#documentId").value || createId();
  const next = {
    id,
    pacienteId: qs("#documentPatientId").value,
    nombre: qs("#documentName").value.trim(),
    tipo: qs("#documentType").value,
    rutaArchivo: qs("#documentPath").value.trim(),
    fechaCarga: state.documents.find((document) => document.id === id)?.fechaCarga || todayIso,
    cargadoPor: state.currentUser.username,
  };
  upsert(state.documents, next);
  qs("#documentDialog").close();
  saveState();
  openPatientFile(next.pacienteId);
  render();
}

function deleteDocument() {
  const id = qs("#documentId").value;
  const document = state.documents.find((item) => item.id === id);
  if (!document || !canEdit("documents")) return;
  state.documents = state.documents.filter((item) => item.id !== id);
  qs("#documentDialog").close();
  saveState();
  openPatientFile(document.pacienteId);
  render();
}

function getFilteredPayments() {
  const query = normalizeText(els.paymentSearch.value);
  const selectedStatus = els.paymentStatusFilter.value || "all";
  const selectedProfessional = els.paymentProfessionalFilter.value || "all";
  const selectedMonth = els.paymentMonthFilter.value || "";
  return getVisiblePayments().filter((payment) => {
    const haystack = normalizeText(`${patientName(getPatient(payment.pacienteId))} ${professionalName(getProfessional(payment.profesionalId))} ${payment.obraSocial}`);
    return (!query || haystack.includes(query))
      && (selectedStatus === "all" || payment.estado === selectedStatus)
      && (selectedProfessional === "all" || payment.profesionalId === selectedProfessional)
      && (!selectedMonth || payment.fechaSesion.slice(0, 7) === selectedMonth);
  }).sort((a, b) => `${b.fechaSesion}`.localeCompare(`${a.fechaSesion}`));
}

function getPaymentTotal(payment) {
  return Number(payment.monto || 0) + Number(payment.importeCubierto || 0);
}

function getProfessionalSettlement(payment) {
  return Math.round(getPaymentTotal(payment) * 0.4);
}

function getCenterSettlement(payment) {
  return getPaymentTotal(payment) - getProfessionalSettlement(payment);
}

function syncPaymentsFromAppointments() {
  state.appointments.forEach(syncPaymentForAppointment);
  state.payments = state.payments.filter((payment) => !payment.turnoId || state.appointments.some((appointment) => appointment.id === payment.turnoId));
}

function syncPaymentForAppointment(appointment) {
  const existing = state.payments.find((payment) => payment.turnoId === appointment.id);
  if (existing) {
    existing.pacienteId = appointment.pacienteId;
    existing.profesionalId = appointment.profesionalId;
    existing.fechaSesion = appointment.fecha;
    existing.obraSocial ||= "Particular";
    existing.importeCubierto = Number(existing.importeCubierto || 0);
    existing.estado = appointment.estadoPago;
    return;
  }
  state.payments.push({
    id: createId(),
    pacienteId: appointment.pacienteId,
    profesionalId: appointment.profesionalId,
    turnoId: appointment.id,
    fechaSesion: appointment.fecha,
    monto: 30000,
    obraSocial: "Particular",
    importeCubierto: 0,
    estado: appointment.estadoPago || "pendiente",
    medioPago: "otro",
    fechaPago: "",
    observaciones: "",
  });
}

function exportPaymentsSpreadsheet() {
  const rows = getFilteredPayments();
  const header = ["Fecha sesión", "Paciente", "Profesional", "Turno", "Diferencial paciente", "Obra social", "OS paga profesional", "Total", "Profesional 40%", "Vientos 60%", "Estado", "Medio", "Fecha pago", "Observaciones"];
  const bodyRows = rows.map((payment) => [
    payment.fechaSesion,
    patientName(getPatient(payment.pacienteId)),
    professionalName(getProfessional(payment.profesionalId)),
    payment.turnoId,
    payment.monto,
    payment.obraSocial,
    payment.importeCubierto,
    getPaymentTotal(payment),
    getProfessionalSettlement(payment),
    getCenterSettlement(payment),
    payment.estado,
    payment.medioPago,
    payment.fechaPago,
    payment.observaciones,
  ]);
  const table = `
    <html>
      <head><meta charset="utf-8" /></head>
      <body>
        <table>
          <thead><tr>${header.map((cell) => `<th>${escapeHtml(cell)}</th>`).join("")}</tr></thead>
          <tbody>
            ${bodyRows.map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}
          </tbody>
        </table>
      </body>
    </html>
  `;
  const blob = new Blob([table], { type: "application/vnd.ms-excel;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `pagos-vientos-${els.paymentMonthFilter.value || currentMonth}.xls`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function hasOverlap(next) {
  if (next.estado === "cancelado") return false;
  return state.appointments.some((appointment) => {
    if (appointment.id === next.id || appointment.estado === "cancelado") return false;
    if (appointment.profesionalId !== next.profesionalId || appointment.fecha !== next.fecha) return false;
    return next.horaInicio < appointment.horaFin && next.horaFin > appointment.horaInicio;
  });
}

function canViewSection(section) {
  if (!state.currentUser) return false;
  if (section === "users") return state.currentUser.role === "admin";
  if (section === "professionals") return state.currentUser.role !== "profesional";
  if (section === "payments") return state.currentUser.role === "admin";
  return true;
}

function canEdit(area) {
  const role = state.currentUser?.role;
  if (!role) return false;
  if (role === "admin") return true;
  if (role === "profesional") return ["appointments", "notes"].includes(area);
  return false;
}

function canEditNotes(patient) {
  if (state.currentUser?.role === "admin") return true;
  if (state.currentUser?.role !== "profesional") return false;
  return patient.profesionalesAsignados.includes(state.currentUser.professionalId);
}

function canEditNote(note) {
  if (!note) return false;
  if (state.currentUser?.role === "admin") return true;
  return state.currentUser?.role === "profesional" && note.creadoPor === state.currentUser.username;
}

function canAccessPatient(patient) {
  if (!patient) return false;
  if (state.currentUser?.role === "admin") return true;
  return patient.profesionalesAsignados.includes(state.currentUser?.professionalId);
}

function canAccessAppointment(appointment) {
  if (!appointment) return false;
  if (state.currentUser?.role === "admin") return true;
  return appointment.profesionalId === state.currentUser?.professionalId;
}

function getVisiblePatients() {
  return state.patients.filter(canAccessPatient);
}

function getVisibleProfessionals() {
  if (state.currentUser?.role === "profesional") return state.professionals.filter((professional) => professional.id === state.currentUser.professionalId);
  return state.professionals;
}

function getVisibleAppointments() {
  return state.appointments.filter(canAccessAppointment);
}

function getVisiblePayments() {
  if (state.currentUser?.role === "profesional") return state.payments.filter((payment) => payment.profesionalId === state.currentUser.professionalId);
  return state.payments;
}

function getVisibleNotes(patientId) {
  return state.notes.filter((note) => {
    if (note.pacienteId !== patientId) return false;
    if (state.currentUser?.role === "admin") return true;
    if (state.currentUser?.role === "profesional") {
      return note.visibilidad !== "administracion" && note.profesionalId === state.currentUser.professionalId;
    }
    return note.visibilidad !== "privada";
  });
}

function getVisibleDocuments(patientId) {
  if (state.currentUser?.role === "profesional") {
    const patient = getPatient(patientId);
    if (!patient?.profesionalesAsignados.includes(state.currentUser.professionalId)) return [];
  }
  return state.documents.filter((document) => document.pacienteId === patientId);
}

function appointmentMiniCard(appointment) {
  const patient = getPatient(appointment.pacienteId);
  const professional = getProfessional(appointment.profesionalId);
  return `
    <button class="mini-card" data-open-appointment="${appointment.id}" type="button">
      <span class="time-badge">${formatShortDate(appointment.fecha)} · ${appointment.horaInicio}-${appointment.horaFin}</span>
      <strong>${escapeHtml(patientName(patient))}</strong>
      <span>${escapeHtml(professionalName(professional))} · ${escapeHtml(appointment.disciplina)}</span>
      <span>${badge(appointment.estado)} ${badge(appointment.estadoPago)}</span>
    </button>
  `;
}

function professionalTodayCard(professional, todayAppointments) {
  const ownAppointments = todayAppointments
    .filter((appointment) => appointment.profesionalId === professional.id)
    .sort(sortByAppointment);
  const schedule = ownAppointments.map((appointment) => appointment.horaInicio).join(", ");
  return `
    <article class="mini-card">
      <span class="time-badge">${ownAppointments.length} turnos</span>
      <strong>${escapeHtml(professionalName(professional))}</strong>
      <span>${escapeHtml(professional.disciplina)}</span>
      <span>${escapeHtml(schedule || "Sin horarios cargados")}</span>
    </article>
  `;
}

function paymentMiniCard(payment) {
  return `
    <button class="mini-card" data-open-payment="${payment.id}" type="button">
      <span class="time-badge">${formatShortDate(payment.fechaSesion)}</span>
      <strong>Total ${formatCurrency(getPaymentTotal(payment))}</strong>
      <span>${escapeHtml(professionalName(getProfessional(payment.profesionalId)))}</span>
      <span>Diferencial ${formatCurrency(payment.monto)} · OS ${formatCurrency(payment.importeCubierto)}</span>
      <span>Profesional ${formatCurrency(getProfessionalSettlement(payment))} · Vientos ${formatCurrency(getCenterSettlement(payment))}</span>
      <span>${badge(payment.estado)}</span>
    </button>
  `;
}

function noteCard(note) {
  const editButton = canEditNote(note)
    ? `<button class="small-button" data-open-note="${note.id}" data-patient-id="${note.pacienteId}" type="button">Editar</button>`
    : "";
  return `
    <article class="timeline-item">
      <div><strong>${escapeHtml(labelize(note.tipo))}</strong><span>${formatShortDate(note.fecha)} · ${escapeHtml(professionalName(getProfessional(note.profesionalId)))}</span></div>
      <p>${escapeHtml(note.nota)}</p>
      <div class="card-actions"><span>${badge(note.visibilidad)}</span>${editButton}</div>
    </article>
  `;
}

function documentCard(document) {
  return `
    <button class="mini-card" data-open-document="${document.id}" data-patient-id="${document.pacienteId}" type="button">
      <span class="time-badge">${escapeHtml(labelize(document.tipo))}</span>
      <strong>${escapeHtml(document.nombre)}</strong>
      <span>${escapeHtml(document.rutaArchivo || "Backend de archivos pendiente")}</span>
      <span>Cargado ${formatShortDate(document.fechaCarga)}</span>
    </button>
  `;
}

function metric(label, value) {
  return `<article class="metric"><span>${escapeHtml(label)}</span><strong>${value}</strong></article>`;
}

function badge(value) {
  const klass = String(value).replaceAll("_", "-");
  return `<span class="status-badge ${klass}">${escapeHtml(labelize(value))}</span>`;
}

function empty(text) {
  return `<div class="empty-state">${escapeHtml(text)}</div>`;
}

function patientOptions() {
  return getVisiblePatients().sort((a, b) => patientName(a).localeCompare(patientName(b), "es")).map((patient) => [patient.id, patientName(patient)]);
}

function professionalOptions(includeAll) {
  const options = getVisibleProfessionals().sort((a, b) => professionalName(a).localeCompare(professionalName(b), "es")).map((professional) => [professional.id, professionalName(professional)]);
  return includeAll ? [["all", "Todos"], ...options] : options;
}

function insuranceOptions(includeAll = false) {
  const values = Array.from(new Set(state.professionals.flatMap((professional) => professional.obrasSociales || [])))
    .sort((a, b) => a.localeCompare(b, "es"));
  const options = values.map((value) => [value, value]);
  return includeAll ? [["all", "Todas"], ...options] : options;
}

function optionList(values, includeAll = false) {
  const options = values.map((value) => [value, labelize(value)]);
  return includeAll ? [["all", "Todos"], ...options] : options;
}

function fillSelect(select, options, selected) {
  if (!select) return;
  const current = selected ?? select.value;
  select.innerHTML = options.map(([value, label]) => `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`).join("");
  if (options.some(([value]) => value === current)) select.value = current;
}

function getMultiValue(select) {
  return Array.from(select.selectedOptions).map((option) => option.value);
}

function setMultiValue(select, values) {
  Array.from(select.options).forEach((option) => {
    option.selected = values.includes(option.value);
  });
}

function defaultAssignedProfessionals() {
  if (state.currentUser?.role === "profesional") return [state.currentUser.professionalId];
  return [getVisibleProfessionals()[0]?.id].filter(Boolean);
}

function getPatient(id) {
  return state.patients.find((patient) => patient.id === id);
}

function getProfessional(id) {
  return state.professionals.find((professional) => professional.id === id);
}

function patientName(patient) {
  if (!patient) return "Sin paciente";
  return `${patient.nombre || ""} ${patient.apellido || ""}`.trim();
}

function professionalName(professional) {
  if (!professional) return "Sin profesional";
  return `${professional.nombre || ""} ${professional.apellido || ""}`.trim();
}

function upsert(collection, next) {
  const index = collection.findIndex((item) => item.id === next.id);
  if (index >= 0) collection[index] = next;
  else collection.push(next);
}

function roleDescription(role) {
  if (role === "admin") return "Puede ver y editar todos los módulos.";
  if (role === "profesional") return "Ve sus pacientes asignados, sus turnos y carga seguimiento.";
  return "";
}

function splitName(value = "") {
  const parts = value.trim().split(/\s+/).filter(Boolean);
  return { first: parts.slice(0, -1).join(" ") || parts[0] || "", last: parts.length > 1 ? parts.at(-1) : "" };
}

function normalizePatientState(value = "activo") {
  const map = { Activo: "activo", "En pausa": "pausado", Alta: "alta" };
  return map[value] || value || "activo";
}

function normalizeAppointmentState(value = "programado") {
  const map = { Confirmado: "confirmado", Pendiente: "programado", "En sala": "asistio", Cancelado: "cancelado" };
  return map[value] || value || "programado";
}

function addMinutes(time, minutes) {
  const [hour, minute] = time.split(":").map(Number);
  const total = hour * 60 + minute + Number(minutes || 0);
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function parseIsoDate(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function toIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getWeekRange(date) {
  const start = addDays(date, -((date.getDay() + 6) % 7));
  return Array.from({ length: 7 }, (_, index) => toIsoDate(addDays(start, index)));
}

function formatShortDate(value) {
  if (!value) return "-";
  return parseIsoDate(value).toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit" });
}

function formatCurrency(value) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(Number(value || 0));
}

function sortByAppointment(a, b) {
  return `${a.fecha} ${a.horaInicio}`.localeCompare(`${b.fecha} ${b.horaInicio}`);
}

function normalizeText(value) {
  return String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function labelize(value) {
  return String(value || "")
    .replaceAll("_", " ")
    .split(" ")
    .map((word) => word ? `${word.charAt(0).toUpperCase()}${word.slice(1)}` : "")
    .join(" ");
}

function createId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function qs(selector, root = document) {
  return root.querySelector(selector);
}

function qsa(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
