import { useRouter } from "next/router";

export default function CampaignPage(props) {
  const router = useRouter();
  const { address } = router.query;

  console.log(address);

  return <div>Campaign Page: {address}</div>;
}
