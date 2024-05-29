import * as React from "react";

import { Autocomplete, TextField } from "@mui/material";
import { withTranslation } from "react-i18next";

function StateSelect({ state, setState, t, i18n }) {
  const [localState, setLocalState] = React.useState(null);

  const states = [
    t("state.andman"),
    t("state.andhra"),
    t("state.arunachal"),
    t("state.assam"),
    t("state.bihar"),
    t("state.chandigarh"),
    t("state.chhattisgarh"),
    t("state.dadra"),
    t("state.goa"),
    t("state.gujarat"),
    t("state.haryana"),
    t("state.himachal"),
    t("state.jammu"),
    t("state.jharkhand"),
    t("state.karnataka"),
    t("state.kerala"),
    t("state.madhya"),
    t("state.maharashtra"),
    t("state.manipur"),
    t("state.meghalaya"),
    t("state.mizoram"),
    t("state.nagaland"),
    t("state.odisha"),
    t("state.punjab"),
    t("state.rajasthan"),
    t("state.sikkim"),
    t("state.tamil"),
    t("state.telangana"),
    t("state.tripura"),
    t("state.uttarpradesh"),
    t("state.uttarakhand"),
    t("state.westbengal"),
  ];
  const mr_json = require("../assets/i18n/translations/mr.json");

  const handleChange = (value) => {
    if (i18n.language === "mr") {
      const key = Object.keys(mr_json).find((key) => mr_json[key] === value);
      setState(t(key, { lng: "en" }));
    } else {
      setState(value);
    }
    setLocalState(value);
  };
  return (
    <Autocomplete
      id="states-autocomplete"
      options={states}
      sx={{ width: "100%" }}
      renderInput={(params) => (
        <TextField {...params} label={t("predict.state.label")} required />
      )}
      value={localState || null}
      onChange={(event, value) => handleChange(value)}
      getOptionLabel={(option) => (option ? option : "")}
      style={{ display: "inline-block" }}
    />
  );
}

// const states = ['Andaman and Nicobar Islands', 'Andhra Pradesh',
//        'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh',
//        'Chhattisgarh', 'Dadra and Nagar Haveli', 'Goa', 'Gujarat',
//        'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir ', 'Jharkhand',
//        'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
//        'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry',
//        'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana ',
//        'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];

export default withTranslation()(StateSelect);
