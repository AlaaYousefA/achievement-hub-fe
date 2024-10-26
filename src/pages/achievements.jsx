import { Helmet } from 'react-helmet-async';

import { AchievementsView } from 'src/sections/achievements/view';

// ----------------------------------------------------------------------

export default function AchievementsPage() {
  return (
    <>
      <Helmet>
        <title> Achievements | Kasit Achievement Hub </title>
      </Helmet>

      <AchievementsView />
    </>
  );
}
