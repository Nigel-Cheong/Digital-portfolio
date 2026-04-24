# Deployment Plan: Hybrid Portfolio (GitHub Pages + GCP Cloud Functions)

## Objective
Deploy the React frontend to GitHub Pages for free, high-performance hosting, while using a Google Cloud Function as a serverless backend to handle contact form submissions via email.

## 1. Frontend Deployment (GitHub Pages)
*   **Configuration:** Update `package.json` with a `homepage` field and install the `gh-pages` package.
*   **Automation:** Create a GitHub Actions workflow (`.github/workflows/deploy.yml`) to automatically build and deploy the `dist` folder to the `gh-pages` branch whenever code is pushed to `main`.
*   **Assets:** Ensure all image paths are relative or use the `base` configuration in Vite to prevent broken links on the subpath deployment (e.g., `username.github.io/repo-name/`).

## 2. Backend Development (GCP Cloud Function)
*   **Directory:** Create a `backend/` directory containing the function code.
*   **Logic:** 
    *   Use `cors` middleware to allow secure requests from the GitHub Pages domain.
    *   Use `nodemailer` to send form data (Name, Email, Message) to the user's email address.
    *   Return a JSON response (Success/Error) to the frontend.
*   **Environment Variables:** Store sensitive data (SMTP user, SMTP password) in GCP Environment Variables instead of hardcoding them.

## 3. Integration & Secrets
*   **URL Update:** Once the Cloud Function is deployed, capture the trigger URL and update `CLOUD_FUNCTION_URL` in `src/components/Contact.jsx`.
*   **Email Provider:** Recommend using a dedicated email service (like SendGrid or Mailgun) or a Gmail "App Password" for the SMTP transport.

## 4. Implementation Steps

### Phase 1: GitHub Pages Setup
1. Update `vite.config.js` with the correct base path.
2. Update `package.json` with deployment scripts.
3. Create the GitHub Action workflow file.

### Phase 2: Cloud Function Implementation
1. Develop the Node.js function in the `backend/` folder.
2. Define `package.json` for the function dependencies (`nodemailer`, `cors`).

### Phase 3: Deployment & Testing
1. Push code to GitHub to trigger the frontend deployment.
2. Deploy the Cloud Function to GCP.
3. Update the frontend with the live Function URL and verify the "Send Message" feature.

## 5. Custom Domain Configuration
Connecting a custom domain (e.g., `www.yourname.com`) to your GitHub Pages site:

### Step A: GitHub Settings
1. In your GitHub Repository, go to **Settings > Pages**.
2. Under **Custom domain**, enter your domain name and click **Save**.
3. Ensure **Enforce HTTPS** is checked (it may take a few minutes for the certificate to issue).

### Step B: DNS Provider Settings (Namecheap, GoDaddy, etc.)
Configure the following records in your domain's DNS management panel:

1. **CNAME Record** (for `www` subdomain):
   - **Type:** `CNAME`
   - **Host:** `www`
   - **Value:** `your-username.github.io`

2. **A Records** (for the apex domain `yourname.com`):
   Point to GitHub's IP addresses:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
