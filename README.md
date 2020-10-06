# repo_comparer
 Compare different branches of a repo

# How to use
STEP1: git clone some repo  
STEP2: cd to somewhere else  
STEP3: git clone that same repo  
STEP4: git checkout some branch of the repo  
Now you have the repo on disk in 2 places, with different branches  
STEP5: Change the paths in 'paths.js' to your repos    
STEP6: node server.js    
STEP7: localhost:5000/examine.html

# Which sort of files does this work on?
.js / .py / .java -- It has tested against a react/node project. See CollectFileInformation.js for file types.

# Note:
examine.html's 'filecompare' is, um, more 'linguisticy' than 'CS' inspired - so it is slightly diffferent that normal. It is 'better' but also 'worse'. It looks to see if a line is used anywhere in both files that are being compared, rather than for 'exact matches'. 

