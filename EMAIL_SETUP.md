# Email Setup Guide

## Current Implementation

The contact form now supports email sending with the following features:

### Features
- ✅ Contact form saves messages to Firebase Firestore
- ✅ Sends email notifications via API endpoint
- ✅ Provides mailto link fallback for reliability
- ✅ Bilingual support (Turkish/English)
- ✅ Error handling and user feedback

### How It Works

1. **User fills contact form** on the Help page
2. **Data is saved to Firebase** in the 'contacts' collection
3. **Email API is called** to send notification
4. **Success/error feedback** is shown to user
5. **Mailto link fallback** opens email client if needed

### API Endpoint
- **URL:** `POST /api/contact`
- **Payload:** `{ subject: string, message: string }`
- **Response:** `{ success: boolean, message: string, mailtoLink?: string }`

### Email Address
The contact form messages are sent to: `hamedhaidari2023@gmail.com`

## Production Email Setup

For production use, consider integrating with these email services:

### Option 1: SendGrid (Recommended)
```bash
npm install @sendgrid/mail
```

### Option 2: Mailgun
```bash
npm install mailgun.js
```

### Option 3: AWS SES
```bash
npm install aws-sdk
```

### Option 4: Gmail API
```bash
npm install googleapis
```

## Testing

1. Start the server: `npm start`
2. Go to Help page
3. Fill contact form
4. Submit and check console logs
5. Email should be sent to configured address

## Troubleshooting

- Check server console for contact form logs
- Verify Firebase configuration
- Check network tab for API calls
- Try mailto link if API fails