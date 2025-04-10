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
        [StringLength(4)] // or make it int if you want stricter control
        public string? ReleaseYear { get; set; }

        [Column("rating")]
        [StringLength(10)]
        public string? Rating { get; set; }

        [Column("duration")]
        [StringLength(50)]
        public string? Duration { get; set; }

        [Column("description")]
        [StringLength(1000)] // limit long HTML/JS inputs
        public string? Description { get; set; }

        // You can leave category fields as-is (nullable ints), they’re low-risk.
    

        // Category fields (nullable)
        [Column("Action")] public int? Action { get; set; }
        [Column("Adventure")] public int? Adventure { get; set; }
        [Column("Anime Series International TV Shows")] public int? AnimeSeriesInternationalTVShows { get; set; }
        [Column("British TV Shows Docuseries International TV Shows")] public int? BritishTVShowsDocuseriesInternationalTVShows { get; set; }
        [Column("Children")] public int? Children { get; set; }
        [Column("Comedies")] public int? Comedies { get; set; }
        [Column("Comedies Dramas International Movies")] public int? ComediesDramasInternationalMovies { get; set; }
        [Column("Comedies International Movies")] public int? ComediesInternationalMovies { get; set; }
        [Column("Comedies Romantic Movies")] public int? ComediesRomanticMovies { get; set; }
        [Column("Crime TV Shows Docuseries")] public int? CrimeTVShowsDocuseries { get; set; }
        [Column("Documentaries")] public int? Documentaries { get; set; }
        [Column("Documentaries International Movies")] public int? DocumentariesInternationalMovies { get; set; }
        [Column("Docuseries")] public int? Docuseries { get; set; }
        [Column("Dramas")] public int? Dramas { get; set; }
        [Column("Dramas International Movies")] public int? DramasInternationalMovies { get; set; }
        [Column("Dramas Romantic Movies")] public int? DramasRomanticMovies { get; set; }
        [Column("Family Movies")] public int? FamilyMovies { get; set; }
        [Column("Fantasy")] public int? Fantasy { get; set; }
        [Column("Horror Movies")] public int? HorrorMovies { get; set; }
        [Column("International Movies Thrillers")] public int? InternationalMoviesThrillers { get; set; }
        [Column("International TV Shows Romantic TV Shows TV Dramas")] public int? InternationalTVShowsRomanticTVDramas { get; set; }
        [Column("Kids' TV")] public int? KidsTV { get; set; }
        [Column("Language TV Shows")] public int? LanguageTVShows { get; set; }
        [Column("Musicals")] public int? Musicals { get; set; }
        [Column("Nature TV")] public int? NatureTV { get; set; }
        [Column("Reality TV")] public int? RealityTV { get; set; }
        [Column("Spirituality")] public int? Spirituality { get; set; }
        [Column("TV Action")] public int? TVAction { get; set; }
        [Column("TV Comedies")] public int? TVComedies { get; set; }
        [Column("TV Dramas")] public int? TVDramas { get; set; }
        [Column("Talk Shows TV Comedies")] public int? TalkShowsTVComedies { get; set; }
        [Column("Thrillers")] public int? Thrillers { get; set; }
    }
}
