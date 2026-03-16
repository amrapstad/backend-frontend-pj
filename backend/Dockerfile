FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:9.0-noble AS build
ARG TARGETARCH
WORKDIR /source

COPY --link *.csproj .
RUN dotnet restore -a $TARGETARCH

COPY --link . .
RUN dotnet publish -a $TARGETARCH --no-restore -o /backend

FROM docker pull mcr.microsoft.com/dotnet/aspnet:10.0
ENV \
    LC_ALL=en_US.UTF-8 \
    LANG=en_US.UTF-8 \
    ASPNETCORE_URLS=http://+:5000

WORKDIR /nackend
COPY --link --from=build /backend .
USER $BACKEND_UID
ENTRYPOINT ["./backend"]