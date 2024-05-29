import os
import settings
import pandas as pd

SUBDIVISION_DISTRICTS = {
    "Uttar Pradesh" : {
        "EAST UTTAR PRADESH": ['AMETHI', 'BAHRAICH', 'GONDA', 'BASTI', 'GORAKHPUR', 'DEORIA', 'BALLIA', 'AZAMGARH', 'FAIZABAD', 'SULTANPUR', 'JAUNPUR', 'GHAZIPUR', 'VARANASI', 'MIRZAPUR', 'ALLAHABAD', 'PRATAPGARH', 'SANT KABEER NAGAR', 'BARABANKI', 'AMBEDKAR NAGAR', 'MAHRAJGANJ', 'KUSHI NAGAR', 'CHANDAULI', 'BALRAMPUR', 'SANT RAVIDAS NAGAR', 'KAUSHAMBI', 'MAU', 'DEORIA', 'SHRAVASTI', 'GORAKHPUR', 'BUDAUN', 'HARDOI', 'JALAUN', 'KANNAUJ', 'KHERI', 'SITAPUR'], 
        "WEST UTTARR PRADESH": ['MEERUT', 'BULANDSHAHR', 'GAUTAM BUDDHA NAGAR', 'GHAZIABAD', 'HAPUR', 'BAGHPAT', 'SAHARANPUR', 'MUZAFFARNAGAR', 'SHAMLI', 'MORADABAD', 'BIJNOR', 'RAMPUR', 'AMROHA', 'SAMBHAL', 'RAE BARELI', 'BAREILLY', 'PILIBHIT', 'SHAHJAHANPUR', 'AGRA', 'FIROZABAD', 'MAINPURI', 'MATHURA', 'ALIGARH', 'ETAH', 'HATHRAS', 'KASGANJ', 'ETAWAH', 'AURAIYA', 'FARRUKHABAD', 'UNNAO', 'BANDA', 'CHITRAKOOT', 'FATEHPUR', 'HAMIRPUR', 'JHANSI', 'KANPUR DEHAT', 'KANPUR NAGAR', 'LALITPUR', 'LUCKNOW', 'MAHARAJGANJ', 'MAHOBA', 'SIDDHARTH NAGAR', 'SONBHADRA']
    },
    "Madhya Pradesh"     : {
        "WEST MADHYA PRADESH": ['ALIRAJPUR', 'BARWANI', 'BURHANPUR', 'INDORE', 'DHAR', 'JHABUA', 'KHANDWA', 'KHARGONE', 'AGAR MALWA', 'DEWAS', 'MANDSAUR', 'NEEMUCH', 'RATLAM', 'SHAJAPUR', 'UJJAIN', 'GWALIOR', 'ASHOKNAGAR', 'SHIVPURI', 'DATIA', 'GUNA', 'BETUL', 'HARDA', 'NARMADAPURAM', 'BHOPAL', 'RAISEN', 'RAJGARH', 'SEHORE', 'VIDISHA', 'MORENA', 'SHEOPUR', 'BHIND'],
        "EAST MADHYA PRADESH": ['REWA', 'SATNA', 'SIDHI', 'SINGRAULI', 'CHHATARPUR', 'DAMOH', 'PANNA', 'SAGAR', 'TIKAMGARH', 'NIWARI', 'ANUPPUR', 'SHAHDOL', 'UMARIA', 'BALAGHAT', 'CHHINDWARA', 'JABALPUR', 'KATNI', 'MANDLA', 'NARSINGHPUR', 'SEONI', 'DINDORI', 'HOSHANGABAD']
    },
    "Rajasthan": {
        "EAST RAJASTHAN": ['TONK', 'BUNDI', 'AJMER', 'SAWAI MADHOPUR', 'BHILWARA', 'CHITTORGARH', 'KOTA', 'BHARATPUR', 'JAIPUR', 'RAJSAMAND', 'UDAIPUR', 'ALWAR', 'DUNGARPUR', 'BARAN', 'DHOLPUR', 'BHILWARA', 'DAUSA', 'JHALAWAR', 'KARAUH', 'BANSWARA', 'KARAULI', 'PRATAPGARH'],
        "WEST RAJASTHAN": ['HANUMANGARH', 'SRIGANGANAGAR', 'BIKANER', 'JAISALMER', 'BARMER', 'JALORE', 'SIROHI', 'PALI', 'JODHPUR', 'NAGAUR', 'CHURU', 'SIKAR', 'JHUNJHUNU', 'GANGANAGAR', 'MORENA', 'SHEOPUR', 'BHIND']
    },
    "Karnataka": {
        "COASTAL KARNATAKA": ['UDUPI', 'DAKSHIN KANNAD', 'UTTAR KANNAD'],
        "NORTH INTERIOR KARNATAKA": ['BAGALKOT', 'BELGAUM', 'BELLARY', 'BIDAR', 'BIJAPUR', 'DHARWAD', 'GADAG', 'GULBARGA', 'HAVERI', 'KOPPAL', 'RAICHUR', 'YADGIR'],
        "SOUTH INTERIOR KARNATAKA": ['BANGALORE RURAL', 'BENGALURU RURAL', 'BENGALURU URBAN', 'BELLARY', 'CHIKMAGALUR', 'CHITRADURGA', 'KODAGU', 'HASSAN', 'KOLAR', 'MYSORE', 'CHAMARAJANAGAR', 'SHIMOGA', 'TUMKUR', 'RAMANAGARA', 'MANDYA', 'DAVANGERE', 'CHIKBALLAPUR']
    },
    "Maharashtra": {
        'KONKAN AND GOA': ['PALGHAR', 'THANE', 'MUMBAI SUBURBAN', 'MUMBAI CITY', 'RAIGAD', 'RATNAGIRI', 'SINDHUDURG', 'MUMBAI'],
        'MADHYA MAHARASHTRA': ['AHMEDNAGAR', 'DHULE', 'JALGAON', 'KOLHAPUR', 'NANDURBAR', 'NASHIK', 'PUNE', 'SANGLI', 'SATARA', 'SOLAPUR'],
        'MATATHWADA': ['AURANGABAD', 'BEED', 'JALNA', 'PARBHANI', 'OSMANABAD', 'LATUR', 'NANDED', 'HINGOLI'],
        'VIDARBHA': ['BULDHANA', 'AKOLA', 'WASHIM', 'AMRAVATI', 'YAVATMAL', 'WARDHA', 'NAGPUR', 'CHANDRAPUR', 'GADCHIROLI', 'GONDIA', 'BHANDARA']
    },
    "Andhra Pradesh": {
        'COASTAL ANDHRA PRADESH': ['SRIKAKULAM', 'VIZIANAGARAM', 'VISHAKHAPATNAM', 'EAST GODAVARI', 'WEST GODAVARI', 'MACHILIPATNAM',
                                    'GUNTUR', 'PRAKASAM', 'SANDHI', 'SPSR NELLORE', 'KRISHNA', 'VISAKHAPATANAM'],
        'RAYALSEEMA': ['ANANTAPUR', 'CHITTOOR', 'KADAPA', 'KURNOOL']
    },
    "Gujarat": {
        'GUJARAT REGION': ['AHMADABAD', 'ANAND', 'BHARUCH', 'CHHOTA UDAIPUR', 'DAHOD', 'KHEDA', 'MAHISAGAR', 'PANCHMAHAL',
                            'DANG', 'NAVSARI', 'SURAT', 'NARMADA', 'BHARUCH', 'VADODARA', 'TAPI', 'VALSAD',
                            'MAHESANA', 'DADRA AND NAGAR HAVELI', 'PATAN', 'GANDHINAGAR', 'BANAS KANTHA', 'DOHAD', 'PANCH MAHALS', 'SABAR KANTHA'],
        'SAURASHTRA AND KUTCH': ['KACHCHH', 'DEVBHOOMI DWARKA', 'JAMNAGAR', 'MORBI', 'RAJKOT', 'PORBANDAR', 'JUNAGADH', 'GIR SOMNATH',
                                 'AMRELI', 'BHAVNAGAR', 'BOTAD', 'SURENDRANAGAR']
    },
    'West Bengal': {
        'GANGETIC WEST BENGAL': ['BANKURA', 'PASCHIM BARDHAMAN', 'PURBA BARDHAMAN', 'BIRBHUM', 'PURULIA', 'MURSHIDABAD', 'NADIA', 'WEST MIDNAPORE',
                                 'JHARGRAM', 'EAST MIDNAPORE', 'HOOGHLY', 'HOWRAH', 'KOLKATA', 'NORTH 24 PARGANAS', 'SOUTH 24 PARGANAS', '24 PARAGANAS NORTH', '24 PARAGANAS SOUTH',
                                 'BARDHAMAN', 'DINAJPUR DAKSHIN', 'DINAJPUR UTTAR', 'MALDAH', 'MEDINIPUR EAST', 'MEDINIPUR WEST'],
        'SUB HIMALAYAN WEST BENGAL AND SIKKIM': ['DARJEELING', 'JALPAIGURI', 'COOCHBEHAR']
    }
}


