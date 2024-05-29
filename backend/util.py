from os import access
import pickle
import json
import numpy as np
import pandas as pd
import joblib
from secret import *
from config import *
import requests

__locations = None
__data_columns_yield = None
__data_columns_recommend = None
__yield_model = None
__recommend_model = None


print("loading saved arifacts...start")
with open("yield_columns.json", 'r') as f:
    __data_columns_yield = json.load(f)['data_columns']
with open("recommendation_columns.json", 'r') as f:
    __data_columns_recommend = json.load(f)['data_columns']
with open("crop_yield_prediction_rfr_model.pickle", 'rb') as f:
    __yield_model = pickle.load(f)
with open("crop_recommendation_rfc.pickle", 'rb') as f:
    __recommend_model = pickle.load(f)

# Crop recommendation feature scalers
N_scaler = joblib.load('recommendation_N_scaler.joblib')
P_scaler = joblib.load('recommendation_P_scaler.joblib')
K_scaler = joblib.load('recommendation_K_scaler.joblib')
temperature_scaler = joblib.load('recommendation_temperature_scaler.joblib')
humidity_scaler = joblib.load('recommendation_humidity_scaler.joblib')
ph_scaler = joblib.load('recommendation_ph_scaler.joblib')
rainfall_scaler = joblib.load('recommendation_rainfall_scaler.joblib')

# Crop yield predictions feature encoder and scaler
le_state = joblib.load('state_encoder.joblib')
le_crop = joblib.load('crop_encoder.joblib')
rainfall_scaler = joblib.load('yield_rainfall_scaler.joblib')

print("Loading saved artifacts...done")
# def get_token():
#     res = requests.post(GEOCODING_AUTH_API_URL, data={'grant_type': "client_credentials", 'client_id': CLIENT_ID, 'client_secret': CLIENT_SECRET})
#     res = res.json()

#     access_token = res['access_token']
#     token_type = res['token_type']
#     return [access_token, token_type]
#     https://api.openweathermap.org/geo/1.0/direct?q=Ahmednagar,%20Maharashtra&appid=f820b625b0c3df6187913094b1fb761b

def get_daily_weather(state, district):
    url = GEOCODING_API_URL + "?q=" + district + ", " + state + "&appid=" + WEATHER_API_KEY
    res = requests.get(url)
    res = res.json()
    print(res)
    #res = requests.get(GEOCODING_API_URL, params={'q': f'{district}, {state}', 'appid':WEATHER_API_KEY})
    latitude = res[0]['lat']
    longitude = res[0]['lon']
    res = requests.get(WEATHER_API_URL, params={'lat': latitude, 'lon': longitude, 'units': 'metric', 'appid': WEATHER_API_KEY, 'exclude': 'current, minutely,hourly,alerts'})
    res = res.json()
    print(res)
    return res['daily']

def get_rainfall(state, district):
    daily_weather = get_daily_weather(state, district)
    rain = 0
    for weather in daily_weather:
        if weather['weather'][0]['main'] == "Rain":
            rain += weather['rain']
           
    return rain

def get_temperature(state, district):
    daily_weather = get_daily_weather(state, district)
    temp = 0
    for weather in daily_weather:
        temp += (weather['temp']['min'] + weather['temp']['max']) / 2
    
    temp /= len(daily_weather)
    return temp
    
def get_humidity(state, district):
    daily_weather = get_daily_weather(state, district)
    humidity = 0
    for weather in daily_weather:
        humidity += weather['humidity']
    
    humidity /= len(daily_weather)
    return humidity

def get_estimated_yield(state, district, crop, season, rainfall):
    # load_served_artifacts()
    global __data_columns_yield
    global __yield_model


    state = le_state.transform([state])[0]
    crop = le_crop.transform([crop])[0]
    rainfall = rainfall_scaler.transform(np.array([rainfall]).reshape(-1,1))[0]
    
    data = [[state, crop, rainfall, 1 if season == 'Autumn' else 0, 1 if season == 'Kharif' else 0, 1 if season == 'Rabi' else 0, 1 if season == 'Summer' else 0, 1 if season == 'Whole Year' else 0, 1 if season == 'Winter' else 0 ]]

    df = pd.DataFrame(data, columns=__yield_model.feature_names)
    
    return round(__yield_model.predict(df)[0], 2)
    

def recommend_crop(State, District, N, P, K, temperature, humidity, ph, rainfall):
    # load_served_artifacts()
    global __data_columns_recommend
    global __recommend_model
    
    N = N_scaler.transform(np.array([N]).reshape(-1,1))
    P = P_scaler.transform(np.array([P]).reshape(-1,1))
    K = K_scaler.transform(np.array([K]).reshape(-1,1))
    temperature = temperature_scaler.transform(np.array([temperature]).reshape(-1,1))
    humidity = humidity_scaler.transform(np.array([humidity]).reshape(-1,1))
    ph = ph_scaler.transform(np.array([ph]).reshape(-1,1))
    rainfall = rainfall_scaler.transform(np.array([rainfall]).reshape(-1,1))

    data = [[N, P, K, temperature, humidity, ph, rainfall]]
    df = pd.DataFrame(data, columns=__recommend_model.feature_names)
    predictions = __recommend_model.classes_[np.argsort(__recommend_model.predict_proba(df))[:, :-3 - 1:-1]]

    return predictions


def load_served_artifacts():
    print("loading saved arifacts...start")
    global __data_columns_recommend
    global __data_columns_yield
    global __locations
    global __yield_model
    global __recommend_model
    with open("yield_columns.json", 'r') as f:
        __data_columns_yield = json.load(f)['data_columns']
    with open("recommendation_columns.json", 'r') as f:
        __data_columns_recommend = json.load(f)['data_columns']
    with open("crop_yield_prediction_rfr_model.pickle", 'rb') as f:
        __yield_model = pickle.load(f)
    with open("crop_recommendation_rfc.pickle", 'rb') as f:
        __recommend_model = pickle.load(f)
    print("Loading saved artifacts...done")


if __name__ == "__main__":
    
    # print(get_estimated_yield("Assam", "BAKSA", "Rice", "kharif", 1366.7))
    print(recommend_crop("state", "district", 71, 54, 16, 22.61, 63, 5.74, 202.935536))
    # print(get_humidity("Maharashtra", "Pune"))