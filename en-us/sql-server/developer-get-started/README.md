
# SQL Server Tutorials Documentation Contributor Guide
You've found the GitHub repository that houses the source for the SQL Server tutorials that is published on [http://aka.ms/sqldev](http://aka.ms/sqldev).


## Contribute to SQL Server tutorials 
Firstly, thank you for your interest in contributing to our tutorials. We use Jekyll + Markdown for our documentation. To contribute, simply make a PR with changes in the Markdown files/new Markdown files. We will review it within 24 hours. 

## Repository organization
The content in the repository follows the standard Jekyll folder structure:

### \pages
The *\pages* folder contains the documentation articles formatted as markdown files with an *.md* extension for each langauge + OS comibination

### \_includes
This folder contains reusable content sections to be included in one or more articles. This folder also contains base html files that are used accross the site.

### \_sass
This folder contains the css files used the style the website

### \assets
This folder contains images and js scripts used in the tutorials website


## Use GitHub, Git, and this repository
For information about how to contribute, how to use the GitHub UI to contribute small changes, and how to fork and clone the repository for more significant contributions, see [Install and set up tools for authoring in GitHub](contributor-guide/tools-and-setup.md).

If you install GitBash and choose to work locally, the steps for creating a new local working branch, making changes, and submitting the changes back to the main branch are listed in [Git commands for creating a new article or updating an existing article](contributor-guide/git-commands-for-master.md)

### Branches
We recommend that you create local working branches that target a specific scope of change. Each branch should be limited to a single concept/article both to streamline work flow and reduce the possibility of merge conflicts.  The following efforts are of the appropriate scope for a new branch:

* A new article (and associated images)
* Spelling and grammar edits on an article.
* Applying a single formatting change across a large set of articles (e.g. new copyright footer).

## How to use markdown to format your topic
All the articles in this repository use GitHub flavored markdown.  Here's a list of resources.

* [Markdown basics](https://help.github.com/articles/markdown-basics/)
* [Printable markdown cheatsheet](./contributor-guide/media/documents/markdown-cheatsheet.pdf?raw=true)

## Article metadata
Article metadata enables certain functionalities, such as author attribution, contributor attribution, breadcrumbs, article descriptions, and SEO optimizations as well as reporting Microsoft uses to evaluate the performance of the content. So, the metadata is important! [Here's the guidance for making sure your metadata is done right](contributor-guide/article-metadata.md).

## Microsoft Open Source Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
