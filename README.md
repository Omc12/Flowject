# 🚀 Flowject - Project Management App

A modern project management application built with React and Firebase.

## 🎯 Quick Start

### Local Development (Like before)
```bash
npm start          # Start frontend locally
npm run dev        # Start with Firebase emulators
```

### Deploy to Firebase (As easy as npm start!)
```bash
npm run deploy     # Deploy everything to Firebase
```

## 📋 Setup Instructions

### 1. One-time Setup
```bash
# Install dependencies
npm run setup

# Login to Firebase
firebase login
```

### 2. Configure Firebase
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Update these files with your project details:
   - `.firebaserc` - Your project ID
   - `frontend/src/firebase.ts` - Firebase config
   - `frontend/src/services/api.ts` - Functions URL

### 3. Deploy
```bash
npm run deploy
```

That's it! Your app is now live on Firebase! 🌐

## 🔧 What Happens When You Deploy

When you run `npm run deploy`, it automatically:

1. ✅ **Builds** your React frontend
2. ✅ **Deploys** frontend to Firebase Hosting
3. ✅ **Deploys** backend functions to Cloud Functions
4. ✅ **Deploys** database rules to Firestore
5. ✅ **Starts** your app on Firebase (just like `npm start` but on the web!)

## 🌐 URLs After Deployment

- **Frontend**: `https://your-project-id.web.app`
- **Functions**: `https://us-central1-your-project-id.cloudfunctions.net`

## 📁 Project Structure

```
Flowject/
├── frontend/          # React app
├── functions/         # Firebase Cloud Functions (your backend)
├── firebase.json      # Firebase configuration
├── firestore.rules    # Database security rules
├── deploy.sh          # Deployment script
└── setup-firebase.js  # Setup helper
```

## 🛠️ Available Commands

```bash
npm start              # Start frontend locally
npm run dev            # Start with Firebase emulators
npm run deploy         # Deploy to Firebase (like npm start for production)
npm run setup          # Initial setup
./deploy.sh            # Alternative deployment script
```

## 🔥 Firebase Services Used

- **Authentication** - User login/register
- **Firestore** - Database for projects and tasks
- **Cloud Functions** - Backend API
- **Hosting** - Frontend hosting

## 🚨 Troubleshooting

- **Not logged in**: Run `firebase login`
- **Wrong project**: Update `.firebaserc` with correct project ID
- **Build errors**: Check `frontend/src/firebase.ts` configuration
- **Function errors**: Check Firebase Console > Functions > Logs

## 📚 Documentation

- [Firebase Setup Guide](FIREBASE_SETUP.md) - Detailed setup instructions
- [Quick Start Guide](QUICK_START.md) - Simple deployment guide

---

**Made with ❤️ using React + Firebase** 