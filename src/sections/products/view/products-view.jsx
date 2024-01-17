import { useState, useEffect } from 'react';

// import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useGetAllCardsQuery } from 'src/api/card-api-req';

import ProductCard from '../product-card';
// import ProductFilters from '../product-filters';
import ProductCartWidget from '../product-cart-widget';

// ----------------------------------------------------------------------

export default function ProductsView() {
  const [cards, setCards] = useState();
  const { isLoading, data } = useGetAllCardsQuery();

  useEffect(() => {
    const fetch = () => {};

    fetch();
  }, [cards]);
  // const [openFilter, setOpenFilter] = useState(false);

  // const handleOpenFilter = () => {
  //   setOpenFilter(true);
  // };

  // const handleCloseFilter = () => {
  //   setOpenFilter(false);
  // };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Махсулотлар
      </Typography>

      {/* <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ProductFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />
        </Stack>
      </Stack> */}

      <Grid container spacing={3}>
        {cards.map((product, idx) => (
          <Grid key={idx} xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      <ProductCartWidget />
    </Container>
  );
}