SUBDIVISION_STATES = {
    "Andaman and Nicobar Islands" : "ANDAMAN & NICOBAR ISLANDS",
    "Arunachal Pradesh" : "ARUNACHAL PRADESH",
    "Assam": "ASSAM & MEGHALAYA",
    "Meghalaya": "ASSAM & MEGHALAYA",
    "Nagaland": "NAGA MANI MIZO TRIPURA",
    "Manipur": "NAGA MANI MIZO TRIPURA" ,
    "Mizoram" : "NAGA MANI MIZO TRIPURA",
    "Tripura": "NAGA MANI MIZO TRIPURA",
    "Sikkim": "SUB HIMALAYAN WEST BENGAL & SIKKIM",
    "Odisha": "ORISSA",
    "Jharkhand": "JHARKHAND",
    "Bihar": "BIHAR",
    "Uttarakhand": "UTTARAKHAND",
    "Haryana": "HARYANA DELHI & CHANDIGARH",
    "Chandigarh": "HARYANA DELHI & CHANDIGARH",
    "Punjab": "PUNJAB",
    "Himachal Pradesh": "HIMACHAL PRADESH",
    "Jammu & Kashmir" : "JAMMU & KASHMIR",
    "Jammu and Kashmir " : "JAMMU & KASHMIR",
    "Dadra and Nagar Haveli": "GUJARAT REGION",
    "Goa": "KONKAN & GOA",
    "Chhattisgarh": "CHHATTISGARH",
    "Puducherry": "COASTAL ANDHRA PRADESH",
    "Telangana ": "TELANGANA",
    "Tamil Nadu": "TAMIL NADU",
    "Kerala": "KERALA" 
}

