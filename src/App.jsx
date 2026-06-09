import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { NavigationLayout } from './components/NavigationLayout';
import { Lab1 } from './pages/Lab1';
import { Lab2 } from './pages/Lab2';
import { Lab3 } from './pages/Lab3';
import { Theory } from './pages/Theory';
import { Exam } from './pages/Exam';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1677ff',
          borderRadius: 8,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial'
        },
      }}
    >
      <HashRouter>
        <NavigationLayout>
          <Routes>
            <Route path="/" element={<Lab1 />} />
            <Route path="/lab2" element={<Lab2 />} />
            <Route path="/lab3" element={<Lab3 />} />
            <Route path="/theory" element={<Theory />} />
            <Route path="/exam" element={<Exam />} />
          </Routes>
        </NavigationLayout>
      </HashRouter>
    </ConfigProvider>
  );
}

export default App;
