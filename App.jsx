
alert("👋 App.jsx loaded");
console.log("👋 App.jsx loaded");

import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCDpnMTz4dKgJ73RQYSgFj9v3gawNJYIb4",
  authDomain: "pokerpromoapp.firebaseapp.com",
  projectId: "pokerpromoapp",
  storageBucket: "pokerpromoapp.firebasestorage.app",
  messagingSenderId: "350282850492",
  appId: "1:350282850492:web:6f31fcdffac57a79a570b9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const App = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const snapshot = await getDocs(collection(db, "promotions"));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("✅ Promotions fetched:", data);
        setPromotions(data);
      } catch (err) {
        console.error("❌ Firebase fetch failed:", err.message);
      }
    };
    fetchPromotions();
  }, []);

  return (
    <div style={{ padding: '2rem', color: 'white', backgroundColor: '#111' }}>
      <h1>Final Poker Promo App</h1>
      <h2>Promotions:</h2>
      {promotions.length === 0 ? (
        <p>No promotions found.</p>
      ) : (
        promotions.map(promo => (
          <div key={promo.id} style={{ marginBottom: '1rem', padding: '1rem', background: '#222' }}>
            <h3>{promo.title}</h3>
            <p>{promo.description}</p>
            <strong>Jackpot: ${promo.jackpot}</strong>
          </div>
        ))
      )}
    </div>
  );
};

export default App;
