import os
import pickle
import joblib
import pandas as pd
import json
import settings
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn import svm
from sklearn.gaussian_process import GaussianProcessClassifier
from sklearn.gaussian_process.kernels import RBF
import pickle
def get_data():
    crop_recommendation_train = pd.read_csv(os.path.join('processed', 'crop_recommendation_train.csv'), sep=',')
    crop_recommendation_test = pd.read_csv(os.path.join('processed', 'crop_recommendation_test.csv'), sep=',')
    return [crop_recommendation_train, crop_recommendation_test]

if __name__ == '__main__':
    [crop_recommendation_train, crop_recommendation_test] = get_data()
    
    x_train = crop_recommendation_train.drop(labels=['label'], axis=1)
    x_test = crop_recommendation_test.drop(labels=['label'], axis=1)
    
    y_train = crop_recommendation_train['label']
    y_test = crop_recommendation_test['label']
       
    
    # Random Forest Classifier model
    rfc_model = RandomForestClassifier(n_estimators=30, max_depth=10)
    rfc_model.fit(x_train, y_train)
    rfc_model.feature_names = list(x_train.columns.values)
    columns = {
        'data_columns' : [col for col in x_train.columns]
    }
    with open(os.path.join(settings.BACKEND_DIR,'recommendation_columns.json'), 'w') as f:
        f.write(json.dumps(columns))

    with open(os.path.join(settings.BACKEND_DIR,'crop_recommendation_rfc.pickle'), 'wb') as f:
        pickle.dump(rfc_model, f)