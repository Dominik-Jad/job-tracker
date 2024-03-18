import React from 'react';
import { useState, useEffect } from "react";
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import Textarea from '@mui/joy/Textarea';

const Profile = (props) => {
  const [pdfURL, setPdfURL] = useState('');
  const [isResumeUploaded, setIsResumeUploaded] = useState(false);
  const [coverLetter, setCoverLetter] = useState(``);

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

  const saveCoverLetter = async () => {
    const { data, error } = await props.supabase
      .from('cover-letter')
      .update({ coverLetter: coverLetter })
      .eq('user', props.session.user.id)
      .select()

    if (data) {
      if(data.length == 0){
        const { data, error } = await props.supabase
        .from('cover-letter')
        .insert([{ coverLetter: coverLetter, user: props.session.user.id }])

        if (data) {
          console.log(data);
        } else {
          console.log(error);
        }
      }
      console.log(data);
    }
    else {
      console.log(error);
    }
  }
  
  const getCoverLetter = async () => {
    const { data, error } = await props.supabase
      .from('cover-letter')
      .select('coverLetter')
      .eq('user', props.session.user.id);

    if (data) {
      if (data.length > 0) {
        setCoverLetter(data[0].coverLetter);
      }
    } else {
      console.log(error);
    }
  }

  const deleteCoverLetter = async () => {
    const { data, error } = await props.supabase
      .from('cover-letter')
      .delete()
      .eq('user', props.session.user.id);

      setCoverLetter('');
  }

  const checkResume = async () => {
    const { data, error } = await props.supabase
      .storage
      .from('resume')
      .list(props.session.user.id + '/');
    if (data) {
      if (data.length > 0) {
        setIsResumeUploaded(true);
      }
    } else {
      console.log(error);
    }
  }

  const getResume = async () => {
    const { data, error } = await props.supabase
      .storage
      .from('resume')
      .download(props.session.user.id + '/' + 'resume.pdf')

    if (data) {
      setPdfURL(props.session.user.id + '/' + 'resume.pdf');
    } else {
      console.log(error);
    }
  }

  useEffect(() => {
    checkResume();
    getCoverLetter();
  }, []);

  return (
    <div>
      <h2>Hi {props.session.user.email} !</h2>
      <div className='row gx-0'>
        <div className='col-6'>
          <h3>Resume</h3>
          {/* if user has already uploaded a resume dont show this button  */}
          {
            isResumeUploaded == false ? <input type="file" onChange={(e) => uploadResume(e)} /> : null
          }
          <div> {
            pdfURL === '' ? <div>
              <button onClick={getResume}>Show Resume</button>
            </div> :
              <div>
                <Document file={`https://muhmvbrhzksmloawaqcl.supabase.co/storage/v1/object/public/resume/` + pdfURL}>
                  <Page pageNumber={1} />
                </Document>
                <div className='col-12'>
                  <button onClick={() => setPdfURL('')}>Close Resume</button>
                  {/* download pdf button  */}
                  <button onClick={() => window.open(`https://muhmvbrhzksmloawaqcl.supabase.co/storage/v1/object/public/resume/` + pdfURL)}>Download Resume</button>
                </div>
              </div>
          }
          </div>

        </div>
        <div className='col-6' style={{ margin: "0" }}>
          <h3>Cover Letter </h3>
          <Textarea
            style={{ margin: "2em" }}
            color="primary"
            minRows={2}
            placeholder="Cover Letter..."
            size="lg"
            variant="soft"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          />
          <button onClick={saveCoverLetter}>Save Cover Letter</button>
          <button onClick={deleteCoverLetter}>Delete Cover Letter</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;