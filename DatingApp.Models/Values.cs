using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DatingApp.Models
{
    public class Values
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(20)]
        public string ValueName { get; set; }
    }
}
