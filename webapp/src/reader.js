import './styles.css'
import React, { useState } from 'react';
import axios from 'axios';
import { KeyValue } from './components/keyValue';
import { Tag } from './components/tag';
import { OutputJson } from './components/outputJson';

const App = () => {
  const [pdfData, setPdfData] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (event) => {
    setLoading(true)
    const file = event.target.files[0];

    if (file) {
      try {
        const formData = new FormData();
        formData.append('pdfFile', file);

        const response = await axios.post('http://localhost:4000/read', formData);
        setPdfData(response.data);
      } catch (error) {
        console.error('Error extracting text from PDF:', error);
      }
    }
    setLoading(false)
  };

  console.log(pdfData)

  return (
    <div className='row'>
      <div className='container'>
        <h1>PDF to JSON </h1>
        <h2>Resume AI Analyzer</h2>
        <label htmlFor='file-input'>Click to send your resume in PDF format.</label>
        <input id="file-input" type="file" onChange={handleFileChange} />
        {loading ? <p style={{ color: "red" }}>LOADING ..</p> : !!pdfData &&
          <div className='column'>
            <div className='tags-container'>
              {pdfData.overview}
              {pdfData.skills?.map(sk =>
                <Tag label={sk} />)}
            </div>
            <KeyValue
              keyValue="First Name"
              value={pdfData.firstName}
            />
            <KeyValue
              keyValue="Last Name"
              value={pdfData.lastName}
            />
            <KeyValue
              keyValue="LinkedIn"
              value={pdfData.linkedinURL}
            />
            <KeyValue
              keyValue="GitHub"
              value={pdfData.gitHubURL}
            />
            <KeyValue
              keyValue="Other URL"
              value={pdfData.otherURL}
            />
            <KeyValue
              keyValue="Phone 1"
              value={pdfData.phone1}
            />
            <KeyValue
              keyValue="Phone 2"
              value={pdfData.phone2}
            />

            <h2>Experiences:</h2>
            {pdfData.experience?.map((xp, idx) =>
              <>
                <h4>
                  Experience {idx + 1}
                </h4>
                <KeyValue
                  keyValue="Company"
                  value={xp.company}
                />
                <KeyValue
                  keyValue="Period"
                  value={`From: ${xp.startYear} To: ${xp.endYear}`}
                />
              </>
            )}

            <h2>Education:</h2>
            {pdfData.education?.map((ed, idx) =>
              <>
                <h4>
                  Education {idx + 1}
                </h4>
                <KeyValue
                  keyValue="Institution"
                  value={ed.institutionName}
                />
                <KeyValue
                  keyValue="Degree"
                  value={ed.degree}
                />
                <KeyValue
                  keyValue="Period"
                  value={`From: ${ed.startYear} To: ${ed.endYear}`}
                />
              </>
            )}
          </div>
        }
      </div>
      <div className='container'>
        <OutputJson data={pdfData} />
      </div>
    </div>
  );
};

export default App;