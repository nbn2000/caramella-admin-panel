/* eslint-disable perfectionist/sort-named-imports */
import { Container, Breadcrumbs, Link, Typography } from '@mui/material';

export default function Header() {
  return (
    <Container maxWidth="xl" disableGutters sx={{ margin: '20px 5px' }}>
      <Typography variant="h4" color="primary">
        Янги Вакансия Кўшиш Сахифаси
      </Typography>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Бош Сахифа
        </Link>
        <Link underline="hover" color="inherit" href="/vacancy">
          Вакансия Сахифаси
        </Link>
        <Typography color="text.primary">Янги Вакансия Қўшиш</Typography>
      </Breadcrumbs>
    </Container>
  );
}
