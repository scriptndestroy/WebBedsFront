import Container from "@material-ui/core/Container";
import React from "react";
import { hotelService } from "./services";
import "./App.css";
import SearchHotel from "./components/SearchHotel";
import { HotelRates } from "./interfaces/HotelRates";
import { ISearchHotel } from "./interfaces/ISearchHotel";
import { Rate } from "./interfaces/Rate";
import { Constants } from "./utils/Constants";
import { Divider, Grid } from "@material-ui/core";

function App() {
  const [hotelRates, setHotelRates] = React.useState<HotelRates[]>([]);
  const [hotelSearch, setHotelSearch] = React.useState<ISearchHotel>({
    destinationId: "",
    nights: "",
  });
  const [btnSubmitDisabled, setBtnSubmitDisabled] =
    React.useState<boolean>(false);

  const onChangeSearch = (search: ISearchHotel) => {
    setHotelSearch(search);
  };

  const onSearch = (data: ISearchHotel) => {
    setBtnSubmitDisabled(true);
    setHotelSearch(data);
    setHotelRates([]);

    data.destinationId &&
      hotelService
        .search({
          destinationId: parseInt(data.destinationId),
        })
        .then((response: HotelRates[]) => {
          setHotelRates(response);
          setBtnSubmitDisabled(false);
        })
        .catch((e: any) => {
          setBtnSubmitDisabled(false);
        });
  };

  return (
    <div className="App">
      <Container>
        <SearchHotel
          onSearch={onSearch}
          onChangeP={onChangeSearch}
          search={hotelSearch}
          submitDisabled={btnSubmitDisabled}
        />
        <Grid container>
          <Grid item md={4}>
            <h2>
              <b>Hotel</b>
            </h2>
          </Grid>
          <Grid item md={8}>
            <h2>
              <b>Rates</b>
            </h2>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item md={4}></Grid>
          <Grid item md={2}>
            <h3> Rate Type</h3>
          </Grid>
          <Grid item md={2}>
            <h3> Board Type</h3>
          </Grid>
          <Grid item md={2}>
            <h3>Value</h3>
          </Grid>
          <Grid item md={2}>
            <h3>Final Price</h3>
          </Grid>

          {hotelRates
            ? hotelRates?.map((hr: HotelRates, i: number) => {
                return (
                  <>
                    <Grid item md={4} key={"H" + i}>
                      <p>Property Id: {hr.hotel?.propertyID}</p>
                      <p>Name: {hr.hotel?.name}</p>
                      <p>Geo ID: {hr.hotel?.geoId}</p>
                      <p>Rating: {hr.hotel?.rating}</p>
                    </Grid>
                    <Grid item xs={12} md={8}>
                    {hr.rates?.map((r: Rate, i: number) => {
                      return (
                        <React.Fragment key={"R" + hr.hotel.propertyID + i}>
                          <Grid container>                            
                            <Grid item md={3}>
                              {r.rateType}
                            </Grid>
                            <Grid item md={3}>
                              {r.boardType}
                            </Grid>
                            <Grid item md={3}>
                              {r.value}
                            </Grid>
                            <Grid item md={2}>
                              {r.rateType === Constants.RATE_TYPE.perNight &&
                              hotelSearch.nights
                                ? r.value * parseInt(hotelSearch.nights)
                                : r.value}
                            </Grid>
                            <Grid item xs={12}> 
                              <Divider
                                style={{
                                  padding: "10px",
                                  backgroundColor: "white",
                                }}
                              />
                            </Grid>
                          </Grid>
                        </React.Fragment>
                      );
                    })}
                    </Grid>
                    <Grid item xs={12}>
                      <Divider
                        style={{ padding: "10px", backgroundColor: "white" }}
                      />
                    </Grid>
                  </>
                );
              })
            : "No results"}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
