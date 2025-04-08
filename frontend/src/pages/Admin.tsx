import React, { useEffect, useState } from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, Button, Box, Typography,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormGroup, FormControlLabel, Checkbox
} from '@mui/material';
import { Movie } from '../types/Movie';
import { fetchMovies, addMovie, deleteMovie, updateMovie } from '../api/MoviesAPI';
import AuthorizeView, { AuthorizedUser } from '../components/Authorizeview';
import Logout from '../components/logout';

// Ensure these components are imported from your auth library or defined elsewhere in your project
// import { AuthorizeView, Logout, AuthorizedUser } from 'your-auth-library';

const baseColumns = [
  'type', 'title', 'director', 'cast', 'country',
  'releaseYear', 'rating', 'duration', 'description'
];

const allCategoryFields = [
  "Action", "Adventure", "Anime Series International TV Shows", "British TV Shows Docuseries International TV Shows",
  "Children", "Comedies", "Comedies Dramas International Movies", "Comedies International Movies",
  "Comedies Romantic Movies", "Crime TV Shows Docuseries", "Documentaries", "Documentaries International Movies",
  "Docuseries", "Dramas", "Dramas International Movies", "Dramas Romantic Movies", "Family Movies", "Fantasy",
  "Horror Movies", "International Movies Thrillers", "International TV Shows Romantic TV Shows TV Dramas",
  "Kids' TV", "Language TV Shows", "Musicals", "Nature TV", "Reality TV", "Spirituality", "TV Action",
  "TV Comedies", "TV Dramas", "Talk Shows TV Comedies", "Thrillers"
];

function Admin() {
  const [rows, setRows] = useState<Movie[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [newMovie, setNewMovie] = useState<any>({
    showId: 0, title: '', type: '', director: '', cast: '',
    country: '', releaseYear: 0, rating: 0, duration: 0,
    description: '',
    ...Object.fromEntries(allCategoryFields.map((c) => [c, 0]))
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMovies();
        const knownFields = new Set(baseColumns.concat(['showId']));

        const formattedRows = data.movies.map((item) => {
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
    setNewMovie((prev: any) => ({ ...prev, [name]: typedValue }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNewMovie((prev: any) => ({ ...prev, [name]: checked ? 1 : 0 }));
  };

  const handleFormSubmit = async () => {
    const movieToSend = { ...newMovie };
    try {
      if (editMode) {
        await updateMovie(movieToSend);
        setRows((prev) => prev.map((m) => (m.showId === newMovie.showId ? { ...movieToSend, category: getCategoryString(movieToSend) } : m)));
      } else {
        const response = await addMovie(movieToSend);
        if (response && response.success) {
          setRows((prev) => [...prev, { ...movieToSend, showId: response.newId, category: getCategoryString(movieToSend) }]);
        }
      }
    } catch (error) {
      console.error('Error saving movie:', error);
    } finally {
      setNewMovie({
        showId: 0, title: '', type: '', director: '', cast: '',
        country: '', releaseYear: 0, rating: 0, duration: 0,
        description: '',
        ...Object.fromEntries(allCategoryFields.map((c) => [c, 0]))
      });
      setEditMode(false);
      setShowForm(false);
    }
  };

  const getCategoryString = (movie: any) =>
    allCategoryFields.filter((cat) => movie[cat] === 1).join(', ');

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

  const handleEditClick = (movie: any) => {
    setNewMovie({
      ...movie,
      ...Object.fromEntries(allCategoryFields.map((c) => [c, movie[c] ?? 0]))
    });
    setEditMode(true);
    setShowForm(true);
  };

  return (
    <AuthorizeView>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', p: 2 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          CineNiche Movie Administration
        </Typography>

        {/* The logout element can be rendered here if needed */}
        <span>
          <Logout>
            Logout <AuthorizedUser value="email" />
          </Logout>
        </span>

        <Button variant="contained" onClick={() => { setShowForm(true); setEditMode(false); }} sx={{ mb: 2 }}>
          Add Movie
        </Button>

        <Paper sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <TableContainer sx={{ flex: 1 }}>
            <Table stickyHeader aria-label="movie table">
              <TableHead>
                <TableRow>
                  {[...baseColumns, 'category', 'actions'].map((col) => (
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
                      {[...baseColumns, 'category'].map((col) => (
                        <TableCell key={col}>
                          {String(row[col as keyof Movie])}
                        </TableCell>
                      ))}
                      <TableCell>
                        <Button variant="outlined" size="small" sx={{ mr: 1 }} onClick={() => handleEditClick(row)}>
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

        {/* Add/Edit Movie Dialog */}
        <Dialog open={showForm} onClose={() => setShowForm(false)} maxWidth="md" fullWidth>
          <DialogTitle>{editMode ? 'Edit Movie' : 'Add New Movie'}</DialogTitle>
          <DialogContent dividers>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {baseColumns.map((field) => (
                <TextField
                  key={field}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  name={field}
                  value={String(newMovie[field] ?? '')}
                  onChange={handleInputChange}
                  fullWidth
                />
              ))}
              <Typography variant="subtitle1">Categories</Typography>
              <FormGroup>
                {allCategoryFields.map((cat) => (
                  <FormControlLabel
                    key={cat}
                    control={
                      <Checkbox
                        checked={newMovie[cat] === 1}
                        onChange={handleCheckboxChange}
                        name={cat}
                      />
                    }
                    label={cat}
                  />
                ))}
              </FormGroup>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowForm(false)} color="inherit">
              Cancel
            </Button>
            <Button onClick={handleFormSubmit} variant="contained">
              {editMode ? 'Update' : 'Submit'}
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
    </AuthorizeView>
  );
}

export default Admin;
