using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Webshop.Domain;

namespace Webshop.JWT
{
    public interface IJWTAuthenticatorManager
    {
        string Authenticate(Customer customer);
    }

    public class JwtAuthenticationManager : IJWTAuthenticatorManager
    {
        private readonly string tokenKey;

        public JwtAuthenticationManager(string tokenKey)
        {
            this.tokenKey = tokenKey;
        }

        public string Authenticate(Customer customer)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(tokenKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, (customer.Id).ToString()),
                    new Claim(ClaimTypes.Name, customer.Login.Email),
                    new Claim(ClaimTypes.Role, customer.Login.Role)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
