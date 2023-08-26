import React, { useState } from "react";
import { Input } from "../../component/Input/Input";
import { Container } from "./styles";

import { Card, CardContent, ListItem, Pagination, Stack } from "@mui/material";
import { CountryIcon } from "../../component/CountryIcon/CountryIcon";

interface IUniversities {
  alpha_two_code: string;
  "state-province": string;
  web_pages: string[];
  name: string;
  domains?: string[];
}

export const Home = () => {
  const [universities, setuniversities] = useState<IUniversities[]>([]);

  const [numPages, setnumPages] = useState<number>(0);

  const [page, setPage] = useState<number>(0);

  const [countryIcon, setCountryIcon] = useState<string>("");

  const handleSearch = async (country: string | null) => {
    try {
      const response = await fetch(
        `${process.env.API_URL}universities?country=${country}`
      );
      const data = await response.json();

      setuniversities(data);

      setnumPages(Math.ceil(data.length / 5));

      setPage(1);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSlice = () => {
    if (page === 1) {
      return 5;
    } else if (page === 2) {
      return 10;
    }
    return page * 5;
  };

  return (
    <Container>
      <h1>University Searcher</h1>

      <Input handleSearch={handleSearch} setCountryIcon={setCountryIcon} />
      <CountryIcon>{countryIcon}</CountryIcon>
      <div>
        <ul>
          {universities
            .slice(getSlice() - 5, getSlice())
            .map((university, index) => {
              return (
                <ListItem key={index} style={{ justifyContent: "center" }}>
                  <a href={university.web_pages[0]}>
                    <Card
                      sx={{
                        minWidth: 200,
                        textAlign: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <CardContent>{university.name}</CardContent>
                    </Card>
                  </a>
                </ListItem>
              );
            })}
        </ul>
        <Stack alignItems="center">
          <Pagination
            page={page}
            count={numPages}
            onChange={(e, value) => setPage(value)}
          />
        </Stack>
      </div>
    </Container>
  );
};
