import prisma from "@/prismaClient";
import VariationForm from "./_components/VariationForm";
import VariationTable from "./_components/VariationTable";

const VariationsPage = async () => {
  return (
    <div className="grid grid-cols-2 gap-10">
      <div>
        <VariationForm variation={"color"} />
        <VariationTable variation="color" />
      </div>
      <div>
        <VariationForm variation={"size"} />
        <VariationTable variation="size" />
      </div>
    </div>
  );
};

export default VariationsPage;
