import { Helmet } from 'react-helmet-async';

import { EditVacancyView } from 'src/sections/edit-vacancy/view';

// ----------------------------------------------------------------------

export default function EditVacancyPage() {
  return (
    <>
      <Helmet>
        <title>Вакансияни Ўзгартириш</title>
      </Helmet>

      <EditVacancyView />
    </>
  );
}
