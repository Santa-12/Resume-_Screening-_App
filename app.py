import os
import pdfplumber
import google.generativeai as genai
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

genai.configure(api_key="AIzaSyCk5jqe4unRWjOQ0tR305kC7s9DY4XCnPQ")

def extract_text_from_pdf(pdf_path):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n" if page.extract_text() else ""
    return text.strip()

def score_resume(jd_text, resume_text):
    model = genai.GenerativeModel("gemini-2.0-flash")
    prompt = f"""
    Compare the following resume with the given job description and provide a score out of 100.
    - Job Description: {jd_text}
    - Resume: {resume_text}
    Return only the score.
    """
    response = model.generate_content(prompt)
    return response.text.strip() if response else "N/A"

@app.route("/upload_jd", methods=["POST"])
def upload_jd():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    jd_path = os.path.join(UPLOAD_FOLDER, secure_filename(file.filename))
    file.save(jd_path)

    jd_text = extract_text_from_pdf(jd_path)
    return jsonify({"message": "JD uploaded successfully", "jd_text": jd_text})

@app.route("/upload_resumes", methods=["POST"])
def upload_resumes():
    jd_text = request.form.get("jd_text")
    if not jd_text:
        return jsonify({"error": "JD not uploaded"}), 400

    files = request.files.getlist("files[]")
    results = []

    for file in files:
        resume_path = os.path.join(UPLOAD_FOLDER, secure_filename(file.filename))
        file.save(resume_path)
        resume_text = extract_text_from_pdf(resume_path)
        score = score_resume(jd_text, resume_text)
        results.append({"filename": file.filename, "score": int(score), "link": f"/uploads/{file.filename}"})

    results.sort(key=lambda x: x["score"], reverse=True)
    return jsonify({"message": "Resumes scored", "results": results})

@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

if __name__ == "__main__":
    app.run(debug=True)
