// src/pages/MuiDemo.jsx
import { useState } from 'react';
import Dashboard from '../components/Dashboard';
import SimpleTechCard from '../components/SimpleTechCard';
import useTechnologies from '../hooks/useTechnologies';

function MuiDemo() {
  const { technologies, updateStatus } = useTechnologies();

  return (
    <div>
      <h1>Material-UI Демо</h1>
      
      <h2>Dashboard</h2>
      <Dashboard technologies={technologies} />
      
      <h2>Карточки технологий</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {technologies.slice(0, 3).map(tech => (
          <SimpleTechCard 
            key={tech.id} 
            technology={tech} 
            onStatusChange={updateStatus} 
          />
        ))}
      </div>
    </div>
  );
}

export default MuiDemo;