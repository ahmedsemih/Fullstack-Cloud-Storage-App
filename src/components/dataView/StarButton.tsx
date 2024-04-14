import { Star } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { addStar, checkIsStarred, removeStar } from "@/services/starService";

type Props = {
  path: string;
};

const StarButton = ({ path }: Props) => {
  const { userId } = useAuth();
  const { toast } = useToast();
  const [starredId, setStarredId] = useState<string | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      const { data } = await checkIsStarred(path);

      if (data) setStarredId(data.id);
      else setStarredId(null);
    };

    checkStatus();
  }, [path]);

  const handleAdd = async () => {
    if (!userId) return;

    const { data, error } = await addStar(userId, path);

    if (error)
      return toast({
        title: "Somethings went wrong.",
        description: "Whoops! An error occurred. Please try again later.",
      });

    if (data) setStarredId(data.id);
  };

  const handleRemove = async () => {
    if (!userId && !starredId) return;

    const { data, error } = await removeStar(starredId!);

    if (error)
      return toast({
        title: "Somethings went wrong.",
        description: "Whoops! An error occurred. Please try again later.",
      });

    if (data) setStarredId(null);
  };

  if (starredId)
    return (
      <Button onClick={handleRemove} variant="ghost" className="h-8 w-8 p-0">
        <Star className="h-4 w-4" fill="white" />
      </Button>
    );

  return (
    <Button onClick={handleAdd} variant="ghost" className="h-8 w-8 p-0">
      <Star className="h-4 w-4" />
    </Button>
  );
};

export default StarButton;
