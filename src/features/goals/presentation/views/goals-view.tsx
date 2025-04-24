"use client";

import { ContentLayout } from "@/core/layout/content/content-layout";
import { useFindGoalUsersById } from "../../hooks/use-goals-queries";
import GoalCard from "../components/goal-card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function GoalsView() {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { data: goals = [], isLoading } = useFindGoalUsersById(userId!);
  const handleCreateGoal = () => {
    router.push("/management/goals/create");
  };

  if (isLoading) {
    return (
      <ContentLayout title="Metas">
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner />
        </div>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout title="Metas">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Tus Metas</h2>
          <Button
            onClick={handleCreateGoal}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            <span>Crear Meta</span>
          </Button>
        </div>

        {goals.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center shadow-sm">
            <p className="text-gray-500">No tienes metas creadas todavía</p>
            <Button onClick={handleCreateGoal} variant="link" className="mt-2">
              Crea tu primera meta
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
            {goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        )}
      </div>
    </ContentLayout>
  );
}
