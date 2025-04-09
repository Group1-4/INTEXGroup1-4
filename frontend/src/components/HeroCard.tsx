


import { Box, Typography, Button, TextField, } 
from "@mui/material";
import "../pages/HomePage.css"; // Import your CSS file here

const HeroCard: React.FC = () => {
  return (
    <>
    <Box
  sx={{
    // minHeight: "100vh",
    display: "flex",
    alignItems: "flex-start", // align to the top
    justifyContent: "center",
    px: 2,
    pt: 6, // padding top for spacing
    pb: 4, // padding bottom for spacing
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
                                          rgba(0.0, 0, 0.0, 0.7) 0%,
                                          rgba(0.0, 0, 0, 0.85) 40%,
                                          rgba(0, 0, 0, 0.75) 75%,
                                          rgba(0, 0, 0, 0.4) 100%
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
          Tailored for You<br /> From Classics to Today’s Favorites 
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Starts at $5.99. Cancel anytime.
          </Typography>
          <Typography variant="body1" sx={{
                                            mb: 3,
                                            color: "#FDF2CD", // Add this line
                                          }}>
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
                  backgroundColor: "#C4453C !important",
                  color: "#FDF2CD !important",
                  fontWeight: "bold",
                  px: 4,
                  textDecoration: "none !important", // no underline
                  "&:hover": {
                    backgroundColor: "#A73930 !important",
                    color: "#FDF2CD", // stays off-white
                    textDecoration: "none", // no underline on hover
                  },
                  "&:visited": {
                    color: "#FDF2CD !important", // stays off-white after click
                    textDecoration: "none",
                  },
                }}
              href="/register"
            >
              Get Started
            </Button>
          </Box>
        </Box>
      </Box>
      </Box>
      {/* Informational Card */}
      <Box
        sx={{
            backgroundColor: "rgba(253, 238, 205, 0.16)",
            backdropFilter: "blur(6px)",
            color: "#FDF2CD",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 4,
            py: 3,
            borderRadius: "12px",
            border: "1px solid rgba(253, 242, 205, 0.35)",
            mb: 4,
            width: "100%",
            maxWidth: "1000px",
            mx: "auto",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "scale(1.03)",
              boxShadow: "0 8px 20px rgba(196, 69, 60, 0.4)", // optional: glow on hover
            },
          }}
      >
        {/* Text Block */}
        <Box>
          <Typography variant="h6" fontWeight="bold">
            Discover classic and new favorites
          </Typography>
          <Typography variant="body2" sx={{ color: "#FDF2CD" }}>
            Handpicked selections tailored for true cinephiles.
          </Typography>
        </Box>

        {/* Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#C4453C !important",
            color: "#FDF2CD !important",
            fontWeight: "bold",
            px: 4,
            textDecoration: "none !important", // no underline
            "&:hover": {
              backgroundColor: "#A73930 !important",
              color: "#FDF2CD", // stays off-white
              textDecoration: "none", // no underline on hover
            },
            "&:visited": {
              color: "#FDF2CD !important", // stays off-white after click
              textDecoration: "none",
            },
          }}
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        >
          Learn More
        </Button>
      </Box>
      </>
  );
};

export default HeroCard;