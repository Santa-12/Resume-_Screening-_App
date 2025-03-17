import React, { useState, useMemo, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { FaFilePdf, FaDownload, FaMedal } from "react-icons/fa";
import "./App.css";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="container home">
      <h1>Welcome to Our Resume Screening App</h1>
      <p>"Your resume speaks before you do – let’s ensure it says the right things!"</p>
      <button onClick={() => navigate("/upload-jd")} className="big-button">Get Started</button>
    </div>
  );
};

const UploadJDPage = () => {
  const [jdFile, setJdFile] = useState(null);
  const navigate = useNavigate();

  const handleJDUpload = (event) => {
    setJdFile(event.target.files[0]);
  };

  const handleNext = () => {
    if (jdFile) navigate("/upload-resumes");
    else alert("Please upload a Job Description first!");
  };

  return (
    <div className="container upload-box">
      <h2>Upload Job Description</h2>
      <input type="file" accept=".pdf" onChange={handleJDUpload} className="file-input" />
      {jdFile && <p>Uploaded: {jdFile.name}</p>}
      <button onClick={handleNext} className="big-button">Next</button>
    </div>
  );
};

const UploadResumesPage = () => {
  const [resumeFiles, setResumeFiles] = useState([]);
  const navigate = useNavigate();

  const handleResumeUpload = (event) => {
    setResumeFiles([...event.target.files]);
  };

  const handleNext = () => {
    if (resumeFiles.length > 0) {
      navigate("/results", { state: { resumes: resumeFiles } });
    } else {
      alert("Please upload at least one resume!");
    }
  };

  return (
    <div className="container upload-box">
      <h2>Upload Resumes</h2>
      <input type="file" accept=".pdf" multiple onChange={handleResumeUpload} className="file-input" />
      <p>{resumeFiles.length} files uploaded</p>
      <ul>
        {resumeFiles.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
      <button onClick={handleNext} className="big-button">View Results</button>
    </div>
  );
};

const ResultsPage = () => {
  const location = useLocation();
  const resumes = useMemo(() => location.state?.resumes || [], [location.state?.resumes]);
  const [scoredResumes, setScoredResumes] = useState([]);

  useEffect(() => {
    if (resumes.length === 0) return;

    const newScoredResumes = resumes.map((resume, index) => {
      const objectURL = URL.createObjectURL(resume);

      return {
        name: resume.name,
        score: Math.floor(Math.random() * 50) + 50,
        link: objectURL,
        suggestion:
          index % 3 === 0
            ? "Great! Tailor skills to the JD more."
            : index % 3 === 1
            ? "Add more relevant experience."
            : "Improve formatting and clarity.",
      };
    }).sort((a, b) => b.score - a.score);

    setScoredResumes(newScoredResumes);

    return () => {
      newScoredResumes.forEach((resume) => URL.revokeObjectURL(resume.link));
    };
  }, [resumes]);

  if (resumes.length === 0) {
    return (
      <div className="container">
        <h2>Resume Rankings</h2>
        <p>No resumes uploaded. Please go back and upload resumes.</p>
      </div>
    );
  }

  return (
    <div className="container results-box">
      <h2>Resume Rankings</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Resume</th>
            <th>Score</th>
            <th>Suggestions</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {scoredResumes.map((resume, index) => (
            <tr key={index}>
              <td>
                {index === 0 ? <FaMedal className="gold" /> : 
                 index === 1 ? <FaMedal className="silver" /> : 
                 index === 2 ? <FaMedal className="bronze" /> : index + 1}
              </td>
              <td>
                <FaFilePdf className="pdf-icon" />
                <a href={resume.link} target="_blank" rel="noopener noreferrer">
                  {resume.name}
                </a>
              </td>
              <td>{resume.score}</td>
              <td>{resume.suggestion}</td>
              <td>
                <a href={resume.link} download={resume.name}>
                  <FaDownload className="download-icon" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upload-jd" element={<UploadJDPage />} />
        <Route path="/upload-resumes" element={<UploadResumesPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}