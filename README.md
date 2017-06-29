
# SQL Server Tutorials Documentation Contributor Guide
You've found the GitHub repository that houses the source for the SQL Server tutorials that are published on [http://aka.ms/sqldev](http://aka.ms/sqldev).


## Contribute to SQL Server tutorials 
Firstly, thank you for your interest in contributing to our tutorials. We use Jekyll + Markdown for our documentation. To contribute, simply make a pull request (PR) with changes in the Markdown files or add new Markdown files. We will do our best to review changes within 24 hours. 

## Repository organization
The content in the repository follows the standard Jekyll folder structure:

### \pages
The *\pages* folder contains the documentation articles formatted as markdown files with an *.md* extension for each langauge & operating system combination.

### \_includes
This folder contains reusable content sections to be included in one or more articles. This folder also contains base HTML files that are used across the site.

### \_sass
This folder contains the CSS files used to style the website

### \assets
This folder contains images and js scripts used in the tutorials website.

## Use GitHub
For information about how to contribute, how to use the GitHub UI to contribute small changes, and how to fork and clone the repository for more significant contributions, see [Authoring in GitHub](authoring-in-github.md).

### Branches
We recommend that you create local working branches that target a specific scope of change. Each branch should be limited to a single concept/article both to streamline work flow and reduce the possibility of merge conflicts. The following efforts are of the appropriate scope for a new branch:

* A new article (and associated images)
* Spelling and grammar edits on an article.
* Applying a single formatting change across a large set of articles (e.g. new copyright footer).

## How to use markdown to format your topic
All the articles in this repository use GitHub flavored markdown.  Here's a list of resources.

* [Markdown basics](https://help.github.com/articles/markdown-basics/)
* [Markdown cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

## Article metadata
Article metadata enables certain functionalities, such as author attribution, contributor attribution, breadcrumbs, article descriptions, and SEO optimizations as well as reporting Microsoft uses to evaluate the performance of the content. So, the metadata is important! [Here's the guidance for making sure your metadata is done right](/article-metadata.md).

## Labels

Automated labels are assigned to pull requests to help us manage the pull request workflow and to help let you know what's going on with your pull request:

* Contribution License Agreement related
  * cla-not-required: The change is relatively minor and does not require that you sign a CLA.
  * cla-required: The scope of the change is relatively large and requires that you sign a CLA.
  * cla-signed: The contributor signed the CLA, so the pull request can now move forward for review.

## Microsoft Open Source Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
