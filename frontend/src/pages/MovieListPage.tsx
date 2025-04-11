
import MovieListCards from "../components/MovieListCards";
import { RequireRole } from "../components/RequireRole";


function MovieListPage () {
    return (
        <>
        <RequireRole role="user">
        <MovieListCards />
        </RequireRole>
        </>
    );
}

export default MovieListPage