# Deployment Guide

## Vercel Deployment

### Prerequisites
- Vercel account
- GitHub repository connected to Vercel

### Steps

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository

2. **Configure Build Settings:**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Environment Variables:**
   Set the following in Vercel dashboard:
   ```
   VITE_AGENCY_NAME=Tes Insurance Agency
   VITE_PHONE=(215) 555-0199
   VITE_EMAIL=info@tesinsurance.com
   VITE_ADDRESS=6622 Cormorant Pl, Philadelphia, PA 19142
   VITE_LICENSE=PA Lic #TBD
   VITE_FORMSPREE_ID=xzzaowkq
   VITE_GOOGLE_ANALYTICS_ID=your_ga_id_here
   VITE_PLAUSIBLE_DOMAIN=your_domain_here
   ```

4. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically build and deploy your site

## GitHub Pages Deployment

### Using GitHub Actions (Recommended)

1. **Create GitHub Secrets:**
   - Go to repository Settings > Secrets and variables > Actions
   - Add `FORMSPREE_ID` secret

2. **Workflow is already configured** in `.github/workflows/deploy.yml`

3. **Deploy:**
   - Push to `main` branch
   - GitHub Actions will automatically build and deploy

### Manual Deployment

```bash
npm run build
npm run deploy
```

## Environment Configuration

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build:prod
```

### Preview
```bash
npm run preview
```

## Custom Domain Setup

### Vercel
1. Go to Project Settings > Domains
2. Add your custom domain
3. Update DNS records as instructed

### GitHub Pages
1. Add `CNAME` file with your domain
2. Update DNS records to point to GitHub Pages

## Analytics Setup

### Google Analytics
1. Create GA4 property
2. Get Measurement ID
3. Set `VITE_GOOGLE_ANALYTICS_ID` environment variable

### Plausible Analytics
1. Create Plausible account
2. Add your domain
3. Set `VITE_PLAUSIBLE_DOMAIN` environment variable

## Monitoring

- Check Vercel dashboard for deployment status
- Monitor analytics in Google Analytics or Plausible
- Check form submissions in Formspree dashboard
