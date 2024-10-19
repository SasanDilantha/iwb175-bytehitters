class DailyPower():
    YEAR = 2024
    MONTH = 10
    DAY = 19
    TOTAL_POWER_AVAILABLE = 0
    MONTH_SIN = 0
    MONTH_COS = 0
    DAY_SIN = 0
    DAY_COS = 0
    PROVINCES_ENCODED = []
    DISTRICTS_ENCODED = []
    PRIMARY_ENERGY_PER_CAPITA_VALUES = []
    TOTAL_POWER_DEMAND_VALUES = []
    POPULATION_VALUES = []
    SHORTAGE_INDICATOR_VALUES = []
    RAINFALL_VALUES = []
    RURALITY_VALUES = []

    def __init__(self, year, month, day, total_power_available, month_sin, month_cos, day_sin, day_cos, provinces_encoded, districts_encoded, primary_energy_per_capita_values, total_power_demand_values, population_values, shortage_indicator_values, rainfall_values, rurality_values):
        self.YEAR = year
        self.MONTH = month
        self.DAY = day
        self.TOTAL_POWER_AVAILABLE = total_power_available
        self.MONTH_SIN = month_sin
        self.MONTH_COS = month_cos
        self.PROVINCES_ENCODED = provinces_encoded
        self.DISTRICTS_ENCODED = districts_encoded
        self.DAY_SIN = day_sin
        self.DAY_COS = day_cos
        self.PRIMARY_ENERGY_PER_CAPITA_VALUES = primary_energy_per_capita_values
        self.TOTAL_POWER_DEMAND_VALUES = total_power_demand_values
        self.POPULATION_VALUES = population_values
        self.SHORTAGE_INDICATOR_VALUES = shortage_indicator_values
        self.RAINFALL_VALUES = rainfall_values
        self.RURALITY_VALUES = rurality_values

    
    def prepare_input_features(self, np, pd):
        input_features = []

        for i in range(24):
            input_features.append(np.array([self.YEAR, self.MONTH_SIN, self.MONTH_COS, self.DAY_SIN, self.DAY_COS,
                                    self.PROVINCES_ENCODED[i], self.DISTRICTS_ENCODED[i], self.PRIMARY_ENERGY_PER_CAPITA_VALUES[i],
                                    self.TOTAL_POWER_DEMAND_VALUES[i], self.POPULATION_VALUES[i], self.SHORTAGE_INDICATOR_VALUES[i],
                                    self.RAINFALL_VALUES[i], self.RURALITY_VALUES[i]]))

        input_features_df = pd.DataFrame(input_features, columns=['year', 'month_sin', 'month_cos', 'day_sin', 'day_cos', 
                                'province_encoded', 'district_encoded', 'primary_energy_per_capita', 
                                'total_power_demand', 'population', 'shortage_indicator', 'rainfall', 'rurality'])
        
        return input_features_df
    

    def get_predicted_power_allocations(self, np, model, input_features_df, districts):
        district_power_dict = {}
        predicted_power_allocations = []

        for i in range(24):
            predicted_power = model.predict(input_features_df.iloc[i].values.reshape(1, -1))
            predicted_power_allocations.append(predicted_power[0])

        # Convert the list to a numpy array
        predicted_power_allocations = np.array(predicted_power_allocations)

        # Shift the predictions to make the minimum value zero
        min_pred = np.min(predicted_power_allocations)

        # If there are negative values, shift all values up
        if min_pred < 0:
            predicted_power_allocations = predicted_power_allocations - min_pred

        # Add a small constant epsilon to avoid zero allocations
        epsilon = 0.01  # A small positive constant
        predicted_power_allocations = predicted_power_allocations + epsilon
        
        # Normalize the power allocations
        total_predicted_power = np.sum(predicted_power_allocations)
        adjusted_allocations = (predicted_power_allocations / total_predicted_power) * self.TOTAL_POWER_AVAILABLE

        for i in range(24):
            district_power_dict[districts[i]] = adjusted_allocations[i][0]

        return district_power_dict
    