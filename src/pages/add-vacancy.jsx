import { Helmet } from 'react-helmet-async';

import { AddVacancyView } from 'src/sections/add-new-vacancy/view';

// ----------------------------------------------------------------------

export default function AddNewVacancyPage() {
  return (
    <>
      <Helmet>
        <title>Вакансия Қўшиш</title>
      </Helmet>

      <AddVacancyView />
    </>
  );
}
