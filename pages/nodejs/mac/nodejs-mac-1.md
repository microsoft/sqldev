---
layout: page-steps
language: C#
title: macOS
permalink: /csharp/mac/
redirect_from:
  - /csharp/
  - /csharp/mac/step/
  - /csharp/mac/step/1
---

> In this section, you will get SQL Server vNext running on Docker. After that you will install the necessary dependencies to run .NET Core.

## Step 1.1 Install SQL Server
{% include partials/install_sql_server_mac.md %}

## Step 1.2 Install Homebrew and .NET Core

If you already have .NET Core installed on your machine, skip this step. Install Homebrew, OpenSSL, and .NET Core using the following commands. 

1. Install Homebrew.

    {% include partials/install_homebrew.md %}

1. Restart the terminal session.

1. Update Homebrew and install OpenSSL.

    ```terminal
    brew update
    brew install openssl
    ```

    ```results
    ==> Downloading https://homebrew.bintray.com/bottles/openssl-1.0.2j.el_capitan.bottle.t
    ######################################################################## 100.0%
    ==> Pouring openssl-1.0.2j.el_capitan.bottle.tar.gz
    ==> Using the sandbox
    ==> Caveats
    …
    ==> Summary
      /usr/local/Cellar/openssl/1.0.2j: 1,695 files, 12M
    ```

1. Ensure that OpenSSL is set up properly by running the following commands.

    ```terminal
    ln -s /usr/local/opt/openssl/lib/libcrypto.1.0.0.dylib /usr/local/lib/
    ln -s /usr/local/opt/openssl/lib/libssl.1.0.0.dylib /usr/local/lib
    ```

1. Install .NET Core on macOS
    Download the **[official installer](https://go.microsoft.com/fwlink/?linkid=843444)**. This installer will install the tools and put them on your PATH so you can run dotnet from the Console.

> You have successfully installed .NET Core on your Mac. You now have everything you need to start writing your C# apps with SQL Server!
