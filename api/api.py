import init_daily_power
import init_shortage_prediction
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/daily_power', methods=['POST'])
def daily_power_allocation():
    data = request.get_json()
    total_power_available = data['total_power_available'] ## UPDATE FROM DATABASE
    allocations = init_daily_power.get_daily_power_prediction(total_power_available)
    return jsonify({'allocations': allocations})


@app.route('/prediction_date', methods=['POST'])
def prediction_date():
    next_date_of_shortage = init_shortage_prediction.get_next_date_of_shortage()
    return jsonify({'prediction_date': next_date_of_shortage})

# shortage_amount