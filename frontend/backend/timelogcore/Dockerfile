# Use the .NET 6.0 SDK as a base
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env

# Set the working directory
WORKDIR /app

# Copy csproj and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the files
COPY . ./

# Build the application
RUN dotnet publish -c Release -o out

# Use the .NET 6.0 runtime as a base
FROM mcr.microsoft.com/dotnet/aspnet:6.0

# Set the working directory
WORKDIR /app

# Copy the published files from the build environment
COPY --from=build-env /app/out .

# Set the entry point for the application
ENTRYPOINT ["dotnet", "timelogcore.dll"]

