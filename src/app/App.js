import React from 'react';
import Content from './Content.js';
import './App.css';
import { AuthProvider } from "../hooks/AuthContext"
import Layout from '../components/Layout/Layout.js';

function App() {

  return (
    <AuthProvider>
      <Layout>
        <Content />
      </Layout>
    </AuthProvider>
    
  );
}

export default App;
