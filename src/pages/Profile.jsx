import React from 'react';
import { useState, useEffect } from "react";
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import Textarea from '@mui/joy/Textarea';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      setPdfURL(props.session.user.id + '/' + 'resume.pdf');
      setIsResumeUploaded(true);
      notifySaved();
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
      if (data.length == 0) {
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
    notifySaveCL();
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
    notifyDeleteCL();
  }

  const checkResume = async () => {
    const { data, error } = await props.supabase
      .storage
      .from('resume')
      .list(props.session.user.id + '/');
    if (data) {
      console.log(data);
      if (data[0].name === "resume.pdf") {
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

  const deleteResume = async () => {
    const { data, error } = await props.supabase
      .storage
      .from('resume')
      .remove([props.session.user.id + '/' + 'resume.pdf'])

    if (data) {
      console.log(data);
    } else {
      console.log(error);
    }
    setPdfURL('');
    setIsResumeUploaded(false);
    notifyDeleteResume();
  }

  useEffect(() => {
    setPdfURL('');
    checkResume();
    getCoverLetter();
  }, []);

  const notifySaved = () => toast.success(`Resume Saved!`);
  const notifyDeleteResume = () => toast.error(`Resume Deleted!`);
  const notifyDeleteCL = () => toast.error(`Cover Letter Deleted!`);
  const notifySaveCL = () => toast.success(`Cover Letter Saved!`);

  return (
    <div>
      <ToastContainer />
      <h2>Hi {props.session.user.email} !</h2>
      <div className='row gx-0'>
        <div className='col-6'>
          <h3>Resume</h3>
          {/* if user has already uploaded a resume dont show this button  */}

          <div> {
            pdfURL === '' ?
              <div>
                {
                  isResumeUploaded === true ? 
                  <div>
                    <button className="buttonUsers" onClick={getResume}>Show Resume</button>
                    <button className="buttonUsers" onClick={deleteResume}>Delete Resume</button>
                  </div>
                  : 
                  <input type="file" onChange={(e) => uploadResume(e)} /> 
                }
              </div> :
              <div>
                <Document file={`https://muhmvbrhzksmloawaqcl.supabase.co/storage/v1/object/public/resume/` + pdfURL}>
                  <Page pageNumber={1} />
                </Document>
                <div className='col-12'>
                  <button className="buttonUsers" onClick={() => setPdfURL('')}>Close Resume</button>
                  {/* download pdf button  */}
                  <button className="buttonUsers" onClick={() => window.open(`https://muhmvbrhzksmloawaqcl.supabase.co/storage/v1/object/public/resume/` + pdfURL)}>Download Resume</button>
                  <button className="buttonUsers" onClick={deleteResume}>Delete Resume</button>
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
          <button className="buttonUsers" onClick={saveCoverLetter}>Save Cover Letter</button>
          <button className="buttonUsers" onClick={deleteCoverLetter}>Delete Cover Letter</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;