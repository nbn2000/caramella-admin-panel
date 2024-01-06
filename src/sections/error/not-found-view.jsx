import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export default function NotFoundView() {
  return (
    <Container>
      <Box
        sx={{
          py: 12,
          maxWidth: 480,
          mx: 'auto',
          display: 'flex',
          minHeight: '100vh',
          textAlign: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h3" sx={{ mb: 3 }}>
          Кечирасиз, сахифа топилмади!
        </Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          Кечирасиз, сиз қидираётган сахифани топа олмадик. Ехтимол сиз URL манзилни нотўғри
          киритгансиз? Имлонни текширишга харакат қилиб кўринг.
        </Typography>

        <Box
          component="img"
          src="/assets/illustrations/illustration_404.svg"
          sx={{
            mx: 'auto',
            height: 260,
            my: { xs: 5, sm: 10 },
          }}
        />

        <Button href="/" size="large" variant="contained" component={RouterLink}>
          Ортга Қайтиш
        </Button>
      </Box>
    </Container>
  );
}
