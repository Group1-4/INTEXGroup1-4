import React from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../pages/HomePage.css"; // Import your CSS file here

const cardContents = [
  {
    title: "Watch Anywhere",
    description: "Stream on your phone, tablet, laptop, and TV.",
  },
  {
    title: "Cancel Anytime",
    description: "No commitments, cancel your plan whenever you like.",
  },
  {
    title: "4K Streaming",
    description: "Enjoy your favorites in high quality.",
  },
  {
    title: "Exclusive Content",
    description: "Access movies and shows you won't find anywhere else.",
  },
];

const AccordionHomePage: React.FC = () => {
  return (
    <>
      {/* 4 Horizontal Cards Section */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
          px: 2,
          mt: 6,
          mb: 4,
        }}
      >
        {cardContents.map((card, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              backgroundColor: "rgba(253, 238, 205, 0.1)",
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(253, 242, 205, 0.3)",
              borderRadius: "12px",
              width: { xs: "100%", sm: "45%", md: "22%" },
              padding: 3,
              textAlign: "left",
              color: "#FDF2CD",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: "0 6px 16px rgba(196, 69, 60, 0.3)",
              },
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {card.title}
            </Typography>
            <Typography variant="body2">{card.description}</Typography>
          </Paper>
        ))}
      </Box>

      {/* Accordion Section */}
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
    </>
  );
};

export default AccordionHomePage;
