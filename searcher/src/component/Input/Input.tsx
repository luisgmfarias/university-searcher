import React, { Dispatch, SetStateAction, useState } from "react";

import { Autocomplete, TextField } from "@mui/material";

import { countries } from "countries-list";

interface IInput {
  handleSearch: (country: string | null) => void;
  setCountryIcon: Dispatch<SetStateAction<any>>;
}

export const Input = ({ handleSearch, setCountryIcon }: IInput) => {
  const listOfCountries = Object.values(countries).map((item) => item.name);

  const getCountryEmoji = (countryName: string | null) => {
    const countryMatch = Object.values(countries).find(
      (country) => country.name === countryName
    );

    return countryMatch ? countryMatch.emoji : null;
  };

  return (
    <div>
      <Autocomplete
        disablePortal
        id="combo-box"
        options={listOfCountries}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Country name" />}
        onChange={(e, value) => {
          handleSearch(value);
          setCountryIcon(getCountryEmoji(value));
        }}
      />
    </div>
  );
};
