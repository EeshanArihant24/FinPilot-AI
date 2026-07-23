from fastapi import FastAPI

from .schemas import Transaction
from .predictor import predict

app = FastAPI(
    title="FinPilot AI",
    version="1.0"
)

@app.get("/")
def home():
    return {
        "message": "FinPilot AI Fraud Detection Service Running"
    }

@app.post("/predict")
def fraud_prediction(transaction: Transaction):

    result = predict(transaction.model_dump())

    return result