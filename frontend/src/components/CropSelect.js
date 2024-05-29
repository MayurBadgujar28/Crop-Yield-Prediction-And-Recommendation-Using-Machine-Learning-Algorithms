import * as React from 'react';

import { Autocomplete, TextField } from '@mui/material';
import { withTranslation } from 'react-i18next';

function CropSelect({ crop, setCrop, t, i18n }) {
  const [localCrop, setLocalCrop] = React.useState('');
  const crops = [t('crop.maize'), t('crop.wheat'), t('crop.barley'), t('crop.arecanut'), t('crop.rice'), t('crop.banana'), t('crop.cashewnut'), t('crop.coconut'), t('crop.sugarcane'), t('crop.sweetpotato'), t('crop.tapioca'), t('crop.blackpepper'), t('crop.drychillies'), t('crop.turmeric'), t('crop.moong'), t('crop.urad'), t('crop.arhar'), t('crop.groundnut'), t('crop.sunflower'), t('crop.bajra'), t('crop.castorseed'), t('crop.cotton'), t('crop.horsegram'), t('crop.jowar'), t('crop.korra'), t('crop.ragi'), t('crop.gram'), t('crop.sesamum'), t('crop.masoor'), t('crop.linseed'), t('crop.safflower'), t('crop.onion'), t('crop.rapeseed'), t('crop.smallmillets'), t('crop.coriander'), t('crop.potato'), t('crop.mesta'), t('crop.nigerseed'), t('crop.soyabean'), t('crop.beans'), t('crop.bhindi'), t('crop.brinjal'), t('crop.grapes'), t('crop.tomato'), t('crop.cabbage'), t('crop.garlic'), t('crop.cowpea'), t('crop.paddy'), t('crop.oilseeds'), t('crop.jute'), t('crop.peas'), t('crop.sannhamp'), t('crop.khesari'), t('crop.moth'), t('crop.guarseed'), t('crop.cardamom'), t('crop.drumstick'), t('crop.cauliflower')];
  const mr_json = require('../assets/i18n/translations/mr.json');
  const handleChange = (value) => {
    if (i18n.language !== 'en') {
      const key = Object.keys(mr_json).find(key => mr_json[key] === value);
      setCrop(t(key, {lng:'en'}));
      
    }
    else {
      setCrop(value);
    }
    setLocalCrop(value);
  }
  return (
    <Autocomplete
      id="crops-autocomplete"
      options={crops}
      sx={{ width: '100%'}}
      renderInput={(params) => <TextField {...params} label={t('predict.crop.label')} required/>}
      value={localCrop || null}
      onChange={(event, value) => handleChange(value)}
      getOptionLabel={(option)=>option?option:""}
      style={{display:'inline-block'}}
    />
  );
}

// const crops =  ['Beans & Mutter(Vegetable)', 'Cabbage', 'Drum Stick', 'Pulses total', 'Cauliflower', 'Total foodgrain', 'Bhindi', 'Tomato', 'Ginger', 'Orange', 'Pome Fruit', 'Citrus Fruit', 'Pineapple', 'Brinjal', 'Other Cereals & Millets', 'Other Vegetables', 'Cardamom', 'Mango', 'Other Fresh Fruits', 'Cowpea(Lobia)', 'Papaya', 'Moth', 'other oilseeds', 'Paddy', 'Guar seed', 'Safflower', 'Cashewnut', 'Black pepper', 'Khesari', 'Jute', 'Arecanut', 'Coconut ', 'Niger seed', 'Mesta', 'Tapioca', 'Sannhamp', 'Tobacco', 'Soyabean', 'Castor seed', 'Other  Rabi pulses', 'Dry ginger', 'Other Kharif pulses', 'Garlic', 'Banana', 'Coriander', 'Cotton(lint)', 'Horse-gram', 'Bajra', 'Ragi', 'Turmeric', 'Barley', 'Masoor', 'Sunflower', 'Linseed', 'Small millets', 'Sweet potato', 'Peas & beans (Pulses)', 'Jowar', 'Dry chillies', 'Onion', 'Gram', 'Potato', 'Groundnut', 'Arhar/Tur', 'Wheat', 'Sugarcane', 'Rapeseed &Mustard', 'Sesamum', 'Urad', 'Moong(Green Gram)', 'Maize', 'Rice']

export default withTranslation()(CropSelect);