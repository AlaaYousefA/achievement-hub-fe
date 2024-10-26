import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardHeader, Button } from '@mui/material';
import { LocalizationProvider, YearPicker } from '@mui/x-date-pickers';
import AdapterDateFns from '@date-io/date-fns';
import Chart, { useChart } from 'src/components/chart';

const LineChart = ({ title, subheader, chart, year, onYearChange, ...other }) => {
  const [openYearPicker, setOpenYearPicker] = useState(false);
  const { labels, colors, series, options } = chart;

  const chartOptions = useChart({
    colors,
    plotOptions: {
      bar: {
        columnWidth: '16%',
      },
    },
    fill: {
      type: series.map((i) => i.fill),
    },
    labels,
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => {
          if (typeof value !== 'undefined') {
            return `${value.toFixed(0)}`;
          }
          return value;
        },
      },
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <Button variant="outlined" onClick={() => setOpenYearPicker(true)}>
            Select Year
          </Button>
        }
      />
      {openYearPicker && (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <YearPicker
            date={new Date(year, 0)}
            onChange={(date) => {
              onYearChange(date.getFullYear());
              setOpenYearPicker(false);
            }}
          />
        </LocalizationProvider>
      )}
      <Box sx={{ p: 3, pb: 1 }}>
        <Chart
          dir="ltr"
          type="line"
          series={series}
          options={chartOptions}
          width="100%"
          height={364}
        />
      </Box>
    </Card>
  );
};

LineChart.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.number.isRequired,
  onYearChange: PropTypes.func.isRequired,
};

export default LineChart;
