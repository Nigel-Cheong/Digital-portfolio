# Nigel Cheong - Digital Portfolio

A modern, high-performance, and secure digital portfolio built to showcase my experience in enterprise cloud architecture, full-stack development, and AI integration.

🌍 **Live Site:** [nigelcheong.com](https://nigelcheong.com)

---

## 🏗 Technology Stack

This project was built with a focus on modularity, speed, and cloud-native principles:

*   **Frontend:** React.js, Vite
*   **Styling:** Vanilla CSS (CSS Variables, Responsive Design, Glassmorphism)
*   **Backend / Serverless:** Google Cloud Functions (Node.js 24)
*   **Security:** Google reCAPTCHA v3, Strict CORS, Disguised Honeypots
*   **Deployment:** GitHub Pages, GitHub Actions
*   **Domain & DNS:** Cloudflare (Proxied for caching and DDoS protection)

---

## 🚀 Architecture & CI/CD Pipeline

The portfolio utilizes a fully automated, secure Continuous Integration and Continuous Deployment (CI/CD) pipeline.

1.  **Code Commit:** Code is pushed to the `main` branch.
2.  **Security Analysis (CodeQL):** A GitHub Action is triggered to run **CodeQL** analysis, scanning the JavaScript/React codebase for vulnerabilities (e.g., exposed secrets, XSS) before deployment.
3.  **Automated Build:** The `deploy.yml` workflow provisions a Node.js 24 environment, installs dependencies, and builds the Vite production bundle.
4.  **Deployment:** The built artifacts are automatically deployed to the `gh-pages` branch, updating the live site at `nigelcheong.com`.

---

## 🛡️ Secure Serverless Contact Form

The contact form is powered by a custom **GCP Cloud Function** (`portfolio-contact-service`) operating as a microservice.

**Security Measures ("Defense in Depth"):**
*   **Invisible reCAPTCHA v3:** Every submission is graded by Google. Requests with a low "human score" are rejected with a `403 Forbidden` response.
*   **Strict CORS Policy:** The Cloud Function only accepts requests originating from `https://nigelcheong.com`, preventing API hijacking.
*   **Honeypot Trap:** The frontend includes an invisible input field. If automated bots scrape the DOM and fill this field, the request is silently ignored.
*   **Secret Management:** API keys (Telegram Bot, SMTP passwords, reCAPTCHA secrets) are securely stored in GCP Environment Variables and are never exposed to the client.

**Dual-Notification System:**
Upon a successful, verified submission, the Cloud Function concurrently:
1.  Sends an email via Nodemailer.
2.  Dispatches a real-time notification to my mobile device via the Telegram Bot API.

---

## 🤖 AI-Assisted Development

This project was rapidly architected and developed in collaboration with **Google Jules (Gemini CLI)**, an autonomous AI coding agent.

**Key AI Contributions:**
*   **Refactoring:** Transitioned the legacy monolithic HTML/JS structure into a modular, data-driven React application.
*   **Cloud Architecture:** Designed and implemented the secure GCP Cloud Function backend.
*   **Security Posture:** Identified the need for, and implemented, the multi-layered spam defense system (reCAPTCHA + Honeypot + CORS).
*   **DevOps:** Authored the GitHub Actions workflows to enforce Node.js 24 compliance and integrate CodeQL vulnerability scanning.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
