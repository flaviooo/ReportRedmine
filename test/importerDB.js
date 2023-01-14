exports.importDump = (DIR, moveTo) => {

    let pathImport = path.normalize(DIR + process.env.DUMP_AWS_REMOTE_PATH + path.sep + moveTo);
    let execution = process.env.DUMP_EXEC + pathImport;
    console.log("execution: " + execution);
    exec(execution, (err, stdout, stderr) => {
      if (err) { console.error(`exec error: ${err}`); return; }
      console.log("Succesfully imported");
    });
  };