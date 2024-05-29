import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";

function LanguageMenu() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(t("language.en"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(t(`language.${lng}`));
    handleClose();
  };
  return (
    <div
      style={{
        marginLeft: "10px",
        background: "white",
        color: "black",
        borderRadius: "0.5rem",
      }}
    >
      <Button color="inherit" onClick={handleClick}>
        {language}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        style={{ backdropFilter: "blur(7px)" }}
      >
        <MenuItem className="menu-button" onClick={() => changeLanguage("en")}>
          {t("language.en")}
        </MenuItem>
        <MenuItem onClick={() => changeLanguage("mr")}>
          {t("language.mr")}
        </MenuItem>
      </Menu>
    </div>
  );
}

export default LanguageMenu;
