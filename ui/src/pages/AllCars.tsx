import { VirtualCarTable } from "../components/VirtualCarTable";

import { useFindAll } from "../__generated__/api/car-prices";
export const AllCars = () => {
  const { data } = useFindAll();
  if (!data) {
    return "Loading";
  }

  return <VirtualCarTable data={data.data as any} />;
};
