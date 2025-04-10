import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Movie } from "../types/Movie";
import {
  fetchMovies,
  addMovie,
  deleteMovie,
  updateMovie,
} from "../api/MoviesAPI";
import "../App.css";
import AuthorizeView from "../components/Authorizeview";

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
  "Action",
  "Adventure",
  "Anime Series International TV Shows",
  "British TV Shows Docuseries International TV Shows",
  "Children",
  "Comedies",
  "Comedies Dramas International Movies",
  "Comedies International Movies",
  "Comedies Romantic Movies",
  "Crime TV Shows Docuseries",
  "Documentaries",
  "Documentaries International Movies",
  "Docuseries",
  "Dramas",
  "Dramas International Movies",
  "Dramas Romantic Movies",
  "Family Movies",
  "Fantasy",
  "Horror Movies",
  "International Movies Thrillers",
  "International TV Shows Romantic TV Shows TV Dramas",
  "Kids' TV",
  "Language TV Shows",
  "Musicals",
  "Nature TV",
  "Reality TV",
  "Spirituality",
  "TV Action",
  "TV Comedies",
  "TV Dramas",
  "Talk Shows TV Comedies",
  "Thrillers",
];

function Admin() {
  const [rows, setRows] = useState<Movie[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [newMovie, setNewMovie] = useState<any>({
    showId: 0,
    title: "",
    type: "",
    director: "",
    cast: "",
    country: "",
    releaseYear: "",
    rating: "",
    duration: "",
    description: "",
    ...Object.fromEntries(allCategoryFields.map((c) => [c, 0])),
  });
  const [total, setTotal] = useState(0);
  const [selectedFieldText, setSelectedFieldText] = useState<string | null>(
    null
  );
  const [selectedFieldTitle, setSelectedFieldTitle] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { movies, total } = await fetchMovies(page, rowsPerPage);
        const knownFields = new Set(baseColumns.concat(["showId"]));
        const formattedRows = movies.map((item) => {
          const categoryKeys = Object.keys(item).filter(
            (key) => !knownFields.has(key) && item[key as keyof Movie] === 1
          );
          return {
            ...item,
            category: categoryKeys.join(", "),
          };
        });
        setRows(formattedRows);
        setTotal(total);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchData();
  }, [page, rowsPerPage]);

  const handleChangePage = (_event: unknown, newPage: number) => {
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
        setRows((prev) =>
          prev.map((m) =>
            m.showId === newMovie.showId
              ? { ...movieToSend, category: getCategoryString(movieToSend) }
              : m
          )
        );
      } else {
        const response = await addMovie(movieToSend);
        if (response && response.success) {
          setRows((prev) => [
            {
              ...movieToSend,
              showId: response.newId,
              category: getCategoryString(movieToSend),
            },
            ...prev,
          ]);
        }
      }
    } catch (error) {
      console.error("Error saving movie:", error);
    } finally {
      setNewMovie({
        showId: 0,
        title: "",
        type: "",
        director: "",
        cast: "",
        country: "",
        releaseYear: "",
        rating: "",
        duration: "",
        description: "",
        ...Object.fromEntries(allCategoryFields.map((c) => [c, 0])),
      });

      setEditMode(false);
      setShowForm(false);
    }
  };

  const getCategoryString = (movie: any) =>
    allCategoryFields.filter((cat) => movie[cat] === 1).join(", ");
  const handleDeleteClick = (id: string) => {
    setSelectedMovieId(id);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedMovieId !== null) {
      try {
        await deleteMovie(selectedMovieId);
        setRows((prev) =>
          prev.filter((movie) => movie.showId !== selectedMovieId)
        );
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
    <>
      <AuthorizeView>
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            p: 2,
            backgroundColor: "#FDF2CD",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                setNewMovie({
                  showId: 0,
                  title: "",
                  type: "",
                  director: "",
                  cast: "",
                  country: "",
                  releaseYear: "",
                  rating: "",
                  duration: "",
                  description: "",
                  ...Object.fromEntries(allCategoryFields.map((c) => [c, 0])),
                });
                setEditMode(false);
                setShowForm(true);
              }}
              sx={{
                backgroundColor: "#2A9D8F",
                color: "#FDF2CD",
                paddingX: 2,
                minWidth: "auto",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  backgroundColor: "#EC8922",
                },
              }}
            >
              Add Movie
            </Button>
          </Box>
          <Paper
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.15)",
              borderRadius: "8px",
            }}
          >
            <TableContainer
              sx={{
                flex: 1,
                backgroundColor: "#FDF2CD",
              }}
            >
              <Table stickyHeader aria-label="movie table">
                <TableHead>
                  <TableRow>
                    {[...baseColumns, "category", "actions"].map((col) => (
                      <TableCell
                        key={col}
                        sx={{
                          color: "#FDF2CD",
                          fontWeight: "bold",
                          backgroundColor: "#A6442E", // Changed to match the red header color
                          textTransform: "uppercase",
                          fontSize: "0.85rem",
                          letterSpacing: "0.5px",
                          padding: "12px 16px",
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
                  {rows.map((row, idx) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.showId || idx}
                      sx={{
                        backgroundColor: idx % 2 === 0 ? "#FFF9E2" : "#FDF2CD", // Alternating row colors
                        "&:hover": {
                          backgroundColor: "#FDEEBB",
                        },
                        transition: "background-color 0.2s",
                      }}
                    >
                      {[...baseColumns, "category"].map((col) => {
                        const cellValue = String(row[col as keyof Movie]);

                        if (["description", "cast"].includes(col)) {
                          return (
                            <TableCell
                              key={col}
                              sx={{
                                color: "#6C3F18",
                                maxWidth: 200,
                                padding: "10px 16px",
                                borderBottom:
                                  "1px solid rgba(166, 68, 46, 0.15)",
                              }}
                            >
                              <Box
                                component="span"
                                sx={{
                                  display: "inline-block",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  maxWidth: "160px",
                                  verticalAlign: "middle",
                                }}
                              >
                                {cellValue}
                              </Box>
                              {cellValue.length > 60 && (
                                <Button
                                  onClick={() => {
                                    setSelectedFieldTitle(
                                      col.charAt(0).toUpperCase() + col.slice(1)
                                    );
                                    setSelectedFieldText(cellValue);
                                  }}
                                  size="small"
                                  sx={{
                                    ml: 1,
                                    color: "#2A9D8F",
                                    textTransform: "none",
                                    minWidth: 0,
                                    padding: "2px 8px",
                                    borderRadius: "12px",
                                    fontSize: "0.75rem",
                                    fontWeight: "bold",
                                    "&:hover": {
                                      backgroundColor:
                                        "rgba(42, 157, 143, 0.1)",
                                    },
                                  }}
                                >
                                  View
                                </Button>
                              )}
                            </TableCell>
                          );
                        }

                        return (
                          <TableCell
                            key={col}
                            sx={{
                              color: "#6C3F18",
                              padding: "10px 16px",
                              borderBottom: "1px solid rgba(166, 68, 46, 0.15)",
                            }}
                          >
                            {cellValue}
                          </TableCell>
                        );
                      })}

                      <TableCell
                        sx={{
                          borderBottom: "1px solid rgba(166, 68, 46, 0.15)",
                          padding: "8px 16px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column", // stack vertically
                            gap: 1, // vertical space between buttons (theme spacing unit)
                            width: "fit-content", // shrink to button width; or use fixed width like "120px"
                          }}
                        >
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{
                              mr: 1,
                              width: "70px",
                              color: "#2A9D8F", // Edit text color
                              borderColor: "#2A9D8F", // Edit border color
                              "&:hover": {
                                backgroundColor: "#2A9D8F", // fill on hover
                                borderColor: "#F1602C", // border on hover
                                color: "#FDF2CD", // text on hover
                              },
                            }}
                            onClick={() => handleEditClick(row)}
                          >
                            Edit
                          </Button>

                          <Button
                            variant="outlined"
                            size="small"
                            sx={{
                              width: "70px",
                              color: "#c0392b", // Delete text color
                              borderColor: "#c0392b", // Delete border color
                              "&:hover": {
                                backgroundColor: "#c0392b", // fill on hover
                                borderColor: "#EC8922", // border on hover
                                color: "#FDF2CD", // text on hover
                              },
                            }}
                            onClick={() => handleDeleteClick(row.showId)}
                          >
                            Delete
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={total}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                backgroundColor: "#A6442E", // Matching header color
                color: "#FDF2CD",
                ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
                  {
                    color: "#FDF2CD",
                  },
                ".MuiTablePagination-select": {
                  color: "#FDF2CD",
                },
                ".MuiTablePagination-selectIcon": {
                  color: "#FDF2CD",
                },
                ".MuiTablePagination-actions": {
                  color: "#FDF2CD",
                },
                ".MuiIconButton-root": {
                  color: "#FDF2CD",
                  "&.Mui-disabled": {
                    color: "rgba(253, 242, 205, 0.5)",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(253, 242, 205, 0.1)",
                  },
                },
                ".MuiSelect-select": {
                  paddingRight: "24px !important",
                },
                ".MuiSelect-icon": {
                  color: "#FDF2CD",
                },
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "#FDF2CD",
                },
                ".MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#FDF2CD",
                },
              }}
            />
          </Paper>

          {/* Add/Edit Movie Dialog */}
          <Dialog
            open={showForm}
            onClose={() => setShowForm(false)}
            maxWidth="md"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: "8px",
                overflow: "hidden",
              },
            }}
          >
            <DialogTitle
              sx={{
                backgroundColor: "#A6442E", // Changed to match the header red color
                color: "#FDF2CD",
                fontWeight: "bold",
                padding: "16px 24px",
              }}
            >
              {editMode ? "Edit Movie" : "Add New Movie"}
            </DialogTitle>
            <DialogContent
              dividers
              sx={{
                backgroundColor: "#2F2A26",
                color: "#FDF2CD",
                padding: "24px",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "#FDF2CD",
                    fontWeight: "bold",
                    marginTop: 2,
                    marginBottom: 1,
                  }}
                >
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
                              color: "#EC8922", // Changed to orange for better visibility
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
            <DialogActions
              sx={{
                backgroundColor: "#2F2A26",
                padding: "16px 24px",
              }}
            >
              <Button
                onClick={() => setShowForm(false)}
                sx={{
                  color: "#FDF2CD",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "rgba(253, 242, 205, 0.1)",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleFormSubmit}
                variant="contained"
                sx={{
                  backgroundColor: "#2A9D8F", // Changed to teal for better contrast
                  color: "#FDF2CD",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#238A7D",
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
            PaperProps={{
              sx: {
                borderRadius: "12px",
                overflow: "hidden",
                backgroundColor: "#FDF2CD",
              },
            }}
          >
            <DialogTitle
              sx={{
                backgroundColor: "#A6442E",
                color: "#FDF2CD",
                fontWeight: "bold",
                padding: "16px 24px",
              }}
            >
              Confirm Deletion
            </DialogTitle>

            <DialogContent
              dividers
              sx={{
                padding: "24px",
                backgroundColor: "#FDF2CD",
                color: "#6C3F18",
                fontSize: "1rem",
                fontFamily: "CreatoDisplay, sans-serif",
              }}
            >
              <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
                Are you sure you want to delete this movie?
              </Typography>
            </DialogContent>

            <DialogActions
              sx={{
                backgroundColor: "#FDF2CD",
                padding: "16px 24px",
                justifyContent: "space-between",
              }}
            >
              <Button
                onClick={() => setDeleteConfirmOpen(false)}
                sx={{
                  color: "#A6442E",
                  fontWeight: "bold",
                  border: "1px solid #A6442E",
                  borderRadius: "6px",
                  "&:hover": {
                    backgroundColor: "rgba(166, 68, 46, 0.1)",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmDelete}
                variant="contained"
                sx={{
                  backgroundColor: "#A6442E",
                  color: "#FDF2CD",
                  fontWeight: "bold",
                  borderRadius: "6px",
                  "&:hover": {
                    backgroundColor: "#8A3724",
                  },
                }}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          {/* Full Text Dialog */}
          <Dialog
            open={!!selectedFieldText}
            onClose={() => setSelectedFieldText(null)}
            maxWidth="sm"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: "8px",
                overflow: "hidden",
              },
            }}
          >
            <DialogTitle
              sx={{
                backgroundColor: "#A6442E",
                color: "#FDF2CD",
                fontWeight: "bold",
              }}
            >
              {selectedFieldTitle}
            </DialogTitle>
            <DialogContent
              dividers
              sx={{
                backgroundColor: "#FDF2CD", // Changed to match theme
                color: "#6C3F18", // Dark brown text
                padding: "24px",
              }}
            >
              <Typography
                sx={{
                  color: "#6C3F18",
                  whiteSpace: "pre-line",
                  lineHeight: 1.6,
                }}
              >
                {selectedFieldText}
              </Typography>
            </DialogContent>

            <DialogActions
              sx={{
                backgroundColor: "#FDF2CD",
                padding: "16px",
              }}
            >
              <Button
                onClick={() => setSelectedFieldText(null)}
                variant="contained"
                sx={{
                  backgroundColor: "#2A9D8F", // Using teal for "Close" button
                  color: "#FDF2CD",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#238A7D",
                  },
                }}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </AuthorizeView>
    </>
  );
}

export default Admin;
