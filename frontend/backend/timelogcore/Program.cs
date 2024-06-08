using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using timelogcore.Data;
using timelogcore.Models;
using timelogcore.Repositories;
using timelogcore.Services;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add AutoMapper
var configuration = new MapperConfiguration(cfg =>
{
    cfg.CreateMap<TimeLogDto, TimeLog>();
    cfg.CreateMap<TimeLog, TimeLogDto>();
});
IMapper mapper = configuration.CreateMapper();
builder.Services.AddSingleton(mapper);

//Services
builder.Services.AddDbContext<TimeLogDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("renderpostgres")));
builder.Services.AddScoped<ITimeLogService, TimeLogService>();
builder.Services.AddScoped<ITimeLogRepository, TimeLogRepository>();
builder.Services.AddCors();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder =>
        {
            builder.WithOrigins("http://localhost:4200")
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

var app = builder.Build();

app.UseCors(builder =>
{
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
