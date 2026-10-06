using GameStore.Api.Data;
using GameStore.Api.Endpoints;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: MyAllowSpecificOrigins,
        policy =>
        {
            policy
                .WithOrigins("http://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod();
        }
    );
});

builder.Services.AddValidation();
builder.AddGameStoreDb();

var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);
app.MapGamesEndpoints();
app.MapGenresEndpoints();
app.MigrateDb();
app.Run();
