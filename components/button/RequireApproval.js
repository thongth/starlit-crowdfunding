import {useState, useEffect} from 'react'
import NextLink from "next/link";
import { Box, Text, Link, Button } from "@chakra-ui/react";
import { USDTContract } from '../../eth/metamask/USDT';

const CampaignCard = (...props) => {
    const [isApproved, setApproved] = useState(false)

    useEffect(() => {
        console.log('usdt contract', USDTContract())
    }, [])
  return (
      <>
      {isApproved ?
        props.children
          :<Button mt={4}>
                Approve USDT
            </Button>

      }
      </>
  );
};

export default CampaignCard;
