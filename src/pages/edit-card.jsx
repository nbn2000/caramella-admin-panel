import { Helmet } from 'react-helmet-async';

import { EditCard } from 'src/sections/edit-card/view';

// ----------------------------------------------------------------------

export default function EditCardPage() {
  return (
    <>
      <Helmet>
        <title>Махсулот Ўзгартириш</title>
      </Helmet>

      <EditCard />
    </>
  );
}
