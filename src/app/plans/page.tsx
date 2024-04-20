import { auth } from "@clerk/nextjs";

import { STORAGE_PLANS } from "@/utils/constants";
import PlanCard from "@/components/cards/PlanCard";
import { fetchUserPlanAndLimit } from "@/services/userService";

const PlansPage = async () => {
  const { userId } = auth();
  const { data, error } = await fetchUserPlanAndLimit(userId!);

  if (error)
    return (
      <p className="text-xl mt-4">
        Whoops! An error occurred. Please try again later.
      </p>
    );

  return (
    <div className="py-16">
      <h1 className="text-3xl text-center">
        Choose the best Cloud Locker plan for you
      </h1>
      <p className="text-lg text-center mt-4 mb-16 text-muted-foreground">
        All Cloud Locker accounts give you 1 GB of storage. By upgrading to paid
        plans, you agree to the Cloud Locker Terms of Service.
      </p>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 xl:w-2/3 w-full mx-auto">
        {Object.keys(STORAGE_PLANS).map((plan, index) => (
          //@ts-expect-error
          <PlanCard key={plan} plan={STORAGE_PLANS[plan]} currentPlan={data} index={index} />
        ))}
      </div>
    </div>
  );
};

export default PlansPage;
