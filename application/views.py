"""
Routes and views for the flask application.
"""
import random

from datetime import datetime
from flask import render_template
from application import app


@app.route('/')
@app.route('/en-us/sql-server/developer-get-started/')
@app.route('/en-us/sql-server/home/')
def home():
  return render_template('home.html')

# C# Tutorials
@app.route('/en-us/sql-server/developer-get-started/csharp-mac')
def csharpmac():
  return render_template('csharp-mac.html')

@app.route('/en-us/sql-server/developer-get-started/csharp-ubuntu')
def csharpubuntu():
  return render_template('csharp-ubuntu.html')

@app.route('/en-us/sql-server/developer-get-started/csharp-rhel')
def csharprhel():
  return render_template('csharp-rhel.html')

@app.route('/en-us/sql-server/developer-get-started/csharp-sles')
def csharpsles():
  return render_template('csharp-sles.html')

@app.route('/en-us/sql-server/developer-get-started/csharp-windows')
def csharpwindows():
  return render_template('csharp-windows.html')

# Go Tutorials

@app.route('/en-us/sql-server/developer-get-started/go-ubuntu')
def goubuntu():
  return render_template('go-ubuntu.html')

# Java Tutorials

@app.route('/en-us/sql-server/developer-get-started/java-mac')
def javamac():
  return render_template('java-mac.html')

@app.route('/en-us/sql-server/developer-get-started/java-ubuntu')
def javaubuntu():
  return render_template('java-ubuntu.html')

@app.route('/en-us/sql-server/developer-get-started/java-sles')
def javasles():
  return render_template('java-sles.html')

@app.route('/en-us/sql-server/developer-get-started/java-rhel')
def javarhel():
  return render_template('java-rhel.html')

@app.route('/en-us/sql-server/developer-get-started/java-windows')
def javawindows():
  return render_template('java-windows.html')

# Node Tutorials

@app.route('/en-us/sql-server/developer-get-started/node-mac')
def nodemac():
  return render_template('node-mac.html')

@app.route('/en-us/sql-server/developer-get-started/node-linux')
def nodelinux():
  return render_template('node-linux.html')

@app.route('/en-us/sql-server/developer-get-started/node-ubuntu')
def nodeubuntu():
  return render_template('node-ubuntu.html')

@app.route('/en-us/sql-server/developer-get-started/node-sles')
def nodesles():
  return render_template('node-sles.html')

@app.route('/en-us/sql-server/developer-get-started/node-rhel')
def noderhel():
  return render_template('node-rhel.html')

@app.route('/en-us/sql-server/developer-get-started/node-windows')
def nodewindows():
  return render_template('node-windows.html')

# PHP Tutorials

@app.route('/en-us/sql-server/developer-get-started/php-ubuntu')
def phpubuntu():
  return render_template('php-ubuntu.html')

@app.route('/en-us/sql-server/developer-get-started/php-rhel')
def phprhel():
  return render_template('php-rhel.html')

@app.route('/en-us/sql-server/developer-get-started/php-windows')
def phpwindows():
  return render_template('php-windows.html')

@app.route('/en-us/sql-server/developer-get-started/php-sles')
def phpsles():
  return render_template('php-sles.html')

@app.route('/en-us/sql-server/developer-get-started/php-mac')
def phpmac():
  return render_template('php-mac.html') 

# Python Tutorials

@app.route('/en-us/sql-server/developer-get-started/python-mac')
def pythonmac():
  return render_template('python-mac.html')

@app.route('/en-us/sql-server/developer-get-started/python-ubuntu')
def pythonubuntu():
  return render_template('python-ubuntu.html')

@app.route('/en-us/sql-server/developer-get-started/python-rhel')
def pythonrhel():
  return render_template('python-rhel.html')

@app.route('/en-us/sql-server/developer-get-started/python-sles')
def pythonsles():
  return render_template('python-sles.html')

@app.route('/en-us/sql-server/developer-get-started/python-windows')
def pythonwindows():
  return render_template('python-windows.html')

# Ruby Tutorials
@app.route('/en-us/sql-server/developer-get-started/ruby-mac')
def rubymac():
  return render_template('ruby-mac.html')

@app.route('/en-us/sql-server/developer-get-started/ruby-ubuntu')
def rubyubuntu():
  return render_template('ruby-ubuntu.html')

@app.route('/en-us/sql-server/developer-get-started/ruby-rhel')
def rubyrhel():
  return render_template('ruby-rhel.html')

@app.route('/en-us/sql-server/developer-get-started/ruby-sles')
def rubysles():
  return render_template('ruby-sles.html')

# R Tutorials

@app.route('/en-us/sql-server/developer-get-started/r')
def rlang():
  return render_template('RPrediction.html')

@app.route('/en-us/sql-server/developer-get-started/rprediction')
def rpredict():
  return render_template('RPrediction.html')

@app.route('/en-us/sql-server/developer-get-started/rclustering')
def rclust():
  return render_template('RClustering.html')

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404
