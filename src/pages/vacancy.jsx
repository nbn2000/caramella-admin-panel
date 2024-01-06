import { Helmet } from 'react-helmet-async';

import { VacancyView } from 'src/sections/vacancy/view';

// ----------------------------------------------------------------------

export default function VacancyPage() {
  return (
    <>
      <Helmet>
        <title> Вакансия </title>
      </Helmet>

      <VacancyView />
    </>
  );
}
