import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Onboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentMobile = localStorage.getItem("currentUserMobile");
    if (currentMobile) {
      localStorage.setItem(`visited_${currentMobile}`, "true");
    }

  }, []);

  return (
    <div>
      <h2>Welcome to Onboarding</h2>
      {/* Your onboarding content */}
      <button onClick={() => navigate("/userdashboard")}>
        Proceed to Dashboard
      </button>
    </div>
  );
};

export default Onboard;
