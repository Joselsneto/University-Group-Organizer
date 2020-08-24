import React from 'react';

import { Layout } from 'antd';
import SubjectView from './subject_view';

const { Header, Footer, Content } = Layout;

class Subjects extends React.Component{

  render() {
    return (
      <Layout>
        <Header>
          <h1 style={{color: 'white'}}>University Group Organizer</h1> 
        </Header>
        <Content>
          <SubjectView />
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    );
  }
}

export default Subjects;