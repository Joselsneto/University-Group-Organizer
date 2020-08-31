import React, {useState, useEffect} from 'react';
import { Layout } from 'antd';
import SubjectTable from './subject_table';
import { baseUrl } from '../../apiConfig';

function SubjectsView(props) {

  useEffect(() => {
    getUniversity()
  }, []);

  const [university, setUniversity] = useState({});

  const getUniversity = async () => {
    try{
      const answer = await fetch(baseUrl + 'getuniversity/' + props.universityId, {
        method: 'GET'
      });
      const json = await answer.json();
      setUniversity(json);
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <Layout style={{padding: 24, height: '80vh'}}>
      <h1>{university.name}</h1>
      <SubjectTable universityId={props.universityId}/>
    </Layout>
  );
}

export default SubjectsView;