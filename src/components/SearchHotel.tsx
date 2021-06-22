import { Button, Grid, TextField } from "@material-ui/core";
import React, { ChangeEvent } from "react";
import { Controller, useForm } from "react-hook-form";
import { ISearchHotel } from "../interfaces/ISearchHotel";
import FormValidator from "./FormValidator";

interface SearchHotelProps {
  onSearch: (formData: any) => void;
  onChangeP: (search: ISearchHotel) => void;
  search: ISearchHotel;
  submitDisabled: boolean;
}

const SearchHotel = (props: SearchHotelProps) => {
  const { handleSubmit, control, register, reset } = useForm();

  const { onSearch, onChangeP, search, submitDisabled } = props;

  const onSubmit = (data: any): void => {
    onSearch(data);
  };

  const handleReset = (): void => {
    reset({
      destinationId: "",
      nights: "",
    });
    onChangeP({
      destinationId: "",
      nights: "",
    });
  };

  /**
   * Validacion de caracter introducido en inputs
   *
   */
  const checkNumber = (value: string): boolean => {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(value);
  };

  const handleChange = (data: any, value: any): void => {
    onChangeP(data);
  };

  return (
    <Grid container>
      <FormValidator onSubmit={handleSubmit(onSubmit)} onReset={handleReset}>
        <Grid container style={{ justifyContent: "center" }}>
          <Grid item xs={12} md={3}>
            <Controller
              name="destinationId"
              control={control}
              defaultValue={""}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  {...register("destinationID")}
                  style={{ width: "95%" }}
                  autoComplete="number"
                  error={!!error}
                  helperText={error ? error.message : null}
                  placeholder="0"
                  label="Destination ID"
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    checkNumber(event.target.value) || event.target.value === ""
                      ? handleChange(
                          { ...search, destinationId: event.target.value },
                          onChange(event.target.value)
                        )
                      : null
                  }
                  type="text"
                  value={search.destinationId}
                  variant="outlined"
                />
              )}
              rules={{ required: "Destination ID required" }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Controller
              {...register("nights")}
              name="nights"
              control={control}
              defaultValue={""}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <TextField
                  style={{ width: "95%" }}
                  error={!!error}
                  helperText={error ? error.message : null}
                  placeholder="0"
                  label="Nights"
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    checkNumber(event.target.value) || event.target.value === ""
                      ? handleChange(
                          { ...search, nights: event.target.value },
                          onChange(event.target.value)
                        )
                      : null
                  }
                  type="text"
                  value={search.nights}
                  variant="outlined"
                />
              )}
              rules={{ required: "Number of nights required" }}
            />
          </Grid>
          <Grid item xs={6} md={1} alignContent="flex-start">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={submitDisabled}
            >
              Search
            </Button>
          </Grid>
          <Grid item xs={6} md={1} alignContent="flex-end">
            <Button type="reset" variant="contained" color="secondary">
              RESET
            </Button>
          </Grid>
        </Grid>
      </FormValidator>
    </Grid>
  );
};

export default SearchHotel;
