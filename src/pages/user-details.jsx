import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserDetailsView } from 'src/sections/user/user-details/view';
import UsersService from '../sections/user/services/UsersService';
import AchievementsService from '../sections/achievements/services/AchievementsService';

// ----------------------------------------------------------------------

export default function UserDetailsPage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10); // default page size
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await UsersService.get(userId);
        setUser(fetchedUser);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchAchievements = async () => {
      try {
        const response = await AchievementsService.getAllForUser(userId, page, size);
        setAchievements(response.content); // assuming response contains 'content' for paginated data
        setTotalPages(response.totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    fetchAchievements();
  }, [userId, page, size]);

  const handlePageChange = (event, value) => {
    setPage(value - 1); // page number is 0-indexed in the backend
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
    setPage(0); // reset to first page when size changes
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <>
      <Helmet>
        <title> User | Kasit Achievement Hub </title>
      </Helmet>

      <UserDetailsView
        user={user}
        achievements={achievements}
        page={page + 1} // adjust for 1-indexed pagination display
        size={size}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onSizeChange={handleSizeChange}
      />
    </>
  );
}
