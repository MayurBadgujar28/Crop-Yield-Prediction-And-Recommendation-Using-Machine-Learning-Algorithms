import React from "react";

import StateSelect from "./StateSelect";
import DistrictSelect from "./DistrictSelect";
import { Container, Typography, Button, TextField, Grid } from "@mui/material";
import { withTranslation } from "react-i18next";
import { baseUrl } from "../shared/baseUrl";

function Recommend({ t, i18n }) {
  const [state, setState] = React.useState(null);
  const [district, setDistrict] = React.useState(null);
  // const [season, setSeason] = React.useState(null);
  const [nitrogen, setNitrogen] = React.useState(null);
  const [phosphorus, setPhosphorus] = React.useState(null);
  const [potassium, setPotassium] = React.useState(null);
  const [rainfall, setRainfall] = React.useState(null);
  const [humidity, setHumidity] = React.useState(null);
  const [pH, setpH] = React.useState(null);
  const [temperature, settemperature] = React.useState(null);
  const [recommendation, setRecommendation] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [errormsg, setErrorMsg] = React.useState(null);
  const en_json = require("../assets/i18n/translations/en.json");
  const recommendCrop = () => {
    const url = baseUrl + "/recommend";
    // if state, district, crop, N, P, K and ph are not selected show error
    if (
      state === null ||
      district === null ||
      nitrogen === null ||
      phosphorus === null ||
      potassium === null ||
      pH === null
    ) {
      console.log("error");
      setError(true);
      setErrorMsg(t("Data Insufficient"));
      return;
    }
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        state: state,
        district: district,
        nitrogen: nitrogen,
        phosphorus: phosphorus,
        potassium: potassium,
        rainfall: rainfall,
        humidity: humidity,
        pH: pH,
        temperature: temperature,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        let recommendations = data.recommended_crops[0];
        if (i18n.language !== "en") {
          for (let i = 0; i < 3; i++) {
            const key = Object.keys(en_json).find(
              (key) => en_json[key] === recommendations[i]
            );
            recommendations[i] = t(key);
          }
        }
        setRecommendation(recommendations.join(", ").toString());
      });
  };
  return (
    <div>
      <Container style={{ height: "90vh", marginTop: "2%" }} maxWidth="md">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
          style={{
            paddingBottom: "20px",
            background: "white",
            background: "rgba(255, 255, 255, 0.7)",
            borderRadius: "20px",
            backdropFilter: "blur(5px)",
          }}
        >
          <Grid container item xs={12} sm={5} justifyContent="center">
            <StateSelect state={state} setState={setState} />
          </Grid>
          <Grid container item xs={12} sm={5} justifyContent="center">
            <DistrictSelect
              state={state}
              district={district}
              setDistrict={setDistrict}
            />
          </Grid>
          {/* <Grid container item xs={12} sm={5} justifyContent="center">
                        <SeasonSelect season={season} setSeason={setSeason} />
                    </Grid> */}
          <Grid container item xs={12} sm={5} justifyContent="center">
            <TextField
              id="N"
              label={t("recommend.nitrogen.label")}
              type="number"
              variant="outlined"
              style={{ width: "100%" }}
              value={nitrogen}
              onChange={(e) => setNitrogen(e.target.value)}
              required
            />
          </Grid>
          <Grid container item xs={12} sm={5} justifyContent="center">
            <TextField
              id="P"
              label={t("recommend.phosphorus.label")}
              type="number"
              variant="outlined"
              style={{ width: "100%" }}
              value={phosphorus}
              onChange={(e) => setPhosphorus(e.target.value)}
              required
            />
          </Grid>
          <Grid container item xs={12} sm={5} justifyContent="center">
            <TextField
              id="K"
              label={t("recommend.potassium.label")}
              type="number"
              fullWidth
              variant="outlined"
              style={{ width: "100%" }}
              value={potassium}
              onChange={(e) => setPotassium(e.target.value)}
              required
            />
          </Grid>
          <Grid container item xs={12} sm={5} justifyContent="center">
            <TextField
              id="ph"
              label={t("recommend.ph.label")}
              type="number"
              fullWidth
              variant="outlined"
              style={{ width: "100%" }}
              value={pH}
              onChange={(e) => setpH(e.target.value)}
              required
            />
          </Grid>
          <Grid container item xs={12} sm={5} justifyContent="center">
            <TextField
              id="temperature"
              label={t("recommend.temperature.label")}
              type="number"
              variant="outlined"
              style={{ width: "100%" }}
              value={temperature}
              onChange={(e) => settemperature(e.target.value)}
            />
          </Grid>
          <Grid container item xs={12} sm={5} justifyContent="center">
            <TextField
              id="humidity"
              label={t("recommend.humidity.label")}
              type="number"
              fullWidth
              variant="outlined"
              style={{ width: "100%" }}
              value={humidity}
              onChange={(e) => setHumidity(e.target.value)}
            />
          </Grid>
          <Grid container item xs={12} sm={5} justifyContent="center">
            <TextField
              id="rainfall"
              label={t("recommend.rainfall.label")}
              type="number"
              fullWidth
              variant="outlined"
              style={{ width: "100%" }}
              value={rainfall}
              onChange={(e) => setRainfall(e.target.value)}
            />
          </Grid>
          <Grid container item xs={12} sm={5} justifyContent="center"></Grid>
          <Grid container item xs={12} sm={5} justifyContent="center">
            <Button
              variant="contained"
              onClick={recommendCrop}
              style={{ background: "green" }}
            >
              Recommend
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
          style={{
            height: "10vh",
            marginTop: "30px",
            background: "white",
            background: "rgba(255, 255, 255, 0.8)",
            borderRadius: "15px",
            backdropFilter: "blur(5px)",
          }}
        >
          <Grid item>
            <Typography textAlign="center" style={{ color: "red" }}>
              {error ? errormsg : t("recommend.output") + ": " + recommendation}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default withTranslation()(Recommend);
