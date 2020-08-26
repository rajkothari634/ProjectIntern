import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import StyledTable from "./settable";

const Field = (props) => {
  return (
    <TextField
      id={props.id}
      label={props.label}
      style={{
        width: "calc(100% - 24px)",
      }}
      variant={"outlined"}
    />
  );
};
function createData(word, freq) {
  return { word, freq };
}
var datachange = [];
var loading = false;

function App() {
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);
  const [queryNum, setQueryNum] = useState(0);
  const fetchData = () => {
    if (loading) {
      return;
    }
    setFetched(false);
    setLoading(true);
    fetch("http://localhost:5050/getfrequentword?q=" + queryNum)
      .then((res) => res.json())
      .then((data) => {
        console.log("working");
        let words = data.maxWords;
        let freq = data.wordfreq;
        let rows = [];
        for (let i = 0; i < words.length; i++) {
          rows.push(createData(words[i], freq[i]));
        }
        setFetched(true);
        setLoading(false);
        setFetchedData(rows);
      });
  };
  const handlequery = (event) => {
    console.log(event.target.value);
    setQueryNum(event.target.value);
  };

  return (
    <div style={{ backgroundColor: "#cacaca", height: "800px" }}>
      <Grid containerjustify="center">
        <Grid item md={6} xs={12}>
          <Field
            id={"querynumber"}
            label={"Enter number"}
            onChange={handlequery}
          />
        </Grid>

        <Grid item md={6} xs={12} style={{ marginTop: "30px" }}>
          <Button variant="contained" color="primary" onClick={fetchData(10)}>
            Fetch Max Freq Words
          </Button>
        </Grid>
      </Grid>
      {fetchData.length > 0 ? (
        <Grid item md={6} xs={12} style={{ marginTop: "30px" }}>
          <StyledTable rows={fetchedData} />
        </Grid>
      ) : (
        <div />
      )}
    </div>
  );
}

export default App;
