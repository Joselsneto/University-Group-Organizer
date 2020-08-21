import React from 'react';
import './App.css';
import UniversitiesView from './views/universities_view/universities_view';

import { Layout } from 'antd';

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header>
        <h1 style={{color: 'white'}}>University Group Organizer</h1> 
      </Header>
      <Content>
        <UniversitiesView />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;
