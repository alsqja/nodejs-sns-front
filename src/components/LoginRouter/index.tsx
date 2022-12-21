import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSession } from "../../hooks/session";

export const LoginRouter = ({ from }: { from?: string }) => {
  const { hasSession } = useSession();
  const navigate = useNavigate();
  const location = useLocation();
  const state = {
    from: from || location.state?.from || "/",
  };

  useEffect(() => {
    if (hasSession) {
      navigate({ pathname: state.from });
    }
  }, [hasSession, navigate, state.from]);

  return null;
};
