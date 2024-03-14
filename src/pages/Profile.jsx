import React from 'react';
import { useState, useEffect } from "react";
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

const Profile = (props) => {
  const [pdfURL, setPdfURL] = useState('');

  async function uploadResume(e) {

    let file = e.target.files[0];

    const { data, error } = await props.supabase
      .storage
      .from('resume')
      .upload(props.session.user.id + '/' + 'resume.pdf', file)

    if (data) {
      console.log(data);

    } else {
      console.log(error);
    }
  }

  const getResume = async () => {
    console.log("get resume");
    console.log(props.session.user.id + '/' + 'resume.pdf');
    const { data, error } = await props.supabase
      .storage
      .from('resume')
      .download(props.session.user.id + '/' + 'resume.pdf')

    if (data) {
      console.log("wow worked")
      setPdfURL(props.session.user.id + '/' + 'resume.pdf');
    } else {
      console.log("wow not worked")
      console.log(error);
    }
  }


  return (
    <div>
      <h2>Profile</h2>
      <p>Profile page content</p>
      <p>testing</p>
      <p>{props.session.user.id}</p>

      <input type="file" onChange={(e) => uploadResume(e)} />
      <div>
        <button onClick={getResume}>Get Resume</button>
      </div>
      <div> {
        pdfURL === '' ? null :
          <Document file={`https://muhmvbrhzksmloawaqcl.supabase.co/storage/v1/object/public/resume/` + pdfURL}>
            <Page pageNumber={1} />
          </Document>
      }
      </div>
    </div>
  );
}

export default Profile;