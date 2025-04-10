using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace INTEX1_4.API.Data;

public class MoviesUser
{
    [Key]
    [Column("user_id")]
    public int UserId { get; set; }

    [Column("name")]
    public string Name { get; set; }

    [Column("phone")]
    public string Phone { get; set; }

    [Column("email")]
    public string Email { get; set; }

    [Column("age")]
    public int? Age { get; set; }

    [Column("gender")]
    public string Gender { get; set; }

    [Column("Netflix")]
    public bool Netflix { get; set; }

    [Column("Amazon_Prime")]
    public bool AmazonPrime { get; set; }

    [Column("Disney")]
    public bool DisneyPlus { get; set; }

    [Column("Paramount")]
    public bool ParamountPlus { get; set; }

    [Column("Max")]
    public bool Max { get; set; }

    [Column("Hulu")]
    public bool Hulu { get; set; }

    [Column("Apple_TV")]
    public bool AppleTvPlus { get; set; }

    [Column("Peacock")]
    public bool Peacock { get; set; }

    [Column("city")]
    public string City { get; set; }

    [Column("state")]
    public string State { get; set; }

    [Column("zip")]
    public int? Zip { get; set; }
}