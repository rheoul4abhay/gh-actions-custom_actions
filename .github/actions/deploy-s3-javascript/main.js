const core = require('@actions/core');
// const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {
  // 1) Get some input values
  const bucket = core.getInput('bucket-name', { required: true });
  const region = core.getInput('bucket-region', { required: true });
  const distFolder = core.getInput('dist-folder', { required: true });

  // 2) Upload files to S3
  const s3URI = `s3://${bucket}`;
  exec.exec(`aws s3 sync ${distFolder} ${s3URI} --region ${region}`);

  // 3) Get deployed website URL
  const websiteURL = `http://${bucket}.s3-website-${region}.amazonaws.com`;
  core.setOutput('website-url', websiteURL);
}

run();