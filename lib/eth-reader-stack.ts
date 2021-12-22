import {
  aws_apigateway as apigateway,
  aws_lambda as lambda,
  aws_lambda_nodejs as lambda_nodejs,
  aws_s3 as s3,
  RemovalPolicy,
  Stack,
  StackProps,
} from "aws-cdk-lib";
import { Construct } from "constructs";
import * as path from "path";
export class EthReaderStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Use this for storing data
    const nftChecks = new s3.Bucket(this, "nftChecks", {
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const nftChecker = new lambda_nodejs.NodejsFunction(this, "nftChecker", {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "handler",
      entry: path.join(`${__dirname}/../`, "functions", "nftChecker/index.ts"),
      environment: {
        BUCKET_NAME: nftChecks.bucketName,
        CONTRACT_ADDRESS: "0x6144d927ee371de7e7f8221b596f3432e7a8e6d9",
      },
    });
    nftChecks.grantWrite(nftChecker);

    // API gateway
    const api = new apigateway.RestApi(this, "wagumi-cat-api", {
      restApiName: "Wagumi Cat API",
      description: "This service serves wagumi cat data",
    });

    const apiIntegration = new apigateway.LambdaIntegration(nftChecker);

    api.root.addMethod("GET", apiIntegration);
  }
}
