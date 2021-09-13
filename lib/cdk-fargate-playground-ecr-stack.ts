import * as cdk from "@aws-cdk/core";
import * as ecr from "@aws-cdk/aws-ecr";
import { Repository } from "@aws-cdk/aws-ecr";

export class CdkFargatePlaygroundEcrStack extends cdk.Stack {
  public readonly repository: Repository;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.repository = new ecr.Repository(this, "Repository", {
      repositoryName: "cdk-fargate-playground",
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
  }
}
