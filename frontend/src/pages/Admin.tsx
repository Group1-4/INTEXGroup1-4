import React, { useEffect, useState } from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, Button
} from '@mui/material';
import { Movie } from '../types/Movie'; // adjust path if needed

const baseColumns = [
  'type', 'title', 'director', 'cast', 'country',
  'releaseYear', 'rating', 'duration', 'description', 'category'
];

function Admin() {
  const [rows, setRows] = useState<Movie[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:5000/Movies');
        const data: Movie[] = await response.json();

        const knownFields = new Set(baseColumns.concat(['showId']));

        const formattedRows = data.map((item) => {
          const categoryKeys = Object.keys(item).filter(
            (key) => !knownFields.has(key) && item[key as keyof Movie] === 1
          );

          return {
            ...item,
            category: categoryKeys.join(', ')
          };
        });

        setRows(formattedRows);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="movie table">
          <TableHead>
            <TableRow>
              {[...baseColumns, 'actions'].map((col) => (
                <TableCell key={col}>
                  {col === 'actions' ? 'Actions' : col.charAt(0).toUpperCase() + col.slice(1)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, idx) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.showId || idx}>
                  {baseColumns.map((col) => (
                    <TableCell key={col}>
                      {row[col as keyof Movie] as string}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                      Edit
                    </Button>
                    <Button variant="outlined" color="error" size="small">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default Admin;
