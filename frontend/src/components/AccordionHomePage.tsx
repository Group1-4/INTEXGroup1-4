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
import "../pages/HomePage.css";
import "./AccordionHomePage.css";

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

const faqs = [
  {
    title: "What is CineNiche?",
    description:
      "CineNiche is a streaming platform dedicated to curated cinema — from indie gems and international classics to documentaries and experimental shorts.",
  },
  {
    title: "How much does CineNiche cost?",
    description:
      "Plans start at just $5.99/month. No hidden fees, no contracts. Watch on any supported device with a single monthly payment.",
  },
  {
    title: "Where can I watch?",
    description:
      "Watch from anywhere via cineniche.com or our mobile and smart TV apps. You can even download titles to watch offline.",
  },
  {
    title: "How do I cancel?",
    description:
      "Cancel online anytime with just a couple clicks. No cancellation fees, no stress — you’re always in control.",
  },
  {
    title: "What can I watch on CineNiche?",
    description:
      "Enjoy a handpicked library of indie films, festival winners, international features, documentaries, and more.",
  },
  {
    title: "Is CineNiche suitable for kids?",
    description:
      "Yes! CineNiche offers a family-friendly section with age-appropriate films. Parental controls are available for peace of mind.",
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
              border: "1px solid rgba(220, 207, 166, 0.8)",
              borderRadius: "12px",
              width: { xs: "100%", sm: "45%", md: "22%" },
              padding: 3,
              textAlign: "left",
              color: "#6C3F18",
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
            <Typography variant="body2" sx={{ color: "#6C3F18" }}>
              {card.description}
            </Typography>
          </Paper>
        ))}
      </Box>


      {/* Accordion Section */}

      <Box className="faq-container">
        <h2 className="FAQ-Header">Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            className="faq-accordion"
            disableGutters
            elevation={0}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#6C3F18" }} />}
            >
              <Typography fontWeight="bold">{faq.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.description}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <Box sx={{ height: "20px" }} />
    </>
  );
};

export default AccordionHomePage;