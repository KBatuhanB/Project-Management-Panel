import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Box, Typography } from "@mui/material";

const STATUS_ORDER = ["Tamamlanmış", "Devam Eden", "Yapılacak"];
const COLORS = ["#4caf50", "#2196f3", "#ff9800"];

const SimplePieChart = ({ data, size = 240 }) => {
  // Statü sırasına göre data'yı sırala
  const orderedData = STATUS_ORDER.map((status, i) => {
    const found = data.find((d) => d.name === status);
    return found || { name: status, value: 0 };
  });

  return (
    <Box sx={{ width: size, height: size + 60, position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <ResponsiveContainer width={size} height={size}>
        <PieChart>
          <Pie
            data={orderedData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={size / 2 - 20}
            labelLine={false}
            label={({ name, value }) => value > 0 ? value : ''}
          >
            {orderedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>   
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "left", gap: 2 }}>
        {orderedData.map((item, i) => (
          <Typography key={item.name} variant="h4" sx={{ color: COLORS[i % COLORS.length], fontWeight: 200, fontSize: 18, display: "flex", alignItems: "center", gap: 1 }}>
            <span style={{ display: "inline-block", width: 18, height: 18, borderRadius: "50%", background: COLORS[i % COLORS.length], marginRight: 10 }}></span>
            {item.name}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default SimplePieChart;