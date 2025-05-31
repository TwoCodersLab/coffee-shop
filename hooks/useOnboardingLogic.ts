// hooks/useOnboardingLogic.ts
import { useRouter } from "expo-router";

export const useOnboardingLogic = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.replace("/home");
  };

  return {
    handleGetStarted,
  };
};
