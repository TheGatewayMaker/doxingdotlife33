# Firebase Google Sign-In Setup Guide

This guide walks you through setting up Google Sign-In authentication for your Doxing Dot Life application with authorized Gmail accounts only.

## Step 1: Firebase Console Configuration

### 1.1 Enable Google Sign-In Authentication

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your "doxingdotlife" project
3. Navigate to **Authentication** (left sidebar)
4. Click **Get Started** if you haven't set up authentication yet
5. Click on **Google** provider
6. Toggle **Enable** to turn it on
7. Add your support email (your Gmail address)
8. Click **Save**

### 1.2 Add Authorized Domains

1. In **Authentication**, go to **Settings** (gear icon)
2. Click the **Authorized domains** tab
3. Add these domains:
   - For local development: `localhost:5173`
   - For production: Your actual domain (e.g., `doxingdotlife.com`)
4. Click **Add URL** for each domain

### 1.3 Get Firebase Configuration

1. Go to **Project Settings** (gear icon in top-left)
2. Click the **General** tab
3. Scroll down to find your Firebase configuration
4. Copy the configuration object that looks like this:

```javascript
{
  apiKey: "YOUR_API_KEY",
  authDomain: "doxingdotlife.firebaseapp.com",
  projectId: "doxingdotlife",
  storageBucket: "doxingdotlife.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
}
```

## Step 2: Server-Side Setup (Firebase Admin SDK)

### 2.1 Create Service Account

1. Go to **Project Settings** → **Service Accounts** tab
2. Click **Generate new private key**
3. This downloads a JSON file with your service account credentials
4. Keep this file safe - never commit it to git!

### 2.2 Extract Service Account Credentials

From the downloaded JSON file, you need:

- `project_id`
- `private_key` (the entire key including `-----BEGIN PRIVATE KEY-----`)
- `client_email`

## Step 3: Environment Variables Setup

Create or update your `.env` file with the following variables:

### Frontend Environment Variables

```env
# Firebase Configuration (from Firebase Console → Project Settings)
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=doxingdotlife.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=doxingdotlife
VITE_FIREBASE_STORAGE_BUCKET=doxingdotlife.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID

# Authorized Gmail Accounts (comma-separated)
# Supports specific emails: user@gmail.com,admin@example.com
# Or domain wildcards: @company.com
VITE_AUTHORIZED_EMAILS=your-email@gmail.com,another-admin@gmail.com
```

### Backend Environment Variables

```env
# Firebase Admin SDK (from service account JSON)
FIREBASE_PROJECT_ID=doxingdotlife
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@doxingdotlife.iam.gserviceaccount.com
```

### Setting Environment Variables on Your Platform

**For Netlify:**

1. Go to your Netlify project settings
2. Navigate to **Build & deploy** → **Environment**
3. Click **Edit variables**
4. Add each variable from above
5. For multi-line variables like `FIREBASE_PRIVATE_KEY`, paste the entire key with `\n` characters

**For Local Development:**
Create a `.env.local` file in your project root with all the variables above.

## Step 4: Configure Authorized Emails

### Adding Authorized Gmail Accounts

Edit the `VITE_AUTHORIZED_EMAILS` environment variable with the Gmail addresses that should have access:

```env
VITE_AUTHORIZED_EMAILS=admin@gmail.com,moderator@gmail.com
```

### Supported Formats

- **Specific emails**: `user@gmail.com,admin@company.com`
- **Domain wildcards**: `@gmail.com,@company.com` (all users from this domain)
- **Mixed**: `john@gmail.com,@admingroup.com,admin@company.com`

## Step 5: Testing Your Setup

### Local Testing

1. Start your development server:

   ```bash
   npm run dev
   ```

2. Navigate to the Upload Panel/Admin page
3. You should see a "Sign in with Google" button
4. Click it and select a Google account
5. If your email is authorized, you'll be logged in
6. If not, you'll see an error message

### Troubleshooting

**Error: "Firebase configuration is not valid"**

- Verify all `VITE_FIREBASE_*` variables are correct
- Make sure you've enabled Google Sign-In in Firebase Console

**Error: "Your email is not authorized"**

- Verify your email is in `VITE_AUTHORIZED_EMAILS`
- Make sure you're using the exact email from your Google account
- Check for typos and capitalization

**Error: "Token verification failed" on upload**

- Verify `FIREBASE_PROJECT_ID`, `FIREBASE_PRIVATE_KEY`, and `FIREBASE_CLIENT_EMAIL` are correct
- Make sure the private key has proper formatting with `\n` characters
- Check that the service account has permission to verify tokens

## Step 6: Production Deployment

### Before Deploying

1. **Update authorized domains** in Firebase Console with your production domain
2. **Verify all environment variables** are set on your hosting platform
3. **Test the login flow** in a staging environment first

### Deployment Checklist

- [ ] Firebase Console has production domain in authorized domains
- [ ] All `VITE_FIREBASE_*` variables are set
- [ ] `FIREBASE_PROJECT_ID`, `FIREBASE_PRIVATE_KEY`, `FIREBASE_CLIENT_EMAIL` are set
- [ ] `VITE_AUTHORIZED_EMAILS` is configured with authorized users
- [ ] Email verification is enabled in Firebase (optional but recommended)
- [ ] Test sign-in flow in production after deployment

## Security Best Practices

1. **Never commit service account credentials** to git
2. **Use environment variables** for all sensitive data
3. **Regularly rotate** your service account keys
4. **Enable 2FA** on Firebase project
5. **Review authorized users** regularly
6. **Monitor failed login attempts** in Firebase Console

## Reference Documentation

- [Firebase Console](https://console.firebase.google.com)
- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [Google OAuth](https://developers.google.com/identity/protocols/oauth2)
