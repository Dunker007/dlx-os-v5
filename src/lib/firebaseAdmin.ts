import * as admin from 'firebase-admin';
import path from 'path';
import fs from 'fs';

// Protect against multiple initializations in development
if (!admin.apps.length) {
  try {
    let initialized = false;
    let serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

    // 1. Try resolving via Environment Variable (Netlify Production Deployment)
    if (serviceAccountJson) {
      try {
        if (serviceAccountJson.startsWith("'") && serviceAccountJson.endsWith("'")) {
          serviceAccountJson = serviceAccountJson.slice(1, -1);
        }
        // Parse the JSON safely first
        const parsedCredentials = JSON.parse(serviceAccountJson);
        
        // If the private_key contains literal string "\n", safely unescape them inside the object
        if (parsedCredentials.private_key) {
          parsedCredentials.private_key = parsedCredentials.private_key.replace(/\\n/g, '\n');
        }
        
        admin.initializeApp({
          credential: admin.credential.cert(parsedCredentials),
        });
        console.log("Firebase Admin SDK Initialized Successfully via Environment Variable.");
        initialized = true;
      } catch (envError) {
        console.warn("Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY environment variable. Falling back to local file.");
      }
    }

    // 2. Fall back to local raw JSON file for safe Windows/Localhost execution 
    if (!initialized) {
      const keyPath = path.resolve(process.cwd(), 'src/config/firebase-key.json');
      if (fs.existsSync(keyPath)) {
        const rawJson = fs.readFileSync(keyPath, 'utf8');
        admin.initializeApp({
          credential: admin.credential.cert(JSON.parse(rawJson)),
        });
        console.log("Firebase Admin SDK Initialized Successfully from local JSON file.");
      } else {
        console.warn("No environment variable and no local firebase-key.json found. Vault disconnected.");
      }
    }
  } catch (error) {
    console.error("Firebase admin initialization critical error", error);
  }
}

export const db = admin.apps.length ? admin.firestore() : null;

