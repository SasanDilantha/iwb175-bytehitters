class ShortagePrediction():
    LAST_DATE_IN_TEST = "2023-12-29"
    FUTURE_DAYS = 0
    TIME_STEPS = 30
    MIN_SHORTAGE = 0.011416	* 365  # MIN (POWER DEMAND) * 365 GWh
    MAX_SHORTAGE = 7.623288	* 365  # MAX (POWER DEMAND) * 365 GWh

    def __init__(self, future_days):
        self.FUTURE_DAYS = future_days


    def generate_future_dates(self, pd, start_date, num_days):
        future_dates = pd.date_range(start=start_date, periods=num_days, freq='D')
        return future_dates
    

    def generate_future_features(self, pd, np, df, future_dates):
        recent_data = df.iloc[-self.TIME_STEPS:].copy()

        # Initialize an empty dataframe for future features
        future_df = pd.DataFrame()

        # Iterate through future_dates and create new rows
        for date in future_dates:
            # Create a new row for the future date
            new_row = {
                'year': date.year,
                'month': date.month,
                'day': date.day,
                'month_sin': np.sin(2 * np.pi * date.month / 12),
                'month_cos': np.cos(2 * np.pi * date.month / 12),
                'day_sin': np.sin(2 * np.pi * date.day / 31),
                'day_cos': np.cos(2 * np.pi * date.day / 31),
                'primary_energy_per_capita': recent_data['primary_energy_per_capita'].mean(),
                'total_power_demand': recent_data['total_power_demand'].mean(),
                'population': int(recent_data['population'].mean()),
                'rainfall': recent_data['rainfall'].mean(),
                'power_distributed': recent_data['power_distributed'].mean()
            }
            
            # Append new row to the future_df
            future_df = pd.concat([future_df, pd.DataFrame([new_row])], ignore_index=True)

            # Append this new row to recent_data to maintain a rolling window of 'time_steps'
            recent_data = pd.concat([recent_data, pd.DataFrame([new_row])], ignore_index=True)
            recent_data = recent_data.iloc[-self.TIME_STEPS:]  # Keep only the most recent 'time_steps' rows

        return future_df
    

    def generate_future_predictions(self, pd, model, future_dates, future_features):
        future_predictions = []

        # Iterate through future days and predict using the loaded model
        for i in range(len(future_features) - self.TIME_STEPS):
            # Extract the last 'time_steps' days of features
            X_future = future_features.iloc[i: i+self.TIME_STEPS].values.reshape(1, self.TIME_STEPS, -1)
            
            # Make a prediction for the next day using the loaded model
            future_pred = model.predict(X_future)
            shortage_pred = (future_pred > 0.28).astype(int)  # Convert to binary (1 = shortage)
            
            # Store the prediction with the date
            future_predictions.append({
                'date': future_dates[i + self.TIME_STEPS],
                'predicted_shortage': shortage_pred.flatten()[0]
            })

        # Convert future predictions to a dataframe for easy analysis
        future_predictions_df = pd.DataFrame(future_predictions)
        return future_predictions_df
    

    def get_next_shortage_date(self, today, future_predictions_df):
        try:
            next_date = future_predictions_df['date'][future_predictions_df['date'] > str(today)][future_predictions_df['predicted_shortage'] == 1].tail(5).iloc[0].date()
            return next_date
            
        except:
            return "No shortage predicted"
        

    def estimate_shortage_amount(self, prob, min_shortage, max_shortage):
        return min_shortage + prob * (max_shortage - min_shortage)


    def get_shortage_amount(self, future_predictions_df):
        future_predictions_df['estimated_shortage_amount'] = future_predictions_df['predicted_shortage'].apply(
            lambda prob: self.estimate_shortage_amount(prob, self.MAX_SHORTAGE, self.MAX_SHORTAGE))
        
        return future_predictions_df[['estimated_shortage_amount']].iloc[1].values[0]

