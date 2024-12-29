from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# Initialize app
app = FastAPI()

# CORS setup to allow React frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input schema
class SymptomsInput(BaseModel):
    symptoms: list[str]

# Sample AI model logic
def analyze_symptoms(symptoms):
    pathways = {
        "fever": "Likely causes: Flu, Malaria, or Typhoid.",
        "cough": "Likely causes: Common Cold, Tuberculosis, or COVID-19.",
        "headache": "Likely causes: Migraine, Tension Headache, or Sinusitis.",
    }
    results = [pathways.get(symptom.strip().lower(), "No information available.") for symptom in symptoms]
    return {"pathways": results}

# API endpoint
@app.post("/analyze/")
async def analyze(symptoms_input: SymptomsInput):
    if not symptoms_input.symptoms:
        raise HTTPException(status_code=400, detail="No symptoms provided.")
    analysis = analyze_symptoms(symptoms_input.symptoms)
    return {"analysis": analysis}
