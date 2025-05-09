import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export type CarFilters = {
  manufacturer: string | "";
  model: string | "";
  minYear: number | "";
  maxYear: number | "";
};
export type Props = {
  onChange: (filters: CarFilters) => void;
};
const okayInputs = [
  "Backspace",
  "Delete",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
];

export function VirtualCarSearchBar(props: Props) {
  const { onChange } = props;

  const [minYear, setMinYear] = useState<number | "">("");
  const [maxYear, setMaxYear] = useState<number | "">("");
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");

  useEffect(() => {
    onChange({ minYear, maxYear, manufacturer, model });
  }, [minYear, maxYear, manufacturer, model]);
  return (
    <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
      <Box
        style={{
          backgroundColor: "#e7ca56",
          height: "4rem",
          minHeight: "3rem",
          width: "100%",
          border: "1px solid white",
          borderRadius: 4,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            paddingTop: "0.7rem",
            gap: 5,
          }}
        >
          <TextField
            size="small"
            placeholder="Min Year"
            type="number"
            value={minYear}
            onKeyDown={(e) => {
              if (okayInputs.includes(e.key)) {
                return true;
              }

              if (!/^\d*$/.test(e.key)) {
                e.preventDefault();
                return false;
              }
            }}
            onChange={(e) => {
              if (!e.target.value) {
                setMinYear("");
                return false;
              }
              try {
                let value = parseInt(e.target.value);
                if (value < 0) return;

                setMinYear(value);
              } catch (error) {}
            }}
          />
          <TextField
            size="small"
            placeholder="Max Year"
            type="number"
            value={maxYear}
            onKeyDown={(e) => {
              if (okayInputs.includes(e.key)) {
                return true;
              }

              if (!/^\d*$/.test(e.key)) {
                e.preventDefault();
                return false;
              }
            }}
            onChange={(e) => {
              if (!e.target.value) {
                setMaxYear("");
                return false;
              }
              try {
                let value = parseInt(e.target.value);
                if (value < 0) return;

                setMaxYear(value);
              } catch (error) {}
            }}
          />

          <TextField
            size="small"
            placeholder="Manufacturer"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
          />
          <TextField
            size="small"
            placeholder="Model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
          <Button
            variant="contained"
            style={{ height: "2.3rem" }}
            onClick={() => {
              setMinYear("");
              setMaxYear("");
              setManufacturer("");
              setModel("");
            }}
          >
            Clear
          </Button>
        </div>
      </Box>
    </div>
  );
}
