import React from 'react';
import { Layout } from 'antd';
import SubjectTable from './subject_table';

function SubjectsView(props) {  
  return (
    <Layout style={{padding: 24, height: '80vh'}}>
      <SubjectTable universityId={props.universityId}/>
    </Layout>
  );
}

export default SubjectsView;