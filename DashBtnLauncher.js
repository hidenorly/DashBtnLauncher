/*
   Copyright 2017 hidenorly

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

*/

const DashButton = require("dash-button");

function getArgvIndex(argv, checkWord)
{
  var checkWord = checkWord.toLowerCase()
  for(var i=2, c=argv.length; i<c; i++){
    var anArg = argv[i].toLowerCase();

    if( anArg.indexOf(checkWord)!=-1 ){
      return i;
    }
  }
  return -1;
}

function getArgvWithKey(argv, key, remaining=false)
{
  var index = getArgvIndex(argv, key);
  if( (index+1) < argv.length ){
    var result=argv[index+1];
    if(remaining){
      for(var i=index+1, c=argv.length; i<c; i++){
        result = result + " " + argv[i];
      }
    }
    return result;
  }
  return null;
}

function checkArg(argv, checkWord)
{
  if( getArgvIndex(argv, checkWord)!=-1 ){
    return true;
  }
  return false;
}

var exec = require('child_process').exec;
function exec_command(exec_cmd)
{
 var anExec = exec(exec_cmd,
  function (error, stdout, stderr) {
    console.log(stdout);
    //console.log(stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  }
 );
}

// parse command line argument
var argv = process.argv;
if( (argv.length<=2) || (checkArg(argv, "-h")) ){
  console.log("DashBtnLauncher\nCopyright 2017 hidenorly\n-b\tSet target dash button mac address\n-e\tSet external command to execute when dash button is executed");
} else {
  var macAddr = getArgvWithKey(argv, "-b");
  var execCmd = getArgvWithKey(argv, "-e", true);

  let dashButton = new DashButton(macAddr);

  dashButton.addListener(() => {
    console.log("exec: "+execCmd);
    exec_command(execCmd);
  });
}
