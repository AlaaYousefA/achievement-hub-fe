import { Table, TableBody, TableContainer } from '@mui/material';
import AchievementTableHead from '../achievements-table-head';
import AchievementTableRow from '../achievements-table-row';
import TableEmptyRows from '../table-empty-rows';
import TableNoData from '../table-no-data';
import { emptyRows } from '../achievements-utils';

export default function AchievementTable({
  achievements,
  order,
  orderBy,
  totalAchievements,
  page,
  rowsPerPage,
  handleSort,
  handleClick,
}) {
  const notFound = !achievements.length;
  return (
    <TableContainer sx={{ overflow: 'unset', minWidth: 850 }}>
      <Table id="achievements-table" sx={{ minWidth: 850 }}>
        <AchievementTableHead
          order={order}
          orderBy={orderBy}
          rowCount={totalAchievements}
          onRequestSort={handleSort}
          headLabel={[
            { id: 'name', label: 'Name', align: 'center' },
            { id: 'title', label: 'Title', align: 'center' },
            { id: 'category', label: 'Category', align: 'center' },
            { id: 'time', label: 'Date & Time', align: 'center' },
            { id: 'user', label: 'User Id', align: 'center' },
            { id: 'status', label: 'Status', align: 'center' },
          ]}
        />
        <TableBody>
          {achievements.map((row) => (
            <AchievementTableRow
              key={row.id}
              img={row.image}
              name={row.name}
              title={row.title}
              category={row.category}
              time={row.time}
              user={row.userId}
              status={row.status}
              handleClick={() => handleClick(row.id)}
            />
          ))}

          <TableEmptyRows height={77} emptyRows={emptyRows(page, rowsPerPage, totalAchievements)} />

          {notFound && <TableNoData />}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
