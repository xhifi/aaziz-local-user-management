const shell = (input) => {
  return new Promise((resolve, reject) => {
    require("child_process").exec(input, (err, stdout, stderr) => {
      if (stderr || err) {
        console.log(`cmd error`, stderr);
        console.log(`js error`, err);
        reject({ cmdErr: stderr, jsErr: err });
      }
      if (err) {
        console.log(`js error`, err);
        reject(err);
      }
      resolve(stdout);
    });
  });
};

module.exports = shell;
