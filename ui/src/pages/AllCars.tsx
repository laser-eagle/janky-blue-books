import { VirtualCarTableContainer } from "../components/VirtualCarTable";

import { useFindAll } from "../__generated__/api/car-prices";
import { Header } from "../components/Header";

export const AllCars = () => {
  const { data } = useFindAll();
  if (!data) {
    return "Loading";
  }

  return (
    <div style={{ overflow: "hidden" }}>
      <Header />
      <VirtualCarTableContainer data={data.data as any} />;
    </div>
  );
};
