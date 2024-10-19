import joblib
import numpy as np
import pandas as pd
import datetime
from classes.DailyPower import DailyPower

DATASET = pd.read_csv('../ml/datasets/median_districts_data.csv')
MODEL = joblib.load('../ml/models/daily_power_distribution_model.pkl')

YEAR = datetime.datetime.now().year 
MONTH = datetime.datetime.now().month
DAY = datetime.datetime.now().day
MONTH_SIN = np.sin(2 * np.pi * MONTH / 12)
MONTH_COS = np.cos(2 * np.pi * MONTH / 12)
DAY_SIN = np.sin(2 * np.pi * DAY / 31)
DAY_COS = np.cos(2 * np.pi * DAY / 31)

DISTRICTS = ["Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya", "Kegalle", "Ratnapura", "Jaffna", "Kilinochchi",
    "Mullaitivu", "Mannar", "Vavuniya", "Kurunegala", "Puttalam", "Ampara", "Batticaloa", "Trincomalee", "Galle", "Matara",
    "Hambantota", "Badulla", "Monaragala", "Anuradhapura", "Polonnaruwa"]

# Weatern, Central, Sabaragamuwa, Northern, North Western, Eastern, Southern, Uva, North Central
PROVINCES_ENCODED = [8, 8, 8, 7, 7, 7, 6, 6, 5, 5, 5, 5, 5, 4, 4, 3, 3, 3, 2, 2, 2, 0, 0, 1, 1]
DISTRICTS_ENCODED = [24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

PRIMARY_ENERGY_PER_CAPITA_VALUES = DATASET['primary_energy_per_capita']
TOTAL_POWER_DEMAND_VALUES = DATASET['total_power_demand']
POPULATION_VALUES = DATASET['population']
SHORTAGE_INDICATOR_VALUES = DATASET['shortage_indicator']
RAINFALL_VALUES = DATASET['rainfall']
RURALITY_VALUES = DATASET['rurality']


def get_daily_power_prediction(TOTAL_POWER_AVAILABLE):
    daily_power = DailyPower(YEAR, MONTH, DAY, TOTAL_POWER_AVAILABLE, MONTH_SIN, MONTH_COS, DAY_SIN, DAY_COS, 
                            PROVINCES_ENCODED, DISTRICTS_ENCODED, PRIMARY_ENERGY_PER_CAPITA_VALUES, TOTAL_POWER_DEMAND_VALUES,
                            POPULATION_VALUES, SHORTAGE_INDICATOR_VALUES, RAINFALL_VALUES, RURALITY_VALUES)

    input_features_df = daily_power.prepare_input_features(np, pd)
    predicted_power_allocations = daily_power.get_predicted_power_allocations(np, MODEL, input_features_df, DISTRICTS)
    
    return predicted_power_allocations