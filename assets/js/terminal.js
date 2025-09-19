// =============================================
// INTERACTIVE TERMINAL
// =============================================

class Terminal {
  constructor() {
    this.input = document.getElementById("terminalInput");
    this.output = document.getElementById("terminalOutput");
    this.isOpen = false;
    this.history = [];
    this.historyIndex = 0;

    // Available commands
    this.commands = {
      help: {
        description: "Show available commands",
        action: () => this.showHelp(),
      },
      about: {
        description: "About Miqueas Quintanilla",
        action: () => this.showAbout(),
      },
      skills: {
        description: "List technical skills",
        action: () => this.showSkills(),
      },
      experience: {
        description: "Show work experience",
        action: () => this.showExperience(),
      },
      projects: {
        description: "List featured projects",
        action: () => this.showProjects(),
      },
      education: {
        description: "Show education details",
        action: () => this.showEducation(),
      },
      contact: {
        description: "Display contact information",
        action: () => this.showContact(),
      },
      cv: {
        description: "Download CV/Resume",
        action: () => this.downloadCV(),
      },
      social: {
        description: "Show social media links",
        action: () => this.showSocial(),
      },
      clear: {
        description: "Clear terminal screen",
        action: () => this.clear(),
      },
      theme: {
        description: "Toggle dark/light theme",
        action: () => this.toggleTheme(),
      },
      goto: {
        description: "Navigate to section (usage: goto <section>)",
        action: (args) => this.navigateTo(args),
      },
      matrix: {
        description: "Enable matrix rain effect",
        action: () => this.matrixEffect(),
      },
      mining: {
        description: "Mining simulation easter egg",
        action: () => this.miningSimulation(),
      },
      exit: {
        description: "Close terminal",
        action: () => this.close(),
      },
    };

    this.init();
  }

