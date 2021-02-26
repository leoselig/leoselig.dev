import { readFileSync, writeFileSync } from "fs";

import shell from "shelljs";

import { getEnvironmentVariable } from "./environmentVariables";

const AWS_S3_BUCKET_NAME = getEnvironmentVariable("AWS_S3_BUCKET_NAME");
const GITHUB_SHA = getEnvironmentVariable("GITHUB_SHA");
const AWS_CLOUDFRONT_DISTRIBUTION_ID = getEnvironmentVariable(
  "AWS_CLOUDFRONT_DISTRIBUTION_ID"
);
const AWS_CLOUDFRONT_ORIGIN_ID = getEnvironmentVariable(
  "AWS_CLOUDFRONT_ORIGIN_ID"
);
const TMP_DISTRIBUTION_CONFIG_FILE = getEnvironmentVariable(
  "TMP_DISTRIBUTION_CONFIG_FILE"
);

type TAWS$CloudFront$DistributionConfig = {
  Origins: { Items: Array<{ Id: string; OriginPath: string }> };
};

const S3_DEPLOY_OBJECT_PREFIX = `/${GITHUB_SHA}`;

(async function () {
  exec(
    `aws s3 sync ./out s3://${AWS_S3_BUCKET_NAME}${S3_DEPLOY_OBJECT_PREFIX}`
  );
  exec(
    `aws cloudfront get-distribution-config --id ${AWS_CLOUDFRONT_DISTRIBUTION_ID} > ${TMP_DISTRIBUTION_CONFIG_FILE}`
  );

  const {
    DistributionConfig: distributionConfig,
    ETag: eTag,
  }: {
    DistributionConfig: TAWS$CloudFront$DistributionConfig;
    ETag: string;
  } = JSON.parse(readFileSync(TMP_DISTRIBUTION_CONFIG_FILE).toString());

  const originItems = distributionConfig.Origins.Items;
  const originIndex = originItems.findIndex(
    (origin) => origin.Id === AWS_CLOUDFRONT_ORIGIN_ID
  );
  console.log(originItems);

  if (originIndex < 0) {
    throw new Error(
      `Couldn't find CloudFront origin with ID ${AWS_CLOUDFRONT_ORIGIN_ID} in distribution config`
    );
  }

  const origin = originItems[originIndex];
  originItems[originIndex] = { ...origin, OriginPath: S3_DEPLOY_OBJECT_PREFIX };

  writeFileSync(
    TMP_DISTRIBUTION_CONFIG_FILE,
    JSON.stringify(distributionConfig, null, 2)
  );

  exec(`aws cloudfront update-distribution \
    --id ${AWS_CLOUDFRONT_DISTRIBUTION_ID} \
    --if-match ${eTag} \
    --distribution-config=file://${TMP_DISTRIBUTION_CONFIG_FILE}`);
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

function exec(command: string) {
  console.log(`[CMD]`, command);
  const result = shell.exec(command);

  if (result.code !== 0) {
    throw new Error(result.stderr);
  }

  return result;
}
