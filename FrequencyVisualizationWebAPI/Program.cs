using FrequencyVisualization.Services;
using FrequencyVisualizationWebAPI;
using FrequencyVisualizationWebAPI.Controllers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

string connString = "Data Source = (localdb)\\MSSQLLocalDB;Initial Catalog = FrequencyVisualization; Integrated Security = True;";

builder.Services.AddScoped<ICompanyService, CompanyService>(x => new CompanyService(connString));
builder.Services.AddScoped<ISegmentService, SegmentService>(x => new SegmentService(connString));
builder.Services.AddScoped<IUserService, UserService>(x => new UserService(connString));

builder.Services.AddControllers();

builder.Services.AddAuthorization();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            // ���������, ����� �� �������������� �������� ��� ��������� ������
            ValidateIssuer = true,
            // ������, �������������� ��������
            ValidIssuer = AuthOptions.ISSUER,
            // ����� �� �������������� ����������� ������
            ValidateAudience = true,
            // ��������� ����������� ������
            ValidAudience = AuthOptions.AUDIENCE,
            // ����� �� �������������� ����� �������������
            ValidateLifetime = false,
            // ��������� ����� ������������
            IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
            // ��������� ����� ������������
            ValidateIssuerSigningKey = true,
        };
    });

var app = builder.Build();


//  1. Включаем поддержку статических файлов 
app.UseStaticFiles();

//  1. �������� ��������� ����������� ������ 
app.UseStaticFiles();

//  2. �������� � ����� ����� "/" �� login.html
app.MapGet("/", context =>
{
    context.Response.Redirect("/index.html");
    return Task.CompletedTask;
});
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
