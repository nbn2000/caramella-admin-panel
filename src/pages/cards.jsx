import { Helmet } from 'react-helmet-async';

import { Card } from 'src/sections/card/view';

// ----------------------------------------------------------------------

export default function CardsPage() {
  return (
    <>
      <Helmet>
        <title>Махсулот Қўшиш</title>
      </Helmet>

      <Card />
    </>
  );
}
