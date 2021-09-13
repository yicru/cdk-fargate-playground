import * as cdk from "@aws-cdk/core";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecsPatterns from "@aws-cdk/aws-ecs-patterns";
import { Repository } from "@aws-cdk/aws-ecr";

interface CdkFargatePlaygroundStackProps extends cdk.StackProps {
  repository: Repository;
}

export class CdkFargatePlaygroundStack extends cdk.Stack {
  constructor(
    scope: cdk.Construct,
    id: string,
    props: CdkFargatePlaygroundStackProps
  ) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "Vpc");

    const cluster = new ecs.Cluster(this, "Cluster", {
      vpc,
    });

    const loadBalancedFargateService =
      new ecsPatterns.ApplicationLoadBalancedFargateService(this, "Service", {
        cluster,
        memoryLimitMiB: 512,
        cpu: 256,
        desiredCount: 1,
        taskImageOptions: {
          image: ecs.ContainerImage.fromEcrRepository(props.repository),
        },
      });

    loadBalancedFargateService.targetGroup.configureHealthCheck({
      path: "/",
    });
  }
}
