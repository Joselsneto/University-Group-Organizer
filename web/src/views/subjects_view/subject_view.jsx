import React from 'react';
import { Layout } from 'antd';
import SubjectTable from './subject_table';

class SubjectsView extends React.Component {

  render() {
    return (
      <Layout style={{padding: 24, height: '80vh'}}>
        <SubjectTable />
      </Layout>
    );
  }
}

export default SubjectsView;