import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

const cards = [
  {
    id: 1,
    title: 'What is Rental.co?',
    description:
      'Rental.co is a modern platform that helps users find and list rental rooms easily. It provides a smooth experience for browsing rooms, viewing details, and making quick booking decisions.',
  },
  {
    id: 2,
    title: 'Why this platform?',
    description:
      'Finding rental rooms can be difficult and time-consuming. Rental.co solves this problem by offering real-time availability, organized listings, and a user-friendly interface.',
  },
  {
    id: 3,
    title: 'Key Features',
    description:
      'Search rooms by location, view images with slider, like and save rooms, and book instantly. Once booked, rooms become unavailable to avoid confusion.',
  },
];

function AboutSection() {
  const [selectedCard, setSelectedCard] = React.useState(0);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 3,
        padding: '20px',
      }}
    >
      {cards.map((card, index) => (
        <Card
          key={card.id}
          sx={{
            height: '100%',
            borderRadius: 3,
            border: '2px solid transparent',
            transition: 'all 0.3s ease',

            '&:hover': {
              border: '2px solid #0D3B66',
              transform: 'scale(1.03)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            },
          }}
        >
          <CardActionArea
            onClick={() => setSelectedCard(index)}
            disableRipple
            sx={{
              height: '100%',
              padding: 2,

              // remove purple hover
              '&:hover': {
                backgroundColor: 'transparent',
              },

              // ADD selected blue color
              backgroundColor:
                selectedCard === index ? '#e3f2fd' : 'transparent',
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  marginBottom: 1,
                }}
              >
                {card.title}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                }}
              >
                {card.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}

export default AboutSection;
