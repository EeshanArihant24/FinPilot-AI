import joblib
import pandas as pd

model = joblib.load("models/fraud_model.pkl")
encoder = joblib.load("models/label_encoder.pkl")


def predict(transaction):

    data = pd.DataFrame([transaction])

    data["night_transaction"] = (
        (data["hour"] >= 22) |
        (data["hour"] <= 5)
    ).astype(int)

    data["sender_change"] = (
        data["oldbalanceOrg"] -
        data["newbalanceOrig"]
    )

    data["receiver_change"] = (
        data["newbalanceDest"] -
        data["oldbalanceDest"]
    )

    data["amount_balance_ratio"] = (
        data["amount"] /
        (data["oldbalanceOrg"] + 1)
    )

    data["large_transaction"] = (
        data["amount"] > 200000
    ).astype(int)

    data["type"] = encoder.transform(data["type"])
    data = data[
    [
        "step",
        "type",
        "amount",
        "oldbalanceOrg",
        "newbalanceOrig",
        "oldbalanceDest",
        "newbalanceDest",
        "hour",
        "night_transaction",
        "sender_change",
        "receiver_change",
        "amount_balance_ratio",
        "large_transaction",
        "account_age_days",
        "device_trusted",
        "location_match",
        "velocity",
        "failed_login_count",
        "ip_risk_score",
    ]
]
    print(model.predict_proba(data))
    prediction = model.predict(data)[0]

    probability = model.predict_proba(data)[0][1]

    return {
        "prediction": int(prediction),
        "fraud_probability": float(probability)
    }