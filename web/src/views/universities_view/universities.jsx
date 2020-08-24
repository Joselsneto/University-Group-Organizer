import React from 'react';

import { Layout } from 'antd';
import UniversitiesView from './universities_view';

const { Header, Footer, Content } = Layout;

class Universities extends React.Component{

  render() {
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
}

export default Universities;