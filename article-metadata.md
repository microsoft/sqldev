# Metadata for tutorials
The metadata section looks like this:
  ```
---
layout: page-steps
language: <programming language>
title: <operating system>
permalink: /<programming language>/<operating system>/<platform>
redirect_from:
  - /<programming language>/
  - /<programming language>/<operating system>/<platform>/<step number>
  - /<programming language>/<operating system>/<platform>/step/
  - /<programming language>/<operating system>/<platform>/step/<step number>
---
  ```
  
  ## Attributes and values

**language**: Required; Programming language the tutorial is for. Example: C#, Python, Ruby, etc.

**title**: Required; Operating system/platform for the tutorial. Example: Ubuntu, RHEL, SLES, Windows, macOS.

**platform**: Required; Instructions for SQL server or Azure SQL platform. Example: server, az.

**permalink**: Required; Programming language and the operating system the tutorial is for. If this is a **C#** tutorial, please use the full word "csharp" in this section. 

**redirect_from**: Required; Programming language, operating system, and step number. If this is a **C#** tutorial, please use the full word "csharp" in this section. 
