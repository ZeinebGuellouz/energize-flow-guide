# EmailJS Setup Guide

Your form submissions are now powered by **EmailJS**. Follow these steps to complete the setup:

## Step 1: Create an EmailJS Account

1. Go to [emailjs.com](https://www.emailjs.com/)
2. Sign up with your email (or sign in if you already have an account)
3. Verify your email

## Step 2: Add Your Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Complete the authorization process
5. Copy your **Service ID** and paste it in `.env` as `VITE_EMAILJS_SERVICE_ID`

Example: `service_xxxxxxxxxxxxx`

## Step 3: Create Email Template for Discovery Form

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Name it: `Discovery Form`
4. In the email template, use these variables:

```html
Subject: {{subject}}

New Discovery Session Request
─────────────────────────────

CLIENT INFORMATION
Name: {{prenom}} {{nom}}
Email: {{from_email}}
Phone: {{mobile}}
Postal Code: {{code_postal}}

PREFERRED TIME
Date: {{date}}
Time Slot: {{creneau}}

COMPANION
Name: {{ami_prenom}} {{ami_nom}}
Phone: {{ami_mobile}}

SMS Acceptance: {{sms_accepte}}
```

5. Save the template
6. Copy the **Template ID** and paste it in `.env` as `VITE_EMAILJS_TEMPLATE_DISCOVERY`

Example: `template_xxxxxxxxxxxxx`

## Step 4: Create Email Template for Request Form

1. In **Email Templates**, click **Create New Template**
2. Name it: `Request Form`
3. Use these variables:

```html
Subject: {{subject}}

New EMS Request
───────────────

CLIENT INFORMATION
Name: {{prenom}} {{nom}}
Email: {{from_email}}
Phone: {{telephone}}

REQUEST DETAILS
Objective: {{objectif}}
Package: {{formule}}

PREFERRED TIME
Date: {{date}}
Time Slot: {{creneau}}

Additional Message:
{{message}}
```

4. Save the template
5. Copy the **Template ID** and paste it in `.env` as `VITE_EMAILJS_TEMPLATE_REQUEST`

Example: `template_xxxxxxxxxxxxx`

## Step 5: Get Your Public Key

1. In your EmailJS dashboard, go to **Account**
2. Copy your **Public Key**
3. Paste it in `.env` as `VITE_EMAILJS_PUBLIC_KEY`

Example: `xxxxxxxxxxxxxxxxxxxx_xxxxx`

## Step 6: Verify Your Setup

Your `.env` file should now look like:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxxxxxxxx
VITE_EMAILJS_TEMPLATE_DISCOVERY=template_xxxxxxxxxxxxx
VITE_EMAILJS_TEMPLATE_REQUEST=template_xxxxxxxxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx_xxxxx
```

## Step 7: Test the Forms

1. Refresh your app
2. Try submitting the discovery form
3. You should receive an email at zeineb.guellouz@medtech.tn

---

**Need help?**
- EmailJS Support: https://www.emailjs.com/docs/
- Check browser console for error messages if forms don't work
