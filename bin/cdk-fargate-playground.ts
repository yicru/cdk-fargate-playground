#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { CdkFargatePlaygroundStack } from "../lib/cdk-fargate-playground-stack";
import { CdkFargatePlaygroundEcrStack } from "../lib/cdk-fargate-playground-ecr-stack";

const app = new cdk.App();

const ecrStack = new CdkFargatePlaygroundEcrStack(
  app,
  "CdkFargatePlaygroundEcrStack"
);

new CdkFargatePlaygroundStack(app, "CdkFargatePlaygroundStack", {
  repository: ecrStack.repository,
});
