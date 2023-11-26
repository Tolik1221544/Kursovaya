from fastapi import FastAPI, Form
import pandas as pd
import xgboost as xgb
import numpy as np

app = FastAPI()

# Загрузка обученной модели
model = xgb.XGBRegressor(objective='reg:squarederror', random_state=42)
model.load_model('your_model_path.model')  # путь к модели

@app.post("/predict/")
def predict(
    name: str = Form(...),
    email: str = Form(...),
    theme: str = Form(...),
    phone: str = Form(...),
    comment: str = Form(...),
):
    # Преобразование входных данных в форму, подходящую для модели
    input_data = pd.DataFrame({
        'name': [name],
        'email': [email],
        'theme': [theme],
        'phone': [phone],
        'comment': [comment],
    })

    # Предсказание
    prediction = model.predict(input_data)

    # Возвращение результатов
    return {"prediction": float(prediction[0])}