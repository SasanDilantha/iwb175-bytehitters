import init_daily_power
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/daily_power', methods=['POST'])
def daily_power_allocation():
    data = request.get_json()
    total_power_available = data['total_power_available'] ## UPDATE FROM DATABASE
    allocations = init_daily_power.get_daily_power_prediction(total_power_available)
    return jsonify({'allocations': allocations})