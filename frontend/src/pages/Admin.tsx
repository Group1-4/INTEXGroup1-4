import React, { useEffect, useState } from "react";
import {

  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, Button, Box, Typography,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormGroup, FormControlLabel, Checkbox
} from '@mui/material';
import { Movie } from '../types/Movie';
import { fetchMoviesPaginated, addMovie, deleteMovie, updateMovie } from '../api/MoviesAPI';
import AuthorizeView, { AuthorizedUser } from '../components/Authorizeview';
import Logout from '../components/logout';


const baseColumns = [
  "type",
  "title",
  "director",
  "cast",
  "country",
  "releaseYear",
  "rating",
  "duration",
  "description",
];
const allCategoryFields = [

  "action", "adventure", "animeSeriesInternationalTVShows", "britishTVShowsDocuseriesInternationalTVShows",
  "children", "comedies", "comediesDramasInternationalMovies", "comediesInternationalMovies",
  "comediesRomanticMovies", "crimeTVShowsDocuseries", "documentaries", "documentariesInternationalMovies",
  "docuseries", "dramas", "dramasInternationalMovies", "dramasRomanticMovies", "familyMovies", "fantasy",
  "horrorMovies", "internationalMoviesThrillers", "internationalTVShowsRomanticTVDramas",
  "kidsTV", "languageTVShows", "musicals", "natureTV", "realityTV", "spirituality", "tvAction",
  "tvComedies", "tvDramas", "talkShowsTVComedies", "thrillers"
];

function Admin() {
  const [rows, setRows] = useState<Movie[]>([]);
  const [page, setPage] = useState(0); // 0-based index
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [newMovie, setNewMovie] = useState<any>({

    showId: '', title: '', type: '', director: '', cast: '',
    country: '', releaseYear: 0, rating: 0, duration: 0,
    description: '',
    ...Object.fromEntries(allCategoryFields.map((c) => [c, 0]))
  });

  const getCategoryString = (movie: any) =>
    allCategoryFields.filter((cat) => movie[cat] === 1).join(', ');

  const fetchPage = async (page: number, size: number) => {
    try {
      const { movies, total } = await fetchMoviesPaginated(page + 1, size);
      const knownFields = new Set(baseColumns.concat(['showId']));
      const formattedRows = movies.map((item) => {
        const categoryKeys = Object.keys(item).filter(
          (key) => !knownFields.has(key) && item[key as keyof Movie] === 1
        );
        return {
          ...item,
          category: categoryKeys.join(', ')
        };
      });
      setRows(formattedRows);
      setTotalRows(total);
    } catch (error) {
      console.error('Error fetching paginated movies:', error);
    }
  };

  useEffect(() => {
    fetchPage(page, rowsPerPage);
  }, [page, rowsPerPage]);


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewMovie((prev: any) => ({ ...prev, [name]: value }));
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

      } else {
        const response = await addMovie(movieToSend);
        if (response && response.success) {
          movieToSend.showId = response.newId;
        }
      }
      fetchPage(page, rowsPerPage);
    } catch (error) {
      console.error("Error saving movie:", error);
    } finally {
      setNewMovie({

        showId: '', title: '', type: '', director: '', cast: '',
        country: '', releaseYear: 0, rating: 0, duration: 0,
        description: '',
        ...Object.fromEntries(allCategoryFields.map((c) => [c, 0]))

      });
      setEditMode(false);
      setShowForm(false);
    }
  };


  const handleDeleteClick = (id: string) => {

    setSelectedMovieId(id);
    setDeleteConfirmOpen(true);
  };
  const handleConfirmDelete = async () => {
    if (selectedMovieId !== null) {
      try {
        await deleteMovie(selectedMovieId);

        fetchPage(page, rowsPerPage);

      } catch (error) {
        console.error("Error deleting movie:", error);
      } finally {
        setDeleteConfirmOpen(false);
        setSelectedMovieId(null);
      }
    }
  };
  const handleEditClick = (movie: any) => {
    setNewMovie({
      ...movie,
      ...Object.fromEntries(allCategoryFields.map((c) => [c, movie[c] ?? 0])),
    });
    setEditMode(true);
    setShowForm(true);
  };
  return (


      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', p: 2 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          CineNiche Movie Administration
        </Typography>

        <span>
          <Logout>
            Logout <AuthorizedUser value="email" />
          </Logout>
        </span>

        <Button variant="contained" onClick={() => { setShowForm(true); setEditMode(false); }} sx={{ mb: 2 }}>

          Add Movie
        </Button>
        <Paper
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <TableContainer
            sx={{
              flex: 1,
              backgroundColor: "#FDF2CD", // cream background
            }}
          >
            <Table stickyHeader aria-label="movie table">
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "#C4453C",
                  }}
                >
                  {[...baseColumns, "category", "actions"].map((col) => (
                    <TableCell
                      key={col}
                      sx={{
                        color: "#FDF2CD",
                        fontWeight: "bold",
                        backgroundColor: "#C4453C", // header cell color
                      }}
                    >
                      {col === "actions"
                        ? "Actions"
                        : col.charAt(0).toUpperCase() + col.slice(1)}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>

                {rows.map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.showId}>
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
            count={totalRows}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>


        {/* Add/Edit Dialog */}
        <Dialog open={showForm} onClose={() => setShowForm(false)} maxWidth="md" fullWidth>
          <DialogTitle>{editMode ? 'Edit Movie' : 'Add New Movie'}</DialogTitle>
          <DialogContent dividers>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

              {baseColumns.map((field) => (
                <TextField
                  key={field}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  name={field}
                  value={String(newMovie[field] ?? "")}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{
                    input: { color: "#FDF2CD" },
                    label: { color: "#FDF2CD" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#FDF2CD",
                      },
                      "&:hover fieldset": {
                        borderColor: "#FDF2CD",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#FDF2CD",
                      },
                    },
                  }}
                />
              ))}
              <Typography variant="subtitle1" sx={{ color: "#FDF2CD" }}>
                Categories
              </Typography>
              <FormGroup>
                {allCategoryFields.map((cat) => (
                  <FormControlLabel
                    key={cat}
                    control={
                      <Checkbox
                        checked={newMovie[cat] === 1}
                        onChange={handleCheckboxChange}
                        name={cat}
                        sx={{
                          color: "#FDF2CD",
                          "&.Mui-checked": {
                            color: "#C4453C",
                          },
                        }}
                      />
                    }
                    label={<span style={{ color: "#FDF2CD" }}>{cat}</span>}
                  />
                ))}
              </FormGroup>
            </Box>
          </DialogContent>
          <DialogActions sx={{ backgroundColor: "#2F2A26" }}>
            <Button
              onClick={() => setShowForm(false)}
              sx={{ color: "#C4453C", fontWeight: "bold" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleFormSubmit}
              variant="contained"
              sx={{
                backgroundColor: "#C4453C",
                color: "#FDF2CD",
                "&:hover": {
                  backgroundColor: "#A73930",
                },
              }}
            >
              {editMode ? "Update" : "Submit"}
            </Button>
          </DialogActions>
        </Dialog>
        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteConfirmOpen}
          onClose={() => setDeleteConfirmOpen(false)}
        >
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent dividers>
            Are you sure you want to delete this movie?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteConfirmOpen(false)} color="inherit">
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              color="error"
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>


  );
}
export default Admin;