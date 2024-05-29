import React from "react";
import { withTranslation } from "react-i18next";

import { Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Container,
  Grid,
} from "@mui/material";

function Home({ t }) {
  return (
    <div>
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container
          style={{
            height: "70vh",
            marginTop: "10vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.7)",
            borderRadius: "30px",
            backdropFilter: "blur(3px)",
          }}
          maxWidth="md"
        >
          <Grid
            container
            spacing={8}
            style={{ height: "100%" }}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} sm={5}>
              <Card
                style={{
                  borderRadius: "15px",
                  boxShadow: "0px 0px 25px #FFFFFF",
                }}
              >
                <Link
                  to="/predict"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="200"
                      image="crop_yield_prediction.webp"
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {t("predict.title")}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {t("predict.description")}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
              </Card>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Card
                style={{
                  borderRadius: "15px",
                  boxShadow: "0px 0px 25px #FFFFFF",
                }}
              >
                <Link
                  to="/recommend"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="200"
                      image="crop_recommendation.jpg"
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {t("recommend.title")}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {t("recommend.description")}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </div>
  );
}

export default withTranslation()(Home);
