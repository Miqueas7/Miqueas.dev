// Terminal interactiva: crea UI si no existe y expone initTerminal()
(function () {
  function ensureUI() {
    let modal = document.getElementById("terminalModal");
    if (modal) return modal;
    modal = document.createElement("div");
    modal.id = "terminalModal";
    modal.className = "terminal-modal";
    modal.innerHTML = `
      <div class="terminal-container">
        <div class="terminal-header">
          <span class="terminal-title">mqv@terminal:~</span>
          <button id="terminalClose" class="terminal-close" aria-label="Cerrar">✕</button>
        </div>
        <div id="terminalOutput" class="terminal-output" aria-live="polite"></div>
        <div class="terminal-inputbar">
          <span class="prompt">$</span>
          <input id="terminalInput" class="terminal-input" placeholder="help | about | projects | contact | theme | clear | close" />
        </div>
      </div>`;
    document.body.appendChild(modal);
    return modal;
  }

  function write(line) {
    const out = document.getElementById("terminalOutput");
    const div = document.createElement("div");
    div.textContent = line;
    out.appendChild(div);
    out.scrollTop = out.scrollHeight;
  }

  function run(cmd) {
    const map = {
      help: () =>
        [
          "Comandos: help, about, projects, contact, theme, clear, close",
          "Atajos: g=GitHub, l=LinkedIn, w=WhatsApp",
        ].forEach(write),
      about: () =>
        write(
          "Ingeniero de Minas × Data/Software — IA y automatización para minería."
        ),
      projects: () =>
        write("Ver sección #projects (scroll) o GitHub @Miqueas7"),
      contact: () =>
        write("Email: miqueasq@gmail.com · WhatsApp: +51 955 336 170"),
      theme: () => {
        const cur =
          document.documentElement.getAttribute("data-theme") || "dark";
        const next = cur === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
        write("Tema cambiado a " + next);
      },
      clear: () => {
        document.getElementById("terminalOutput").innerHTML = "";
      },
      close: () => {
        document.getElementById("terminalModal").classList.remove("active");
      },
    };
    if (map[cmd]) map[cmd]();
    else if (cmd === "g") {
      window.open("https://github.com/Miqueas7", "_blank");
    } else if (cmd === "l") {
      window.open("https://www.linkedin.com/in/mqv/", "_blank");
    } else if (cmd === "w") {
      window.open("https://wa.me/51955336170", "_blank");
    } else {
      write('Comando no reconocido. Escribe "help".');
    }
  }

  window.initTerminal = function () {
    const modal = ensureUI();
    const toggle = document.getElementById("terminalToggle");
    const closeBtn = document.getElementById("terminalClose");
    const input = document.getElementById("terminalInput");
    const output = document.getElementById("terminalOutput");
    if (!toggle) return;
    toggle.addEventListener("click", () => {
      modal.classList.add("active");
      input?.focus();
      if (output && !output.children.length) run("help");
    });
    closeBtn?.addEventListener("click", () => modal.classList.remove("active"));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("active");
    });
    input?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const v = e.target.value.trim();
        if (v) {
          write("$ " + v);
          run(v.toLowerCase());
          e.target.value = "";
        }
      }
    });
  };
})();
