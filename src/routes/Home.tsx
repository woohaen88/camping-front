import { Box, Grid } from "@chakra-ui/react";
import Camping from "../components/Camping";
import { useQuery } from "@tanstack/react-query";
import { getCampgroundall } from "../api";
import { ICamping } from "../type";

export default function Home() {
  const { isLoading, data } = useQuery<ICamping[]>(
    ["campgrounds"],
    getCampgroundall
  );

  return (
    <Box px={20} py={5}>
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
          "2xl": "repeat(5, 1fr)",
        }}
        gap={6}
      >
        {data?.map((campground, i) => {
          // console.log(campground.images[0]?.file)

          return (
            <Camping
              id={campground.id}
              key={campground.id}
              image={campground.images[0]?.file}
              name={campground?.name}
              view={campground?.view}
              price={campground?.price}
              visited_at={campground.visited_at}
              visited_end={campground.visited_end}
            />
          );
        })}
      </Grid>
    </Box>
  );
}
