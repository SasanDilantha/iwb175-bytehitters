import pandas as pd
import numpy as np
from keras.models import load_model
from classes.ShortagePrediction import ShortagePrediction
from datetime import datetime, date

DATASET = pd.read_csv('../ml/datasets/2023_shortage_dataset.csv')
MODEL = load_model('../ml/models/shortage_prediction_model.h5')

LAST_DATE_IN_TEST = pd.to_datetime('2023-12-29')
LAST_YEAR_IN_TEST = 2023
LAST_MONTH_IN_TEST = 12
LAST_DAY_IN_TEST = 29

TODAY = datetime.today()
DELTA = date(TODAY.year, TODAY.month, TODAY.day) - date(LAST_YEAR_IN_TEST, LAST_MONTH_IN_TEST, LAST_DAY_IN_TEST)
FUTURE_DAYS = DELTA.days

if FUTURE_DAYS < 365:
    FUTURE_DAYS = 365

def get_next_date_of_shortage():
    shortage_prediction = ShortagePrediction(FUTURE_DAYS)
    future_dates = shortage_prediction.generate_future_dates(pd, LAST_DATE_IN_TEST + pd.Timedelta(days=1), FUTURE_DAYS)
    future_features = shortage_prediction.generate_future_features(pd, np, DATASET, future_dates)
    future_predictions_df = shortage_prediction.generate_future_predictions(pd, MODEL, future_dates, future_features)
    next_date_of_shortage = shortage_prediction.get_next_shortage_date(TODAY.date(), future_predictions_df)
    return next_date_of_shortage