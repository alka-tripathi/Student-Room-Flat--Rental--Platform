import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function AboutMe() {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 4,
      }}
    >
      <Card
        sx={{
          width: '90%', // full horizontal feel
          maxWidth: '900px', // not too stretched
          borderRadius: 3,
          border: '2px solid transparent',
          padding: 2,
          transition: '0.3s',

          '&:hover': {
            border: '2px solid #0D3B66',
            transform: 'scale(1.01)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          },
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            sx={{ fontWeight: 'bold', marginBottom: 2 }}
          >
            About Developer
          </Typography>

          <Typography
            variant="body1"
            sx={{ lineHeight: 1.7 }}
          >
            Hi, I’m Alka Tripathi, a third-year BTech student passionate about
            web development and problem solving. I enjoy building real-world
            applications that solve practical problems.
            <br />
            <br />
            Rental.co is one of my full-stack projects where I implemented
            features like authentication, room listing, liking system, and
            real-time booking using React, Node.js, and MongoDB.
            <br />
            <br />I am continuously learning and improving my skills in
            frontend, backend, and data structures to become a proficient
            developer.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AboutMe;
