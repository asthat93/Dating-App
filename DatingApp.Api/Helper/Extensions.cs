using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Api.Helper
{
    public static  class Extensions
    {
        public static void AddApplicationError(this HttpResponse response,string message)
        {
            response.Headers.Add("Application-Error",message);
            response.Headers.Add("Access-Control-Expose-Headear", "Application-Error");
            response.Headers.Add("Access-Controll-Allow-Origin", "*");


        }

        public static int CalculateAge(this DateTime DateOfBirth)
        {
            int age = DateTime.Today.Year - DateOfBirth.Year;
            if (DateOfBirth.AddYears(age) > DateTime.Today)
                age--;
            return age;


        }

    }
}
