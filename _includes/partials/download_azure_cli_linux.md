
1.  This page follows instructions from this **[site](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-zypper?view=azure-cli-latest)**.
1.  Install the Azure CLI:

```terminal
sudo zypper install -y curl
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo zypper addrepo --name 'Azure CLI' --check https://packages.microsoft.com/yumrepos/azure-cli azure-cli
sudo zypper install --from azure-cli azure-cli
```

You may have to reboot your machine for these libraries to take effect.

1.  Open a new instance of the command window and type az login. Follow the instructions that follow to authenticate.

```terminal
az login
```

**Please Note** You may have to login again to your machine after restart or long periods of inactivity.

At this time, you have authenticated yourself and your machine to Azure, so your application can connect. 