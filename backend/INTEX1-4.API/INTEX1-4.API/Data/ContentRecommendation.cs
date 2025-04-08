using System.ComponentModel.DataAnnotations.Schema;

namespace INTEX1_4.API.Data
{
    public class ContentRecommendation
    {
        [Column("show_id_1")]
        public string ShowId1 { get; set; }

        [Column("show_id_2")]
        public string ShowId2 { get; set; }

        [Column("similarity")]
        public double Similarity { get; set; }
    }

    [Table("ContentRecommendations")]
    public class ContentRecommendationBase : ContentRecommendation { }

    [Table("ContentRecommendationsAction")]
    public class ContentRecommendationAction : ContentRecommendation { }

    [Table("ContentRecommendationsComedies")]
    public class ContentRecommendationComedies : ContentRecommendation { }

    [Table("ContentRecommendationsDramas")]
    public class ContentRecommendationDramas : ContentRecommendation { }

    [Table("ContentRecommendationsFantasy")]
    public class ContentRecommendationFantasy : ContentRecommendation { }
}