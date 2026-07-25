import api from "./api";

const AI = "/ai";

// Fraud Prediction

export const predictFraud = async (transaction) => {
  const response = await api.post(
    `${AI}/predict`,
    transaction
  );

  return response.data;
};

// Prediction History

export const getPredictionHistory = async () => {
  const response = await api.get(
    `${AI}/history`
  );

  return response.data;
};

// AI Health Check

export const checkAIStatus = async () => {
  const response = await api.get(
    `${AI}/health`
  );

  return response.data;
};