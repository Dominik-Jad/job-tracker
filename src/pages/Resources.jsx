import React, { useState } from 'react';
import '../components/resources.css';

const Resources = () => {
    // State to track which FAQ answer is currently expanded
    const [expandedIndex, setExpandedIndex] = useState(null);
  
    // Function to toggle the expanded state of an FAQ answer
    const toggleAnswer = (index) => {
      setExpandedIndex(index === expandedIndex ? null : index);
    };
  
    // FAQ data
    const faqs = [
      {
        question: 'How do I write an effective resume?',
        answer: 'An effective resume highlights your skills, experiences, and achievements relevant to the job you\'re applying for.',
      },
      {
        question: 'What should I include in a cover letter?',
        answer: 'A cover letter should introduce yourself, explain why you\'re interested in the position, and highlight your qualifications and experiences that make you a suitable candidate.',
      },
      {
        question: 'How can I prepare for a job interview?',
        answer: 'Preparation for a job interview includes researching the company, practicing common interview questions, preparing questions to ask the interviewer, and dressing appropriately.',
      },
      {
        question: 'What should I do after submitting a job application?',
        answer: 'After submitting a job application, follow up with the employer if you haven\'t heard back within a reasonable timeframe. Use professional communication to express your continued interest in the position and inquire about the next steps in the hiring process.',
      },
      {
        question: 'How can I improve my networking skills?',
        answer: 'Networking skills can be improved by attending networking events, joining professional organizations, connecting with professionals on LinkedIn, and actively participating in industry-related discussions.',
      },
      
    ];
  
 
    const jobSearchWebsites = [
      {
        name: 'LinkedIn Jobs',
        link: 'https://www.linkedin.com/jobs/',
      },
      {
        name: 'Monster',
        link: 'https://www.monster.com/',
      },
      {
        name: 'Glassdoor',
        link: 'https://www.glassdoor.com/index.htm',
      },
      {
        name: 'CareerBuilder',
        link: 'https://www.careerbuilder.com/',
      },
    
    ];
  
   
    const financialPlanningWebsites = [
      {
        name: 'Personal Finance - NerdWallet',
        link: 'https://www.nerdwallet.com/personal-finance',
      },
      {
        name: 'Financial Planning - CNBC',
        link: 'https://www.cnbc.com/financial-planning/',
      },
      
    ];
  
    return (
      <div className="resources-container">
        <h2 className="section-title">Job Search Websites</h2>
        <div className="resource-list job-websites">
          <ul>
            {jobSearchWebsites.map((website, index) => (
              <li key={index}>
                <a href={website.link} target="_blank" rel="noopener noreferrer">
                  {website.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
  
        <h2 className="section-title">Financial Planning</h2>
        <div className="resource-list">
          <p>
            Financial planning is essential for managing your finances effectively. Here are some resources to help you plan your finances:
          </p>
          <ul>
            <li>
              <a href="https://www.investopedia.com/financial-planning-4844665" target="_blank" rel="noopener noreferrer">
                Financial Planning Basics - Investopedia
              </a>
            </li>
            {financialPlanningWebsites.map((website, index) => (
              <li key={index}>
                <a href={website.link} target="_blank" rel="noopener noreferrer">
                  {website.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
  
        <h2 className="section-title">FAQ</h2>
        <div className="faq-table">
          <table>
            <tbody>
              {faqs.map((faq, index) => (
                <tr key={index}>
                  <td className="faq-question" onClick={() => toggleAnswer(index)}>
                    {faq.question}
                  </td>
                  <td className={`faq-answer ${expandedIndex === index ? 'expanded' : ''}`} colSpan="2">
                    {faq.answer}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default Resources;