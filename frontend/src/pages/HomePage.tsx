import {
    Box,
    Typography,
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails,
  } from "@mui/material";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import CookieConsent from "react-cookie-consent";
  
  function HomePage() {
    return (
      <Box
        sx={{
          backgroundColor: "#2F2A26",
          color: "#FDF2CD",
          minHeight: "100vh",
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        {/* Header Text */}
        <Typography variant="h2" sx={{ fontWeight: "bold" }}>
          Welcome to CineNiche!
        </Typography>
        <Typography variant="subtitle1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </Typography>
        {/* Call to action */}
        <Typography variant="h6" sx={{ mt: 2 }}>
          Watch with us for only $5.99 a month!
        </Typography>
        <Button
          component="a"
          href="/register"
          variant="contained"
          sx={{
            mt: 1,
            backgroundColor: "#C4453C !important",
            color: "#FDF2CD !important",
            fontWeight: "bold !important",
            textDecoration: "none !important",         // No underline
            "&:hover": {
              backgroundColor: "#A73930 !important",
              color: "#FDF2CD !important" ,             // Ensures color doesn’t change on hover
              textDecoration: "none !important",       // Prevents underline on hover
            },
            "&:visited": {
              color: "#FDF2CD !important",             // Ensures visited link color stays off-white
              textDecoration: "none !important",
            },
          }}
        >
          Sign Up
        </Button>
        {/* Accordion Section */}
        <Box sx={{ width: "100%", maxWidth: "600px", mt: 4 }}>
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
      </Box>
    );
  }
  export default HomePage;