import { Card, Link, Stack, Container, Typography } from '@mui/material';

import { vacancy } from 'src/_mock/vacancy';

import VacancyCartWidget from '../vacancy-cart-widget';

// ----------------------------------------------------------------------

export default function VacancyView() {
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Вакансиялар
      </Typography>

      <Stack spacing={3}>
        {vacancy.map((i, idx) => (
          <Link
            key={idx}
            color="inherit"
            href={`/vacancy/${i.id}`}
            underline="hover"
            variant="subtitle2"
            noWrap
            cursor="pointer"
          >
            <Card sx={{ padding: 2, textAlign: 'center', fontWeight: '700' }}>{i.vacancyName}</Card>
          </Link>
        ))}
      </Stack>

      <VacancyCartWidget />
    </Container>
  );
}
