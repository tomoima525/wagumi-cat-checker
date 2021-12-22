import { ethers } from "ethers";

const contractAbi = ["function totalSupply() external view returns (uint256)"];
const { CONTRACT_ADDRESS } = process.env;
exports.handler = async function (event: any) {
  const provider = ethers.providers.getDefaultProvider();
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS as string,
    contractAbi,
    provider
  );
  const mintedTokens = await contract.totalSupply();
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: `Total ${mintedTokens} is minted`,
  };
};
