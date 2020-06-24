1. In order to run SQL Server on your Mac, we are going to use the [SQL Server on Linux Docker Image](https://hub.docker.com/r/microsoft/mssql-server-linux/){:target="_blank" rel="noopener noreferrer"}. For this, you need to [install Docker for Mac](https://docs.docker.com/engine/installation/mac/){:target="_blank" rel="noopener noreferrer"}.
2. Configure at least 4GB of memory for your Docker environment, also consider adding multiple cores if you want to evaluate performance. You can do this in the [Preferences - Advanced](https://docs.docker.com/docker-for-mac/#advanced){:target="_blank" rel="noopener noreferrer"} option on the menu bar.
3. Next, start a new **Terminal prompt** and use the following commands to download and start the **SQL Server on Linux** Docker image. Make sure to use a strong password with special characters.

```terminal
sudo docker pull microsoft/mssql-server-linux:2017-latest
docker run -e 'HOMEBREW_NO_ENV_FILTERING=1' -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=yourStrong(!)Password' -p 1433:1433 -d microsoft/mssql-server-linux
```

> You now have SQL Server running locally in Docker! Check out the next section to continue installing prerequisites.
