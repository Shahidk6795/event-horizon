import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import BackgroundMatrix from './components/core/BackgroundMatrix.jsx';
import Header from './components/core/Header.jsx';
import Navigation from './components/core/Navigation.jsx';
import OverviewTerminal from './components/views/OverviewTerminal.jsx';
import TelemetryTable from './components/views/TelemetryTable.jsx';
import Toast from './components/core/Toast.jsx';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const [toast, setToast] = useState({ message: '', type: '' }); 

  const [activeScan, setActiveScan] = useState({
    title: "Sector 7-Gamma Check",
    status: "SECURE",
    details: "Concentric scanners showing steady baseline gravitational constants.",
    metric: "Active Tracking Active"
  });

  const location = useLocation();
  const currentPath = location.pathname.replace('/', '') || 'overview';
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (currentPath !== 'overview') {
      fetchData();
    }
  }, [currentPath]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/space/${currentPath}/all`);
      setData(response.data);
    } catch (error) {
      showToast("Telemetry connection failed. Retrying...", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async () => {
    if (currentPath === 'overview') return;
    setSyncing(true);
    try {
      await axios.get(`${API_BASE_URL}/api/space/${currentPath}/fetch`);
      await fetchData();
      showToast("Telemetry stream synchronized.", "success");
    } catch (error) {
      showToast("Sync failed. Check backend connection.", "error");
    } finally {
      setSyncing(false);
    }
  };

  const glassTransition = {
    initial: { opacity: 0, y: 15, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -15, filter: 'blur(10px)', transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="relative w-full min-h-screen text-white overflow-x-hidden bg-black font-sans">
      <BackgroundMatrix />

      <div className="relative z-10 p-6 md:p-8 pt-4 min-h-screen pb-32 max-w-7xl mx-auto">
        <Header view={currentPath} loading={loading} syncing={syncing} handleSync={handleSync} />
        <Navigation currentPath={currentPath} />

        <section className="relative">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Navigate to="/overview" replace />} />
              <Route path="/overview" element={
                <motion.div variants={glassTransition} initial="initial" animate="animate" exit="exit">
                  <OverviewTerminal activeScan={activeScan} setActiveScan={setActiveScan} />
                </motion.div>
              } />
              <Route path="/asteroids" element={
                <motion.div variants={glassTransition} initial="initial" animate="animate" exit="exit">
                  <TelemetryTable data={data} view="asteroids" />
                </motion.div>
              } />
              <Route path="/ligo" element={
                <motion.div variants={glassTransition} initial="initial" animate="animate" exit="exit">
                  <TelemetryTable data={data} view="ligo" />
                </motion.div>
              } />
            </Routes>
          </AnimatePresence>
        </section>
      </div>

      <Toast 
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: '' })} 
      />
    </div>
  );
}

export default App;