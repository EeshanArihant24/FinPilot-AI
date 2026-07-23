from pydantic import BaseModel

class Transaction(BaseModel):
    step: int
    type: str
    amount: float
    oldbalanceOrg: float
    newbalanceOrig: float
    oldbalanceDest: float
    newbalanceDest: float
    device_trusted: int
    location_match: int
    velocity: int
    failed_login_count: int
    ip_risk_score: float
    account_age_days: int
    hour: int