import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Onboard = () => {
  const navigate = useNavigate();
  const currentMobile = localStorage.getItem("currentUserMobile");
  
  console.log("Current mobile:", currentMobile);

  const [step, setStep] = useState(1);
  const [qualification, setQualification] = useState("");
  const [interDiploma, setInterDiploma] = useState("");

  const [markTypes, setMarkTypes] = useState({
    tenth: "percentage",
    intermediate: "percentage",
    diploma: "percentage",
    graduation: "percentage",
    postgraduation: "percentage",
    phd: "percentage",
  });

  const [eduDetails, setEduDetails] = useState({
    name: "",
    parentName: "",
    tenth: { school: "", marks: "", year: "" },
    intermediate: { college: "", marks: "", year: "" },
    diploma: { college: "", marks: "", year: "" },
    graduation: { college: "", degree: "", marks: "", year: "" },
    postgraduation: { college: "", degree: "", marks: "", year: "" },
    phd: { college: "", degree: "", marks: "", year: "" },
  });

  const [bankDetails, setBankDetails] = useState({
    accNumber: "",
    ifsc: "",
    bankName: "",
    branch: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const existingDataString = localStorage.getItem(`onboardData_${currentMobile}`);
    if (existingDataString) {
      try {
        const existingData = JSON.parse(existingDataString);
        const hasEmptyValues = (obj) => {
          if (typeof obj === "string") return obj.trim() === "";
          if (typeof obj === "object" && obj !== null) {
            return Object.values(obj).some(hasEmptyValues);
          }
          return false;
        };
        if (!hasEmptyValues(existingData)) {
          console.log("Redirecting to dashboard, found complete onboarding data");
          navigate("/dashboard");
        } else {
          console.log("Found incomplete onboarding data, staying on onboarding page");
        }
      } catch (err) {
        console.error("Error parsing onboarding data:", err);
      }
    } else {
      console.log("No onboarding data found, staying on onboarding page");
    }
  }, [navigate, currentMobile]);

  const isAlpha = (val) => /^[A-Za-z ]+$/.test(val.trim());
  const isNumeric = (val) => /^[0-9]+(\.[0-9]+)?$/.test(val.trim());
  const isValidYear = (val) => /^\d{4}$/.test(val.trim());
  const isValidIfsc = (val) => /^[A-Za-z]{4}[0-9]{7}$/.test(val.trim());

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  const handleEduChange = (e) => {
    const { name, value } = e.target;
    setEduDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedEduChange = (section, field, value) => {
    setEduDetails((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleBankChange = (e) => {
    const { name, value } = e.target;
    setBankDetails((prev) => ({ ...prev, [name]: value }));
  };

  const renderEduSection = (key) => {
    const isDegree = ["graduation", "postgraduation", "phd"].includes(key);
    const label = capitalize(key);
    const marksLabel = markTypes[key] === "percentage" ? "Percentage" : "CGPA";

    return (
      <div className="edu-outer-box" key={key}>
        <h4 className="edu-section-heading">{label} Details</h4>
        <div className="edu-grid">
          {/* First row: School/College Name and Year */}
          <div className="edu-grid-item">
            <div className="mark-type-label">
              {key === "tenth" ? "School Name" : "College Name"}
            </div>
            <input
              type="text"
              placeholder={key === "tenth" ? "School Name" : "College Name"}
              value={key === "tenth" ? eduDetails[key].school : eduDetails[key].college}
              onChange={(e) =>
                handleNestedEduChange(key, key === "tenth" ? "school" : "college", e.target.value)
              }
            />
            {key === "tenth" && errors.tenthSchool && (
              <div className="error">{errors.tenthSchool}</div>
            )}
            {key !== "tenth" && errors[`${key}College`] && (
              <div className="error">{errors[`${key}College`]}</div>
            )}
          </div>

          <div className="edu-grid-item">
            <div className="mark-type-label">Year of Completion</div>
            <input
              type="text"
              placeholder="Year of Completion"
              value={eduDetails[key].year}
              onChange={(e) => handleNestedEduChange(key, "year", e.target.value)}
            />
            {errors[`${key}Year`] && <div className="error">{errors[`${key}Year`]}</div>}
          </div>

          {/* Marks Type and Value side by side */}
          <div className="marks-row">
            <div className="marks-type-item">
              <div className="mark-type-label">Marks Type</div>
              <select
                value={markTypes[key]}
                onChange={(e) =>
                  setMarkTypes((prev) => ({ ...prev, [key]: e.target.value }))
                }
              >
                <option value="percentage">Percentage</option>
                <option value="cgpa">CGPA</option>
              </select>
            </div>
            <div className="marks-value-item">
              <div className="mark-type-label">{marksLabel}</div>
              <input
                type="text"
                placeholder={marksLabel}
                value={eduDetails[key].marks}
                onChange={(e) => handleNestedEduChange(key, "marks", e.target.value)}
              />
              {errors[`${key}Marks`] && (
                <div className="error">{errors[`${key}Marks`]}</div>
              )}
            </div>
          </div>

          {/* Stream field if it's a degree - now after marks */}
          {isDegree && (
            <div className="edu-grid-item">
              <div className="mark-type-label">Stream</div>
              <input
                type="text"
                placeholder="Stream"
                value={eduDetails[key].degree}
                onChange={(e) => handleNestedEduChange(key, "degree", e.target.value)}
              />
              {errors[`${key}Degree`] && (
                <div className="error">{errors[`${key}Degree`]}</div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const validateEduSection = (section, isDegree = false) => {
    const e = {};
    const data = eduDetails[section];

    if (section === "tenth") {
      if (!data.school?.trim()) e.tenthSchool = "School name is required.";
    } else {
      if (!data.college?.trim()) e[`${section}College`] = "College name required.";
    }

    if (isDegree && !data.degree?.trim())
      e[`${section}Degree`] = "Stream required.";

    if (!data.marks?.trim() || !isNumeric(data.marks)) {
      e[`${section}Marks`] = "Enter valid marks.";
    } else {
      const val = parseFloat(data.marks);
      const type = markTypes[section];
      if (type === "percentage" && (val < 0 || val > 100))
        e[`${section}Marks`] = "Percentage must be 0-100";
      if (type === "cgpa" && (val < 0 || val > 10))
        e[`${section}Marks`] = "CGPA must be 0-10";
    }

    if (!data.year?.trim() || !isValidYear(data.year)) {
      e[`${section}Year`] = "Enter valid year.";
    }

    return e;
  };

  const validateStep1 = () => {
    let e = {};
    if (!eduDetails.name.trim() || !isAlpha(eduDetails.name))
      e.name = "Enter a valid name.";
    if (!eduDetails.parentName.trim() || !isAlpha(eduDetails.parentName))
      e.parentName = "Enter a valid parent's name.";
    if (!qualification) e.qualification = "Select highest qualification.";

    e = { ...e, ...validateEduSection("tenth") };

    if (qualification === "intermediate")
      e = { ...e, ...validateEduSection("intermediate") };
    if (qualification === "diploma")
      e = { ...e, ...validateEduSection("diploma") };

    if (["graduation", "postgraduation", "phd"].includes(qualification)) {
      if (!interDiploma) e.interDiploma = "Select intermediate or diploma.";
      else e = { ...e, ...validateEduSection(interDiploma) };
      e = { ...e, ...validateEduSection("graduation", true) };
    }

    if (["postgraduation", "phd"].includes(qualification)) {
      e = { ...e, ...validateEduSection("postgraduation", true) };
    }

    if (qualification === "phd") {
      e = { ...e, ...validateEduSection("phd", true) };
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e = {};
    if (
      !bankDetails.accNumber.trim() ||
      !/^\d{9,18}$/.test(bankDetails.accNumber)
    )
      e.accNumber = "Invalid account number.";
    if (!bankDetails.ifsc.trim() || !isValidIfsc(bankDetails.ifsc))
      e.ifsc = "Invalid IFSC.";
    if (!bankDetails.bankName.trim() || !isAlpha(bankDetails.bankName))
      e.bankName = "Enter a valid bank name.";
    if (!bankDetails.branch.trim()) e.branch = "Branch required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    console.log("Next button clicked");
    if (validateStep1()) {
      console.log("Step 1 validation passed");
      toast.success("Educational details saved successfully!");
      setStep(2);
      setErrors({});
    } else {
      console.log("Step 1 validation failed with errors:", errors);
    }
  };

  const handleSubmit = () => {
    console.log("Submit button clicked");
    if (validateStep2()) {
      console.log("Step 2 validation passed");
      toast.success("Onboarding completed successfully!");
      localStorage.setItem(
        `onboardData_${currentMobile}`,
        JSON.stringify({ eduDetails, bankDetails, qualification, interDiploma, markTypes })
      );
      
      console.log("Onboarding data saved, navigating to dashboard in 1.5 seconds");
      // Add a small delay to show the toast before navigation
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } else {
      console.log("Step 2 validation failed with errors:", errors);
    }
  };

  return (
    <div className="onboard-container">
      {console.log("Rendering Onboard component, step:", step)}
      <h2>Onboarding</h2>
      <div className="onboard-stepper">
        <div className={`step-circle${step === 1 ? " active" : ""}`}>1</div>
        <div className="step-line"></div>
        <div className={`step-circle${step === 2 ? " active" : ""}`}>2</div>
      </div>
      {step === 1 && (
        <div className="form-section">
          <div className="main-label">Name</div>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Your Name"
            value={eduDetails.name}
            onChange={handleEduChange}
          />
          {errors.name && <div className="error">{errors.name}</div>}

          <div className="main-label">Parent's Name</div>
          <input
            id="parentName"
            type="text"
            name="parentName"
            placeholder="Parent's Name"
            value={eduDetails.parentName}
            onChange={handleEduChange}
          />
          {errors.parentName && <div className="error">{errors.parentName}</div>}

          <div className="main-label">
            Highest Qualification <span className="required-star">*</span>
          </div>
          <select
            id="qualification"
            value={qualification}
            onChange={(e) => {
              setQualification(e.target.value);
              setInterDiploma("");
            }}
          >
            <option value="">Select</option>
            <option value="intermediate">Intermediate</option>
            <option value="diploma">Diploma</option>
            <option value="graduation">Graduation</option>
            <option value="postgraduation">Postgraduation</option>
            <option value="phd">PhD</option>
          </select>
          {errors.qualification && <div className="error">{errors.qualification}</div>}

          {["graduation", "postgraduation", "phd"].includes(qualification) && (
            <>
              <div className="main-label">
                Intermediate or Diploma <span className="required-star">*</span>
              </div>
              <select
                id="interDiploma"
                value={interDiploma}
                onChange={(e) => setInterDiploma(e.target.value)}
              >
                <option value="">Select</option>
                <option value="intermediate">Intermediate</option>
                <option value="diploma">Diploma</option>
              </select>
              {errors.interDiploma && <div className="error">{errors.interDiploma}</div>}
            </>
          )}

          {renderEduSection("tenth")}
          {qualification === "intermediate" && renderEduSection("intermediate")}
          {qualification === "diploma" && renderEduSection("diploma")}
          {["graduation", "postgraduation", "phd"].includes(qualification) &&
            interDiploma &&
            renderEduSection(interDiploma)}
          {["graduation", "postgraduation", "phd"].includes(qualification) &&
            renderEduSection("graduation")}
          {["postgraduation", "phd"].includes(qualification) && renderEduSection("postgraduation")}
          {qualification === "phd" && renderEduSection("phd")}

          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div className="form-section">
          <h3>Bank Details</h3>
          <div className="edu-grid">
            <div className="edu-grid-item">
              <div className="mark-type-label">Account Number</div>
              <input
                name="accNumber"
                placeholder="Account Number"
                value={bankDetails.accNumber}
                onChange={handleBankChange}
              />
              {errors.accNumber && <div className="error">{errors.accNumber}</div>}
            </div>

            <div className="edu-grid-item">
              <div className="mark-type-label">IFSC Code</div>
              <input
                name="ifsc"
                placeholder="IFSC Code"
                value={bankDetails.ifsc}
                onChange={handleBankChange}
              />
              {errors.ifsc && <div className="error">{errors.ifsc}</div>}
            </div>

            <div className="edu-grid-item">
              <div className="mark-type-label">Bank Name</div>
              <input
                name="bankName"
                placeholder="Bank Name"
                value={bankDetails.bankName}
                onChange={handleBankChange}
              />
              {errors.bankName && <div className="error">{errors.bankName}</div>}
            </div>

            <div className="edu-grid-item">
              <div className="mark-type-label">Branch</div>
              <input
                name="branch"
                placeholder="Branch"
                value={bankDetails.branch}
                onChange={handleBankChange}
              />
              {errors.branch && <div className="error">{errors.branch}</div>}
            </div>
          </div>

          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default Onboard;