def getSubDivision(x):
    district = x['District']
    state = x['State']

    if state in SUBDIVISION_STATES:
        return SUBDIVISION_STATES[state]

    if state in SUBDIVISION_DISTRICTS:
        for subdivision in SUBDIVISION_DISTRICTS[state]:
            if district in SUBDIVISION_DISTRICTS[state][subdivision]:
                return subdivision
    return None


def prepare_rainfall_data():
    # convert temperature to season wise
    data = pd.read_csv(os.path.join(settings.DATA_DIR,
                                    settings.RAINFALL_DATA), sep=",", header="infer")
    data = data[data['YEAR'] > 1996]
    data = data[data['YEAR'] < 2015]

    data['Kharif'] = data[['JUL', 'AUG', 'SEP', 'OCT', 'NOV']].sum(axis=1)
    data['Rabi'] = data[['JAN', 'FEB', 'MAR', 'APR', 'MAY']].sum(axis=1)
    data['WholeYear'] = data['ANNUAL']
    data['Autumn'] = data[['OCT','NOV','DEC']].sum(axis=1)
    data['Summer'] = data[['MAY','JUN','JUL']].sum(axis=1)
    data['Winter'] = data[['JAN','FEB','MAR']].sum(axis=1)

    data = data.drop(labels=['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG',
                             'SEP', 'OCT', 'NOV', 'DEC', 'Jan-Feb', 'Mar-May', 'Jun-Sep', 'Oct-Dec', 'ANNUAL'], axis=1)
    data.rename(columns={'SUBDIVISION': 'Subdivision',
                         'YEAR': 'Year'}, inplace=True)
    return data

def prepare_crop_production_data():
    # get crop production data
    data = pd.read_csv(os.path.join(settings.DATA_DIR,
                                    settings.CROP_PRODUCTION_DATA), sep=",", header="infer")
    data.rename(columns={'State_Name': 'State',
                         'District_Name': 'District', 'Crop_Year': 'Year'}, inplace=True)
    return data


def prepare_crop_recommendation_data():
    # get crop recommendation data
    data = pd.read_csv(os.path.join(
        settings.DATA_DIR, settings.CROP_RECOMMENDATION_DATA), sep=",", header="infer")
    return data



def merge(crop_production_data, rainfall_data):
    # merge two crop production and rainfall dataset on attribute state & year

    crop_production_data['Subdivision'] = crop_production_data.apply(lambda x : getSubDivision(x), axis=1 )
    data = pd.merge(crop_production_data, rainfall_data,
                    how='inner', on=['Subdivision', 'Year'])

    data['Rainfall'] = data.apply(lambda x : x[x['Season'].replace(" ", "")], axis=1)
    data = data.drop(labels=['Autumn', 'Summer', 'Winter', 'Kharif', 'Rabi', 'WholeYear'], axis=1)
    return data


if __name__ == "__main__":
    rainfall_data = prepare_rainfall_data()
    crop_production_data = prepare_crop_production_data()
    crop_recommendation_data = prepare_crop_recommendation_data()
    

    crop_yield_prediction_data = merge(crop_production_data, rainfall_data)



    # store dataset for future use 
    crop_yield_prediction_data.to_csv(os.path.join(settings.PROCESSED_DIR, "crop_production.csv"), sep=",", index=False)
    crop_recommendation_data.to_csv(os.path.join(settings.PROCESSED_DIR, "crop_recommendation.csv"), sep=",", index=False)

