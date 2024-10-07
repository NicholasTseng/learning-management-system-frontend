import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './styles/global.css';
import { ConfigProvider } from 'antd';
import { loadApp } from './services/app-loader';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(container);
loadApp();

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
