---
layout: page-steps
language: C#
title: macOS
permalink: /csharp/macos/
redirect_from:
  - /csharp/
  - /csharp/macos/step/
  - /csharp/macos/step/1
---

> In this section, you will get SQL Server 2017 on Docker. After that you will install the necessary dependencies to create .NET Core apps with SQL Server.

## Step 1.1 Install SQL Server
{% include partials/install_sql_server_mac.md %}

## Step 1.2 Install Homebrew and .NET Core

If you already have .NET Core installed on your machine, skip this step. Install Homebrew, OpenSSL, and .NET Core using the following commands. 

1. Install Homebrew.

    {% include partials/install_homebrew.md %}

2. Restart the terminal session.

3. Update Homebrew and install OpenSSL.

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

4. Ensure that OpenSSL is set up properly by running the following commands.

    ```terminal
    ln -s /usr/local/opt/openssl/lib/libcrypto.1.0.0.dylib /usr/local/lib/
    ln -s /usr/local/opt/openssl/lib/libssl.1.0.0.dylib /usr/local/lib
    ```

5. Install .NET Core by downloading the **[official installer](https://aka.ms/dotnet-sdk-2.0.0-preview2-osx-x64)**. This installer will install the tools and put them on your PATH so you can run dotnet from the Console.

> You have successfully installed .NET Core on your Mac. You now have everything you need to start writing your C# apps with SQL Server!
