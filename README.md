# Wagumi Cat API

- A sample project to access block-chain from serverless
- Checks the number of Wagumi Cat https://cats.wagumi.xyz/ that are minted

```
curl -X GET https://c7r5f7jqwc.execute-api.us-west-2.amazonaws.com/prod/

// Total 548 is minted
```

## Development

```
yarn install
```

then

1.  `npx cdk bootstrap` setup your environment
2.  `npx cdk diff` compare deployed stack with current state
3.  `npx cdk synth` emits the synthesized CloudFormation template
4.  `npx cdk deploy` deploy this stack to your default AWS account/region
