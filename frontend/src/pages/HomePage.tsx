import { Box, Typography, Button, TextField, Accordion, AccordionSummary, AccordionDetails, } 
from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const HeroCard: React.FC = () => {
  return (
    <>
    <Box
  sx={{
    backgroundColor: "#2F2A26",
    minHeight: "100vh",
    display: "flex",
    alignItems: "flex-start", // align to the top
    justifyContent: "center",
    px: 2,
    pt: 6, // adjust this to control top spacing (e.g., pt: 2, pt: 4, etc.)
  }}
>
      {/* Card with image background */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: "1100px",
          height: { xs: "80vh", md: "70vh" },
          borderRadius: "1rem",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url('/250movies.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: `
                    0px 10px 30px rgba(89, 21, 17, 0.6),
                    0px 0px 15px rgba(67, 15, 11, 0.4)
                  `,
        }}
      >
        {/* Dark overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            background: `linear-gradient(
  to top,
  rgba(0.0, 0, 0.0, 0.85) 0%,
  rgba(0.0, 0, 0, 0.75) 40%,
  rgba(0, 0, 0, 0.5) 75%,
  rgba(0, 0, 0, 0.3) 100%
)`,
            zIndex: 1,
          }}
        />

        {/* Content */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            color: "#FDF2CD",
            textAlign: "center",
            px: 4,
          }}
        >
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            Unlimited movies, TV shows, and more
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Starts at $5.99. Cancel anytime.
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Ready to watch? Enter your email to create or restart your membership.
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              placeholder="Email address"
              variant="outlined"
              sx={{
                backgroundColor: "#fff",
                borderRadius: "4px",
                input: { color: "#000", padding: "12px" },
                width: { xs: "100%", sm: "300px" },
              }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#C4453C",
                color: "#FDF2CD",
                fontWeight: "bold",
                px: 4,
                "&:hover": {
                  backgroundColor: "#A73930",
                },
              }}
            >
              Get Started
            </Button>
          </Box>
        </Box>
      </Box>
      </Box>
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
    </>
  );
};

export default HeroCard;