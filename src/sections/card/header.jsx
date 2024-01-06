/* eslint-disable perfectionist/sort-named-imports */
import { Container, Breadcrumbs, Link, Typography } from '@mui/material';

export default function Header() {
  return (
    <Container maxWidth="xl" disableGutters sx={{ margin: '20px 5px' }}>
      <Typography variant="h4" color="primary" sx={{ marginBottom: '5px' }}>
        Махсулот Қўшиш Сахифаси
      </Typography>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Асосий Сахийфа
        </Link>
        <Link underline="hover" color="inherit" href="/products">
          Махсилотлар Сахифаси
        </Link>
        <Typography color="text.primary">Янги Махсулот Қўшиш</Typography>
      </Breadcrumbs>
    </Container>
  );
}
