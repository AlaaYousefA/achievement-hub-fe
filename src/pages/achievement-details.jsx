import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import AchievementsService from '../sections/achievements/services/AchievementsService';

import AchievementDetailsView from 'src/sections/achievements/achievement-details/view/achievement-details-view';

// ----------------------------------------------------------------------

export default function AchievementDetailsPage() {
  const { achievementId } = useParams();
  const [achievement, setAchievement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAchievement = async () => {
      try {
        setLoading(true);
        const fetchedAchievement = await AchievementsService.get(achievementId);
        setAchievement(fetchedAchievement);
      } catch (err) {
        setError('Failed to fetch achievement');
        console.error('Error fetching achievement:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievement();
  }, [achievementId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Helmet>
        <title> Achievement | Kasit Achievement Hub </title>
      </Helmet>
      {achievement ? (
        <AchievementDetailsView achievement={achievement} />
      ) : (
        <div>Achievement not found</div>
      )}
    </>
  );
}
