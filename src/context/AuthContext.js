import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
const [user, setUser] = useState(null);
  const [plan, setPlan] = useState('free'); // default

useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
    setUser(currentUser);
    if (currentUser) {
        // suponiendo que guardas plan en /users/{uid}
        const snap = await getDoc(doc(db, 'users', currentUser.uid));
        if (snap.exists()) {
        setPlan(snap.data().plan || 'free');
        }
    } else {
        setPlan('free');
    }
    });
    return unsub;
}, []);

return (
    <AuthContext.Provider value={{ user, plan }}>
    {children}
    </AuthContext.Provider>
);
}
