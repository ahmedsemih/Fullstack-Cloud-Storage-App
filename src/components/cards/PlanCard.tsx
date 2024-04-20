import Link from "next/link";

import formatFileSize from "@/utils/formatFileSize";
import { Button, buttonVariants } from "../ui/button";

type Props = {
  plan: {
    name: string;
    limit: number;
    price: number;
  };
  currentPlan: PlanType;
};

const PlanCard = ({ plan, currentPlan }: Props) => {
  return (
    <div
      className={`rounded-lg border px-4 py-16 text-center ${
        plan.name === currentPlan.plan ? "border-foreground" : "border"
      }`}
    >
      <h3 className="capitalize text-2xl mb-2">{plan.name}</h3>
      <p className="text-5xl">{formatFileSize(plan.limit)}</p>
      <p className="text-2xl my-8">${plan.price}/month</p>
      <CardButton currentPlan={currentPlan} plan={plan} />
      <p className="text-muted-foreground text-sm mt-4">
        You can cancel at any time.
      </p>
    </div>
  );
};

const CardButton = ({ currentPlan, plan }: Props) => {
  if (currentPlan.plan === "free" && plan.name === "free") {
    return (
      <Button className="w-44" disabled>
        Current
      </Button>
    );
  }

  if (currentPlan.plan === "free" && plan.name !== "free")
    return (
      <Link
        href={{
          pathname: "/api/create-checkout",
          query: { lookup: plan.name },
        }}
        className={buttonVariants({
          variant: "default",
          className: "w-44",
        })}
      >
        Upgrade
      </Link>
    );

  if (plan.name === currentPlan.plan)
    return (
      <Link
        href={{
          pathname: "/api/create-customer-portal",
          query: { customer: currentPlan.customer! },
        }}
        className={buttonVariants({
          variant: "default",
          className: "w-44",
        })}
      >
        Manage Subscription
      </Link>
    );

  return (
    <Link
      href={{
        pathname: "/api/create-customer-portal",
        query: { customer: currentPlan.customer! },
      }}
      className={buttonVariants({
        variant: "secondary",
        className: "w-44",
      })}
    >
      {plan.limit < currentPlan.limit ? "Downgrade" : "Upgrade"}
    </Link>
  );
};

export default PlanCard;
