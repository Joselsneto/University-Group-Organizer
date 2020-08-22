import React from 'react';
import './App.css';
import UniversitiesView from './views/universities_view/universities_view';

import { Layout } from 'antd';
import SubjectsView from './views/subjets_view/subject_view';

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header>
        <h1 style={{color: 'white'}}>University Group Organizer</h1> 
      </Header>
      <Content>
        {/* <UniversitiesView /> */}
        <SubjectsView />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;
