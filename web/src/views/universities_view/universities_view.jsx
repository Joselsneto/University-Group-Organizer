import React from 'react';
import { Layout, Input } from 'antd';
import UniversitiesTable from './universities_table';

class UniversitiesView extends React.Component {

  render() {
    return (
      <Layout style={{padding: 24, height: '80vh'}}>        
        <UniversitiesTable />
      </Layout>
    );
  }
}

export default UniversitiesView;