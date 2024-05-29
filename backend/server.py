from flask import Flask, request, jsonify
from flask_cors import CORS
import util
app = Flask(__name__)
CORS(app)
@app.route('/')
def home():
    return 'working'

@app.route('/predict',  methods=['POST'])
def crop_yield_prediction():
    # get data from the body of the request
    data = request.json
    # print(data)
    state = data['state']
    district = data['district']
    crop = data['crop']
    season = data['season']
    
    # print(state, district, crop, season)
    if data['rainfall'] == None or data['rainfall'] == "":
        print("Getting rainfall")
        rainfall = util.get_rainfall(state, district)
        print(rainfall, type(rainfall))
    else:
        rainfall = float(data['rainfall'])
    # rainfall = float(data['rainfall']) if data['rainfall'] != "" else util.get_rainfall(state, district)
    #rainfall = float(data['rainfall']) if data['rainfall'] is not None else util.get_rainfall(state, district)
    crop_yield = util.get_estimated_yield(state, district, crop, season, rainfall)
    # print(crop_yield)
    response = jsonify({
        'estimated_yield': crop_yield
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/recommend', methods=['POST'])
def crop_recommend():
    data = request.json
    # print(data)
    
    n = float(data['nitrogen'])
    p = float(data['phosphorus'])
    k = float(data['potassium'])
    ph = float(data['pH'])
    state = data['state']
    district = data['district']

    if data['humidity'] == None or data['humidity'] == "":
        print("Getting humidity")
        humidity = util.get_humidity(state, district)
    else:
        humidity = float(data['humidity'])

    if data['temperature'] == None or data['temperature'] == "":
        print("Getting temperature")
        temperature = util.get_temperature(state, district)
    else:
        temperature = float(data['temperature'])

    if data['rainfall'] == None or data['rainfall'] == "":
        print("Getting rainfall")
        rainfall = util.get_rainfall(state, district)
    else:
        rainfall = float(data['rainfall'])

    # humidity = float(data['humidity']) if 'humidity' in data.keys() else util.get_humidity(state, district)
    # temperature = float(data['temperature']) if 'temperature' in data.keys() else util.get_temperature(state, district)
    # rainfall = float(data['rainfall']) if 'rainfall' in data.keys() else util.get_rainfall(state, district)
    print(n,p,k,ph,humidity,temperature,rainfall)
    response = jsonify({
        'recommended_crops': util.recommend_crop(state, district, n, p, k, temperature, humidity, ph, rainfall).tolist()
    })

    response.headers.add('Access-Control-Allow-Origin', '*')

    return response
# def crop_recommend():
#     data = request.json
#     # print(data)
    
#     n = float(data['nitrogen'])
#     p = float(data['phosphorus'])
#     k = float(data['potassium'])
#     ph = float(data['pH'])
#     state = data['state']
#     district = data['district']
#     humidity = float(data['humidity']) if 'humidity' in data.keys() else util.get_humidity(state, district)
#     temperature = float(data['temperature']) if 'temperature' in data.keys() else util.get_temperature(state, district)
#     rainfall = float(data['rainfall']) if 'rainfall' in data.keys() else util.get_rainfall(state, district)

#     response = jsonify({
#         'recommended_crops': util.recommend_crop(state, district, n, p, k, temperature, humidity, ph, rainfall).tolist()
#     })

#     response.headers.add('Access-Control-Allow-Origin', '*')

#     return response


if __name__ == "__main__":
    print("Starting python Flask Server For Crop Yield Prediction & Recommendation...")
    app.run()
