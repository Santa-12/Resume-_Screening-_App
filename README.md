# Resume Screening App

## Overview

The **Resume Screening App** is a full-stack web application designed to automate the process of evaluating resumes against job descriptions. It utilizes **Flask** for the backend, **React** for the frontend, and **Gemini AI** for resume scoring and providing improvement suggestions.

## Features

- **User-friendly Interface**: Clean and interactive UI for uploading job descriptions and resumes.
- **PDF Parsing**: Extracts and cleans text from uploaded PDFs.
- **Job Description Upload**: Users can upload a job description as a PDF file.
- **Resume Upload**: Allows multiple resume uploads (PDF format) after the job description is uploaded.
- **Resume Screening & Scoring**: Uses **Gemini AI** to score resumes based on job descriptions.
- **Results Page**:
  - Displays resumes in a tabular format.
  - Provides improvement suggestions for each resume.
- **Single-File Flask Backend**: A simple and efficient backend implementation.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Flask (Python)
- **AI Model**: Gemini AI for resume scoring
- **Storage**: Local file system for PDF handling
- **Libraries Used**:
  - Python: `Flask`, `PyMuPDF` (for PDF parsing), `requests`
  - React: `axios`, `react-table`

## Installation

### Prerequisites

Ensure you have the following installed:

- Python (>=3.8)
- Node.js & npm
- Virtual environment (optional but recommended)

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/resume-screening-app.git
   cd resume-screening-app/backend
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the Flask server:
   ```bash
   python app.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React application:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`.

## Usage

1. Navigate to the web app.
2. Upload a job description (PDF format).
3. Upload multiple resumes (PDF format).
4. View resume scores and suggestions on the results page.

## Future Enhancements

- **Database Integration**: Store resume screening results for future reference.
- **Authentication System**: Implement user login and access control.
- **Advanced NLP Processing**: Improve text extraction and scoring accuracy.

## Contributing

Feel free to fork the repository and contribute by submitting pull requests.

## License

This project is licensed under the MIT License.

## Contact

For queries, contact [Your Name] at [santhanalakshmi3084\@gmail.com].

