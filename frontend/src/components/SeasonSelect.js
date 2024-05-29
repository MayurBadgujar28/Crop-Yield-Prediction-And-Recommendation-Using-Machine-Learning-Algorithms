import * as React from 'react';

import { Autocomplete, TextField } from '@mui/material';
import { withTranslation } from 'react-i18next';

function SeasonSelect({ season, setSeason, t, i18n }) {
  const [localSeason, setLocalSeason] = React.useState(null);
  const seasons = [t('season.winter'), t('season.summer'), t('season.kharif'), t('season.rabi'), t('season.autumn'), t('season.wholeyear')];
  const mr_json = require('../assets/i18n/translations/mr.json');
  const handleChange = (value) => {
    if (i18n.language !== 'en') {
      const key = Object.keys(mr_json).find(key => mr_json[key] === value);
      setSeason(t(key, {lng:'en'}));
      
    }
    else {
      setSeason(value);
    }
    setLocalSeason(value);
  }
  return (
    <Autocomplete
      id="seasons-autocomplete"
      options={seasons}
      sx={{ width: '100%'}}
      renderInput={(params) => <TextField {...params} label={t('predict.season.label')} required/>}
      value={localSeason || null}
      onChange={(event, value) =>handleChange(value)}
      getOptionLabel={(option)=>option?option:""}
      style={{display:'inline-block'}}
    />
  );
}

// const seasons = ['Autumn', 'Summer', 'Winter', 'Kharif', 'Rabi', 'WholeYear'];

export default withTranslation()(SeasonSelect);