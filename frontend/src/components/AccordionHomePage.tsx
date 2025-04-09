import React from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../pages/HomePage.css"; // Import your CSS file here

const AccordionHomePage: React.FC = () => {
  return (
    <Box sx={{ width: "100%", maxWidth: "600px", mx: "auto", mt: 4 }}>
      {["FAQ's", "Privacy", "Contact Us"].map((title, index) => (
        <Accordion
          key={index}
          sx={{
            backgroundColor: "#FDF2CD",
            color: "#2F2A26",
            mb: 1,
            borderRadius: "8px",
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Placeholder content for {title.toLowerCase()}.
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default AccordionHomePage;
