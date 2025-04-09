

namespace INTEX1_4.API.Data;

using System.ComponentModel.DataAnnotations.Schema;

public class MovieRating
{
    [Column("user_id")]
    public int UserId { get; set; }

    [Column("show_id")]
    public string ShowId { get; set; }

    [Column("rating")]
    public int Rating { get; set; }
    
    
}


