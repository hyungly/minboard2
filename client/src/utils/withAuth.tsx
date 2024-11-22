import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

const withAuth = (WrappedComponent: React.FC) => {
  return (props: any) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/login");
      }
    }, [isAuthenticated, router]);

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
