# Practical jobs for Automated Testing Foundations course by EPAM

## Continuous Integration with Jenkins

### I can win

1. **Install Jenkins**
2. **Create a task whoes do a next:**
 - **Cloning a project from https://github.com/vitalliuss/helloci**
 - **Run a build triggers for target `test`**
3. **Configure triggers shedule for running every 5 minutes**

For complete this job we need do next:

 1. Install Jenkins. 

  There is different ways to install and run Jenkins, I choose manual executing jenkins.war file. Server start with command like `java -Xrs -Xmx256m -jar c:/jenkins/jenkins.war`.

 1. In *Manage Jenkins -> Manage PLugins* install plugins:
  - Git plugin
 2. In *Manage Jenkins -> Global Tool Configuration* add Maven name and path
 3. Create a new *Freestile project* named *I can win*
 4. In *Source Code Management* section select *Git* optin and fill *Repoeitory URL* field.
 5. In *Build* section add build step *Invoke top-level Maven targets*, choose Maven version and fill *Goals* wiit target name. In *Advanced* oprions fill path to POM file: `Java/pom.xml`
 6. Save and build project. Build will be a fail, in console outpuut we can see message like this: *Tests run: 5, Failures: 1, Errors: 0, Skipped: 1*
 7. In project configuration in section *Build triggers*  choose option *Build periodicaly* and fill with value: `H/5 * * * *`. 

### Bring It On

In additional to previous job we need do:
1. **Run testst after 5 minutes after git commit**
2. **Run tests every midnight at weekdays**
3. **Publish as artefact file “Java\target\surefire-reports\com.github.vitalliuss.helloci.AppTest.txt”**

For complete this job we need do next:

 1. In *Manage Jenkins -> Manage PLugins* install plugins:
  - Copy Artifact plugin
 1. In project configuration in section *Build triggers*  choose option *Build periodicaly* and fill with value: `H 0 * * 1-5`. 
 2. In project configuration in section *Build triggers*  choose option *Poll SCM* and fill with value: `H/5 * * * *` This schedule will polling a project changes from Git every 5 minutes and build project only if new commit is fetched.
 3. In project configuration in section *Post-build Actions* add action *Archive the artifacts*. In field *File to archive* fill `Java\target\surefire-reports\com.github.vitalliuss.helloci.AppTest.txt`

### Hurt Me Plenty

In additional to previous job we need do:
1. **Change  a server port to 8081**
2. **Create *slave* node and configure job to execute at this node only**
3. **Configure *Job Config History* and *thinBackup***

For complete this job we need do next:
 1. As we install Jenkis as standalone war-file, changing a port require two configuration steps:
  - In batch file that launch jenkins.war add option `--httpPort=8081` and restart the server;
  - In In *Manage Jenkins -> Configure System* in field *Jenkins URL* change the port number to `8081`. This need becouse that URL send to Jenkins Agent for configure a server to wich the agent will connect.
 2. In *Build executor status* add new permanent node. Fill fields: *name*, *Remote roor direcrory* and *Labels*. Save node.
 3. In node *Status* page see instruction for download and run agent at node.
 3. In project configuration in section *General* select option *Restrict where this project can be run* and type name of node when project will be executed.
 1. In *Manage Jenkins -> Manage PLugins* install plugins:
  - Job Configuration History Plugin
  - ThinBackup

### Hurt Me Plenty

In additional to previous job we need do:
1. **Create a user *user* and assign him rights to view jobs only**
2. **Create a parameterized job *HelloUser* which will ask as a parameter an user name and print to console *Hello, username!***
3. **With the help of goal `cobertura:cobertura` measure a test code coverage and publish it as a chart at project page**

For complete this job we need do next:

 1. In *Manage Jenkins -> Manage PLugins* install plugins:
  - Code Coverage API plugin
  - Matrix Authorization Strategy plugin
 2. In *Manage Jenkins -> Manage Users* create new user.
 3. In *Manage Jenkins -> Configure global security* in field *Authorization* choose *Matrix-based security*, add created user and assign *Read* rigts to sections *Overall*, *Job* and *View*
 4. Create a new *Freestile project* named *HelloUser*
 5. Confugure new project:
  - Check *This project is parameterized* option and add new string parameter with name `username`
  - In *Build* section add new build step *Execute Windows batch command*, set command like this: `echo Hello, %username%!`
 6. For create a code coverage report in project *I can win* do next:
  - Add a buid step *Invoke top-level Maven targets* and configure them to goal `cobertura:cobertura`. Don't forget set a path to POM-file.
  - Add a post-build action *Publish Coverage Report* and fill the *Report File Path* with `Java/target/site/cobertura/coverage.xml`
 

