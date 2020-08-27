import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import StyledTable from "./settable";

const Field = (props) => {
  return (
    <TextField
      id={props.id}
      label={props.label}
      type={"Number"}
      style={{
        width: "calc(100% - 24px)",
        marginTop: "30px",
      }}
      variant={"outlined"}
    />
  );
};
function createData(word, freq) {
  return { word, freq };
}

function App() {
  const [loading, setLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);
  const fetchData = () => {
    if (loading) {
      return;
    }
    var queryNumber = document.getElementById("querynumber").value;
    if (queryNumber < 1) {
      return;
    }
    setLoading(true);
    fetch("http://localhost:5050/getfrequentword?q=" + queryNumber)
      .then((res) => res.json())
      .then((data) => {
        console.log("working");
        let words = data.maxWords;
        let freq = data.wordfreq;
        let rows = [];
        for (let i = 0; i < words.length; i++) {
          rows.push(createData(words[i], freq[i]));
        }
        setLoading(false);
        setFetchedData(rows);
      });
  };

  return (
    <div
      style={{
        flex: "1",
        justifyContent: "center",
      }}
    >
      <Grid container justify="center">
        <Grid item md={6} xs={12}>
          <Field id={"querynumber"} label={"Enter number"} />
        </Grid>
        <Grid item md={12} xs={12} />
        <Grid item md={2} xs={6} style={{ marginTop: "30px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              fetchData(10);
            }}
          >
            Fetch Max Freq Words
          </Button>
        </Grid>
        <Grid item md={12} xs={12} />
        {!loading ? (
          <Grid item md={6} xs={12} style={{ marginTop: "30px" }}>
            <StyledTable rows={fetchedData} />
          </Grid>
        ) : (
          <div />
        )}
      </Grid>
    </div>
  );
}

export default App;
