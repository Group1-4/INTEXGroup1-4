using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace INTEX1_4.API.Data
{
    public class Movie
    {
        [Key]
        [Column("show_id")]
        [Required]
        [StringLength(50)]
        public string ShowId { get; set; }

        [Column("type")]
        [StringLength(50)]
        public string? Type { get; set; }

        [Column("title")]
        [Required]
        [StringLength(200)]
        public string? Title { get; set; }

        [Column("director")]
        [StringLength(100)]
        public string? Director { get; set; }

        [Column("cast")]
        [StringLength(500)]
        public string? Cast { get; set; }

        [Column("country")]
        [StringLength(100)]
        public string? Country { get; set; }

        [Column("release_year")]
        [StringLength(4)]
        public string? ReleaseYear { get; set; }

        [Column("rating")]
        [StringLength(10)]
        public string? Rating { get; set; }

        [Column("duration")]
        [StringLength(50)]
        public string? Duration { get; set; }

        [Column("description")]
        [StringLength(1000)]
        public string? Description { get; set; }

        // Adjusted Category fields (nullable ints)
        [Column("Action")] public int? Action { get; set; }
        [Column("Adventure")] public int? Adventure { get; set; }
        [Column("Anime_Series_International_TV_Shows")] public int? AnimeSeriesInternationalTVShows { get; set; }
        [Column("British_TV_Shows_Docuseries_International_TV_Shows")] public int? BritishTVShowsDocuseriesInternationalTVShows { get; set; }
        [Column("Children")] public int? Children { get; set; }
        [Column("Comedies")] public int? Comedies { get; set; }
        [Column("Comedies_Dramas_International_Movies")] public int? ComediesDramasInternationalMovies { get; set; }
        [Column("Comedies_International_Movies")] public int? ComediesInternationalMovies { get; set; }
        [Column("Comedies_Romantic_Movies")] public int? ComediesRomanticMovies { get; set; }
        [Column("Crime_TV_Shows_Docuseries")] public int? CrimeTVShowsDocuseries { get; set; }
        [Column("Documentaries")] public int? Documentaries { get; set; }
        [Column("Documentaries_International_Movies")] public int? DocumentariesInternationalMovies { get; set; }
        [Column("Docuseries")] public int? Docuseries { get; set; }
        [Column("Dramas")] public int? Dramas { get; set; }
        [Column("Dramas_International_Movies")] public int? DramasInternationalMovies { get; set; }
        [Column("Dramas_Romantic_Movies")] public int? DramasRomanticMovies { get; set; }
        [Column("Family_Movies")] public int? FamilyMovies { get; set; }
        [Column("Fantasy")] public int? Fantasy { get; set; }
        [Column("Horror_Movies")] public int? HorrorMovies { get; set; }
        [Column("International_Movies_Thrillers")] public int? InternationalMoviesThrillers { get; set; }
        [Column("International_TV_Shows_Romantic_TV_Shows_TV_Dramas")] public int? InternationalTVShowsRomanticTVDramas { get; set; }
        [Column("Kids_TV")] public int? KidsTV { get; set; }
        [Column("Language_TV_Shows")] public int? LanguageTVShows { get; set; }
        [Column("Musicals")] public int? Musicals { get; set; }
        [Column("Nature_TV")] public int? NatureTV { get; set; }
        [Column("Reality_TV")] public int? RealityTV { get; set; }
        [Column("Spirituality")] public int? Spirituality { get; set; }
        [Column("TV_Action")] public int? TVAction { get; set; }
        [Column("TV_Comedies")] public int? TVComedies { get; set; }
        [Column("TV_Dramas")] public int? TVDramas { get; set; }
        [Column("Talk_Shows_TV_Comedies")] public int? TalkShowsTVComedies { get; set; }
        [Column("Thrillers")] public int? Thrillers { get; set; }
    }
}
