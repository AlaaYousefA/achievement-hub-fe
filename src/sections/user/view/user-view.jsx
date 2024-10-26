import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows } from '../utils';
import UsersService from '../services/UsersService';
import AchievementsService from '../../achievements/services/AchievementsService';
import { formatKasitRole } from 'src/utils/format-user-role';

export default function UserPage() {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('createdAt');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filterDepartment, setFilterDepartment] = useState([]);
  const [filterRole, setFilterRole] = useState([]);
  const [filterAchievementNo, setFilterAchievementNo] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        let filters = {};
        if (filterName) filters = { ...filters, filterName };
        if (filterDepartment && filterDepartment.length > 0)
          filters = { ...filters, filterDepartment };
        if (filterRole && filterRole.length > 0) filters = { ...filters, filterRole };
        if (filterAchievementNo) filters = { ...filters, filterAchievementNo };

        const userResponse = await UsersService.getAll(page, rowsPerPage, orderBy, order, filters);
        const usersWithAchievements = await Promise.all(
          userResponse.content.map(async (user) => {
            const achievementsResponse = await AchievementsService.getAllForUser(user.id, 0, 1); // Fetch just the count
            return {
              ...user,
              achievementNo: achievementsResponse.totalElements, // totalElements contains the count of achievements
            };
          })
        );
        setUsers(usersWithAchievements);
        setTotalUsers(userResponse.totalElements);
      } catch (error) {
        setError('Failed to fetch users and achievements');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [
    page,
    rowsPerPage,
    orderBy,
    order,
    filterName,
    filterDepartment,
    filterRole,
    filterAchievementNo,
  ]);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleClick = (event, name, id) => {
    navigate(`/user/${id}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const notFound = !users.length;
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>
      </Stack>

      <Card>
        <UserTableToolbar
          filterName={filterName}
          filterDepartment={filterDepartment}
          filterRole={filterRole}
          filterAchievementNo={filterAchievementNo}
          onFilterName={setFilterName}
          onFilterDepartment={setFilterDepartment}
          onFilterRole={setFilterRole}
          onFilterAchievementNo={setFilterAchievementNo}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={totalUsers}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'department', label: 'Department', align: 'center' },
                  { id: 'role', label: 'Role', align: 'center' },
                  { id: 'achievementNo', label: 'Achievement No', align: 'center' },
                ]}
              />
              <TableBody>
                {!loading &&
                  users.map((row) => (
                    <UserTableRow
                      key={row.id}
                      name={row.name}
                      role={formatKasitRole(row.kasitRole)}
                      status={row.status}
                      department={row.department}
                      avatarUrl={row.avatarUrl}
                      achievementNo={row.achievementNo}
                      handleClick={(event) => handleClick(event, row.name, row.id)}
                    />
                  ))}

                <TableEmptyRows height={77} emptyRows={emptyRows(page, rowsPerPage, totalUsers)} />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={totalUsers}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
