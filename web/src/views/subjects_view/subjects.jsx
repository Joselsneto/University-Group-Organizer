import React from 'react';

import { Layout } from 'antd';
import SubjectView from './subject_view';
import { useParams } from 'react-router-dom';

const { Header, Footer, Content } = Layout;

function Subjects(){

  let {id} = useParams();

  return (
    <Layout>
      <Header>
        <h1 style={{color: 'white'}}>University Group Organizer</h1> 
      </Header>
      <Content>
        <SubjectView universityId={id}/>
      </Content>
      <Footer style={{bottom: 0, width: '100%'}}>Footer</Footer>
    </Layout>
  );
  
}

export default Subjects;