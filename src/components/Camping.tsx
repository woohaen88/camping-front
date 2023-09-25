import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaWonSign } from "react-icons/fa";

interface ICampingProps {
  id: number;
  image: string;
  name: string;
  view: string;
  price: number;
  visited_at: string;
  visited_end: string;
}
export default function Camping({
  id,
  image,
  name,
  view,
  price,
  visited_at,
  visited_end,
}: ICampingProps) {
  return (
    <VStack mb="3" alignItems={"flex-start"}>
      <Link to={`campgrounds/${id}`}>
        <Box overflow={"hidden"} rounded={"2xl"}>
          <Image objectFit={"cover"} overflow={"hidden"} src={image} />
        </Box>
      </Link>
      <VStack px={"1"} alignSelf={"flex-start"} spacing={"1"}>
        <HStack alignSelf={"flex-start"}>
          <Text>{name}</Text>
        </HStack>
        <VStack spacing={"-0.5"} alignSelf={"flex-start"}>
          <Box color={"gray.500"}>
            <Text fontSize={"sm"}>{view}</Text>
            <Text fontSize={"sm"}>
              {visited_at} ~ {visited_end}
            </Text>
          </Box>
        </VStack>
        <HStack alignSelf={"flex-start"}>
          <FaWonSign />
          <Text as={"b"}>{price}</Text>
          <Text>/ 박</Text>
        </HStack>
      </VStack>
    </VStack>
  );
}