  init() {
    if (!this.input || !this.output) return;

    // Input handler
    this.input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        this.executeCommand(this.input.value);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        this.navigateHistory("up");
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        this.navigateHistory("down");
      } else if (e.key === "Tab") {
        e.preventDefault();
        this.autocomplete();
      } else if (e.ctrlKey && e.key === "l") {
        e.preventDefault();
        this.clear();
      }
    });

    // Auto-focus on open
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.target.classList.contains("active")) {
          setTimeout(() => this.input.focus(), 100);
        }
      });
    });

    const modal = document.getElementById("terminalModal");
    if (modal) {
      observer.observe(modal, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }
  }

  executeCommand(input) {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    // Add to history
    this.history.push(trimmedInput);
    this.historyIndex = this.history.length;

    // Display command in output
    this.addOutput(
      `<span class="terminal-prompt">></span> ${this.escapeHtml(trimmedInput)}`,
      "command"
    );

    // Parse command and arguments
    const [command, ...args] = trimmedInput.toLowerCase().split(" ");

    // Execute command
    if (this.commands[command]) {
      this.commands[command].action(args.join(" "));
    } else {
      this.addOutput(
        `Command not found: ${command}. Type 'help' for available commands.`,
        "error"
      );
    }

    // Clear input
    this.input.value = "";

    // Scroll to bottom
    this.output.scrollTop = this.output.scrollHeight;
  }

  addOutput(content, type = "default") {
    const line = document.createElement("div");
    line.className = `terminal-line terminal-${type}`;
    line.innerHTML = content;
    this.output.appendChild(line);
  }

  showHelp() {
    let helpText = '<div class="terminal-help">';
    helpText += "<h3>Available Commands:</h3>";
    helpText += "<table>";

    for (const [cmd, info] of Object.entries(this.commands)) {
      helpText += `<tr>
                <td class="cmd-name">${cmd}</td>
                <td class="cmd-desc">${info.description}</td>
            </tr>`;
    }

    helpText += "</table>";
    helpText +=
      '<p class="terminal-tip">💡 Tip: Use TAB for autocomplete, ↑/↓ for history</p>';
    helpText += "</div>";

    this.addOutput(helpText, "info");
  }

  showAbout() {
    const about = `
<div class="terminal-section">
<h3>👨‍💻 Miqueas Quintanilla Ventura</h3>
<p>Mining Engineer | Data Scientist | Software Developer</p>
<br>
<p>🎓 Education:</p>
<ul>
<li>• MSc Software Engineering - UNMSM (1st place)</li>
<li>• Mining Engineering - UNSCH</li>
<li>• Microsoft Office Specialist Expert</li>
</ul>
<br>
<p>🚀 Specializations:</p>
<ul>
<li>• Machine Learning for Mining Operations</li>
<li>• Mining Software Development</li>
<li>• Process Automation & Optimization</li>
<li>• Data Science & Analytics</li>
</ul>
<br>
<p>📍 Location: Ayacucho, Peru (GMT-5)</p>
<p>🌐 Website: <a href="https://miqueas.dev" target="_blank">miqueas.dev</a></p>
</div>`;
    this.addOutput(about, "info");
  }

  showSkills() {
    const skills = `
<div class="terminal-section">
<h3>🛠️ Technical Skills</h3>
<br>
<p class="skill-category">Mining Software:</p>
<div class="skill-bar">
<span class="skill-name">VentSim</span>
<span class="skill-level">████████░░ 90%</span>
</div>
<div class="skill-bar">
<span class="skill-name">Rocscience</span>
<span class="skill-level">████████░░ 85%</span>
</div>
<div class="skill-bar">
<span class="skill-name">Civil 3D</span>
<span class="skill-level">████████░░ 88%</span>
</div>
<br>
<p class="skill-category">Programming:</p>
<div class="skill-bar">
<span class="skill-name">Python</span>
<span class="skill-level">██████████ 95%</span>
</div>
<div class="skill-bar">
<span class="skill-name">C# / .NET</span>
<span class="skill-level">████████░░ 85%</span>
</div>
<div class="skill-bar">
<span class="skill-name">SQL</span>
<span class="skill-level">█████████░ 90%</span>
</div>
<br>
<p class="skill-category">Data Science & ML:</p>
<div class="skill-bar">
<span class="skill-name">TensorFlow</span>
<span class="skill-level">████████░░ 85%</span>
</div>
<div class="skill-bar">
<span class="skill-name">Power BI</span>
<span class="skill-level">█████████░ 90%</span>
</div>
</div>`;
    this.addOutput(skills, "info");
  }

  showExperience() {
    const experience = `
<div class="terminal-section">
<h3>💼 Professional Experience</h3>
<br>
<div class="exp-item">
<p class="exp-date">[2024-2025]</p>
<p class="exp-title">Project Leader - MTC Highway Software</p>
<p class="exp-desc">• Led development of software for massive plan creation</p>
<p class="exp-desc">• Implemented ML for geological risk detection</p>
<p class="exp-desc">• Achieved 700+ plans generation in minutes</p>
</div>
<br>
<div class="exp-item">
<p class="exp-date">[2024-Present]</p>
<p class="exp-title">Instructor - Mining 4.0 (INARQ)</p>
<p class="exp-desc">• Teaching Python applied to mining</p>
<p class="exp-desc">• Machine Learning implementation in operations</p>
</div>
<br>
<div class="exp-item">
<p class="exp-date">[2023-2024]</p>
<p class="exp-title">Project Manager & AI Strategy - EDT Consulting</p>
<p class="exp-desc">• Led operations team and ML projects</p>
<p class="exp-desc">• Trained 15 data analysts</p>
</div>
</div>`;
    this.addOutput(experience, "info");
  }

  showProjects() {
    const projects = `
<div class="terminal-section">
<h3>🚀 Featured Projects</h3>
<br>
<p>1. <span class="project-name">Massive Plan Creation Software</span></p>
<p>   Tech: Python, C#, Machine Learning, Selenium</p>
<p>   → 700+ technical drawings in minutes with ML risk analysis</p>
<br>
<p>2. <span class="project-name">ML for Mining Support Selection</span></p>
<p>   Tech: TensorFlow, Python, Scikit-learn</p>
<p>   → Predictive model for optimal support selection</p>
<br>
<p>3. <span class="project-name">Mining Ventilation System</span></p>
<p>   Tech: Python, VentSim, Excel Integration</p>
<p>   → Air coverage calculation per DS 023-2017 EM</p>
<br>
<p>GitHub: <a href="https://github.com/Miqueas7" target="_blank">github.com/Miqueas7</a></p>
</div>`;
    this.addOutput(projects, "info");
  }

  showEducation() {
    const education = `
<div class="terminal-section">
<h3>🎓 Education & Certifications</h3>
<br>
<p>📚 Formal Education:</p>
<ul>
<li>• Master's in Software Engineering - UNMSM (1st place admission)</li>
<li>• Mining Engineering - UNSCH</li>
<li>• Technical Computing - CESDE Institute</li>
</ul>
<br>
<p>🏆 Certifications:</p>
<ul>
<li>• Microsoft Office Specialist Expert (2016, 2019/365)</li>
<li>• Python for Mining - ISE-LATAM (2024)</li>
<li>• Machine Learning Specialization - MINSUP (2024)</li>
<li>• Mining 4.0 & AI Implementation - INARQ (2024)</li>
<li>• Scrum & JIRA Official - InnovAccion (2025)</li>
</ul>
</div>`;
    this.addOutput(education, "info");
  }

  showContact() {
    const contact = `
<div class="terminal-section">
<h3>📬 Contact Information</h3>
<br>
<p>📧 Email: <a href="mailto:miqueasq@gmail.com">miqueasq@gmail.com</a></p>
<p>📱 Phone: <a href="tel:+51955336170">+51 955 336 170</a></p>
<p>💼 LinkedIn: <a href="https://linkedin.com/in/mqv" target="_blank">linkedin.com/in/mqv</a></p>
<p>🐙 GitHub: <a href="https://github.com/Miqueas7" target="_blank">github.com/Miqueas7</a></p>
<p>💬 WhatsApp: <a href="https://wa.me/51955336170" target="_blank">+51 955 336 170</a></p>
<p>🌐 Website: <a href="https://miqueas.dev" target="_blank">miqueas.dev</a></p>
<p>📍 Location: Ayacucho, Peru (GMT-5)</p>
</div>`;
    this.addOutput(contact, "info");
  }

  showSocial() {
    const social = `
<div class="terminal-section">
<h3>🌐 Social Media & Platforms</h3>
<br>
<p>Professional:</p>
<ul>
<li>• LinkedIn: <a href="https://linkedin.com/in/mqv" target="_blank">linkedin.com/in/mqv</a></li>
<li>• GitHub: <a href="https://github.com/Miqueas7" target="_blank">github.com/Miqueas7</a></li>
<li>• Fiverr: <a href="https://es.fiverr.com/miqueas7" target="_blank">fiverr.com/miqueas7</a></li>
</ul>
<br>
<p>Contact:</p>
<ul>
<li>• WhatsApp: <a href="https://wa.me/51955336170" target="_blank">+51 955 336 170</a></li>
<li>• Email: <a href="mailto:miqueasq@gmail.com">miqueasq@gmail.com</a></li>
</ul>
</div>`;
    this.addOutput(social, "info");
  }

  downloadCV() {
    this.addOutput("📄 Downloading CV...", "success");
    const link = document.createElement("a");
    link.href = "assets/docs/CV_Miqueas_Quintanilla.pdf";
    link.download = "CV_Miqueas_Quintanilla.pdf";
    link.click();
    setTimeout(() => {
      this.addOutput("✅ CV downloaded successfully!", "success");
    }, 1000);
  }

  clear() {
    this.output.innerHTML =
      "<p class=\"terminal-welcome\">Terminal cleared. Type 'help' for commands.</p>";
  }

  toggleTheme() {
    document.getElementById("themeToggle")?.click();
    const theme = document.documentElement.getAttribute("data-theme");
    this.addOutput(`🎨 Theme changed to: ${theme}`, "success");
  }

  navigateTo(section) {
    if (!section) {
      this.addOutput("Usage: goto <section>", "error");
      this.addOutput(
        "Available sections: home, about, experience, projects, skills, contact",
        "info"
      );
      return;
    }

    const validSections = [
      "home",
      "about",
      "experience",
      "projects",
      "skills",
      "publications",
      "contact",
    ];
    if (validSections.includes(section)) {
      window.portfolio?.smoothScroll(`#${section}`);
      this.addOutput(`📍 Navigating to: ${section}`, "success");
      setTimeout(() => this.close(), 500);
    } else {
      this.addOutput(`Section '${section}' not found`, "error");
    }
  }

  matrixEffect() {
    this.addOutput(
      "🎬 Matrix rain activated! (Just kidding, but that would be cool)",
      "success"
    );
    this.addOutput(
      '<span style="color: #00ff00;">01001101 01101001 01101110 01101001 01101110 01100111</span>',
      "matrix"
    );
  }

  miningSimulation() {
    this.addOutput("⛏️ Mining simulation started...", "info");
    const minerals = [
      "💎 Diamond",
      "🪙 Gold",
      "🔷 Copper",
      "⚫ Coal",
      "🔶 Iron",
    ];
    let count = 0;

    const mine = setInterval(() => {
      if (count < 5) {
        const mineral = minerals[Math.floor(Math.random() * minerals.length)];
        this.addOutput(`Found: ${mineral}!`, "success");
        count++;
      } else {
        clearInterval(mine);
        this.addOutput("⛏️ Mining complete! You are rich! 💰", "success");
      }
    }, 500);
  }

  navigateHistory(direction) {
    if (direction === "up" && this.historyIndex > 0) {
      this.historyIndex--;
      this.input.value = this.history[this.historyIndex];
    } else if (
      direction === "down" &&
      this.historyIndex < this.history.length - 1
    ) {
      this.historyIndex++;
      this.input.value = this.history[this.historyIndex];
    } else if (
      direction === "down" &&
      this.historyIndex === this.history.length - 1
    ) {
      this.historyIndex = this.history.length;
      this.input.value = "";
    }
  }

  autocomplete() {
    const currentInput = this.input.value.toLowerCase();
    if (!currentInput) return;

    const matches = Object.keys(this.commands).filter((cmd) =>
      cmd.startsWith(currentInput)
    );

    if (matches.length === 1) {
      this.input.value = matches[0];
    } else if (matches.length > 1) {
      this.addOutput(`Suggestions: ${matches.join(", ")}`, "info");
    }
  }

  escapeHtml(text) {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }

  close() {
    document.getElementById("terminalClose")?.click();
  }
}

// Initialize terminal
document.addEventListener("DOMContentLoaded", () => {
  window.terminal = new Terminal();
});
