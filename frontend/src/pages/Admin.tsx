import React, { useEffect, useState } from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, Button, Box, Typography,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import { Movie } from '../types/Movie';
import { fetchMovies, addMovie, deleteMovie } from '../api/MoviesAPI';

const baseColumns = [
  'type', 'title', 'director', 'cast', 'country',
  'releaseYear', 'rating', 'duration', 'description', 'category'
];

function Admin() {
  const [rows, setRows] = useState<Movie[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [newMovie, setNewMovie] = useState<Movie>({
    showId: 0, title: '', type: '', director: '', cast: '',
    country: '', releaseYear: 0, rating: 0, duration: 0,
    description: '', category: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMovies();
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const typedValue = ['releaseYear', 'rating', 'duration'].includes(name) ? Number(value) : value;
    setNewMovie((prev) => ({ ...prev, [name]: typedValue }));
  };

  const handleFormSubmit = async () => {
    try {
      const response = await addMovie(newMovie);
      if (response && response.success) {
        setRows((prev) => [...prev, { ...newMovie, showId: response.newId }]);
      }
    } catch (error) {
      console.error('Error adding movie:', error);
    } finally {
      setNewMovie({
        showId: 0, title: '', type: '', director: '', cast: '',
        country: '', releaseYear: 0, rating: 0, duration: 0,
        description: '', category: ''
      });
      setShowForm(false);
    }
  };

  const handleDeleteClick = (id: number) => {
    setSelectedMovieId(id);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedMovieId !== null) {
      try {
        await deleteMovie(selectedMovieId);
        setRows((prev) => prev.filter((movie) => movie.showId !== selectedMovieId));
      } catch (error) {
        console.error('Error deleting movie:', error);
      } finally {
        setDeleteConfirmOpen(false);
        setSelectedMovieId(null);
      }
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        CineNiche Movie Administration
      </Typography>

      <Button variant="contained" onClick={() => setShowForm(true)} sx={{ mb: 2 }}>
        Add Movie
      </Button>

      <Paper sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TableContainer sx={{ flex: 1 }}>
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
                        {String(row[col as keyof Movie])}
                      </TableCell>
                    ))}
                    <TableCell>
                      <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                        Edit
                      </Button>
                      <Button variant="outlined" color="error" size="small" onClick={() => handleDeleteClick(row.showId)}>
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

      {/* Add Movie Dialog */}
      <Dialog open={showForm} onClose={() => setShowForm(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Movie</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {baseColumns.map((field) => (
              <TextField
                key={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                value={String(newMovie[field as keyof Movie] ?? '')}
                onChange={handleInputChange}
                fullWidth
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowForm(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent dividers>
          Are you sure you want to delete this movie?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Admin;
